var bookmark = document.getElementById('bookmark-button');
var folder = document.getElementById('folder-button');
var settings = document.getElementById('settings-button');
var backButton = document.getElementById('back-button');

if (bookmark != null) bookmark.onclick = goToBookmarks;
if (folder != null) folder.onclick = goToFolder;
if (settings != null) settings.onclick = goToSettings;
if (backButton != null) backButton.onclick = goBack;

function goToBookmarks() {
  window.location.href = "bookmark.html";
}

function goToFolder() {
  window.location.href = "folder.html";
}

function goToSettings() {
  window.location.href = "settings.html";
}

function goBack() {
  window.history.back();
}
