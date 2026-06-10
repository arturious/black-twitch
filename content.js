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
    display: inline-flex !important;
    align-items: center !important;
}

/* Style the custom Twitch wordmark logo */
#black-twitch-wordmark {
    height: 20px !important;
    margin-left: 6px !important;
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
        const img = document.createElement('img');
        img.id = 'black-twitch-wordmark';
        img.src = 'data:image/png;base64,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';
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



