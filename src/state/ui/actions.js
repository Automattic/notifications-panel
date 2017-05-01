import {
    CLOSE_PANEL,
    NOTES_LOADED,
    NOTES_LOADING,
    OPEN_PANEL,
    SELECT_NOTE,
    UNDO_ACTION,
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

export const undoAction = noteId => ({
    type: UNDO_ACTION,
    noteId,
});

export const unselectNote = () => selectNote(null);

export default {
    closePanel,
    loadNotes,
    loadedNotes,
    openPanel,
    selectNote,
    undoAction,
    unselectNote,
};
