// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.ynet.co.il', pathContains: 'articles'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.webRequest.onHeadersReceived.addListener(details => {
  const responseHeaders = details.responseHeaders.map(item => {
    if (item.name.toLowerCase() === 'access-control-allow-origin') {
      item.value = '*'
    }
  })
  return { responseHeaders };
}, {urls: ['<all_urls>']}, ['blocking', 'responseHeaders', 'extraHeaders']);

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete' && tab.active) {  

      chrome.tabs.executeScript(
        tabId,
        //{code: 'document.getElementsByClassName("art_header_title")[0].style.color = "blue";'}
        {file: "scrap.js"}
        );
//art_header_sub_title  
//
//document.getElementsByClassName("art_header_title").innerText
  }
})


