//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  const display = document.getElementById("display");
  display.innerText = `Display ${episodeList.length}/${allEpisodes.length}`;
  episodeList.forEach(e => {
  const boxBody = document.createElement('div');
  boxBody.id = "boxBody";
  const title = document.createElement('h3');
  title.id = "title";
  const imgBox = document.createElement('img');
  imgBox.id = "imgBox";
  const para = document.createElement('p');
  para.id = "para"
  rootElem.appendChild(boxBody);
  boxBody.appendChild(title);
  boxBody.appendChild(imgBox);
  boxBody.appendChild(para);
  title.innerHTML = `${e.name}`
  +`-S${e.season.toString().padStart(2,'0')}E${e.number.toString().padStart(2,'0')}`;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
});
}

//setting the filterd search results 
let searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", function(p){
  let filteredValue = p.target.value;
 let filteredList = allEpisodes.filter((result)=>{
   let name = result.name;
   let text = result.summary;
  return name.toLowerCase().includes(filteredValue)||text.toLowerCase().includes(filteredValue)
  })
  makePageForEpisodes(filteredList);
});
 //display the Episodes on the selector menu
 const myList = document.getElementById("list");
allEpisodes.forEach(element => {
  let options = document.createElement('option');
  options.innerHTML = `S${element.season.toString().padStart(2,'0')}E${element.number.toString().padStart(2,'0')}-${element.name}`;
  myList.appendChild(options)
});
// episode selector/picker
myList.addEventListener("change",function(w){
let selector = w.target.value;
let chosenEpi = allEpisodes.filter((match)=>{
match =  `${match.name}`
+  `-S${match.season.toString().padStart(2,'0')}E${match.number.toString().padStart(2,'0')}`;
return match === selector
});

  makePageForEpisodes(chosenEpi) 
});
//when i click on an episode name from the select box/menu i can get the episode but i can not go back to display all the episode again when i select the first option "select an episode " i want a hint or idea of how to fix that i tried to add if statement to my filter and still did not work if(match === selector){return makePageForEpisodes(chosenEpi)}else{makePageForEpisodes};
//





window.onload = setup;
