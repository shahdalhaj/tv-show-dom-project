//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const dropDown = document.getElementById("list");
const allEpisodes = getAllEpisodes();
const searchBar = document.getElementById("search");
const display = document.getElementById("display");


function setup() {
  makePageForEpisodes(allEpisodes);
}


function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  display.innerText = `Display: ${episodeList.length}/${allEpisodes.length}`;
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
  boxBody.append(title,imgBox,para);
  title.innerHTML = `${e.name}`
  +`-S${e.season.toString().padStart(2,'0')}E${e.number.toString().padStart(2,'0')}`;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
});
}

//setting the filterd search results 
searchBar.addEventListener("keyup", function(p){
  let filteredValue = p.target.value;
 let filteredList = allEpisodes.filter((result)=>{
   let namee = result.name;
   let text = result.summary;
  return namee.toLowerCase().includes(filteredValue.toLowerCase())||text.toLowerCase().includes(filteredValue.toLowerCase())
  })
  makePageForEpisodes(filteredList);
});


 //display the Episodes on the selector menu/dropDown
allEpisodes.forEach(element => {
  let options = document.createElement('option');
  options.innerHTML = `S${element.season.toString().padStart(2,'0')}E${element.number.toString().padStart(2,'0')}-${element.name}`;
  dropDown.appendChild(options)
});


// episode selector/picker
 dropDown.addEventListener("change",function(w){
let selector = w.target.value;
let chosenEpi = allEpisodes.filter((match)=>{
match = `S${match.season.toString().padStart(2,'0')}E${match.number.toString().padStart(2,'0')}-${match.name}`;
return match === selector ;
});
if (selector === "Select an Episode") {
  return makePageForEpisodes(allEpisodes)
} else {
  return makePageForEpisodes(chosenEpi)
}
}); 


window.onload = setup;
