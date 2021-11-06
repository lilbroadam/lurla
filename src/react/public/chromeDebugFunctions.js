/*
  TODO export functions that can be used in inspect element for debugging
*/

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
