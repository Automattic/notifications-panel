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

    bumpStat('notes-filter-select', filterName);
};

FilterBarController.prototype.getFilteredNotes = function(notes) {
    if (!notes) {
        return [];
    }

    const filterFunction = (this.selected && this.selected.filter) || (a => a);
    let filteredNotes = notes.filter(filterFunction);

    // Prevent notes in the unread filter from disappearing when marked as read.
    if (this.selected && this.selected.name === 'unread') {
        const noteReads = store.getState().notes.noteReads;

        const unreadsFilter = note => (note.id in noteReads && noteReads[note.id] === 'unread');
        filteredNotes = notes.filter(unreadsFilter)
            .concat(filteredNotes)
            .sort((note1, note2) => (new Date(note2.timestamp) - new Date(note1.timestamp))
        );
    }

    return filteredNotes;
};

export default FilterBarController;
