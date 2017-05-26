import { store } from '../state';

const openLink = href => ({ type: 'OPEN_LINK', href });
const openPost = (siteId, postId, href) => ({ type: 'OPEN_POST', siteId, postId, href });

export const interceptLinks = event => {
    const { target } = event;

    if ('A' !== target.tagName && 'A' !== target.parentNode.tagName) {
        return true;
    }

    const node = 'A' === target.tagName ? target : target.parentNode;
    const { dataset = {}, href } = node;
    const { linkType, postId, siteId } = dataset;

    if (!linkType) {
        return true;
    }

    event.stopPropagation();
    event.preventDefault();

    if ('post' === linkType) {
        store.dispatch(openPost(siteId, postId, href));
    } else {
        store.dispatch(openLink(href));
    }

    return false;
};

export default interceptLinks;
