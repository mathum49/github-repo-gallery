// select the space where profile information will be displayed
const overview = document.querySelector(".overview");

// select the unordered list to display the repos list
const repoDisplay = document.querySelector(".repo-list")

const userName = "mathum49";
const getGitHubProfile = async function(){
    const getData = await fetch(`https://api.github.com/users/${userName}`);
    const data = await getData.json();
    // console.log(data);
    displayGitHubData(data);
};

getGitHubProfile();
    

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
}

const getRepo = async function (){
    const getRepoData = await fetch(`https://api.github.com/users/${userName}/repos?per_page=100&sort=updated`);
    const repoData = await getRepoData.json();
    displayRepos(repoData);
    // console.log(repoData);
};

// getRepo();

const displayRepos = function(repos){
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoDisplay.append(li);
    }
}