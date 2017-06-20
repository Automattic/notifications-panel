/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { trashNote } from '../flux/note-actions';
import ActionButton from './action-button';
import { keys } from '../helpers/input';

const TrashButton = React.createClass({
  displayName: 'TrashButton',

  propTypes: {
    note: React.PropTypes.object.isRequired,
  },

  render() {
    const props = {
      icon: 'trash',
      isActive: false,
      hotkey: keys.KEY_T,
      onToggle: () => trashNote(this.props.note),
      text: this.props.translate('Trash', { context: 'verb: imperative' }),
      title: this.props.translate('Trash comment', { context: 'verb: imperative' }),
    };

    return <ActionButton {...props} />;
  },
});

export default localize(TrashButton);
