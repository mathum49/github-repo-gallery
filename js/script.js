// select the space where profile information will be displayed
const overview = document.querySelector(".overview");

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
}