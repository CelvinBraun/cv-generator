// Loads a list of scripts one at a time, in order, then calls `done`.
// Used so cv.html/letter.html can pick data/base.<lang>.js at runtime
// based on APP_CONFIG.lang, instead of hardcoding a language per file.

function loadScriptsInOrder(urls, done) {
  let i = 0;
  function next() {
    if (i >= urls.length) {
      done();
      return;
    }
    const script = document.createElement("script");
    script.src = urls[i++];
    script.onload = next;
    script.onerror = function () {
      console.error("Failed to load script:", script.src);
    };
    document.head.appendChild(script);
  }
  next();
}
