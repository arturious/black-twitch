// ==UserScript==
// @name         Black Twitch Theme
// @namespace    https://github.com/arturious/black-twitch
// @version      1.1.1
// @description  A black theme for Twitch
// @author       arturious
// @match        *://*.twitch.tv/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    const css = `
.tw-root--theme-dark body {
    background-color: #000 !important;
}

.simplebar-content {
    background-color: #000 !important;
    border-right: var(--border-width-default) solid var(--color-border-base) !important;
}

.tw-root--theme-dark, :root, .eHGqGn {
    --color-background-body: #000 !important;
    --color-background-base: #000 !important;
    --color-background-alt: #000 !important;
    --color-background-alt-2: #000 !important;
    --color-background-float: #000 !important;
}

.tw-root--theme-dark .chat-room {
    background: #000 !important;
}

body {
    background-color: #000 !important;
}

.fUZLqr, [class*="ScFace-"] {
    fill: #000000 !important;
}
    `;
    
    function injectCSS() {
        if (document.getElementById('black-twitch-theme')) {
            return;
        }
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'black-twitch-theme';
        style.textContent = css;
        
        if (document.head) {
            document.head.appendChild(style);
        } else if (document.documentElement) {
            document.documentElement.appendChild(style);
        } else {
            setTimeout(injectCSS, 10);
        }
    }
    
    if (document.documentElement) {
        injectCSS();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCSS);
    } else {
        injectCSS();
    }
    
    if (document.documentElement) {
        const observer = new MutationObserver(function() {
            injectCSS();
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    setInterval(injectCSS, 1000);
})();
