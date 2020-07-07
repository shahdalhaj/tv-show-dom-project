//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const dropDown = document.getElementById("list");
const allEpisodes = getAllEpisodes();
const searchBar = document.getElementById("search");
const display = document.getElementById("display");
const btn = document.getElementById("btn")
const allShows = getAllShows();
const showDropDown = document.getElementById("showList")
let initialId = "82";
let shows = [];

let showId = allShows.map(el=> el.id);
//console.log(showId)

 function showDisplayer(showId){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
  .then(response => response.json())
  .then((data) =>{ shows = [...data] 
  makePageForEpisodes(data)
  dropDownSelection(data)})
  .catch((error) => console.log(error));
} 

function makeListForEchEpi(episodes) {
  episodes.forEach((episode) => dropDownSelection(episode));
}
 //sorting based on alphabetically before display on select list
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


console.log(allShows)
// Display shows Dropdown
function showsDropDownMenu() {
   for (let x = 0; x < sorted.length; x++) {
    let showOptions = document.createElement('option');
    showOptions.innerText =`${sorted[x].name}`;
    showDropDown.appendChild(showOptions)
   }
   }






function shower() {
  makePageForEpisodes(allEpisodes)
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
  allEpisodes.forEach(element => {
    let options = document.createElement('option');
    options.innerText = `S${element.season.toString().padStart(2,'0')}E${element.number.toString().padStart(2,'0')}-${element.name}`;
    dropDown.appendChild(options)
  });
 }



// episode selector/picker
function dropDownSelection(){
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
}

//show Selector based on the show id
function showDropDownSelection() {
  showDropDown.addEventListener("change",function(o){
    let selector2 = o.target.value;
    console.log(selector2)
    let chosenShow = sorted.filter((find)=>{
      find = find.name ;
      return selector2 === find;
    })
    if (selector2 === "Show Selector") {
      return showDisplayer(initialId)
    } else {
      return showDisplayer(chosenShow[0].id)
    }
  })
}
 function makeListForEachShow(episode) {
   
 }

function setup() {
  showsDropDownMenu()
  showDisplayer(initialId)
  makePageForEpisodes(allEpisodes);
  displayer()
  episodesFilter()
  dropDownSelection()
  showDropDownSelection()
}

window.onload = setup;
