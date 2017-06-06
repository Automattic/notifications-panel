import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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
            />
        );
    },
});

NavButton.propTypes = {
    className: PropTypes.string,
    isEnabled: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default NavButton;
