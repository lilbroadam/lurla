document.getElementById('bookmark-button').onclick = goToBookmarks;
document.getElementById('folder-button').onclick = goToFolder;
document.getElementById('settings-button').onclick = goToSettings;

function goToBookmarks() {
  window.location.href = "bookmark.html";
}

function goToFolder() {
  window.location.href = "folder.html";
}

function goToSettings() {
  window.location.href = "settings.html";
}