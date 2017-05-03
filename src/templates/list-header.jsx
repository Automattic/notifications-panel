import React from 'react';

export const ListHeader = ({ title = 'None' }) => (
    <li className="wpnc__time-group-wrap">
        <div className="wpnc__time-group-title">
            <span className="wpnc__noticon noticon-time" />{title}
        </div>
    </li>
);

export default ListHeader;
