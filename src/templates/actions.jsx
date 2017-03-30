import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

import getIsNoteApproved from '../state/selectors/get-is-note-approved';
import getIsNoteLiked from '../state/selectors/get-is-note-liked';

import ApproveButton from './button-approve';
import LikeButton from './button-like';
import ReplyInput from './comment-reply-input';
import SpamButton from './button-spam';
import TrashButton from './button-trash';

import { getActions, getReferenceId } from '../helpers/notes';

const ActionsPane = React.createClass({
    propTypes: {
        note: React.PropTypes.object.isRequired,
    },

    getInitialReplyValue(note) {
        let ranges, username;

        if ('user' === note.subject[0].ranges[0].type) {
            // Build the username from the subject line
            ranges = note.subject[0].ranges[0].indices;
            username = note.subject[0].text.substring(ranges[0], ranges[1]);
        } else if ('user' === note.body[0].type) {
            username = note.body[0].text;
        } else {
            username = null;
        }

        if (username) {
            return this.props.translate('Reply to %(username)s...', {
                args: { username },
            });
        }

        return this.getType(note) === 'post'
            ? this.props.translate('Reply to post...')
            : this.props.translate('Reply to comment...');
    },

    getType: note => null === getReferenceId(note, 'comment') ? 'post' : 'comment',

    render() {
        const { global, note } = this.props,
            actions = getActions(note),
            hasAction = types => [].concat(types).some(type => actions.hasOwnProperty(type));

        return (
            <div className="wpnc__note-actions">
                <div className="wpnc__note-actions__buttons">
                    {hasAction(['like-post', 'like-comment']) &&
                        <LikeButton {...{ note, isLiked: this.props.isLiked }} />}
                    {hasAction('approve-comment') &&
                        <ApproveButton {...{ note, isApproved: this.props.isApproved }} />}
                    {hasAction('trash-comment') && <TrashButton note={note} />}
                    {hasAction('spam-comment') && <SpamButton note={note} />}
                </div>
                {!!actions['replyto-comment'] &&
                    <ReplyInput
                        {...{
                            note,
                            defaultValue: this.getInitialReplyValue(note),
                            global,
                        }}
                    />}
            </div>
        );
    },
});

const mapStateToProps = (state, { note }) => ({
    isApproved: getIsNoteApproved(state, note),
    isLiked: getIsNoteLiked(state, note),
});

export default connect(mapStateToProps)(localize(ActionsPane));
