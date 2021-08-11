/**
 * storageManager.js depends on interceptor.js
 */

const REDIRECT_MAP_KEY = 'redirectMap';

var redirectMapCache;
readFromStorage(REDIRECT_MAP_KEY).then(function(response) {
  redirectMapCache = response;
});

async function readFromStorage(key) {
  var promise = new Promise(function(resolve, reject) {
    chrome.storage.local.get(key, function(items){
      resolve(items[key]);
    })
  });
  return promise;
}

async function writeToStorage(key, value) {
  chrome.storage.local.set({[key]: value});
}

async function updateRedirectMap(map) {
  writeToStorage(REDIRECT_MAP_KEY, map);
  redirectMapCache = map;
}

// Return a map of abbreviated urls -> redirect urls
function getRedirectMap() {
  var output = redirectMapCache;
  if (output == null) {
    return {};
  } else {
    return output;
  }
}

// Put abbreviatedUrl -> redirectUrl in the redirects map
async function putAbbreviatedUrl(abbreviatedUrl, redirectUrl) {
  var map = getRedirectMap();
  map[domainNameToInterceptUrl(abbreviatedUrl)] = redirectUrl;
  await updateRedirectMap(map);
  refreshInterceptListener();
}

// Remove abbreviatedUrl from redirects
async function removeAbbreviatedUrl(abbreviatedUrl) {
  var map = getRedirectMap();
  delete map[abbreviatedUrl];
  await updateRedirectMap(map);
  refreshInterceptListener();
}

/* DEBUGGING FUNCTIONS */

async function printAllStorage() {
  var promise = new Promise(function(resolve, reject) {
    chrome.storage.local.get(null, function(items){
      resolve(items);
    })
  });

  const output = await promise;
  console.log('return: ' + output);
  return output;
}

async function clearAllStorage() {
  chrome.storage.local.clear();
  redirectMapCache = {};
}

function printMap(map) {
  for (var key in map) {
    console.log(key + ': ' + map[key]);
  }
}
