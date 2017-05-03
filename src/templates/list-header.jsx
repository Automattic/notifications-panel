import ReactDOM from 'react-dom';
import React from 'react';

var debug = require('debug')('notifications:list-header');

// from $title-offset in boot/sizes.scss
var TITLE_OFFSET = 38;

// from $header-height in boot/sizes.scss
var HEADER_HEIGHT = 34;

const ListHeader = React.createClass({
    getDefaultProps: function() {
        return {
            title: 'None',
            index: -1,
            offset: -1,
            nextOffset: -1,
        };
    },

    componentDidUpdate: function() {
        var node = ReactDOM.findDOMNode(this);
        if (node.offsetTop != this.props.offset && node.offsetTop > 0) {
            this.props.setOffset(this.props.index, node.offsetTop);
        }
    },

    render: function() {
        //		var debugLine = this.props.title + "  offset:" + this.props.offset + " scroll:" + this.props.scroll + " nextOffset: " + this.props.nextOffset + " index:" + this.props.index;
        var title = this.props.title, classNames = ['wpnc__time-group-title'], style = {};
        classNames = classNames.join(' ');

        return (
            <li className="wpnc__time-group-wrap">
                <div className={classNames} style={style}>
                    <span className="wpnc__noticon noticon-time" />{title}
                </div>
            </li>
        );
    },
});

export default ListHeader;
