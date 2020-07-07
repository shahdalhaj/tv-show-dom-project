//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const dropDown = document.getElementById("list");
let allEpisodes = getAllEpisodes();
const searchBar = document.getElementById("search");
const display = document.getElementById("display");
const btn = document.getElementById("btn")
let allShows = getAllShows();
const showDropDown = document.getElementById("showList")
let initialId = "82";
let shows = [];

let showId = allShows.map(el=> el.id);

 function showDisplayer(showId){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
  .then(response => response.json())
  .then((data) =>{ shows = [...data] 
  makePageForEpisodes(data)
  allEpisodes = data
  displayer()
  dropDownSelection(data)})
  .catch((error) => console.log(error));
} 

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  display.innerText = `Display: ${episodeList.length}/${allShows.length}`;
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
  title.innerText = `${e.name}`
  +`-S${e.season.toString().padStart(2,'0')}E${e.number.toString().padStart(2,'0')}`;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
});
}

//setting the filterd search results 
function episodesFilter() {
  searchBar.addEventListener("keyup", function(p){
    let filteredValue = p.target.value;
   let filteredList = allEpisodes.filter((result)=>{
     let namee = result.name;
     let text = result.summary;
    return namee.toLowerCase().includes(filteredValue.toLowerCase())||text.toLowerCase().includes(filteredValue.toLowerCase())
    })
    makePageForEpisodes(filteredList);
  });
}

 //display the Episodes on the selector menu/dropDown
 function displayer() {
   dropDown.innerHTML = "";
  allEpisodes.forEach(element => {
    let options = document.createElement('option');
    options.innerText = `S${element.season.toString().padStart(2,'0')}E${element.number.toString().padStart(2,'0')}-${element.name}`;
    dropDown.appendChild(options)
  });
 }


// episode selector/picker
 dropDown.addEventListener("change",dropDownSelection)
function dropDownSelection(selector){
selector = event.target.value
let chosenEpi = allEpisodes.filter((match)=>{
match = `S${match.season.toString().padStart(2,'0')}E${match.number.toString().padStart(2,'0')}-${match.name}`;
return match === selector ;
});
if (selector === "Select an Episode") {
  return makePageForEpisodes(allEpisodes)
} else {
  return makePageForEpisodes(chosenEpi)
}
} 

// Display shows Dropdown
function showsDropDownMenu() {
  for (let x = 0; x < sorted.length; x++) {
   let showOptions = document.createElement('option');
   showOptions.innerText =`${sorted[x].name}`;
   showDropDown.appendChild(showOptions)
  }
  }

 //sorting alphabetically before display on select list
 const sorted = allShows.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); 
  var nameB = b.name.toUpperCase(); 
  if (nameA < nameB) {
    return -1; 
  }
  if (nameA > nameB) {
    return 1; 
  }
  return 0;  
});

//show Selector based on the show id
showDropDown.addEventListener("change",showDropDownSelection)
function showDropDownSelection(selector2) {
   selector2 = event.target.value;
    let chosenShow = sorted.filter((match2)=>{
      match2 = `${match2.name}`;
      return match2 === selector2 ;
    })
     if (selector2 === "Show Selector") {
      return showDisplayer(initialId)
    } else {
      return showDisplayer(chosenShow[0].id)
    }
}
 
function setup() {
  showsDropDownMenu()
  showDisplayer(initialId)
  makePageForEpisodes(allEpisodes);
  displayer()
  episodesFilter()
  dropDownSelection()
  showDropDownSelection(allShows)
}

function shower() {
  makePageForEpisodes(allEpisodes)
}

window.onload = setup;
