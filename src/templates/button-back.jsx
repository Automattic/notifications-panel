/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

import actions from '../state/actions';

const routeBack = (global, unselectNote) => event => {
    event.preventDefault();
    global.input.lastInputWasKeyboard = false;
    unselectNote();
};

export const BackButton = ({ global, isEnabled, translate, unselectNote }) => {
    const backText = translate('Back', {
        context: 'go back (like the back button in a browser)',
    });

    return isEnabled
        ? <a className="wpnc__back" onClick={routeBack(global, unselectNote)} href="#">
              {backText}
          </a>
        : <a className="wpnc__back disabled" disabled="disabled" href="#">
              {backText}
          </a>;
};

BackButton.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
    unselectNote: actions.ui.unselectNote,
};

export default connect(null, mapDispatchToProps)(localize(BackButton));
