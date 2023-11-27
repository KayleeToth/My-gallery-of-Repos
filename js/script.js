// This div is where your profile name will appear.
const profile = document.querySelector(".overview");
const userame = "kayleeToth";

// create and name an async function to fetch information from your GitHub profile. 

const gitCreatorInfo = async function () {
    const creatorInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await creatorInfo.json();
    console.log(data);
    displayCreatorInfo(data);
  };
  
  gitCreatorInfo();
  
  const displayCreatorInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("creator-info");
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
  };