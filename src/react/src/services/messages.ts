
export function send(message) {
  try {
    chrome.runtime.sendMessage(message);
  } catch (e) { // TODO catch normal exceptions
    // TODO create mock
  }
}

export function addListener(callback) {
  try {
    chrome.runtime.onMessage.addListener(callback);
  } catch (e) { // TODO catch normal exceptions
    // TODO create mock
  }
}
