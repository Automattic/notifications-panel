import React from 'react';
import { connect } from 'react-redux';

import getIsNoteApproved from '../state/selectors/get-is-note-approved';
import getIsNoteRead from '../state/selectors/get-is-note-read';

import SummaryInList from './summary-in-list';
import SummaryInSingle from './summary-in-single';
import NoteBody from './body';

import { getActions } from '../helpers/notes';

export const Note = React.createClass({
    shouldComponentUpdate: function(nextProps) {
        return this.props.note.note_hash !== nextProps.note.note_hash ||
            this.props.listView !== nextProps.listView ||
            this.props.currentNote !== nextProps.currentNote ||
            this.props.selectedNote !== nextProps.selectedNote ||
            nextProps.note.note_hash === 1;
    },

    render: function() {
        var summary;
        var classes = [this.props.isRead
          ? 'read'
          : 'unread', 'wpnc__note', `wpnc__${this.props.note.type}`
        ];
        var body;

        /* Check if this note is the currently selected note for navigation */
        if (this.props.selectedNote == this.props.note.id) {
            classes.push('wpnc__selected-note');
        }

        /* Check if note has a badge */
        for (var i = 0; i < this.props.note.body.length; i++) {
            var block = this.props.note.body[i];

            if ('undefined' != typeof block.media) {
                for (var j = 0; j < block.media.length; j++) {
                    if ('badge' == block.media[j].type) {
                        classes.push('wpnc__badge');
                        i = this.props.note.body.length;
                        break;
                    }
                }
            }
        }

        if ('comment' == this.props.note.type) {
            var noteBody = this.props.note.body;
            var noteActions = getActions(this.props.note);
            if (noteBody.length > 1 && noteActions) {
                /* Check if note has a reply to another comment */
                if (
                    'undefined' != typeof noteBody[1] &&
                    'undefined' != typeof noteBody[1].nest_level
                ) {
                    if (noteBody[1].nest_level > 0) {
                        classes.push('comment-reply');
                    }
                }

                /* Check if note has unapproved comment */
                if ('approve-comment' in noteActions && !this.props.isApproved) {
                    classes.push('wpnc__comment-unapproved');
                }
            }
        }

        if (this.props.detailView) {
            classes.push('wpnc__current');
            summary = this.props.note.header && this.props.note.header.length > 0
                ? <SummaryInSingle
                      key={'note-summary-single-' + this.props.note.id}
                      note={this.props.note}
                  />
                : null;
            body = (
                <NoteBody
                    key={'note-body-' + this.props.note.id}
                    note={this.props.note}
                    global={this.props.global}
                />
            );
        } else {
            summary = (
                <SummaryInList
                    currentNote={this.props.currentNote}
                    key={'note-summary-list' + this.props.note.id}
                    note={this.props.note}
                    global={this.props.global}
                />
            );
        }

        return (
            <li id={'note-' + this.props.note.id} className={classes.join(' ')}>
                {summary}{body}
            </li>
        );
    },
});

const mapStateToProps = (state, { note }) => ({
    isApproved: getIsNoteApproved(state, note),
    isRead: getIsNoteRead(state, note),
});

export default connect(mapStateToProps, null, null, { pure: false })(Note);
