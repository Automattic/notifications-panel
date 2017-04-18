/**
 * Provides functions to communicate with parent frame
 *
 * @module boot/messaging
 */

/**
 * Sends outgoing messages to parent frame
 *
 * @param {Object} message data to send
 * @returns {undefined}
 */
export const sendMessage = message => {
    if (!window || !window.parent) {
        return;
    }

    window.parent.postMessage(
        JSON.stringify({
            ...message,
            type: 'notesIframeMessage',
        }),
        '*'
    );
};
