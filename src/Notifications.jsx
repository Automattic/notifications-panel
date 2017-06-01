import React, { PropTypes, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { noop } from 'lodash';

import { init as initStore, store } from './state';
import { mergeHandlers } from './state/action-middleware/utils';
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
        customEnhancer: PropTypes.func,
        customMiddleware: PropTypes.object,
        isShowing: PropTypes.bool,
        isVisible: PropTypes.bool,
        locale: PropTypes.string,
        receiveMessage: PropTypes.func,
        wpcom: PropTypes.object.isRequired,
    };

    static defaultProps = {
        customEnhancer: a => a,
        customMiddleware: {},
        isShowing: false,
        isVisible: false,
        locale: 'en',
        receiveMessage: noop,
    };

    componentWillMount() {
        const {
            customEnhancer,
            customMiddleware,
            isShowing,
            isVisible,
            receiveMessage,
            wpcom,
        } = this.props;

        initStore({
            customEnhancer,
            customMiddleware: mergeHandlers(customMiddleware, {
                APP_REFRESH_NOTES: [() => client && client.refreshNotes.call(client)],
            }),
        });

        initAPI(wpcom);

        client = new RestClient();
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
        store.dispatch({ type: 'APP_IS_READY' });
    }

    componentWillReceiveProps({ isShowing, isVisible, wpcom }) {
        initAPI(wpcom);

        if (this.props.isShowing && !isShowing) {
            store.dispatch(actions.ui.closePanel());
            // unselect the note so keyhandlers don't steal keystrokes
            reset();
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
