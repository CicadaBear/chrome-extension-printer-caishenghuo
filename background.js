// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
  chrome.tabs.executeScript({
    code: '(' + print + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    console.log('Popup script:');
  });
});

function print() {
  var iframework = document.getElementById('iframework');
  if(iframework){
    var innerDoc = iframework.contentDocument || iframework.contentWindow.document;
    innerDoc.getElementsByClassName('Wrapper')[0].style.overflow = "visible";
    // var userframe = innerDoc.getElementById('userframe');
    var frm = iframework.contentWindow;
    frm.focus();
    frm.print();
    innerDoc.getElementsByClassName('Wrapper')[0].style.overflow = "auto";
  }else{
    var wrapper =  document.getElementsByClassName('Wrapper')[0];
    if(wrapper){
      wrapper.style.overflow = "visible";
      window.print();
      wrapper.style.overflow = "auto";
    }else{
      window.print();
    }
  }
  
}