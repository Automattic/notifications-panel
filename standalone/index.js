import ReactDOM from 'react-dom';
import React from 'react';

import Notifications from '../src/Notifications';
import AuthWrapper from './auth-wrapper';
import { receiveMessage } from '../src/boot/messaging';

require('../src/boot/stylesheets/style.scss');

const localePattern = /[&?]locale=([\w_-]+)/;
const match = localePattern.exec(document.location.search);
const locale = match ? match[1] : 'en';
let isShowing = true;

const render = () => {
    const isVisible = document && document.visibilityState === 'visible';

    ReactDOM.render(
        React.createElement(AuthWrapper(Notifications), {
            clientId: 52716,
            isShowing,
            isVisible,
            locale,
            redirectPath: '/',
        }),
        document.getElementsByClassName('wpnc__main')[0]
    );
};

const init = () => {
    document && document.addEventListener('visibilitychange', render);

    window &&
        window.addEventListener(
            'message',
            receiveMessage(({ action }) => {
                if ('togglePanel' === action) {
                    isShowing = !isShowing;
                    render();
                }
            })
        );

    render();
};

init();
