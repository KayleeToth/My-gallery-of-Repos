// This div is where your profile name will appear.
const profile = document.querySelector(".overview");
const username = "Kaylee Toth";

// create and name an async function to fetch information from your GitHub profile. 

const gitCreatorInfo = async function () {
    const creatorInfo = await fetch(`/https://api.github.com/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/users/${username}`);
    const data = await creatorInfo.json();
    //console.log(data);
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
    overview.append(div);
  };