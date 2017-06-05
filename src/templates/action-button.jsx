/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Gridicon from './gridicons';
import HotkeyContainer from './container-hotkey';

const ActionButton = React.createClass({
    propTypes: {
        isActive: React.PropTypes.bool.isRequired,
        hotkey: React.PropTypes.number,
        onToggle: React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
    },

    render() {
        let { hotkey, icon, isActive, onToggle, text, title } = this.props,
            hotkeys = hotkey ? [{ hotkey, action: onToggle }] : null;

        return (
            <HotkeyContainer shortcuts={hotkeys}>
				<button
					className={classNames( 'wpnc__action-link', isActive ? 'active-action' : 'inactive-action' )}
					title={title}
					onClick={onToggle}
				>
					<Gridicon icon={icon} size={24} /><p>{text}</p>
				</button>
            </HotkeyContainer>
        );
    },
});

export default ActionButton;
