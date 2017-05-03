/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from './gridicons';

export const ListHeader = ({ title = 'None' }) => (
    <li className="wpnc__time-group-wrap">
        <div className="wpnc__time-group-title">
            <Gridicon icon="time" size={18} />{title}
        </div>
    </li>
);

export default ListHeader;
