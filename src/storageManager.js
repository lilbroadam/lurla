const REDIRECT_DICTIONARY = '';

async function updateRedirectMap(map) {
  chrome.storage.local.set({REDIRECT_DICTIONARY: map});
}

async function getRedirectUrls() {
  var promise = new Promise(function(resolve, reject) {
    chrome.storage.local.get('REDIRECT_DICTIONARY', function(items){
      resolve(items['REDIRECT_DICTIONARY']);
    })
  });

  const output = await promise;
  if (output == null) {
    return {};
  } else {
    return output;
  }
}

async function putRedirectUrl(interceptUrl, redirectUrl) {
  var map = await getRedirectUrls();
  map[interceptUrl] = redirectUrl;
  await updateRedirectMap(map);
}

async function removeRedirectUrl(interceptUrl) {
  var map = await getRedirectUrls();
  delete map[interceptUrl];
  await updateRedirectMap(map);
}
