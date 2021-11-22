
const REDIRECT_MAP_KEY = 'redirectMap';

var storageMock: any = {};
storageMock[REDIRECT_MAP_KEY] = {
  adam: 'dev.url.com/tabs',
  youtube: 'https://youtube.com/',
}

export function read(key: string) {
  var query = function(resolve: any, reject: any) {
    try {
      chrome.storage.local.get(key, function(items) {
        resolve(items[key]);
      });
    } catch (e: any) { // TODO catch normal exceptions
      resolve(storageMock[key]);
    }
  }
  return new Promise(query);
}

export async function write(key: string, value: any) {
  try {
    chrome.storage.local.set({[key]: value});
    // TODO refresh intercept listener. Possible solutions:
    /* 1) via Chrome API (https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension)
     * 2) add addListener() function to this file
     *   - not sure if this will work since background script runs separately
     *     from the rest of the extension
     */
  } catch (e) { // TODO catch normal exceptions
    storageMock[key] = value;
  }
}

export async function updateRedirectMap(map: Map<any, any>) {
  // TODO add cache
  write(REDIRECT_MAP_KEY, map);
}

// TODO sort before returning
export async function getRedirectMap() {
  // TODO add cache
  var map = await read(REDIRECT_MAP_KEY);
  if (map == null) {
    return {};
  }
  return map;
}

// Put abbreviatedUrl -> redirectUrl in the redirects map
export async function putAbbreviatedUrl(abbrUrl: string, redirectUrl: string) {
  var map: any = await getRedirectMap();
  map[abbrUrl] = redirectUrl;
  await updateRedirectMap(map);
  // refreshInterceptListener(); // TODO
}

// Remove abbreviatedUrl from redirects
export async function removeAbbreviatedUrl(abbrUrl: string) {
  var map: any = await getRedirectMap();
  delete map[abbrUrl];
  await updateRedirectMap(map);
  // refreshInterceptListener(); // TODO
}

/* DEBUGGING FUNCTIONS */

function printMap(map: any) {
  for (var key in map) {
    console.log(key + ': ' + map[key]);
  }
}
