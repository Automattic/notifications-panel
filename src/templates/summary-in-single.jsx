import React from 'react';

import { html } from '../indices-to-html';

var Snippet = React.createClass({
    render: function() {
        return (
            <a href={this.props.url} target="_blank">
                <span className="wpnc__excerpt">
                    {this.props.snippet.text}
                </span>
            </a>
        );
    },
});

var UserHeader = React.createClass({
    render: function() {
        var grav = this.props.user.media[0];
        var grav_tag = <img src={grav.url} height={grav.height} width={grav.width} />;
        var home_url = this.props.user.ranges[0].url;

        var get_home_link = function(classNames, children) {
            if (home_url) {
                return (
                    <a className={classNames} href={home_url} target="_blank">
                        {children}
                    </a>
                );
            } else {
                return (
                    <a className={classNames + ' disabled'} href="#" disabled="disabled">
                        {children}
                    </a>
                );
            }
        };

        if (this.props.user.ranges.length > 1) {
            var usercopy = {};
            usercopy.ranges = this.props.user.ranges;
            usercopy.text = this.props.user.text;
            return (
                <div className="wpnc__user wpnc__header">
                    <img src={grav.url} />
                    <div
                        className="wpnc__user__usertitle"
                        dangerouslySetInnerHTML={{
                            __html: html(usercopy),
                        }}
                    />
                    <Snippet snippet={this.props.snippet} url={this.props.url} />

                </div>
            );
        } else {
            return (
                <div className="wpnc__user wpnc__header">
                    {get_home_link('wpnc__user__site', grav_tag)}
                    <div>
                        <span className="wpnc__user__username">
                            {get_home_link('wpnc__user__home', this.props.user.text)}
                        </span>
                    </div>
                    <Snippet snippet={this.props.snippet} url={this.props.url} />
                </div>
            );
        }
    },
});

var Header = React.createFactory(
    React.createClass({
        render: function() {
            var subject = (
                <div
                    className="wpnc__subject"
                    dangerouslySetInnerHTML={{
                        __html: html(this.props.subject),
                    }}
                />
            );

            return (
                <div className="wpnc__summary">
                    {subject}
                    <Snippet snippet={this.props.snippet} url={this.props.url} />
                </div>
            );
        },
    })
);

const SummaryInSingle = React.createClass({
    render: function() {
        var header_url, parser;
        if (!this.props.note.header || 0 === this.props.note.header.length) {
            return <span />;
        }

        if (this.props.note.header.length > 1) {
            if ('user' === this.props.note.header[0].ranges[0].type) {
                header_url = this.props.note.url;
                if (this.props.note.type === 'comment') {
                    if (this.props.note.meta.ids.parent_comment) {
                        parser = document.createElement('a');
                        parser.href = this.props.note.url;
                        parser.hash = '#comment-' + this.props.note.meta.ids.parent_comment;
                        header_url = parser.href;
                    }
                }
                return (
                    <UserHeader
                        user={this.props.note.header[0]}
                        snippet={this.props.note.header[1]}
                        url={header_url}
                    />
                );
            }
            return (
                <Header
                    subject={this.props.note.header[0]}
                    snippet={this.props.note.header[1]}
                    url={this.props.note.url}
                />
            );
        } else {
            return (
                <Header
                    subject={this.props.note.header[0]}
                    snippet={''}
                    url={this.props.note.url}
                />
            );
        }
    },
});

export default SummaryInSingle;
