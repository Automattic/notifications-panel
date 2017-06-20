/**
 * Module dependencies.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { escapeRegExp, find, findIndex } from 'lodash';

import Suggestion from './suggestion';

const debug = require('debug')('notifications:note');

const KEY_ENTER = 13;
const KEY_ESC = 27;
const KEY_SPACE = 32;
const KEY_UP = 38;
const KEY_DOWN = 40;

/**
 * This pattern looks for a any non-space-character
 * string prefixed with an `@` which either starts
 * at the beginning of a line or after a space
 *
 * @type {RegExp} matches @mentions
 */
const suggestionMatcher = /(?:^|\s)@([^\s]*)$/i;

// Danger! Recursive
// (relatively safe since the DOM tree is only so deep)
const getOffsetTop = element => {
  const offset = element.offsetTop;

  return element.offsetParent ? offset + getOffsetTop(element.offsetParent) : offset;
};

const stopEvent = function(event) {
  if (this.state.suggestionsVisible) {
    event.stopPropagation();
    event.preventDefault();
  }
};

const getSuggestionIndexBySelectedId = function(suggestions) {
  if (!this.state.selectedSuggestionId) {
    return 0;
  }

  const index = findIndex(suggestions, ({ ID }) => ID === this.state.selectedSuggestionId);

  return index > -1 ? index : null;
};

const getSuggestionById = function() {
  if (!this.state.selectedSuggestionId && this.props.suggestions.length > 0) {
    return this.props.suggestions[0];
  }

  return find(this.props.suggestions, ({ ID }) => ID === this.state.selectedSuggestionId) || null;
};

