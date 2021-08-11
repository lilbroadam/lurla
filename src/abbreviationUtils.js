/**
 * abbreviationUtils.js has no dependencies
 */

/**
 * Intercept urls are similar to abbreviated urls but has a wildcar for the
 * protocol. Intercept urls can be thought of as more generic abbreviated urls.
 * We give Chrome intercept urls so it will let us redirect abbreviated urls.
 * 
 * @param {string} domainName 
 * @returns the intercept url of domainName
 */
function domainNameToInterceptUrl(domainName) {
  var protocol = '*://';
  var subdomainEscape = 'ab.'; // TODO add support for custom subdomains #3
  var topleveldomainEscape = '.com/';
  return protocol + subdomainEscape + domainName + topleveldomainEscape;
}

/**
 * @param {Map<String, String>} redirectMap 
 * @returns an array of strings of the intercept urls for redirectMap
 */
function getInterceptUrls(redirectMap) {
  // TODO it may be preferable that the redirect map only store
  // domain names and compute intercept urls here
  return Object.keys(redirectMap);
}

/**
 * @param {string} realUrl - a real url
 * @returns realUrl as an intercept url if it is a valid intercept url,
 *          null otherwise
 */
function realUrlToInterceptUrl(realUrl) {
	// Check if protocol is http or https
  var protocol;
  var protocolLoc;
	var httpProtocol = 'http://';
  var httpProtocolLoc = realUrl.search(httpProtocol);
  var httpsProtocol = 'https://';
  var httpsProtocolLoc = realUrl.search(httpsProtocol);
  if (httpProtocolLoc == 0) {
    protocol = httpProtocol;
    protocolLoc = httpProtocolLoc;
  } else if (httpsProtocolLoc == 0) {
    protocol = httpsProtocol;
    protocolLoc = httpsProtocolLoc;
  } else {
    return null;
  }

  // Check if subdomain matches escape subdomain
  var subdomainStartIndex = protocolLoc + protocol.length;
  var subdomainEndIndex = realUrl.indexOf(".", subdomainStartIndex);
  var subdomain = realUrl.substring(subdomainStartIndex, subdomainEndIndex);
  if (subdomain.localeCompare('ab') != 0) {
  	return null;
  }

  // Check if top level domain matches escape top level domain
  var tldStartIndex = realUrl.indexOf(".", subdomainEndIndex + 1) + 1;
  var tldEndIndex = realUrl.indexOf("/", tldStartIndex);
  var tld = realUrl.substring(tldStartIndex, tldEndIndex);
  if (tld.localeCompare('com') != 0) {
    return null;
  }

  // Call domainNameToInterceptUrl()
  var domain = realUrl.substring(subdomainEndIndex + 1, tldStartIndex - 1);
  var output = domainNameToInterceptUrl(domain);
  return output;
}
