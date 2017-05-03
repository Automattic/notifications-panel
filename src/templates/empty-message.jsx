import React from 'react';

import { bumpStat } from '../rest-client/bump-stat';

// from $title-offset in boot/sizes.scss
var TITLE_OFFSET = 38;

export const EmptyMessage = React.createClass({
    componentWillMount: function() {
        if (this.props.showing) {
            bumpStat('notes-empty-message', this.props.name + '_shown');
        }
    },

    componentDidUpdate: function() {
        if (this.props.showing) {
            bumpStat('notes-empty-message', this.props.name + '_shown');
        }
    },

    handleClick: function() {
        bumpStat('notes-empty-message', this.props.name + '_clicked');
    },

    render: function() {
        var message;
        if (this.props.link && this.props.linkMessage) {
            message = (
                <div className="wpnc__empty-notes">
                    <h2>{this.props.emptyMessage}</h2>
                    <p>
                        <a href={this.props.link} target="_blank" onClick={this.handleClick}>
                            {this.props.linkMessage}
                        </a>
                    </p>
                </div>
            );
        } else if (this.props.linkMessage) {
            message = (
                <div className="wpnc__empty-notes">
                    <h2>{this.props.emptyMessage}</h2>
                    <p>{this.props.linkMessage}</p>
                </div>
            );
        } else {
            message = (
                <div className="wpnc__empty-notes">
                    <h2>{this.props.emptyMessage}</h2>
                </div>
            );
        }

        return (
            <div
                className="wpnc__empty-notes-container"
                style={{ height: window.innerHeight - TITLE_OFFSET + 'px' }}
            >
                {message}
            </div>
        );
    },
});

export default EmptyMessage;
