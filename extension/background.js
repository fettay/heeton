'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'news.walla.co.il', pathContains: 'item'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete' && tab.active) {
      chrome.tabs.executeScript(
        tabId,
        {file: "scrap.js"}
        );
  }
});

// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  fetch(request.input, request.init).then(function(response) {
    return response.text().then(function(text) {
      alert(text)
      sendResponse([{
        body: text,
        status: response.status,
        statusText: response.statusText,
      }, null]);
    });
  }, function(error) {
    sendResponse([null, error]);
  });
  return true;
});