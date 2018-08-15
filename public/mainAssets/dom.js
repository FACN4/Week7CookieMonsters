/* global postJsonXHR getXhr */

const userMsg = document.getElementById('userMsg');
const submitBtn = document.getElementById('submitBtn');
const messageBoard = document.getElementById('message-board');


submitBtn.addEventListener('click', () => {
  const message = userMsg.value;
  postJsonXHR('/send-msg', message, (err) => {
    if (err) {
      console.log(err);
    }
  });
});


const updateBoard = () => {
  getXhr('/get-msgs', console.log);
};
updateBoard();
