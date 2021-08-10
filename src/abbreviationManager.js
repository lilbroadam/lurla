const ABBREVIATION_DICTIONARY = "abbreviationDictionary";

async function addAbbreviationUrl(abbrUrl, redirectUrl) {
  var abbrDict = await getAbbreviationDict();

  abbrDict[buildAbbreviatedUrl(abbrUrl)] = redirectUrl;

  await setAbbreviationDict(abbrDict);
}

// Get the abbreviation dictionary from chrome.storage. If no dictionary exists,
// return an empty dictionary.
function getAbbreviationDict() {
  var abbrDict = {}; 

  var promise = new Promise(function(resolve, reject) {
    chrome.storage.local.get([ABBREVIATION_DICTIONARY], function(result) {
      resultAbbrDict = result[ABBREVIATION_DICTIONARY];
      if (resultAbbrDict) {
        abbrDict = resultAbbrDict;
      } else {
        abbrDict = {}; // No dictionary found, make one
      }

      resolve(abbrDict);
    });
  });

  return promise;
}

// Overwrite the abbreviation dictionary in chrome.storage with the given abbrDict.
function setAbbreviationDict(abbrDict) {
  var promise = new Promise(function(resolve, reject) {
    chrome.storage.local.set({[ABBREVIATION_DICTIONARY]: abbrDict}, function(result) {
      resolve(result);
    });
  });

  return promise;
}

// TODO move buildAbbreviatedUrl() here
