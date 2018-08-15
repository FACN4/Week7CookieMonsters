'use strict';

/* eslint-disable no-unused-vars */

var postJsonXHR = function postJsonXHR(url, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 300) {
        cb(null);
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};