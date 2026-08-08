/** Session key — must stay in sync with the boot script in locale layout. */
export const SPLASH_STORAGE_KEY = "arkan_splash_seen";

export const SPLASH_PENDING_ATTR = "data-splash";
export const SPLASH_PENDING_VALUE = "pending";

/** Failsafe: never leave the page permanently covered if the React splash fails. */
export const SPLASH_FAILSAFE_MS = 2500;

/**
 * Sync boot script (inline in <body>).
 * Sets a pre-paint CSS cover, with a timeout failsafe.
 */
export const SPLASH_BOOT_SCRIPT = `(function(){var k=${JSON.stringify(SPLASH_STORAGE_KEY)};var a=${JSON.stringify(SPLASH_PENDING_ATTR)};var v=${JSON.stringify(SPLASH_PENDING_VALUE)};var ms=${SPLASH_FAILSAFE_MS};function clear(){try{document.documentElement.removeAttribute(a)}catch(e){}}try{if(sessionStorage.getItem(k)==="1")return;document.documentElement.setAttribute(a,v);setTimeout(function(){if(document.documentElement.getAttribute(a)===v)clear()},ms)}catch(e){document.documentElement.setAttribute(a,v);setTimeout(clear,ms)}})();`;
