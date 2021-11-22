import * as storage from "../../chromeServices/storage";
import * as abbrU from "./abbreviationUtils";

refreshInterceptListener();

// export function refresh() {
//   refreshInterceptListener();
// }

async function refreshInterceptListener() {
  var redirectMap: any = await storage.getRedirectMap();
  var interceptUrls: string[] = [];
  for (var abbr in redirectMap) {
    interceptUrls.push(abbrU.domainNameToInterceptUrl(abbr));
  }

  chrome.webRequest.onBeforeRequest.addListener(
    function (webRequest) {
      var start = webRequest.url.indexOf('.') + 1;
      var end = webRequest.url.indexOf('.', start);
      var redir = webRequest.url.substring(start, end);
      var redirectUrl = redirectMap[redir];
      return { redirectUrl: redirectUrl }
    },
    { urls: interceptUrls },
    ['blocking']
  );
}
