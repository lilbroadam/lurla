/**
 * interceptor.js depends on abbreviationUtils.js and storageManager.js
 */


refreshInterceptListener();

function refreshInterceptListener() {
  var interceptUrls = getInterceptUrls(getRedirectMap());
  chrome.webRequest.onBeforeRequest.addListener(
    function (webRequest) {
      var interceptUrl = realUrlToInterceptUrl(webRequest.url);
      var redirectUrl = getRedirectMap()[interceptUrl];
      return { redirectUrl: redirectUrl }
    },
    { urls: interceptUrls },
    ['blocking']
  );
}
