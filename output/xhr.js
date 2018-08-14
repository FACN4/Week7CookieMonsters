'use strict';

/* eslint-disable no-unused-vars */

var postJsonXHR = function postJsonXHR(url, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readystate === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb(new Error());
      }
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};