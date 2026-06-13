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

(function () {
  "use strict";

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

/* Ensure all logo container wrappers can expand to fit the logo + wordmark side-by-side */
body.tw-root--theme-dark nav.top-nav a[data-a-target="logo-button"],
body.tw-root--theme-dark nav.top-nav div:has(> a[data-a-target="logo-button"]),
body.tw-root--theme-dark nav.top-nav div:has(> div > a[data-a-target="logo-button"]),
body.tw-root--theme-dark nav.top-nav div:has(> div > div > a[data-a-target="logo-button"]) {
  width: auto !important;
  min-width: max-content !important;
  flex-basis: auto !important;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;
}

/* Enforce flexbox layout on the logo button and its immediate wrapper to align items vertically */
body.tw-root--theme-dark nav.top-nav a[data-a-target="logo-button"],
body.tw-root--theme-dark nav.top-nav div:has(> a[data-a-target="logo-button"]) {
  display: inline-flex !important;
  align-items: center !important;
}

/* Style the custom Twitch wordmark logo */
#black-twitch-wordmark {
  height: 25px !important;
  width: auto !important;
  margin-left: 4px !important;
  margin-right: 20px !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

/* Ensure the Following and Browse icons are always displayed */
nav.top-nav a[href="/directory/following"] > div > div:has(svg),
nav.top-nav a[href="/directory"] > div > div:has(svg) {
    display: flex !important;
}

/* Ensure the Following and Browse text labels are always hidden */
nav.top-nav a[href="/directory/following"] > div > div:not(:has(svg)),
nav.top-nav a[href="/directory"] > div > div:not(:has(svg)) {
    display: none !important;
}

div.Layout-sc-1xcs6mc-0.fRzsnK {
    padding: 0px 0px !important;
}

div.Layout-sc-1xcs6mc-0.bMcAyM {
    margin-left: auto !important;
    margin-right: auto !important;
}

div.Layout-sc-1xcs6mc-0.hCMJIV {
    position: fixed !important;
    left: 0px !important;
    top: 0px !important;
    width: 100% !important;
    height: 5rem !important;
    z-index: 99999 !important;
}
    `;

  function injectCSS() {
    if (!document.getElementById("black-twitch-theme")) {
      const style = document.createElement("style");
      style.type = "text/css";
      style.id = "black-twitch-theme";
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
    if (document.getElementById("black-twitch-wordmark")) {
      return;
    }
    const logoLink =
      document.querySelector('a[data-a-target="logo-button"]') ||
      document.querySelector('a[href="/"]');
    if (!logoLink) {
      return;
    }

    // Force parent and grandparent wrappers to auto-expand to accommodate both logos without squishing
    let current = logoLink;
    for (let i = 0; i < 3; i++) {
      if (current.parentElement) {
        current = current.parentElement;
        current.style.setProperty("width", "auto", "important");
        current.style.setProperty("min-width", "max-content", "important");
        current.style.setProperty("flex-basis", "auto", "important");
        current.style.setProperty("flex-grow", "0", "important");
        current.style.setProperty("flex-shrink", "0", "important");
      }
    }
    logoLink.style.setProperty("width", "auto", "important");
    logoLink.style.setProperty("min-width", "max-content", "important");
    logoLink.style.setProperty("display", "inline-flex", "important");
    logoLink.style.setProperty("align-items", "center", "important");
    if (logoLink.parentElement) {
      logoLink.parentElement.style.setProperty(
        "display",
        "inline-flex",
        "important",
      );
      logoLink.parentElement.style.setProperty(
        "align-items",
        "center",
        "important",
      );
    }

    const img = document.createElement("img");
    img.id = "black-twitch-wordmark";
    img.src =
      "data:image/png;base64,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";
    img.style.setProperty("height", "25px", "important");
    img.style.setProperty("margin-left", "4px", "important");
    img.style.setProperty("margin-right", "20px", "important");
    img.style.setProperty("width", "auto", "important");

    img.style.setProperty("flex-shrink", "0", "important");
    logoLink.appendChild(img);
  }

  if (document.documentElement) {
    injectCSS();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectCSS);
  } else {
    injectCSS();
  }

  if (document.documentElement) {
    const observer = new MutationObserver(function () {
      injectCSS();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  setInterval(injectCSS, 1000);
})();
