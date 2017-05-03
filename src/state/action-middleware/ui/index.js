import * as types from '../../action-types';
import actions from '../../actions';
import { get } from 'lodash';

import getAllNotes from '../../selectors/get-all-notes';
import getIsNoteHidden from '../../selectors/get-is-note-hidden';
import { onTogglePanel } from '../public-api';

import { findNextNoteId } from '../../../templates';

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

export const togglePanel = (store, { type }) => {
    const toggleState = get(
        {
            [types.CLOSE_PANEL]: 'closed',
            [types.OPEN_PANEL]: 'open',
        },
        type
    );

    onTogglePanel({ toggleState });
};

export default {
    [types.CLOSE_PANEL]: [togglePanel],
    [types.SPAM_NOTE]: [advanceToNextNote],
    [types.OPEN_PANEL]: [togglePanel],
    [types.TRASH_NOTE]: [advanceToNextNote],
};
