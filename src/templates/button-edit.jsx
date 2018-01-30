/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import ActionButton from './action-button';
import { keys } from '../helpers/input';
import { linkProps } from './functions';

const openComment = note => () => {
  const { 'data-comment-id': commentId, 'data-site-id': siteId } = linkProps(note);
  window.open(`https://wordpress.com/comment/${siteId}/${commentId}`);
};

const EditButton = ({ note, translate }) =>
  <ActionButton
    {...{
      icon: 'pencil',
      isActive: false,
      hotkey: keys.KEY_E,
      onToggle: openComment(note),
      text: translate('Edit', { context: 'verb: imperative' }),
      title: translate('Edit comment', { context: 'verb: imperative' }),
    }}
  />;

EditButton.propTypes = {
  note: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default localize(EditButton);
