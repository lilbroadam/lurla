const ABBREVIATION_DICTIONARY = "abbreviationDictionary";

// Load dict from chrome.storage
dict = new Object();
getAbbreviationDict().then(function(response) {
  dict = response;
});

// function beforeRequestHandler(request) {
//   return {redirectUrl: getRedirectUrl(request)};
// }

function updateBeforeRequestListener(restart) {
  // chrome.webRequest.onBeforeRequest.removeListener(beforeRequestHandler);
  chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
      return {redirectUrl: getRedirectUrl(request)}
    },
    {urls: interceptUrls()},
    ["blocking"]
  );
  // chrome.webRequest.handlerBehaviorChanged();
  
  // FIXME find a better solution to get Chrome to intercept new abbreviated urls
  if (restart)
    chrome.runtime.reload();
}
updateBeforeRequestListener(false);

// TODO: read dictionary from storage
// dict = new Object();
// dict[buildAbbreviatedUrl('waitlist')] = 'https://utdirect.utexas.edu/registrar/waitlist/wl_see_my_waitlists.WBX';
// dict[buildAbbreviatedUrl('canvas')] = 'https://utexas.instructure.com/';
// dict[buildAbbreviatedUrl('utdrive')] = 'https://drive.google.com/drive/u/1/my-drive';
// dict[buildAbbreviatedUrl('utmail')] = 'https://mail.google.com/mail/u/1/#inbox';
// dict[buildAbbreviatedUrl('classlisting')] = 'https://utdirect.utexas.edu/registration/classlist.WBX';

// If the abbreviatedUrl is registered as an abbreviated url,
// return the url that it redirects to.
function getRedirectUrl(abbreviatedUrl) {
  var requestAbbr = requestUrlToAbbrUrl(abbreviatedUrl.url);
  if(requestAbbr === null) {

  } else {
    for(var abbrUrl in dict) { // FIXME should be able to dict[abbreviatedUrl]
      if(requestAbbr.localeCompare(abbrUrl) == 0) {
        return dict[abbrUrl];
      }
    }
  }

}

// Return an array of all of the abbreviated urls to intercept.
function interceptUrls() {
  // All urls in the dictionary should be intercepted
  var interceptUrls = [];
  for(var abbrUrl in dict) { // FIXME can probably return .keys()
    interceptUrls.push(abbrUrl);
  }

  return interceptUrls;
}

// Given an abbreviation, return it's abbreviation url
function buildAbbreviatedUrl(abbreviation) {
  var protocol = '*://';
  var escapeSubDomain = 'ab';
  var escapeTopLevelDomain = 'com/';

  return escapeUrl = protocol + escapeSubDomain + '.' + abbreviation + '.' + escapeTopLevelDomain;
}

// Given a real url request string, return the format for that url that abbreviated urls are stored
// in the dictionary. If the request url is determined to not be of the abbreviated url
// format, null is returned.
function requestUrlToAbbrUrl(requestUrl) {
	// Check if protocol is http
	var httpProtocol = 'http://';
  var httpProtocolLoc = requestUrl.search(httpProtocol);
  if(httpProtocolLoc != 0) {
  	return null;
  }

  // Check if subdomain matches escape subdomain
  var subdomainStartIndex = httpProtocolLoc + httpProtocol.length;
  var subdomainEndIndex = requestUrl.indexOf(".", subdomainStartIndex);
  var subdomain = requestUrl.substring(subdomainStartIndex, subdomainEndIndex);
  if(subdomain.localeCompare('ab') != 0) {
  	return null;
  }

  // Check if top level domain matches escape top level domain
  var tldStartIndex = requestUrl.indexOf(".", subdomainEndIndex + 1) + 1;
  var tldEndIndex = requestUrl.indexOf("/", tldStartIndex);
  var tld = requestUrl.substring(tldStartIndex, tldEndIndex);
  if(tld.localeCompare('com') != 0) {
    return null;
  }

  // Call buildAbbreviatedUrl()
  var domain = requestUrl.substring(subdomainEndIndex + 1, tldStartIndex - 1);
  return buildAbbreviatedUrl(domain);
}






// const ABBREVIATION_DICTIONARY = "abbreviationDictionary";

// Given an abbreviation url and a url that it should redirect to,
// add it to the abbreviationDictionary in chrome.storage
async function addAbbreviationUrl(abbrUrl, redirectUrl) {
  var abbrDict = await getAbbreviationDict();

  abbrDict[buildAbbreviatedUrl(abbrUrl)] = redirectUrl;
  dict = abbrDict;

  await setAbbreviationDict(abbrDict);

  updateBeforeRequestListener(true);
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