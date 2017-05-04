import { combineReducers } from 'redux';

import {
    CLOSE_PANEL,
    NOTES_LOADED,
    NOTES_LOADING,
    SELECT_NOTE,
    SET_IS_SHOWING,
} from '../action-types';

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

export const selectedNoteId = (state = null, { type, noteId }) => {
    if (SELECT_NOTE === type) {
        return noteId;
    }

    if (CLOSE_PANEL === type) {
        return null;
    }

    return state;
};

export default combineReducers({
    isLoading,
    isPanelOpen,
    selectedNoteId,
});
