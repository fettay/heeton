'use strict';


function executeScripts(tabId, injectDetailsArray)
{
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }

    var callback = null;

    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);

    if (callback !== null)
        callback();   // execute outermost function
}


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
        chrome.tabs.executeScript(
          tabId,
          {file: 'lib/jquery.js'});
      // chrome.tabs.executeScript(
      //     tabId,
      //     {file: 'processing.js'});
      chrome.tabs.insertCSS(
            tabId,
            {file: 'style.css'});
  }
});

// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  fetch(request.input, request.init).then(function(response) {
    return response.text().then(function(text) {
      executeScripts(null, [
        {code: 'var text2 = ' + JSON.stringify(text)},
        {file: 'processing.js'}]);
    });
  }, function(error) {
    sendResponse([null, error]);
  });
  return true;
});