import React from 'react';

import { html as toHtml } from '../indices-to-html';

export function internalP(html) {
    return html.split('\n\n').map(function(chunk) {
        var somewhatRandomKey = 'block-text-' +
            chunk.length +
            '-' +
            Date.now() +
            '-' +
            Math.random() * 10000;

        return (
            <div
                key={somewhatRandomKey}
                dangerouslySetInnerHTML={{
                    __html: chunk.replace(/\n/g, '<br/>'),
                }}
            />
        );
    });
}

export function p(html, className) {
    if (undefined === className) {
        className = 'wpnc__paragraph';
    }
    return html.split('\n\n').map(function(chunk) {
        var somewhatRandomKey = 'block-text-' +
            chunk.length +
            '-' +
            Date.now() +
            '-' +
            Math.random() * 10000;
        return (
            <div
                className={className}
                key={somewhatRandomKey}
                dangerouslySetInnerHTML={{
                    __html: chunk.replace(/\n/g, '<br/>'),
                }}
            />
        );
    });
}

export const pSoup = function(items) {
    return items
        .map(function(item) {
            return toHtml(item);
        })
        .map(internalP);
};

export function getSignature(blocks, note) {
    if (!blocks || !blocks.length) {
        return [];
    }

    return blocks.map(function(block) {
        var type = 'text';
        var id = null;

        if ('undefined' !== typeof block.type) {
            type = block.type;
        }

        if (note && note.meta && note.meta.ids && note.meta.ids.reply_comment) {
            if (
                block.ranges &&
                block.ranges.length > 1 &&
                block.ranges[1].id == note.meta.ids.reply_comment
            ) {
                type = 'reply';
                id = block.ranges[1].id;
            }
        }

        if (
            'undefined' === typeof block.meta ||
            'undefined' === typeof block.meta.ids ||
            Object.keys(block.meta.ids).length < 1
        ) {
            return { type: type, id: id };
        }

        if ('undefined' !== typeof block.meta.ids.comment) {
            type = 'comment';
            id = block.meta.ids.comment;
        } else if ('undefined' !== typeof block.meta.ids.post) {
            type = 'post';
            id = block.meta.ids.post;
        } else if ('undefined' !== typeof block.meta.ids.user) {
            type = 'user';
            id = block.meta.ids.user;
        }

        return { type: type, id: id };
    });
}

export function formatString() {
    var args = [].slice.apply(arguments);
    var str = args.shift();

    return str.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

export function zipWithSignature(blocks, note) {
    var signature = getSignature(blocks, note);

    return blocks.map(function(block, i) {
        return {
            block: block,
            signature: signature[i],
        };
    });
}

export const validURL = /^(?:http(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|blog|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i;
