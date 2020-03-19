// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColorBtn = document.getElementById('changeColorBtn');

chrome.storage.sync.get('color', function(data) {
    changeColorBtn.style.backgroundColor = data.color;
    changeColorBtn.setAttribute('value', data.color);
});

changeColorBtn.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'}
        );
    });
};
