/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create("openSidePanel", {
    type: "basic",
    iconUrl: "icon.png",
    title: "QuickQuery",
    message:
      "Click the extension icon to open the side panel for quick access to queries.",
    priority: 2,
  });
});

chrome.storage.sync.get("token", (data) => {
  const token = data.token;
  console.log(token);
  openSidePanel(token === null);
});

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId === "openSidePanel") {
    chrome.storage.sync.get("token", (data) => {
      const token = data.token;
      console.log(token);
      openSidePanel(token === null);
    });

    chrome.windows.create({
      url: "popup.html",
      type: "popup",
    });
  }
});

function openSidePanel(val) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: val })
    .catch((error) => console.error(error));
}

/******/ })()
;
//# sourceMappingURL=background.js.map