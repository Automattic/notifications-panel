import Filters from './filters';

import { bumpStat } from '../rest-client/bump-stat';

var debug = require('debug')('notifications:filterbarcontroller');

function FilterBarController(refreshFunction) {
    if (!(this instanceof FilterBarController)) {
        return new FilterBarController(refreshFunction);
    }

    this.selected = Filters.all();
    this.refreshFunction = refreshFunction;
}

FilterBarController.prototype.selectFilter = function(filterName) {
    if (Object.keys(Filters).indexOf(filterName) === -1) {
        return;
    }

    this.selected = Filters[filterName]();

    if (this.refreshFunction) {
        this.refreshFunction();
    }

    bumpStat('notes-filter-select', filterName);
};

FilterBarController.prototype.getFilteredNotes = function(notes) {
    if (!notes) {
        return [];
    }

    const filterFunction = (this.selected && this.selected.filter) || (a => a);
    return notes.filter(filterFunction);
};

export default FilterBarController;
