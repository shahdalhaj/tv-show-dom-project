//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function makePageForEpisodes(episodeList) {
  const display = document.getElementById("display");
  display.innerText = `Display ${episodeList.length}/${allEpisodes.length}`;
  rootElem.innerHTML = "";
  episodeList.forEach(e => {
  const boxBody = document.createElement('div');
  boxBody.style.display ="flex";
  boxBody.style.flexDirection = "column";
  boxBody.style.backgroundColor = "rgb(230, 252, 243)";
  boxBody.style.margin ="1.5em";
  boxBody.style.width ="250px";
  boxBody.style.height ="380px";
  boxBody.style.borderTop ="1px solid black";
  boxBody.style.borderBottom ="1px solid black";
  boxBody.style.borderLeft ="1.5px solid black";
  boxBody.style.borderRadius = "4px";
  const title = document.createElement('h3');
  title.style.textAlign = "center";
  title.style.color = "coral";
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
  para.style.fontSize = "12px";
  para.style.margin = "0.3em";
  para.style.paddingLeft = "0.3em";
  para.style.paddingRight = "0.3em";
 /*  console.log(rootElem) */
});
}

//setting the filterd search results 
let searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", function(p){
  let filteredValue = p.target.value;
  filteredValue = filteredValue.toLowerCase();
 let filteredList = allEpisodes.filter((result)=>{
   let name = result.name;
   let text = result.summary;
  return name.includes(filteredValue)||text.includes(filteredValue)
  })
  makePageForEpisodes(filteredList);
});
 //display the Episodes on the selector menu
 const myList = document.getElementById("list");
let menu = allEpisodes.forEach(element => {
  let options = document.createElement('option');
  options.innerHTML =  `${element.name}`
  +  `-S${element.season.toString().padStart(2,'0')}E${element.number.toString().padStart(2,'0')}`;
  myList.appendChild(options)
});
// episode selector/picker
myList.addEventListener("change",function(w){
let selector = w.target.value;
let chosenEpi = allEpisodes.filter((key)=>{
key =  `${key.name}`
+  `-S${key.season.toString().padStart(2,'0')}E${key.number.toString().padStart(2,'0')}`;
return key === selector
});

  makePageForEpisodes(chosenEpi) 


});




window.onload = setup;
