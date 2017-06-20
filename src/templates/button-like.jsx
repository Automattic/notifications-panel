/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { setLikeStatus } from '../flux/note-actions';
import ActionButton from './action-button';
import { keys } from '../helpers/input';
import { getReferenceId } from '../helpers/notes';

const LikeButton = React.createClass({
  displayName: 'LikeButton',

  propTypes: {
    commentId: React.PropTypes.number,
    note: React.PropTypes.object.isRequired,
  },

  render() {
    const props = {
      icon: 'star',
      isActive: this.props.isLiked,
      hotkey: keys.KEY_L,
      onToggle: () =>
        setLikeStatus(
          this.props.note.id,
          getReferenceId(this.props.note, 'site'),
          getReferenceId(this.props.note, 'post'),
          getReferenceId(this.props.note, 'comment'),
          !this.props.isLiked
        ),
      text: this.props.isLiked
        ? this.props.translate('Liked', { context: 'verb: past-tense' })
        : this.props.translate('Like', { context: 'verb: imperative' }),
      title: this.props.isLiked
        ? this.props.commentId
          ? this.props.translate('Remove like from comment')
          : this.props.translate('Remove like from post')
        : this.props.commentId
          ? this.props.translate('Like comment', {
              context: 'verb: imperative',
            })
          : this.props.translate('Like post', { context: 'verb: imperative' }),
    };

    return <ActionButton {...props} />;
  },
});

export default localize(LikeButton);
