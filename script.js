//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
function makePageForEpisodes(episodeList) {
 
 /* rootElem.textContent = `Got ${episodeList.length} episode(s)`; */
 
episodeList.forEach(e => {
  const boxBody = document.createElement('div');
  boxBody.style.display ="flex";
  boxBody.style.flexDirection = "column";
  boxBody.style.backgroundColor = "#e8c4f8";
  boxBody.style.margin ="1.5em";
  boxBody.style.width ="250px";
  boxBody.style.height ="330px";
  boxBody.style.border ="1px solid #7fe672";
  boxBody.style.borderRadius = "9px";
  const title = document.createElement('h3');
  title.style.textAlign = "center";
  title.style.color = "#f14268";
  title.style.backgroundColor = "#eee";
  title.style.border = "1px solid #e6f7b0"
  title.style.borderRadius = "7px"
  title.style.padding = "1px";
  const imgBox = document.createElement('img');
  const para = document.createElement('p');
  para.style.backgroundColor= "#eee"
  rootElem.appendChild(boxBody);
  boxBody.appendChild(title);
  boxBody.appendChild(imgBox);
  boxBody.appendChild(para);
  title.innerHTML = e.name +" S"+ "0"+e.season+"E0"+e.number;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
  para.style.fontFamily = " Georgia, 'Times New Roman', Times, serif";
  para.style.fontSize = "smaller";
  para.style.paddingBottom = "0.4em";
  para.style.paddingLeft = "0.3em";
  para.style.paddingRight = "0.3em";
  
 /*  console.log(rootElem) */
});
}

window.onload = setup;
