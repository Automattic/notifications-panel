import React from 'react';

export const StatusBar = React.createClass({
    getDefaultProps: function() {
        return {
            statusTimeout: 4000,
        };
    },

    getInitialState: function() {
        return {
            isVisible: false,
            timeoutHandle: null,
        };
    },

    disappear: function() {
        this.setState({
            isVisible: false,
            timeoutHandle: null,
        });

        this.props.statusReset();
    },

    /*
	 * Use the prop update trap in order to trigger
	 * displaying the status bar. Because we can hook
	 * in here, there is no need to have an explicit
	 * `show()` function.
	 */
    componentWillReceiveProps: function(nextProps) {
        if ('' == nextProps.statusMessage) return;

        if (nextProps.statusMessage == this.props.statusMessage) return;

        var component = this;

        /* We only want this to appear for a bit, then disappear */
        var timeout = window.setTimeout(
            function() {
                component.disappear();
            },
            nextProps.statusTimeout ? nextProps.statusTimeout : this.props.statusTimeout
        );

        this.setState({
            isVisible: true,
            timeoutHandle: timeout,
        });
    },

    render: function() {
        var visibility = this.state.isVisible ? { display: 'block' } : { display: 'none' };

        var classes = ['wpnc__status-bar'];
        if ('undefined' != typeof this.props.statusClasses && this.props.statusClasses.length > 0) {
            classes.push.apply(classes, this.props.statusClasses);
        }

        return (
            <div className={classes.join(' ')} style={visibility}>
                <span
                    dangerouslySetInnerHTML={{
                        __html: this.props.statusMessage,
                    }}
                />
              <span className="wpnc__status-bar__wpnc__close-link wpnc__noticon" onClick={this.disappear}>
                    
                </span>
            </div>
        );
    },
});

export default StatusBar;
