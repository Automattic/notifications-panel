import getNotes from './get-notes';

export const getFilteredNoteReads = noteState => noteState.filteredNoteReads;

export default (state) => getFilteredNoteReads(getNotes(state));
