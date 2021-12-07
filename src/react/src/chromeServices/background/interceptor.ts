import * as messages from "../messages";
import * as storage from "../storage";
import * as abbrU from "./abbreviationUtils"; // TODO cleanup

var redirectMap: any = {};
var interceptUrls: string[] = [];
var beforeRequestCallback = (webRequest) => {
  let interceptPattern = new RegExp('.*ab\..*\.com.*');
  if (!interceptPattern.test(webRequest.url)) {
    return { redirectUrl: undefined };
  }

  var start = webRequest.url.indexOf('.') + 1;
  var end = webRequest.url.indexOf('.', start);
  var redir = webRequest.url.substring(start, end);
  var redirectUrl = redirectMap[redir];
  return { redirectUrl: redirectUrl }
}

// TODO move into it's own module
chrome.webRequest.onBeforeRequest.addListener(
  beforeRequestCallback,
  { urls: interceptUrls },
  ['blocking']
);

messages.addListener(
  function (request, sender, sendResponse) {
    if (request.interceptor === "refresh") { // TODO move to constant
      refreshInterceptor();
    }
  }
);

refreshInterceptor();

async function refreshInterceptor() {
  redirectMap = await storage.getRedirectMap();
  interceptUrls = [];
  for (var abbr in redirectMap) {
    interceptUrls.push(abbrU.domainNameToInterceptUrl(abbr));
  }
}
