const ABBREVIATION_DICTIONARY = "abbreviationDictionary";

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
