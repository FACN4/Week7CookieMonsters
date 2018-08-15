'use strict';

/* eslint-disable no-unused-vars */

var postJsonXHR = function postJsonXHR(url, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
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

var getXhr = function getXhr(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};