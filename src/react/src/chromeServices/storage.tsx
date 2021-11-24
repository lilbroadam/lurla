import * as messages from "./messages";

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
  } catch (e) { // TODO catch normal exceptions
    storageMock[key] = value;
  }
}

export async function updateRedirectMap(map: Map<any, any>) {
  // TODO add cache
  await write(REDIRECT_MAP_KEY, map);
  messages.send({interceptor: "refresh"});
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
}

// Remove abbreviatedUrl from redirects
export async function removeAbbreviatedUrl(abbrUrl: string) {
  var map: any = await getRedirectMap();
  delete map[abbrUrl];
  await updateRedirectMap(map);
}

/* DEBUGGING FUNCTIONS */ // TODO move

function printMap(map: any) {
  for (var key in map) {
    console.log(key + ': ' + map[key]);
  }
}
