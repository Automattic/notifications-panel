import ReactDOM from 'react-dom';
import React from 'react';

import Notifications from '../src/Notifications';
import AuthWrapper from './auth-wrapper';

require('../src/boot/stylesheets/style.scss');

const localePattern = /[&?]locale=([\w_-]+)/;
const match = localePattern.exec(document.location.search);
const locale = match ? match[1] : 'en';
let isVisible = true;

const updateVisibility = ({ action, hidden }) => {
    if ('toggleVisibility' !== action) {
        return;
    }

    isVisible = !hidden;

    render();
};

window.addEventListener('message', updateVisibility);

const render = () => {
    ReactDOM.render(
        React.createElement(AuthWrapper(Notifications), {
            clientId: 52716,
            isVisible,
            locale,
            redirectPath: '/',
        }),
        document.getElementsByClassName('wpnc__main')[0]
    );
};

render();
