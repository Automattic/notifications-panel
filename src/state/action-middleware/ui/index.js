import * as types from '../../action-types';
import actions from '../../actions';

import getAllNotes from '../../selectors/get-all-notes';
import getIsNoteHidden from '../../selectors/get-is-note-hidden';

import { findNextNoteId } from '../../../templates';

export const scrollToTop = () => window.scrollTo(0, 0);

export const advanceToNextNote = ({ dispatch, getState }, { noteId }) => {
    const state = getState();

    // move to next note in the sequence…
    const nextNoteId = findNextNoteId(
        noteId,
        getAllNotes(state).filter(({ id }) => !getIsNoteHidden(state, id))
    );

    // if the window is wide enough and we have a next node
    // then go ahead and open it
    // otherwise go back to the list
    if (nextNoteId && window.innerWidth >= 800) {
        dispatch(actions.ui.selectNote(nextNoteId));
    } else {
        dispatch(actions.ui.unselectNote());
    }
};

export default {
    [types.CLOSE_PANEL]: [scrollToTop],
    [types.SPAM_NOTE]: [advanceToNextNote],
    [types.TRASH_NOTE]: [advanceToNextNote],
};
