/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { spamNote } from '../flux/note-actions';
import ActionButton from './action-button';
import { keys } from '../helpers/input';

const SpamButton = React.createClass({
    displayName: 'TrashButton',

    propTypes: {
        note: React.PropTypes.object.isRequired,
    },

    render() {
        const props = {
            icon: 'spam',
            isActive: false,
            hotkey: keys.KEY_S,
            onToggle: () => spamNote(this.props.note),
            text: this.props.translate('Spam', { context: 'verb: Mark as Spam' }),
            title: this.props.translate('Mark comment as spam', {
                context: 'verb: imperative',
            }),
        };

        return <ActionButton {...props} />;
    },
});

export default localize(SpamButton);
