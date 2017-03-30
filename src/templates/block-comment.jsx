import React from 'react';

import { html } from '../indices-to-html';
import { p } from './functions';

export const CommentBlock = React.createClass({
    render: function() {
        var commentText = p(html(this.props.block));

        var className = 'wpnc__comment';
        if (this.props.meta.ids.comment != this.props.block.meta.ids.comment) {
            className += ' comment-other';
        } else {
            className += ' comment-self';
        }

        return (
            <div className={className}>
                {commentText}
            </div>
        );
    },
});

export default CommentBlock;
