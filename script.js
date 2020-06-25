//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
function makePageForEpisodes(episodeList) {

const display = document.getElementById("display");
display.innerText = " Display: 0/73";

 
 /* rootElem.textContent = `Got ${episodeList.length} episode(s)`; */
 
episodeList.forEach(e => {
  const boxBody = document.createElement('div');
  boxBody.style.display ="flex";
  boxBody.style.flexDirection = "column";
  boxBody.style.backgroundColor = "black";
  boxBody.style.margin ="1.5em";
  boxBody.style.width ="250px";
  boxBody.style.height ="330px";
  boxBody.style.border ="3px solid black";
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
  rootElem.appendChild(boxBody);
  boxBody.appendChild(title);
  boxBody.appendChild(imgBox);
  boxBody.appendChild(para);
  title.innerHTML = `${e.name}`
  +  `-S${e.season.toString().padStart(2,'0')}E${e.number.toString().padStart(2,'0')}`;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
  para.style.fontFamily = " Georgia, 'Times New Roman', Times, serif";
  para.style.fontSize = "smaller";
  para.style.margin = "0.3em";
  para.style.paddingLeft = "0.3em";
  para.style.paddingRight = "0.3em";
  
 /*  console.log(rootElem) */
});
}
//setting the filterd search results 
const myInput = document.getElementById("search");
//const myList = document.getElementsById("list");




  myInput.addEventListener('keyup', function(){
    const result = this.value.toLowerCase();
    console.log(result)
    });
 
  

window.onload = setup;
