// Shared by the server layout (inline <head> script) and the client toggle.
export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before the page paints: saved choice first, then the system setting.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;
