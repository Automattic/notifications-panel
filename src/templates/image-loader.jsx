/**
 * External dependencies
 */
var React = require('react');

/**
 * Module variables
 */
var LoadStatus = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
},
  noop = function() {};

export const ImageLoader = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.element.isRequired,
    children: React.PropTypes.node,
  },

  getInitialState: function() {
    return {
      status: LoadStatus.PENDING,
    };
  },

  componentWillMount: function() {
    this.createLoader();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.createLoader(nextProps);
    }
  },

  componentWillUnmount: function() {
    this.destroyLoader();
  },

  createLoader: function(nextProps) {
    var src = (nextProps || this.props).src;

    this.destroyLoader();

    this.image = new Image();
    this.image.src = src;
    this.image.onload = this.onLoadComplete;
    this.image.onerror = this.onLoadComplete;

    this.setState({
      status: LoadStatus.LOADING,
    });
  },

  destroyLoader: function() {
    if (!this.image) {
      return;
    }

    this.image.onload = noop;
    this.image.onerror = noop;
    delete this.image;
  },

  onLoadComplete: function(event) {
    this.destroyLoader();

    this.setState({
      status: 'load' === event.type ? LoadStatus.LOADED : LoadStatus.FAILED,
    });
  },

  render: function() {
    var children, imageProps;

    switch (this.state.status) {
      case LoadStatus.LOADING:
        children = this.props.placeholder;
        break;

      case LoadStatus.LOADED:
        children = <img src={this.props.src} />;
        break;

      case LoadStatus.FAILED:
        children = this.props.children;
        break;

      default:
        break;
    }

    return (
      <div className="image-preloader">
        {children}
      </div>
    );
  },
});

export default ImageLoader;
