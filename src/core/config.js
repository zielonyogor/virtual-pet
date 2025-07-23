async function setup() {
  const gitAddBtn = document.getElementById('add-git-btn');
  gitAddBtn.addEventListener('click', async () => {
    const updatedRepos = await window.api.openGitDialog();
    updateRepoList(updatedRepos);
  });
  const initialRepos = await window.api.getRepos();
  updateRepoList(initialRepos);

  const timesForm = document.getElementById('times-form');
  const initialTimes = await window.api.getTimes();
  updateTimes(initialTimes);
  addNullInputPrevent(timesForm, initialTimes);

  timesForm.addEventListener('submit', async (e) => submitTimes(e));
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

function updateTimes(times) {
  const timesForm = document.getElementById('times-form');
  const timesInputs = [...timesForm.querySelectorAll('.time-input')];
  for (let i = 0; i < timesInputs.length; i++) {
    const element = timesInputs[i];
    element.value = times[i];
  }
}

function addNullInputPrevent(timesForm, savedValues) {
  const timesInputs = timesForm.querySelectorAll('.time-input');
  for (let i = 0; i < timesInputs.length; i++) {
    const element = timesInputs[i];
    const val = savedValues[i];
    element.addEventListener('focusout', () => {
      if(element.value === null || element.value == "") {
        element.value = val;
      }
    });
  }
}

async function submitTimes(e) {
  const form = e.target;
  e.preventDefault();

  console.log(e);
  const timesInputs = [...form.querySelectorAll('.time-input')];
  const newTimes = timesInputs.map(item => parseInt(item.value, 10));
  console.log(newTimes);
  const resultTimes = await window.api.submitNewTimes(newTimes);
  updateTimes(resultTimes);
}

document.addEventListener('DOMContentLoaded', setup);