// ==UserScript==
// @name         允许复制 - SDUOJ
// @namespace    https://github.com/Choimoe/SDUOJAllowCopy
// @version      1.0.0
// @description  允许在oj.qd.sdu.edu.cn复制题目内容
// @author       Choimoe
// @match        https://oj.qd.sdu.edu.cn/*
// @run-at       document-end
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    function enableCopy() {
        const style = document.createElement('style');
        style.id = 'sduoj-copy-enabler';
        style.textContent = `
            * {
                user-select: auto !important;
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
            }
            ::selection {
                background-color: rgba(0, 123, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    function handleDynamicContent() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE &&
                            (node.style?.userSelect === 'none' ||
                             node.style?.webkitUserSelect === 'none')) {
                            node.style.userSelect = 'auto';
                            node.style.webkitUserSelect = 'auto';
                        }
                    });
                }
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
    function init() {
        enableCopy();
        handleDynamicContent();
        document.addEventListener('copy', () => {
        }, { once: false });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
