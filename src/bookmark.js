
// Call submitAbbreviation() when the new abbreviation button is clicked
document.getElementById('submit-abbreviation').onclick = submitAbbreviation;

// Call submitAbbreviation() when enter is pressed in the abbreviation textbox
document.getElementById('abbreviatedurl-textbox').addEventListener(
  "keydown",
  function(e) {
    if (e.code === "Enter")
      submitAbbreviation();
  }
);

// Prefill redirect url with current tab's url
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  document.getElementById('redirecturl-textbox').value = tabs[0].url;
});

/**
 * Read the textboxes on bookmark.html and the new abbreviated url to storage.
 * 
 * @param {textbox} abbreviatedurl-textbox
 * @param {textbox} redirecturl-textbox
 */
function submitAbbreviation() {
  var abbreviatedUrlElem = document.getElementById('abbreviatedurl-textbox');
  var redirectUrlElem = document.getElementById('redirecturl-textbox');

  if (abbreviatedUrlElem == null || redirectUrlElem == null) {
    alert('Something went wrong on our end, please try again.');
    return;
  }

  var abbreviatedUrl = abbreviatedUrlElem.value;
  var redirectUrl = redirectUrlElem.value;
  putAbbreviatedUrl(abbreviatedUrl, redirectUrl);

  // TODO notify the user if operation is successful
  alert(abbreviatedUrl + ' -> ' + redirectUrl);
}
