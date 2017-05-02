import { noop } from 'lodash';

export let onTogglePanel = noop;

export const init = props => {
    onTogglePanel = props.onTogglePanel ? props.onTogglePanel : noop;
};
