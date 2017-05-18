import {
    CLOSE_PANEL,
    NOTES_LOADED,
    NOTES_LOADING,
    OPEN_PANEL,
    SELECT_NOTE,
    SET_LAYOUT,
    UNDO_ACTION,
    VIEW_SETTINGS,
} from '../action-types';

export const closePanel = () => ({
    type: CLOSE_PANEL,
});

export const loadNotes = () => ({
    type: NOTES_LOADING,
});

export const loadedNotes = () => ({
    type: NOTES_LOADED,
});

export const openPanel = () => ({
    type: OPEN_PANEL,
});

export const selectNote = noteId => ({
    type: SELECT_NOTE,
    noteId,
});

export const setLayout = layout => ({
    type: SET_LAYOUT,
    layout,
});

export const undoAction = noteId => ({
    type: UNDO_ACTION,
    noteId,
});

export const unselectNote = () => selectNote(null);

export const viewSettings = () => {
    // TODO: VIEW_SETTINGS action type to be used here for Calypso integration
    window.open('https://wordpress.com/me/notifications');
};

export default {
    closePanel,
    loadNotes,
    loadedNotes,
    openPanel,
    selectNote,
    setLayout,
    undoAction,
    unselectNote,
    viewSettings
};
