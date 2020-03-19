// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "devtools-page") {
        if (openCount == 0) {
            alert("DevTools window opening.");
        }
        openCount++;

        port.onDisconnect.addListener(function(port) {
            openCount--;
            if (openCount == 0) {
                alert("Last DevTools window closing.");
            }
        });
    }
});
