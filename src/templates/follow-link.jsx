import React from 'react';
import { localize } from 'i18n-calypso';

import { wpcom } from '../rest-client/wpcom';
import { bumpStat } from '../rest-client/bump-stat';

export const FollowLink = React.createClass({
    propTypes: {
        site: React.PropTypes.number,
        isFollowing: React.PropTypes.bool,
    },

    followStatTypes: {
        comment: 'note_commented_post',
        comment_like: 'note_liked_comment',
        like: 'note_liked_post',
        follow: 'note_followed',
        reblog: 'note_reblog_post',
    },

    getInitialState: function() {
        return {
            isFollowing: this.props.isFollowing,
        };
    },

    toggleFollowStatus: function(event) {
        var isFollowing = this.state.isFollowing;

        var follower = wpcom().site(this.props.site).follow();
        var component = this;

        var updateState = function(error, data) {
            if (error) throw error;

            if (component.isMounted()) {
                component.setState({
                    isFollowing: data.is_following,
                });
            }
        };

        if (isFollowing) {
            follower.del(updateState);
            bumpStat('notes-click-action', 'unfollow');
        } else {
            follower.add(updateState);

            var stats = { 'notes-click-action': 'follow' };
            stats['follow_source'] = this.followStatTypes[this.props.noteType];
            bumpStat(stats);
        }

        // but optimistically update the client
        this.setState({
            isFollowing: !isFollowing,
        });
    },
    render: function() {
        var noticon_class, link_text;

        if (this.state.isFollowing) {
            noticon_class = 'noticon-following';
            link_text = this.props.translate('Following', {
                context: 'you are following',
            });
        } else {
            noticon_class = 'noticon-follow';
            link_text = this.props.translate('Follow', {
                context: 'verb: imperative',
            });
        }

        return (
            <a className="follow-link" onClick={this.toggleFollowStatus} href="#">
                <span className={'noticon ' + noticon_class} />{link_text}
            </a>
        );
    },
});

export default localize(FollowLink);
