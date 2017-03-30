/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

export default React.createClass({
    displayName: 'Gridicons',

    propTypes: {
        icon: React.PropTypes.string.isRequired,
        size: React.PropTypes.number,
        onClick: React.PropTypes.func,
    },

    render: function() {
        const { onClick, size = 24 } = this.props;
        const icon = `gridicons-${this.props.icon}`;
        const sharedProps = {
            className: classNames('gridicon', icon),
            height: size,
            width: size,
            onClick,
        };

        switch (icon) {
            default:
                return <svg height={size} width={size} />;

            case 'gridicons-checkmark':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"
                        />
                    </svg>
                );

            case 'gridicons-spam':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M17 2H7L2 7v10l5 5h10l5-5V7l-5-5zm-4 15h-2v-2h2v2zm0-4h-2l-.5-6h3l-.5 6z"
                        />
                    </svg>
                );

            case 'gridicons-star':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M12 2l2.582 6.953L22 9.257l-5.822 4.602L18.18 21 12 16.89 5.82 21l2.002-7.14L2 9.256l7.418-.304"
                        />
                    </svg>
                );

            case 'gridicons-trash':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"
                        />
                    </svg>
                );
        }
    },
});
