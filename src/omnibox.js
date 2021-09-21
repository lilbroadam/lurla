chrome.omnibox.onInputChanged.addListener(onOmniboxInputChanged);
chrome.omnibox.onInputEntered.addListener(onOmniboxSubmit);

function onOmniboxInputChanged(omniboxText, setSuggestions) {
  setSuggestions(generateOmniboxSuggestions(omniboxText));
}

function generateOmniboxSuggestions(omniboxText) {
  var omniboxSuggestions = [];

  omniboxSuggestions.push(makeSuggestion("content1", "description1"));
  omniboxSuggestions.push(makeSuggestion("content2", "description2"));

  return omniboxSuggestions;
}

function makeSuggestion(content, description) {
  return {content: content, description: description};
}

function onOmniboxSubmit(omniboxText) {
  var newUrl = 'http://ab.' + encodeURIComponent(omniboxText) + '.com';
  chrome.tabs.getSelected(null, function(tab) {
    console.log('new');
    chrome.tabs.update(tab.id, {url: newUrl})
  });
}
