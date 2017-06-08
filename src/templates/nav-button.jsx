/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Gridicon from './gridicons';

export const NavButton = React.createClass({
    navigate(event) {
        event.stopPropagation();
        event.preventDefault();

        this.props.navigate();
    },

    render() {
        return (
            <a
                className={classNames(this.props.className, {
                    disabled: !this.props.isEnabled,
                })}
                disabled={!this.props.isEnabled}
                onClick={this.props.isEnabled ? this.navigate : null}
            >
              <Gridicon icon={this.props.iconName} size={18} />
            </a>

        );
    },
});

NavButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    className: PropTypes.string,
    isEnabled: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default NavButton;
