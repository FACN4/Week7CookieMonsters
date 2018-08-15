'use strict';

/* global postJsonXHR getXhr */

var userMsg = document.getElementById('userMsg');
var submitBtn = document.getElementById('submitBtn');
var messageBoard = document.getElementById('message-board');
var logoutBtn = document.getElementById('logout');
var usertag = document.getElementById('username');

var globalMessages = [];
var globalUser = '';

var updateScroll = function updateScroll() {
  messageBoard.scrollTop = messageBoard.scrollHeight;
};

var buildMsg = function buildMsg(imgURL, username, colour, text) {
  var post = document.createElement('div');
  post.className = 'post';
  if (globalUser === username) {
    post.className = 'post currentUser';
  }
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
      allMessages.forEach(function (msg) {
        buildMsg(msg.photo_url, msg.name, msg.colour, msg.text);
      });
      updateScroll();
    }
  });
};

getXhr('./unlockCookie', function (resp) {
  globalUser = resp.name;
  usertag.textContent = resp.name;
  updateBoard();
});

window.setInterval(updateBoard, 1000);

var sendMessage = function sendMessage() {
  var message = userMsg.value;
  postJsonXHR('/send-msg', message, function (err) {
    if (err) {
      console.log(err);
    }
    updateBoard();
    userMsg.value = '';
  });
};

submitBtn.addEventListener('click', sendMessage);

userMsg.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendMessage();
  }
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