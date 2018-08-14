/* eslint-disable no-unused-vars */

const postJsonXHR = (url, body, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
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
