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
    `;
    
    function injectCSS() {
        // Проверяем, не добавлены ли уже стили
        if (document.getElementById('black-twitch-theme')) {
            return;
        }
        
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'black-twitch-theme';
        style.textContent = css;
        
        // Пытаемся добавить в head, если доступен
        if (document.head) {
            document.head.appendChild(style);
        } else if (document.documentElement) {
            document.documentElement.appendChild(style);
        } else {
            // Если ничего не доступно, ждем и пробуем снова
            setTimeout(injectCSS, 10);
            return;
        }
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


