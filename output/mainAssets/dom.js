'use strict';

/* global postJsonXHR getXhr */

var userMsg = document.getElementById('userMsg');
var submitBtn = document.getElementById('submitBtn');
var messageBoard = document.getElementById('message-board');

submitBtn.addEventListener('click', function () {
  var message = userMsg.value;
  postJsonXHR('/send-msg', message, function (err) {
    if (err) {
      console.log(err);
    }
  });
});

var updateBoard = function updateBoard() {
  getXhr('/get-msgs', console.log);
};
updateBoard();