const ABBREVIATION_DICTIONARY = "abbreviationDictionary";

function addAbbreviationUrl(abbrUrl, redirectUrl) {
  var abbrDict = getAbbreviationDict();
}

// Get the abbreviation dictionary from Chrome storage
// TODO add setting to enable storage sync
function getAbbreviationDict() {
  var abbrDict = {}; 

  console.log('1')
  chrome.storage.local.get([ABBREVIATION_DICTIONARY], function(result) {
    console.log('2')
    if (result) {
      // console.log(result)
      // console.log(typeof result)
      // console.log(result.ABBREVIATION_DICTIONARY)
      // console.log(typeof result.ABBREVIATION_DICTIONARY) // undefined
      // console.log(result.abbreviationDictionary)
      // console.log(typeof result.abbreviationDictionary) // object
      // console.log(result[ABBREVIATION_DICTIONARY])
      // console.log(typeof result[ABBREVIATION_DICTIONARY]) // object
      // return result.ABBREVIATION_DICTIONARY;

      console.log('3')
      console.log(result[ABBREVIATION_DICTIONARY])
      console.log(typeof result[ABBREVIATION_DICTIONARY]) // object

      // abbrDict = result[ABBREVIATION_DICTIONARY];

      for (var property in result[ABBREVIATION_DICTIONARY]) {
        abbrDict[property] = result[ABBREVIATION_DICTIONARY][property];
      }

    } else {
      console.log('returning empty')
      abbrDict = {};
    }
  });

  console.log('4')
  console.log(abbrDict)
  console.log(typeof abbrDict) // object

  return abbrDict;
}

// function addAbbreviationUrl(abbrUrl, redirectUrl) {
//   var abbrDict = getAbbreviationDict();
//   // if(abbrDict == null) {
//   //   console.log('it is undefined');
//   //   abbrDict = {};
//   // }
//   if(abbrDict == null) { // Assume abbr dict hasn't been created yet
//     abbrDict = new Object();
//   }
//
//   document.getElementById('debug1').innerText = abbrDict;
//   abbrDict[buildAbbreviatedUrl(abbrUrl)] = redirectUrl;
//   document.getElementById('debug2').innerText = abbrDict;
//
//   // chrome.storage.local.remove(ABBREVIATION_DICTIONARY);
//   chrome.storage.local.set({ABBREVIATION_DICTIONARY: abbrDict}, function() {
//     document.getElementById('debug3').innerText
//       = chrome.storage.local.get(function(result){console.log(result.ABBREVIATION_DICTIONARY)});
//   });
// }
//
// function getAbbreviationDict() {
//   var abbrDict;
//   // chrome.storage.local.get(ABBREVIATION_DICTIONARY, function(result) {
//   chrome.storage.local.get(function(result) {
//     // TODO: error handling
//     if(result) {
//       abbrDict = result.ABBREVIATION_DICTIONARY;
//     } else {
//       abbrDict = {};
//     }
//   });
//
//   return abbrDict;
// }
