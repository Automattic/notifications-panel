import { CLOSE_PANEL, OPEN_PANEL, SELECT_NOTE, UNDO_ACTION } from '../action-types';

export const closePanel = () => ({
    type: CLOSE_PANEL,
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
    openPanel,
    selectNote,
    undoAction,
    unselectNote,
};
