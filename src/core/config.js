async function setup() {
  const gitAddBtn = document.getElementById('add-git-btn');
  gitAddBtn.addEventListener('click', async () => {
    const updatedRepos = await window.api.openGitDialog();
    updateRepoList(updatedRepos);
  });
  const initialRepos = await window.api.getRepos();
  updateRepoList(initialRepos);
}

function updateRepoList(repos) {
  const listElem = document.getElementById('git-list');
  listElem.innerHTML = '';

  repos.forEach(repo => {
    const repoElem = document.createElement('div');
    repoElem.classList.add("repo-element");
    repoElem.innerHTML = 
    `
        <p class="repo-main-title">${repo.split("\\").pop()}</p>
        <div class="repo-path-container">
          <p class="repo-path">${repo}</p>
          <button class="repo-delete">X</button>
        </div>
    `;
    const deleteBtn = repoElem.getElementsByClassName("repo-delete")[0];
    deleteBtn.addEventListener('click', async () => {
        const updatedRepos = await window.api.deleteRepo(repo);
        updateRepoList(updatedRepos);
    })

    listElem.appendChild(repoElem);
  });
}

document.addEventListener('DOMContentLoaded', setup);