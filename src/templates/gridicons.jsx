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

            case 'gridicons-star-outline':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Star Outline</title>
                        <g>
                            <path
                                d="M12 6.308l1.176 3.167.347.936.997.042 3.374.14-2.647 2.09-.784.62.27.963.91 3.25-2.813-1.872-.83-.553-.83.552-2.814 1.87.91-3.248.27-.962-.783-.62-2.648-2.092 3.374-.14.996-.04.347-.936L12 6.308M12 2L9.418 8.953 2 9.257l5.822 4.602L5.82 21 12 16.89 18.18 21l-2.002-7.14L22 9.256l-7.418-.305L12 2z"
                            />
                        </g>
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
                        <title>Reader Follow</title>
                        <g>
                            <path
                                d="M23 16v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM20 2v9h-4v3h-3v4H4c-1.1 0-2-.9-2-2V2h18zM8 13v-1H4v1h4zm3-3H4v1h7v-1zm0-2H4v1h7V8zm7-4H4v2h14V4z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-reader-following':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Reader Following</title>
                        <g>
                            <path
                                d="M23 13.482L15.508 21 12 17.4l1.412-1.388 2.106 2.188 6.094-6.094L23 13.482zm-7.455 1.862L20 10.89V2H2v14c0 1.1.9 2 2 2h4.538l4.913-4.832 2.095 2.176zM8 13H4v-1h4v1zm3-2H4v-1h7v1zm0-2H4V8h7v1zm7-3H4V4h14v2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-mention':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Mention</title>
                        <g>
                            <path
                                d="M12 2a10 10 0 0 0 0 20v-2a8 8 0 1 1 8-8v.5a1.5 1.5 0 0 1-3 0V7h-2v1a5 5 0 1 0 1 7 3.5 3.5 0 0 0 6-2.46V12A10 10 0 0 0 12 2zm0 13a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-comment':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Comment</title>
                        <g>
                            <path
                                d="M3 6v9c0 1.105.895 2 2 2h9v5l5.325-3.804c1.05-.75 1.675-1.963 1.675-3.254V6c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-add':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Add</title>
                        <g>
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-info':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Info</title>
                        <g>
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-lock':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Lock</title>
                        <g>
                            <path
                                d="M18 8h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H6c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V10c0-1.105-.895-2-2-2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm4 8.723V18h-2v-2.277c-.595-.346-1-.984-1-1.723 0-1.105.895-2 2-2s2 .895 2 2c0 .738-.405 1.376-1 1.723z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-stats':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Stats</title>
                        <g>
                            <path
                                d="M19 3H5c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-7h2v7z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-reblog':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Reblog</title>
                        <g>
                            <path
                                d="M22.086 9.914L20 7.828V18c0 1.105-.895 2-2 2h-7v-2h7V7.828l-2.086 2.086L14.5 8.5 19 4l4.5 4.5-1.414 1.414zM6 16.172V6h7V4H6c-1.105 0-2 .895-2 2v10.172l-2.086-2.086L.5 15.5 5 20l4.5-4.5-1.414-1.414L6 16.172z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-reblog':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Reblog</title>
                        <g>
                            <path
                                d="M22.086 9.914L20 7.828V18c0 1.105-.895 2-2 2h-7v-2h7V7.828l-2.086 2.086L14.5 8.5 19 4l4.5 4.5-1.414 1.414zM6 16.172V6h7V4H6c-1.105 0-2 .895-2 2v10.172l-2.086-2.086L.5 15.5 5 20l4.5-4.5-1.414-1.414L6 16.172z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-trophy':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Trophy</title>
                        <g>
                            <path
                                d="M18 5.062V3H6v2.062H2V8c0 2.525 1.89 4.598 4.324 4.932.7 2.058 2.485 3.61 4.676 3.978V18c0 1.105-.895 2-2 2H8v2h8v-2h-1c-1.105 0-2-.895-2-2v-1.09c2.19-.368 3.976-1.92 4.676-3.978C20.11 12.598 22 10.525 22 8V5.062h-4zM4 8v-.938h2v3.766C4.836 10.416 4 9.304 4 8zm16 0c0 1.304-.836 2.416-2 2.83V7.06h2V8z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-notice':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Notice</title>
                        <g>
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2l-.5-6h3l-.5 6z"
                            />
                        </g>
                    </svg>
                );

                case 'gridicons-time':
                    return (
                        <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Time</title><g><path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.8 13.4L13 11.667V7h-2v5.333l3.2 4.266 1.6-1.2z"/></g>
                        </svg>
                    );

            case 'gridicons-arrow-up':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Arrow Up</title>
                        <g>
                            <path
                                d="M13 20V7.83l5.59 5.59L20 12l-8-8-8 8 1.41 1.41L11 7.83V20h2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-arrow-down':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Arrow Down</title>
                        <g>
                            <path
                                d="M11 4v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2z"
                            />
                        </g>
                    </svg>
                );

            case 'gridicons-arrow-left':
                return (
                    <svg {...sharedProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Arrow Left</title>
                        <g>
                            <path
                                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            />
                        </g>
                    </svg>
                );

        }
    },
});
