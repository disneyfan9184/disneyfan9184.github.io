// Check to see if service worker is supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', event => {
    navigator.serviceWorker
      // .register('../sw.js')
      .register('../sw_cache_all.js')
      .then(reg => console.log('service worker registered!', reg))
      .catch(error => console.log(`service worker error: ${error}`));
  });
}
