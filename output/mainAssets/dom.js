'use strict';

/* global postJsonXHR getXhr */

var userMsg = document.getElementById('userMsg');
var submitBtn = document.getElementById('submitBtn');
var messageBoard = document.getElementById('message-board');
var logoutBtn = document.getElementById('logout');

var globalMessages = '';

var updateScroll = function updateScroll() {
  console.log('scroll');
  console.log(messageBoard.scrollTop);
  console.log(messageBoard.scrollHeight);
  messageBoard.scrollTop = messageBoard.scrollHeight;
};

var buildMsg = function buildMsg(imgURL, username, colour, text) {
  var post = document.createElement('div');
  post.className = 'post';
  var image = document.createElement('img');
  image.className = 'userimg';
  image.src = imgURL;
  image.alt = username;
  var msgArea = document.createElement('div');
  var user = document.createElement('div');
  user.className = 'usertag';
  user.textContent = username;
  user.style.color = colour;
  var msgText = document.createElement('div');
  msgText.className = 'messageText';
  msgText.textContent = text;
  // Append the elements together
  msgArea.appendChild(user);
  msgArea.appendChild(msgText);
  post.appendChild(image);
  post.appendChild(msgArea);
  // Add post to message board
  messageBoard.appendChild(post);
};

var updateBoard = function updateBoard() {
  getXhr('/get-msgs', function (allMessages) {
    if (JSON.stringify(allMessages) !== JSON.stringify(globalMessages)) {
      globalMessages = allMessages;
      console.log(globalMessages);
      console.log(allMessages);
      allMessages.forEach(function (msg) {
        buildMsg(msg.photo_url, msg.name, msg.colour, msg.text);
      });
      updateScroll();
    }
  });
};

window.setInterval(updateBoard, 1000);

updateBoard();

submitBtn.addEventListener('click', function () {
  var message = userMsg.value;
  postJsonXHR('/send-msg', message, function (err) {
    if (err) {
      console.log(err);
    }
    updateBoard();
  });
});

logoutBtn.addEventListener('click', function () {
  postJsonXHR('/logout', { obj: 'empty' }, function (err) {
    if (err) {
      console.log('Sorry, we could not log you out');
    } else {
      window.location.replace('/');
    }
  });
});