import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import actionMiddleware from './action-middleware';
import notes from './notes/reducer';
import suggestions from './suggestions/reducer';
import ui from './ui/reducer';

const reducer = combineReducers({
    notes,
    suggestions,
    ui,
});

/** @see https://github.com/zalmoxisus/redux-devtools-extension */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    reducer(undefined, { type: '@@INIT' }),
    composeEnhancers(applyMiddleware(actionMiddleware))
);
