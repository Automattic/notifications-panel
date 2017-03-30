/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { setApproveStatus } from '../flux/note-actions';
import ActionButton from './action-button';
import { keys } from '../helpers/input';
import { getReferenceId } from '../helpers/notes';

const ApproveButton = React.createClass({
    displayName: 'ApproveButton',

    propTypes: {
        isApproved: React.PropTypes.bool.isRequired,
        note: React.PropTypes.object.isRequired,
    },

    render() {
        const props = {
            icon: 'checkmark',
            isActive: this.props.isApproved,
            hotkey: keys.KEY_A,
            onToggle: () =>
                setApproveStatus(
                    this.props.note.id,
                    getReferenceId(this.props.note, 'site'),
                    getReferenceId(this.props.note, 'comment'),
                    !this.props.isApproved,
                    this.props.note.type
                ),
            text: this.props.isApproved
                ? this.props.translate('Approved', { context: 'verb: past-tense' })
                : this.props.translate('Approve', { context: 'verb: imperative' }),
            title: this.props.isApproved
                ? this.props.translate('Unapprove comment', {
                      context: 'verb: imperative',
                  })
                : this.props.translate('Approve comment', { context: 'verb: imperative' }),
        };

        return <ActionButton {...props} />;
    },
});

export default localize(ApproveButton);
