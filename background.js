// Aktiver extension, hvis pageURL matcher dk.youpaddle.dk

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'dk.youpaddle.org'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
