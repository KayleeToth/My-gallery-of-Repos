// This div is where your profile name will appear.
const profile = document.querySelector(".overview");
const username = "KayleeToth";
const reposList = document.querySelector(".repo-list"); 
const allRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const returnToGalleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// create and name an async function to fetch information from your GitHub profile. 

const gitCreatorInfo = async function () {
    const creatorInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await creatorInfo.json();
    //console.log(data);
    displayCreatorInfo(data);
  };
  
  gitCreatorInfo();
  
  const displayCreatorInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;
    profile.append(div);
    gitRepos();
  };

  const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
  };

  const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      reposList.append(repoItem);
    }
  };
  reposList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
      getRepoInfo(repoName);
    }
  });
  
  const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);
   
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
  

    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }
  
    displayRepoInfo(repoInfo, languages);
  };
  
  const displayRepoInfo = function (repoInfo, languages) {
    returnToGalleryButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
  };

  returnToGalleryButton.addEventListener("click", function () {
    allRepoInfo.classList.remove("hide");
    repoData.classList.add("hide");
    returnToGalleryButton.classList.add("hide");

  });

  filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo")
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
          repo.classList.remove("hide");
        } else {
          repo.classList.add("hide");
        }
      }
 });