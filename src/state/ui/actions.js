import {
    CLOSE_PANEL,
    NOTES_LOADED,
    NOTES_LOADING,
    OPEN_PANEL,
    SELECT_NOTE,
    SET_LAYOUT,
    UNDO_ACTION,
    SET_FILTER,
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

export const selectNote = (noteId, filterName) => ({
    type: SELECT_NOTE,
    noteId,
    filterName
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

export const setFilter = filterName => ({
    type: SET_FILTER,
    filterName,
});

export default {
    closePanel,
    loadNotes,
    loadedNotes,
    openPanel,
    selectNote,
    setLayout,
    undoAction,
    unselectNote,
    setFilter,
};
