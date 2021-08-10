// Called when the new abbreviation button is clicked
document.getElementById('submit-abbreviation').onclick = function() {
  var interceptUrlElem = document.getElementById('intercepturl-textbox');
  var redirectUrlElem = document.getElementById('redirecturl-textbox');

  if (interceptUrlElem == null || redirectUrlElem == null) {
    alert('Something went wrong on our end, please try again.');
  }

  var interceptUrl = interceptUrlElem.value;
  var redirectUrl = redirectUrlElem.value;

  // addAbbreviationUrl(abbrUrl, redirectUrl); // from background.js

  alert(interceptUrl + ' -> ' + redirectUrl);
};


// Prefill intercept URL with current tab's URL
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  document.getElementById('intercepturl-textbox').value = tabs[0].url;
});
