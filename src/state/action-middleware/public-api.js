/**
 * By injecting global public API handlers here
 * with a little statefulness we can eliminate
 * some nasty prop-passing through the Redux store
 * initialization. It would be ideal to revisit
 * and eliminate it with a better overall system
 *
 * @module state/action-middleware/public-api
 */

import { noop } from 'lodash';

export let onLayoutChange = noop;
export let onTogglePanel = noop;

export const init = props => {
    onLayoutChange = props.onLayoutChange ? props.onLayoutChange : noop;
    onTogglePanel = props.onTogglePanel ? props.onTogglePanel : noop;
};
