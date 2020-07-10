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
  title.innerText = `${e.name}`
  +`-S${e.season.toString().padStart(2,'0')}E${e.number.toString().padStart(2,'0')}`;
  imgBox.src = e.image.medium;
  para.innerHTML = e.summary;
});
}

//setting the filterd search results 
searchBar.addEventListener("keyup",episodesFilter)
function episodesFilter(event) {
    let filteredValue = event.target.value;
   let filteredList = allEpisodes.filter((result)=>{
     let namee = result.name;
     let text = result.summary;
    return namee.toLowerCase().includes(filteredValue.toLowerCase())||text.toLowerCase().includes(filteredValue.toLowerCase())
    })
    makePageForEpisodes(filteredList);
 
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
function dropDownSelection(event){
if(!event || !event.target) {
  return makePageForEpisodes(allEpisodes)
}
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
function showDropDownSelection(event) {
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
 // episodesFilter()
  //showDropDownSelection(allShows)
}

function shower() {
  makePageForEpisodes(allEpisodes)
}

window.onload = clearEverything;
///////showList try
function clearEverything() {
  rootElem.innerHTML ="";
 dropDown.style.display = "none";
 btn.style.display = "none"
  showListMaker();
}

console.log(allShows)


function showListMaker() {
  allShows.forEach(show=>{
  let showSlider = document.getElementById("showSlide")
let containerBox = document.createElement("div");
  containerBox.id = "container";
  let showTitle = document.createElement("h3");
  showTitle.id = "showTitle";
  let showImage = document.createElement("img");
  showImage.id = "image";
  let showSummary = document.createElement("p");
  showSummary.id = "summary"
  let showInfo = document.createElement("div")
  showInfo.id = "info";
  let rating = document.createElement("p");
  rating.id = "rating";
  let genres = document.createElement("p");
  genres.id = "genres";
  let status = document.createElement("p");
  status.id = "status";
  let runTime = document.createElement("p");
  runTime.id = "time";

    showTitle.innerHTML = `${show.name}`;
    showImage.src = show.image.medium;
    showSummary.innerHTML = `${show.summary}`
    rating = `Rating:${show.rating.average}`
    let reformat = show.genres.toString().replace(/,/g, "|")
    genres.innerText=`Genres:${reformat}`;
    status.innerText = `Status:${ show.status}`;
    runTime.innerText = `Run time:${ show.runtime} minutes`
     showSlider.appendChild(containerBox)
     containerBox.append(showTitle,showImage ,showSummary,showInfo )
     showInfo.append(rating,genres,status,runTime)
    
  });
  

}
console.log(allShows)
