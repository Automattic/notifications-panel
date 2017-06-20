import React from 'react';

import { pSoup } from './functions';

export const Preface = React.createClass({
  render: function() {
    var ps = pSoup(this.props.blocks);
    return (
      <div className="wpnc__preface">
        {ps}
      </div>
    );
  },
});

export default Preface;
