import React from 'react';

import Filters from './filters';

var debug = require('debug')('notifications:filterbar');
var classnames = require('classnames');

export const FilterBar = React.createClass({
    selectFilter(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        const filterName = event.target.dataset.filterName;
        this.props.controller.selectFilter(filterName);
    },

    render: function() {
        var filterItems = [];

        if (this.props.current) {
            return null;
        }

        for (var filterName in Filters) {
            if (!Filters.hasOwnProperty(filterName)) {
                continue;
            }
            filterItems.push(Filters[filterName]());
        }

        filterItems.sort(function(a, b) {
            return a.index - b.index;
        });

        filterItems = filterItems.map(function(filter) {
            const classes = classnames('wpnc__filter__segmented-control-item', {
                selected: filter.name === this.props.controller.selected.name,
            });

            return (
                <li
                    key={filter.name}
                    data-filter-name={filter.name}
                    className={classes}
                    onClick={this.selectFilter}
                >
                    {filter.label}
                </li>
            );
        }, this);

        return (
            <div className="wpnc__filter">
                <ul className="wpnc__filter__segmented-control">
                    {filterItems}
                </ul>
            </div>
        );
    },
});

export default FilterBar;
