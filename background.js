chrome.webRequest.onBeforeRequest.addListener(
  function(request) {
    return {redirectUrl: getRedirectUrl(request)};
  },
  {urls: interceptUrls()},
  ["blocking"]
);

// TODO: read dictionary from storage
var dict = new Object();
dict[buildAbbreviatedUrl('waitlist')] = 'https://utdirect.utexas.edu/registrar/waitlist/wl_see_my_waitlists.WBX';
dict[buildAbbreviatedUrl('canvas')] = 'https://utexas.instructure.com/';
dict[buildAbbreviatedUrl('utdrive')] = 'https://drive.google.com/drive/u/1/my-drive';
dict[buildAbbreviatedUrl('utmail')] = 'https://mail.google.com/mail/u/1/#inbox';
dict[buildAbbreviatedUrl('classlisting')] = 'https://utdirect.utexas.edu/registration/classlist.WBX';

// dict[buildAbbreviatedUrl('')] = '';

function getRedirectUrl(request) {
  // See if the request url is registered as an abbreviated url
  var requestAbbr = requestUrlToAbbrUrl(request.url);
  if(requestAbbr === null) {

  } else {
    for(var abbrUrl in dict) {
      if(requestAbbr.localeCompare(abbrUrl) == 0) {
        return dict[abbrUrl];
      }
    }
  }

}

function interceptUrls() {
  // All urls in the dictionary should be intercepted
  var interceptUrls = [];
  for(var abbrUrl in dict) {
    interceptUrls.push(abbrUrl);
  }

  return interceptUrls;
}

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
