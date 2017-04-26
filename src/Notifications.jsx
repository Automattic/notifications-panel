import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import { store } from './state';
import actions from './state/actions';

import RestClient from './rest-client';
import { sendMessage } from './boot/messaging';
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
    }

    componentWillReceiveProps({ isOpen, wpcom }) {
        initAPI(wpcom);

        if ( isOpen && ! this.props.isOpen ) {
            store.dispatch( actions.ui.openPanel() );
            client.updateLastSeenTime(0);
            client.main();
            client.refreshNotes();
        } else if ( ! isOpen && this.props.isOpen ) {
            store.dispatch( actions.ui.closePanel() );
        }
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
