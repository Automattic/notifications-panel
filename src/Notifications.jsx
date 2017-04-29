import React, { PropTypes, PureComponent } from 'react';
import { Provider } from 'react-redux';

import { store } from './state';
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
        isVisible: PropTypes.bool,
        locale: PropTypes.string,
        wpcom: PropTypes.object.isRequired,
    };

    static defaultProps = {
        isVisible: false,
        locale: 'en',
        receiveMessage: () => {},
    };

    componentWillMount() {
        const {
            isShowing,
            isVisible,
            receiveMessage,
            wpcom,
        } = this.props;

        initAPI(wpcom);

        client = new RestClient();
        client.global = globalData;
        client.sendMessage = receiveMessage;

        // Send iFrameReady message as soon as we're loaded
        // (innocuous if we're not actually in an iframe)
        client.sendMessage({ action: 'iFrameReady' });

        client.setVisibility({ isShowing, isVisible });
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
                        data: globalData,
                        global: globalData,
                        client,
                        locale: this.props.locale,
                    }}
                />
            </Provider>
        );
    }
}

export default Notifications;