export const SuggestionsMixin = {
  componentWillMount() {
    this.suggestionsAbove = false;
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleSuggestionsKeyDown, false);
    window.removeEventListener('keyup', this.handleSuggestionsKeyUp, false);
    window.removeEventListener('blur', this.handleSuggestionBlur, true);
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleSuggestionsKeyDown, false);
    window.addEventListener('keyup', this.handleSuggestionsKeyUp, false);
    window.addEventListener('blur', this.handleSuggestionBlur, true);
  },

  componentDidUpdate() {
    if (!this.suggestionMixin_suggestionList) {
      return;
    }

    const suggestionList = this.suggestionMixin_suggestionList;

    if (!this.suggestionListMarginTop) {
      this.suggestionListMarginTop = window.getComputedStyle(suggestionList)['margin-top'];
    }

    const textArea = this.replyInput;
    const textAreaClientRect = textArea.getBoundingClientRect();

    if (this.suggestionsAbove) {
      suggestionList.style.top =
        '-' +
        (suggestionList.offsetHeight +
          textAreaClientRect.height +
          parseInt(this.suggestionListMarginTop)) +
        'px';
      suggestionList.style.marginTop = '0';
    } else {
      this.suggestionsAbove =
        suggestionList.offsetHeight > window.innerHeight - textAreaClientRect.top &&
        suggestionList.offsetHeight < textAreaClientRect.top;
    }
  },

  getCaretPosition: element => element.selectionStart,

  setCaretPosition(element, position) {
    element.focus();

    setTimeout(() => element.setSelectionRange(position, position), 0);
  },

  getQueryText(element) {
    if (!element.value) {
      return null;
    }

    const textBeforeCaret = element.value.slice(0, this.getCaretPosition(element));

    const match = suggestionMatcher.exec(textBeforeCaret);

    if (!match) {
      return null;
    }

    const [, suggestion] = match;

    return suggestion;
  },

  insertSuggestion(element, suggestion) {
    if (!suggestion) {
      return;
    }

    const caretPosition = this.getCaretPosition(element);
    const startString = this.state.value.slice(
      0,
      Math.max(caretPosition - this.state.suggestionsQuery.length, 0)
    );
    const endString = this.state.value.slice(caretPosition);

    this.setState({
      value: startString + suggestion.user_login + endString,
      suggestionsVisible: false,
    });

    this.setCaretPosition(element, startString.length + suggestion.user_login.length);
  },

  handleSuggestionsKeyDown(event) {
    if (!this.state.suggestionsVisible || this.props.suggestions.length === 0) {
      return;
    }

    if (KEY_ENTER === event.keyCode) {
      stopEvent.call(this, event);
      return;
    }

    if (KEY_UP !== event.keyCode && KEY_DOWN !== event.keyCode) {
      return;
    }

    stopEvent.call(this, event);

    const query = escapeRegExp(this.state.suggestionsQuery);
    const matcher = new RegExp(`^${query}| ${query}`, 'i'); // start of string, or preceded by a space

    const suggestions = this.props.suggestions
      .filter(({ name }) => matcher.test(name))
      .slice(0, 10);

    const prevIndex = getSuggestionIndexBySelectedId.call(this, suggestions);

    if (null === prevIndex) {
      return;
    }

    const direction = {
      [KEY_UP]: -1,
      [KEY_DOWN]: 1,
    }[event.keyCode];

    this.setState(
      {
        selectedSuggestionId:
          suggestions[(prevIndex + direction + suggestions.length) % suggestions.length].ID,
      },
      this.ensureSelectedSuggestionVisibility
    );
  },

  handleSuggestionsKeyUp({ keyCode, target }) {
    if (KEY_ENTER === keyCode) {
      if (!this.state.suggestionsVisible || this.props.suggestions.length === 0) {
        return;
      }

      this.insertSuggestion(target, getSuggestionById.call(this));
    }

    if (KEY_ESC === keyCode || KEY_SPACE === keyCode) {
      return this.setState({ suggestionsVisible: false });
    }

    if (KEY_UP === keyCode || KEY_DOWN === keyCode) {
      return;
    }

    const query = this.getQueryText(target);

    if (query !== null) {
      this.props.fetchSuggestions(this.props.note.meta.ids.site);
    }

    this.setState({
      suggestionsQuery: query,
      suggestionsVisible: typeof query === 'string',
      selectedSuggestionId: null,
    });
  },

  handleSuggestionClick(suggestion) {
    this.insertSuggestion(this.replyInput, suggestion);
  },

  handleSuggestionBlur() {
    if (this.suggestionsCancelBlur || !this.isMounted()) {
      return;
    }

    this.setState({ suggestionsVisible: false });
  },

  ensureSelectedSuggestionVisibility() {
    if (!this.suggestionsMixin_suggestionNodes) {
      return;
    }

    const suggestionElement = ReactDOM.findDOMNode(
      this.suggestionsMixin_suggestionNodes[this.state.selectedSuggestionId]
    );

    if (!suggestionElement) {
      return;
    }

    const offsetTop = getOffsetTop(suggestionElement);

    if (offsetTop - window.pageYOffset > 0) {
      suggestionElement.scrollIntoView();
    }

    if (window.pageYOffset + window.innerHeight <= offsetTop) {
      suggestionElement.scrollIntoView();
    }
  },

  suggestionsMixin_storeSuggestionNode(ref) {
    if (!ref) {
      return;
    }

    this.suggestionsMixin_suggestionNodes = {
      ...this.suggestionsMixin_suggestionNodes,
      [ref.props['data-suggestion-id']]: ref,
    };
  },

  renderSuggestions() {
    if (!this.state.suggestionsVisible) {
      return;
    }

    const query = escapeRegExp(this.state.suggestionsQuery);
    const matcher = new RegExp(`^${query}| ${query}`, 'i'); // start of string, or preceded by a space

    const suggestions = this.props.suggestions
      .filter(({ name }) => matcher.test(name))
      .slice(0, 10);

    if (!suggestions.length) {
      return null;
    }

    const selectedSuggestionId = this.state.selectedSuggestionId || suggestions[0].ID;

    return (
      <div
        className="wpnc__suggestions"
        onMouseEnter={() => (this.suggestionsCancelBlur = true)}
        onMouseLeave={() => (this.suggestionsCancelBlur = false)}
      >
        <ul>
          {suggestions.map(suggestion =>
            <Suggestion
              ref={this.suggestionsMixin_storeSuggestionNode}
              data-suggestion-id={suggestion.ID}
              key={'user-suggestion-' + suggestion.ID}
              onClick={this.handleSuggestionClick.bind(this, suggestion)}
              onMouseEnter={function(suggestion) {
                this.setState({
                  selectedSuggestionId: suggestion.ID,
                });
              }.bind(this, suggestion)}
              avatarUrl={suggestion.image_URL}
              username={suggestion.user_login}
              fullName={suggestion.display_name}
              selected={suggestion.ID === selectedSuggestionId}
              suggestionsQuery={this.state.suggestionsQuery}
            />
          )}
        </ul>
      </div>
    );
  },
};

export default SuggestionsMixin;
