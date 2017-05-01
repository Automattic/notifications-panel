import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

import actions from '../state/actions';
import getIsLoading from '../state/selectors/get-is-loading';
import getIsNoteHidden from '../state/selectors/get-is-note-hidden';
import getIsPanelOpen from '../state/selectors/get-is-panel-open';
import getSelectedNoteId from '../state/selectors/get-selected-note-id';

import EmptyMessage from './empty-message';
import FilterBar from './filter-bar';
import ListHeader from './list-header';
import Note from './note';
import StatusBar from './status-bar';
import UndoListItem from './undo-list-item';

var debug = require('debug')('notifications:list');

var DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

// from $title-offset in boot/sizes.scss
var TITLE_OFFSET = 38;

const getDOMNodeOrElse = ref => {
    try {
        return ReactDOM.findDOMNode(ref);
    } catch (e) {
        return undefined;
    }
};

export const NoteList = React.createClass({
    getDefaultProps() {
        return {
            scrollTimeout: 200,
        };
    },

    getInitialState: function() {
        return {
            undoAction: null,
            undoNote: null,
            scrollY: 0,
            scrolling: false,
            statusMessage: '',
        };
    },

    componentWillMount: function() {
        this.offsets = [-1, -1, -1, -1, -1];

        this.props.global.updateStatusBar = this.updateStatusBar;
        this.props.global.resetStatusBar = this.resetStatusBar;
        this.props.global.updateUndoBar = this.updateUndoBar;
        this.props.global.resetUndoBar = this.resetUndoBar;

        if ('function' === typeof this.props.storeVisibilityUpdater) {
            this.props.storeVisibilityUpdater(this.ensureSelectedNoteVisibility);
        }
    },

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('scroll', this.onScroll);
    },

    componentWillUnmount: function() {
        ReactDOM.findDOMNode(this).removeEventListener('scroll', this.onScroll);
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.isPanelOpen && !nextProps.isPanelOpen) {
            // scroll to top, from toggling frame
            this.setState({ lastSelectedIndex: 0, scrollY: 0 });
        }
    },

    componentDidUpdate: function(prevProps) {
        if (this.noteList && !this.props.isLoading) {
            var element = ReactDOM.findDOMNode(this);
            var notes = this.noteList;
            if (
                element.clientHeight > 0 &&
                element.scrollTop + element.clientHeight >= notes.clientHeight - 100
            ) {
                this.props.client.loadMore();
            }
        }

        if (prevProps.selectedNoteId !== this.props.selectedNoteId) {
            this.ensureSelectedNoteVisibility();
        }
    },

    onScroll() {
        if (this.isScrolling) {
            return;
        }

        this.isSrolling = true;

        requestAnimationFrame(() => this.isSrolling = false);

        const element = ReactDOM.findDOMNode(this);
        if (!this.state.scrolling || this.state.scrollY !== element.scrollTop) {
            // only set state and trigger render if something has changed
            this.setState({
                scrolling: true,
                scrollY: element.scrollTop,
            });
        }

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(this.onScrollEnd, this.props.scrollTimeout);
    },

    onScrollEnd() {
        this.setState({ scrolling: false });
    },

    setOffset: function(index, offset) {
        if (index < 0 || index >= this.offsets.length) return;
        this.offsets[index] = offset;
    },

    updateStatusBar: function(message, classList, delay) {
        this.setState({
            statusClasses: classList,
            statusMessage: message,
            statusTimeout: delay,
        });
    },

    resetStatusBar: function() {
        this.setState({
            statusClasses: [],
            statusMessage: '',
        });
    },

    updateUndoBar: function(action, note) {
        this.setState(
            {
                undoAction: action,
                undoNote: note,
            },
            () => {
                /* Jump-start the undo bar if it hasn't updated yet */
                if (this.startUndoSequence) {
                    this.startUndoSequence();
                }
            }
        );
    },

    resetUndoBar: function() {
        this.setState({
            undoAction: null,
            undoNote: null,
        });
    },

    ensureSelectedNoteVisibility: function() {
        var scrollTarget = null,
            selectedNote = this.props.selectedNote,
            noteElement = getDOMNodeOrElse((this.notes || {})[selectedNote]),
            listElement = null,
            topPadding;

        if (null === selectedNote || !noteElement) {
            scrollTarget = this.state.scrollY + 1;
        } else {
            /* DOM element for the list */
            listElement = this.noteList;
            topPadding = listElement.offsetTop + TITLE_OFFSET;

            var yOffset = listElement.parentNode.scrollTop;

            if (noteElement.offsetTop - yOffset <= topPadding) {
                /* Scroll up if note is above viewport */
                scrollTarget = noteElement.offsetTop - topPadding;
            } else if (yOffset + this.props.height <= noteElement.offsetTop + topPadding) {
                /* Scroll down if note is below viewport */
                scrollTarget = noteElement.offsetTop + noteElement.offsetHeight - this.props.height;
            }
        }

        if (scrollTarget !== null && listElement) {
            listElement.parentNode.scrollTop = scrollTarget;
        }
    },

    storeNote(ref) {
        if (!ref) {
            return;
        }

        this.notes = {
            ...this.notes,
            [ref.props['data-note-id']]: ref,
        };
    },

    storeNoteList(ref) {
        this.noteList = ref;
    },

    storeUndoActImmediately(actImmediately) {
        this.undoActImmediately = actImmediately;
    },

    storeUndoBar(ref) {
        this.undoBar = ref;
    },

    storeUndoStartSequence(startSequence) {
        this.startUndoSequence = startSequence;
    },

    render: function() {
        var _this = this;
        this.groupTitles = [
            this.props.translate('Today', {
                comment: 'heading for a list of notifications from today',
            }),
            this.props.translate('Yesterday', {
                comment: 'heading for a list of notifications from yesterday',
            }),
            this.props.translate('Older than 2 days', {
                comment: 'heading for a list of notifications that are more than 2 days old',
            }),
            this.props.translate('Older than a week', {
                comment: 'heading for a list of notifications that are more than a week old',
            }),
            this.props.translate('Older than a month', {
                comment: 'heading for a list of notifications that are more than a month old',
            }),
        ];

        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var timeBoundaries = [
            new Date(),
            now,
            new Date(now - DAY_MILLISECONDS * 1),
            new Date(now - DAY_MILLISECONDS * 6),
            new Date(now - DAY_MILLISECONDS * 30),
        ];

        var noteIsBetween = function(note, from, to) {
            var noteTime = new Date(note.timestamp);

            from = from ||
                new Date(noteTime.getFullYear(), noteTime.getMonth(), noteTime.getDate() - 1);
            to = to ||
                new Date(noteTime.getFullYear(), noteTime.getMonth(), noteTime.getDate() + 1);

            if (from < noteTime && noteTime <= to) return true;
            else return false;
        };

        const createNoteComponent = note => {
            if (this.state.undoNote && note.id == _this.state.undoNote.id) {
                return (
                    <UndoListItem
                        ref={this.storeUndoBar}
                        storeImmediateActor={this.storeUndoActImmediately}
                        storeStartSequence={this.storeUndoStartSequence}
                        key={'undo-' + _this.state.undoAction + '-' + note.id}
                        action={_this.state.undoAction}
                        note={_this.state.undoNote}
                        global={_this.props.global}
                    />
                );
            }

            /* Only show the note if it's not in the list of hidden notes */
            if (!this.props.isNoteHidden(note.id)) {
                return (
                    <Note
                        note={note}
                        ref={this.storeNote}
                        key={'note-' + note.id}
                        data-note-id={note.id}
                        detailView={false}
                        client={_this.props.client}
                        global={_this.props.global}
                        currentNote={_this.props.selectedNoteId}
                        selectedNote={_this.props.selectedNote}
                    />
                );
            }
        };

        // Create new groups of messages by time periods
        var noteGroups = timeBoundaries.map(function(time, i) {
            return _this.props.notes
                .filter(function(note) {
                    return noteIsBetween(note, timeBoundaries[i + 1], timeBoundaries[i]);
                })
                .map(createNoteComponent);
        });

        var header;
        var nextOffset;
        var offset_i;
        var scroll;
        var offsets = this.offsets;

        /* Build a single list of notes, undo bars, and time group headers */
        var notes = noteGroups.reduce(
            function(notes, group, i) {
                if (0 < group.length) {
                    if (_this.state && _this.state.scrollY) {
                        scroll = _this.state.scrollY;
                    } else {
                        scroll = 0;
                    }
                    // find next header that has an offset (not all headers may
                    // be displayed)
                    offset_i = i + 1;
                    while (offsets[offset_i] == -1 && offset_i < offsets.length) {
                        offset_i += 1;
                    }
                    nextOffset = offsets[offset_i];

                    header = (
                        <ListHeader
                            key={'time-group-' + i}
                            title={_this.groupTitles[i]}
                            scroll={scroll}
                            index={i}
                            offset={offsets[i]}
                            nextOffset={nextOffset}
                            setOffset={_this.setOffset}
                        />
                    );
                    notes.push(header);
                    notes.push.apply(notes, group);
                }

                return notes;
            },
            []
        );

        var filter = this.props.filterController.selected;
        var loadingIndicatorVisibility = { opacity: 0 };
        if (this.props.isLoading) {
            loadingIndicatorVisibility.opacity = 1;
            if (notes.length == 0) {
                loadingIndicatorVisibility.height = this.props.height - TITLE_OFFSET + 'px';
            }
        } else if (!this.props.initialLoad && notes.length == 0 && filter.emptyMessage) {
            notes = (
                <EmptyMessage
                    emptyMessage={filter.emptyMessage}
                    linkMessage={filter.emptyLinkMessage}
                    link={filter.emptyLink}
                    name={filter.name}
                    showing={this.props.client.showing}
                />
            );
        } else if (
            !this.props.selectedNoteId && notes.length > 0 && notes.length * 90 > this.props.height
        ) {
            // only show if notes exceed window height, estimating note height because
            // we are executing this pre-render
            notes.push(
                <div key="done-message" className="wpnc__done-message">
                    {this.props.translate('The End', {
                        comment: 'message when end of notifications list reached',
                    })}
                </div>
            );
        }

        return (
            <div className={this.props.selectedNoteId ? 'wpnc__list-view current' : 'wpnc__list-view'}>
                <FilterBar controller={this.props.filterController} />
                <ol ref={this.storeNoteList} className="wpnc__notes">
                    <StatusBar
                        statusClasses={this.state.statusClasses}
                        statusMessage={this.state.statusMessage}
                        statusTimeout={this.state.statusTimeout}
                        statusReset={this.resetStatusBar}
                    />
                    {notes}
                    {this.props.isLoading &&
                        <div style={loadingIndicatorVisibility} className="wpnc__loading-indicator">
                            <div className="spinner animated">
                                <span className="side left" />
                                <span className="side right" />
                            </div>
                        </div>}
                </ol>
            </div>
        );
    },
});

const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    isNoteHidden: noteId => getIsNoteHidden(state, noteId),
    isPanelOpen: getIsPanelOpen(state),
    selectedNoteId: getSelectedNoteId(state),
});

const mapDispatchToProps = {
    selectNote: actions.ui.selectNote,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(
    localize(NoteList)
);
