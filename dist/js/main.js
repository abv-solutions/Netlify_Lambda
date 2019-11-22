word = document.querySelector('#random-word')
userList = document.querySelector('#users');
button = document.querySelector('.btn-outline-info');
// Fetch info from getword Lambda Function
const getWord = async () => {
  const user = netlifyIdentity.currentUser();
  const res = await fetch('/getword', user && {
    headers: {
      Authorization: `Bearer ${user.token.access_token}`
    }
  });
  const randomWord = await res.text();
  if (randomWord !== 'NOT ALLOWED') {
    word.innerText = randomWord;
  } else {
    showAlert('Please login', 'danger');
  }
};
// Fetch info from getusers Lambda Function
const getUsers = async () => {
  const res = await fetch('/getusers');
  const users = await res.json();
  users.slice(0, 10).forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    const link = document.createElement('a');
    link.appendChild(document.createTextNode(user.login));
    link.href = user.html_url;
    link.target = '_blank';
    li.appendChild(link);
    userList.appendChild(li);
  });
};
// ALert function
const showAlert = (message, className) => {
  const div = document.createElement('div');
  div.className = `alert alert-${className} col-md-6 mx-auto mt-3`;
  div.appendChild(document.createTextNode(message));
  button.after(div);
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}
// Call functions
button.addEventListener('click', getWord);

netlifyIdentity.on('login', user => {
  netlifyIdentity.close();
  getWord();
  getUsers();
});

netlifyIdentity.on('logout', user => {
  word.innerHTML = "";
  userList.innerHTML = "";
  netlifyIdentity.close();
});
