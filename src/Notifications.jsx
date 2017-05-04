import React, { PropTypes, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { noop } from 'lodash';

import { store } from './state';
import { init as initPublicAPI } from './state/action-middleware/public-api';
import { SET_IS_SHOWING } from './state/action-types';
import actions from './state/actions';

import RestClient from './rest-client';
import { setGlobalData } from './flux/app-actions';
import repliesCache from './comment-replies-cache';

import { init as initAPI } from './rest-client/wpcom';

import Layout from './templates';

let client;

const globalData = {};

setGlobalData(globalData);

repliesCache.cleanup();

/**
 * Force a manual refresh of the notes data
 */
export const refreshNotes = () => client && client.refreshNotes.call(client);

/**
 * Refresh to default note list view
 */
export const reset = () => {
    store.dispatch(actions.ui.unselectNote());
};

export class Notifications extends PureComponent {
    static propTypes = {
        appResetter: PropTypes.func,
        appUpdater: PropTypes.func,
        isShowing: PropTypes.bool,
        isVisible: PropTypes.bool,
        locale: PropTypes.string,
        onReady: PropTypes.func,
        onRender: PropTypes.func,
        onTogglePanel: PropTypes.func,
        onLayoutChange: PropTypes.func,
        receiveMessage: PropTypes.func,
        wpcom: PropTypes.object.isRequired,
    };

    static defaultProps = {
        appResetter: noop,
        appUpdater: noop,
        isVisible: false,
        locale: 'en',
        onReady: noop,
        onRender: noop,
        onTogglePanel: noop,
        onLayoutChange: noop,
        receiveMessage: noop,
    };

    componentWillMount() {
        const {
            appResetter,
            appUpdater,
            isShowing,
            isVisible,
            onLayoutChange,
            onRender,
            onTogglePanel,
            receiveMessage,
            wpcom,
        } = this.props;

        appResetter(reset);
        appUpdater(() => this.forceUpdate());

        initAPI(wpcom);
        initPublicAPI({ onLayoutChange, onTogglePanel });

        client = new RestClient({ onRender });
        client.global = globalData;
        client.sendMessage = receiveMessage;

        /**
         * Initialize store with actions that need to occur on
         * transitions from open to close or close to open
         *
         * @TODO: Pass this information directly into the Redux initial state
         */
        store.dispatch(isShowing ? actions.ui.openPanel() : actions.ui.closePanel());
        store.dispatch({ type: SET_IS_SHOWING, isShowing });

        client.setVisibility({ isShowing, isVisible });
    }

    componentDidMount() {
        this.props.onReady();
    }

    componentWillReceiveProps({ isShowing, isVisible, wpcom }) {
        initAPI(wpcom);

        if (this.props.isShowing && !isShowing) {
            store.dispatch(actions.ui.closePanel());
        }

        if (!this.props.isShowing && isShowing) {
            store.dispatch(actions.ui.openPanel());
        }

        if (this.props.isShowing !== isShowing) {
            store.dispatch({ type: SET_IS_SHOWING, isShowing });
        }
        client.setVisibility({ isShowing, isVisible });
    }

    render() {
        return (
            <Provider store={store}>
                <Layout
                    {...{
                        client,
                        data: globalData,
                        global: globalData,
                        isShowing: this.props.isShowing,
                        locale: this.props.locale,
                    }}
                />
            </Provider>
        );
    }
}

export default Notifications;
