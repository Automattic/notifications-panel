import ReactDOM from 'react-dom';
import React from 'react';

import Notifications, { refreshNotes } from '../src/Notifications';
import AuthWrapper from './auth-wrapper';
import { receiveMessage, sendMessage as SM } from './messaging';

const sendMessage = m => console.log(m) || SM(m);

require('../src/boot/stylesheets/style.scss');

const localePattern = /[&?]locale=([\w_-]+)/;
const match = localePattern.exec(document.location.search);
const locale = match ? match[1] : 'en';
let isShowing = true;
let isVisible = document.visibilityState === 'visible';

const onReady = () => sendMessage({ action: 'iFrameReady' });

const onRender = ({ latestType, unseen }) =>
    unseen > 0
        ? sendMessage({
              action: 'render',
              num_new: unseen,
              latest_type: latestType,
          })
        : sendMessage({ action: 'renderAllSeen' });

const onTogglePanel = args => {
    console.log(args);
};

const render = () => {
    ReactDOM.render(
        React.createElement(AuthWrapper(Notifications), {
            clientId: 52716,
            isShowing,
            isVisible,
            locale,
            onReady,
            onRender,
            onTogglePanel,
            receiveMessage: sendMessage,
            redirectPath: '/',
        }),
        document.getElementsByClassName('wpnc__main')[0]
    );
};

const init = () => {
    document.addEventListener('visibilitychange', render);

    window.addEventListener(
        'message',
        receiveMessage(({ action, hidden, showing }) => {
            if ('togglePanel' === action) {
                isShowing = showing;
                render();
            }

            if ('toggleVisibility' === action) {
                isVisible = !hidden;
                render();
            }
        })
    );

    window.addEventListener(
        'message',
        receiveMessage(({ action }) => {
            if ('refreshNotes' === action) {
                refreshNotes();
            }
        })
    );

    render();
};

init();
