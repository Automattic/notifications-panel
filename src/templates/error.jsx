import React from 'react';

export const Error = React.createClass({
  render: function() {
    console.log(this.props);
    return (
      <div className="error">
        {this.props.error}
      </div>
    );
  },
});

export default Error;
