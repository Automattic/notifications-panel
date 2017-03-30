import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import { store } from './state';

import RestClient from './rest-client';
import { receiveMessage, sendMessage } from './boot/messaging';
import { setGlobalData } from './flux/app-actions';
import repliesCache from './comment-replies-cache';

import { init as initAPI } from './rest-client/wpcom';

import Layout from './templates';

let client;

const globalData = {};

setGlobalData(globalData);

repliesCache.cleanup();

export class Notifications extends PureComponent {
    componentWillMount() {
        initAPI(this.props.wpcom);

        client = new RestClient();
        client.global = globalData;
        client.sendMessage = sendMessage;
        client.receiveMessage = receiveMessage(client.handleIncomingMessage.bind(client));

        window.addEventListener('message', client.receiveMessage);

        // Send iFrameReady message as soon as we're loaded
        // (innocuous if we're not actually in an iframe)
        client.sendMessage({ action: 'iFrameReady' });
    }

    componentWillReceiveProps({ isVisible, wpcom }) {
        initAPI(wpcom);

        client.setVisibility(isVisible);
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
