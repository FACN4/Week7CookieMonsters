/* global postJsonXHR getXhr */

const userMsg = document.getElementById('userMsg');
const submitBtn = document.getElementById('submitBtn');
const messageBoard = document.getElementById('message-board');
const logoutBtn = document.getElementById('logout');
const usertag = document.getElementById('username');

let globalMessages = [];
let globalUser = '';


const updateScroll = () => {
  messageBoard.scrollTop = messageBoard.scrollHeight;
};


const buildMsg = (imgURL, username, colour, text) => {
  const post = document.createElement('div');
  post.className = 'post';
  if (globalUser === username) {
    post.className = 'post currentUser';
  }
  const image = document.createElement('img');
  image.className = 'userimg';
  image.src = imgURL;
  image.alt = username;
  const msgArea = document.createElement('div');
  const user = document.createElement('div');
  user.className = 'usertag';
  user.textContent = username;
  user.style.color = colour;
  const msgText = document.createElement('div');
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

const updateBoard = () => {
  getXhr('/get-msgs', (allMessages) => {
    if (JSON.stringify(allMessages) !== JSON.stringify(globalMessages)) {
      globalMessages = allMessages;
      allMessages.forEach((msg) => {
        buildMsg(msg.photo_url, msg.name, msg.colour, msg.text);
      });
      updateScroll();
    }
  });
};

getXhr('./unlockCookie', (resp) => {
  globalUser = resp.name;
  usertag.textContent = resp.name;
  updateBoard();
});

window.setInterval(updateBoard, 1000);


const sendMessage = () => {
  const message = userMsg.value;
  postJsonXHR('/send-msg', message, (err) => {
    if (err) {
      console.log(err);
    }
    updateBoard();
    userMsg.value = '';
  });
};

submitBtn.addEventListener('click', sendMessage);

userMsg.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendMessage();
  }
});

logoutBtn.addEventListener('click', () => {
  postJsonXHR('/logout', { obj: 'empty' }, (err) => {
    if (err) {
      console.log('Sorry, we could not log you out');
    } else {
      window.location.replace('/');
    }
  });
});
