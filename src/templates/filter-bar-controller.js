import Filters from './filters';
import { store } from '../state';
import actions from '../state/actions';
import getFilterName from '../state/selectors/get-filter-name';
import { bumpStat } from '../rest-client/bump-stat';

var debug = require('debug')('notifications:filterbarcontroller');

function FilterBarController(refreshFunction) {
    if (!(this instanceof FilterBarController)) {
        return new FilterBarController(refreshFunction);
    }

    this.refreshFunction = refreshFunction;
}

FilterBarController.prototype.selectFilter = function(filterName) {
    if (Object.keys(Filters).indexOf(filterName) === -1) {
        return;
    }

    store.dispatch(actions.ui.setFilter(filterName));

    if (this.refreshFunction) {
        this.refreshFunction();
    }

    store.dispatch(actions.ui.unselectNote());

    bumpStat('notes-filter-select', filterName);
};

FilterBarController.prototype.getFilteredNotes = function(notes) {
    const activeTab = Filters[getFilterName(store.getState())];
    if (!notes || !activeTab) {
        return [];
    }

    return notes.filter(activeTab().filter);
};

export default FilterBarController;
