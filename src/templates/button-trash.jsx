/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { trashNote } from '../flux/note-actions';
import ActionButton from './action-button';
import { keys } from '../helpers/input';

const TrashButton = ({ note, translate }) =>
  <ActionButton
    {...{
      icon: 'trash',
      isActive: false,
      hotkey: keys.KEY_T,
      onToggle: () => trashNote(note),
      text: translate('Trash', { context: 'verb: imperative' }),
      title: translate('Trash comment', { context: 'verb: imperative' }),
    }}
  />;

TrashButton.propTypes = {
  note: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default localize(TrashButton);
