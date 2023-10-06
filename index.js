console.log('Script loaded.');

const form = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const query = searchInput.value;

  if (query) {
    try {
      const users = await fetchGitHubUsers(query);
      displayUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
});

async function fetchGitHubUsers(query) {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  const data = await response.json();

  return data.items;
}

function displayUsers(users) {
  userList.innerHTML = '';

  users.forEach((user) => {
    const userElement = document.createElement('li');
    userElement.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}">
      <a href="${user.html_url}" target="_blank">${user.login}</a>
    `;

    userElement.addEventListener('click', () => {
      fetchUserRepos(user.login);
    });

    userList.appendChild(userElement);
  });
}

async function fetchUserRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();

  displayRepos(data);
}

function displayRepos(repos) {
  reposList.innerHTML = '<strong>Repositories:</strong>';

  repos.forEach((repo) => {
    const repoElement = document.createElement('li');
    repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    reposList.appendChild(repoElement);
  });
}