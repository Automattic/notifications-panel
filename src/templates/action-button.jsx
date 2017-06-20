/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Gridicon from './gridicons';
import HotkeyContainer from './container-hotkey';

const ActionButton = ({ isActive, hotkey, icon, onToggle, text, title }) =>
  <HotkeyContainer shortcuts={hotkey ? [{ hotkey, action: onToggle }] : null}>
    <button
      className={classNames('wpnc__aciton-link', {
        isActive: isActive ? 'active-action' : 'inactive-action',
      })}
      title={title}
      onClick={onToggle}
    >
      <Gridicon icon={icon} size={24} /><p>{text}</p>
    </button>
  </HotkeyContainer>;

ActionButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hotkey: PropTypes.number,
  icon: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ActionButton;
