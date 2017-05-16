import { combineReducers } from 'redux';

import { NOTES_LOADED, NOTES_LOADING, SELECT_NOTE, SET_IS_SHOWING, SET_FILTER } from '../action-types';

export const isLoading = (state = true, { type }) => {
    if (NOTES_LOADING === type) {
        return true;
    }

    if (NOTES_LOADED === type) {
        return false;
    }

    return state;
};

export const isPanelOpen = (state = false, { type, isShowing }) =>
    (SET_IS_SHOWING === type ? isShowing : state);

export const selectedNoteId = (state = null, { type, noteId }) =>
    (SELECT_NOTE === type ? noteId : state);

export const filterName = (state = {}, { type, filterName }) => {
    return SET_FILTER === type ? filterName : state;
};

export default combineReducers({
    isLoading,
    isPanelOpen,
    selectedNoteId,
    filterName,
});
