/* global postJsonXHR getXhr */

const userMsg = document.getElementById('userMsg');
const submitBtn = document.getElementById('submitBtn');
const messageBoard = document.getElementById('message-board');

let globalMessages = '';


const updateScroll = () => {
  console.log('scroll');
  console.log(messageBoard.scrollTop);
  console.log(messageBoard.scrollHeight);
  messageBoard.scrollTop = messageBoard.scrollHeight;
};


const buildMsg = (imgURL, username, colour, text) => {
  const post = document.createElement('div');
  post.className = 'post';
  const image = document.createElement('img');
  image.className = 'userimg';
  image.src = imgURL;
  image.alt = username;
  const msgArea = document.createElement('div');
  const user = document.createElement('div');
  user.className = 'usertag';
  user.textContent = username;
  user.color = colour;
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
      console.log(globalMessages);
      console.log(allMessages);
      allMessages.forEach((msg) => {
        buildMsg(msg.photo_url, msg.name, msg.colour, msg.text);
      });
      updateScroll();
    }
  });
};

window.setInterval(updateBoard, 1000);

updateBoard();

submitBtn.addEventListener('click', () => {
  const message = userMsg.value;
  postJsonXHR('/send-msg', message, (err) => {
    if (err) {
      console.log(err);
    }
    updateBoard();
  });
});
