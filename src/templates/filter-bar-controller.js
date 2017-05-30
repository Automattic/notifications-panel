import { connect } from 'react-redux';

import Filters from './filters';
import { store } from '../state';
import actions from '../state/actions';
import { bumpStat } from '../rest-client/bump-stat';

var debug = require('debug')('notifications:filterbarcontroller');

function FilterBarController(refreshFunction) {
    if (!(this instanceof FilterBarController)) {
        return new FilterBarController(refreshFunction);
    }

    this.selected = Filters.all();
    store.dispatch(actions.ui.setFilter(Filters.all().name));
    this.refreshFunction = refreshFunction;
}

FilterBarController.prototype.selectFilter = function(filterName) {
    if (Object.keys(Filters).indexOf(filterName) === -1) {
        return;
    }

    this.selected = Filters[filterName]();
    store.dispatch(actions.ui.setFilter(filterName));
    store.dispatch(actions.notes.resetNoteReads());

    if (this.refreshFunction) {
        this.refreshFunction();
    }

    store.dispatch(actions.ui.unselectNote());

    bumpStat('notes-filter-select', filterName);
};

FilterBarController.prototype.getFilteredNotes = function(notes) {
    if (!notes) {
        return [];
    }

    const noteReads = store.getState().notes.noteReads;
    const filterFunction = (note) => {
        // Prevent notes in the unread filter from disappearing when marked as read.
        if (this.selected && this.selected.name === 'unread'
            && note.id in noteReads && noteReads[note.id] === 'unread') {
            return true;
        }

        if (this.selected && this.selected.filter) {
            return this.selected.filter(note);
        }

        return true;
    };

    return notes.filter(filterFunction);
};

export default FilterBarController;
