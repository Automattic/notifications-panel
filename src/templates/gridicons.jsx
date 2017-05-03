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

            case 'gridicons-reader-follow':
                return (
                  <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Reader Follow</title><g><path d="M23 16v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM20 2v9h-4v3h-3v4H4c-1.1 0-2-.9-2-2V2h18zM8 13v-1H4v1h4zm3-3H4v1h7v-1zm0-2H4v1h7V8zm7-4H4v2h14V4z"/></g>
                  </svg>
                );

          case 'gridicons-reader-following':
                return (
                  <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Reader Following</title><g><path d="M23 13.482L15.508 21 12 17.4l1.412-1.388 2.106 2.188 6.094-6.094L23 13.482zm-7.455 1.862L20 10.89V2H2v14c0 1.1.9 2 2 2h4.538l4.913-4.832 2.095 2.176zM8 13H4v-1h4v1zm3-2H4v-1h7v1zm0-2H4V8h7v1zm7-3H4V4h14v2z"/></g>
                  </svg>
                );

        }
    },
});
