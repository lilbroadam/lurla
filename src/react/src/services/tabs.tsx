/**
 * Return the current tab's url
 */
export function currentTabUrl() {
  var query = function(resolve: any, reject: any) {
    try {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        resolve(tabs[0].url);
      });
    } catch (e) {
      resolve("https://dev.url.com/tabs/");
    }
  };
  return new Promise(query);
}
