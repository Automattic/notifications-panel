import { combineReducers } from 'redux';

import { CLOSE_PANEL, OPEN_PANEL, SELECT_NOTE } from '../action-types';

export const isPanelOpen = (state = false, { type }) => {
    if (CLOSE_PANEL === type) {
        return false;
    }

    if (OPEN_PANEL === type) {
        return true;
    }

    return state;
};

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
    isPanelOpen,
    selectedNoteId,
});
