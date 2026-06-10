// Инжекция CSS стилей для Black Twitch
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

/* Ensure the Twitch logo container and link can expand to fit both elements side-by-side */
div:has(> a[data-a-target="logo-button"]),
a[data-a-target="logo-button"] {
    width: auto !important;
    min-width: max-content !important;
    flex-basis: auto !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
    display: inline-flex !important;
    align-items: center !important;
}

/* Style the custom Twitch wordmark logo */
#black-twitch-wordmark {
    height: 28px !important;
    margin-left: 8px !important;
    flex-shrink: 0 !important;
    display: inline-block !important;
}
    `;
    
    function injectCSS() {
        if (!document.getElementById('black-twitch-theme')) {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'black-twitch-theme';
            style.textContent = css;
            if (document.head) {
                document.head.appendChild(style);
            } else if (document.documentElement) {
                document.documentElement.appendChild(style);
            }
        }
        insertPurpleLogo();
    }
    
    function insertPurpleLogo() {
        if (document.getElementById('black-twitch-wordmark')) {
            return;
        }
        const logoLink = document.querySelector('a[data-a-target="logo-button"]') || document.querySelector('a[href="/"]');
        if (!logoLink) {
            return;
        }
        
        // Force parent wrapper to auto-expand to accommodate both logos without squishing
        if (logoLink.parentElement) {
            logoLink.parentElement.style.setProperty('width', 'auto', 'important');
            logoLink.parentElement.style.setProperty('min-width', 'max-content', 'important');
            logoLink.parentElement.style.setProperty('flex-basis', 'auto', 'important');
            logoLink.parentElement.style.setProperty('flex-grow', '0', 'important');
            logoLink.parentElement.style.setProperty('flex-shrink', '0', 'important');
            logoLink.parentElement.style.setProperty('display', 'inline-flex', 'important');
            logoLink.parentElement.style.setProperty('align-items', 'center', 'important');
        }
        logoLink.style.setProperty('width', 'auto', 'important');
        logoLink.style.setProperty('min-width', 'max-content', 'important');
        logoLink.style.setProperty('display', 'inline-flex', 'important');
        logoLink.style.setProperty('align-items', 'center', 'important');

        const img = document.createElement('img');
        img.id = 'black-twitch-wordmark';
        img.src = 'data:image/png;base64,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';
        img.style.setProperty('height', '28px', 'important');
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('margin-left', '8px', 'important');
        img.style.setProperty('flex-shrink', '0', 'important');
        logoLink.appendChild(img);
    }
    
    // Инжектируем стили сразу, если возможно
    if (document.documentElement) {
        injectCSS();
    }
    
    // Также применяем при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCSS);
    } else {
        injectCSS();
    }
    
    // Применяем стили при изменении DOM (для SPA)
    if (document.documentElement) {
        const observer = new MutationObserver(function(mutations) {
            injectCSS();
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // Дополнительная проверка через интервал для надежности
    setInterval(injectCSS, 1000);
})();



