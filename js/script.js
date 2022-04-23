// select the space where profile information will be displayed
const overview = document.querySelector(".overview");
// select the unordered list to display the repos list
const listView = document.querySelector(".repo-list");
// selects the section wwhere all your repo information appears
const allRepo= document.querySelector(".repos");
// selects the section with individual repo data
const repoView = document.querySelector(".repo-data");

const userName = "mathum49";

// get information from GitHub profile
const getGitHubProfile = async function(){
    const getData = await fetch(`https://api.github.com/users/${userName}`);
    const data = await getData.json();
    displayGitHubData(data);
};

getGitHubProfile();

// show overview of GitHub profile
const displayGitHubData = function (data){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML= 
    `<figure>
          <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Bio:</strong> ${data.bio}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    overview.append(userInfo);
    getRepo();
};

// get list of repos in GitHub
const getRepo = async function (){
    const getRepoData = await fetch(`https://api.github.com/users/${userName}/repos?per_page=100&sort=updated`);
    const repoData = await getRepoData.json();
    displayRepos(repoData);
};

// disply the list
const displayRepos = function(repos){
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        listView.append(li);
    }
};

// add event listener to generate call to more details about the repo
listView.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoDetails(repoName);
    }
});

// Get the details of the repo and languages used
getRepoDetails = async function(repoName){
    const getDetails = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
    const repoInfo = await getDetails.json();
    console.log(repoInfo);
    // get languages used
    const fetchLanguages = await fetch (`https://api.github.com/repos/${userName}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    // make a list of languages
    const languages = [];
    for (const language in languageData){
        languages.push(language)
    };

    displayRepoDetails(repoInfo, languages)
};

// Display the repo details on the page
displayRepoDetails = function (repoInfo, languages){
    repoView.innerHTML= "";
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoView.append(infoDiv);
    repoView.classList.remove("hide");
    allRepo.classList.add("hide");
};

