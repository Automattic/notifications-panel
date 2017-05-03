import React, { PropTypes, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { noop } from 'lodash';

import { store } from './state';
import { init as initPublicAPI } from './state/action-middleware/public-api';
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

export class Notifications extends PureComponent {
    static propTypes = {
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
            isShowing,
            isVisible,
            onRender,
            onTogglePanel,
            receiveMessage,
            wpcom,
        } = this.props;

        initAPI(wpcom);
        initPublicAPI({ onTogglePanel });

        client = new RestClient({ onRender });
        client.global = globalData;
        client.sendMessage = receiveMessage;

        /**
         * @TODO: Pass this information directly into the Redux initial state
         */
        if (isShowing) {
            store.dispatch(isShowing ? actions.ui.openPanel() : actions.ui.closePanel());
        }

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
