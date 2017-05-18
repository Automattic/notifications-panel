/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from './gridicons';
import { store } from '../state';
import actions from '../state/actions';

class ListHeader extends React.Component {
    settingsClick = function() {
        store.dispatch(actions.ui.viewSettings());
    };

    render() {
        const { title, isFirst } = this.props;

        return (
            <li className="wpnc__time-group-wrap">
                <div className="wpnc__time-group-title">
                    <Gridicon icon="time" size={18} />{title}
                    { isFirst &&
                        <Gridicon icon="cog" size={18} onClick={this.settingsClick} />
                    }
                </div>
            </li>
        );
    };
}

export default ListHeader;
