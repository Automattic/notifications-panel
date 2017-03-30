/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { modifierKeyIsActive, shortcutsAreEnabled } from '../helpers/input';

const HotkeyContainer = React.createClass({
    propTypes: {
        shortcuts: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                action: React.PropTypes.func.isRequired,
                hotkey: React.PropTypes.number.isRequired,
                withModifiers: React.PropTypes.bool,
            })
        ),
    },

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown, false);
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown, false);
    },

    dispatch(event, action) {
        event.preventDefault();
        event.stopPropagation();

        action();
    },

    handleKeyDown(event) {
        if (!this.props.shortcuts || !shortcutsAreEnabled()) {
            return;
        }

        this.props.shortcuts
            .filter(shortcut => shortcut.hotkey === event.keyCode)
            .filter(shortcut => (shortcut.withModifiers || false) === modifierKeyIsActive(event))
            .forEach(shortcut => this.dispatch(event, shortcut.action));
    },

    render() {
        return this.props.children;
    },
});

export default HotkeyContainer;
