import React from 'react';

import { html } from '../indices-to-html';
import { p } from './functions';

const PostBlock = React.createClass({
  render: function() {
    var postText = p(html(this.props.block));

    return (
      <div className="wpnc__post">
        {postText}
      </div>
    );
  },
});

export default PostBlock;
