const movieEl = document.querySelector(".movies--wrapper");
window.onkeyup = retrieveTitle;
let movieData;
const HomeTitle = localStorage.getItem("HomeTitle");


//retrieving user input
function retrieveTitle(event) {
  let searchBtn = document.querySelector(".btn--search");
  const movieTitle = event.target.value;
console.log(movieTitle)
  searchBtn.addEventListener("click", () => {
    renderMovie(movieTitle);
  });
  if (event.keycode == 13) {
    renderMovie(movieTitle);
  }
}
//loading movies entered on home page
function onLoadHomeTitle(HomeTitle) {
  if (HomeTitle) {
    renderMovie(HomeTitle);
    localStorage.clear();
  }
  localStorage.clear();
}
onLoadHomeTitle(HomeTitle);

//retrieving movie data/sorting data
async function renderMovie(movieTitleOrData) {
  let moviesToDisplay;
  
  movieEl.classList += (" movies__loading")

  if (typeof movieTitleOrData === "string") {
    //checks wheter movieTitleorData is a string or an array
    const data = await fetch(
      `https://www.omdbapi.com/?s=${movieTitleOrData}&apikey=ddfdef6`
    );
      movieData = await data.json();

    moviesToDisplay = movieData.Search.slice(0, 8).filter(
      (movie) => movie.Poster !== "N/A" //only display movies with poster
    );
  } else {
    moviesToDisplay = movieTitleOrData; 

  }
  movieEl.classList.remove("movies__loading")
  
  movieEl.innerHTML = moviesToDisplay.map((movie) => movieHtml(movie)).join("");
 
 
}

function movieHtml(movie) {
  return `<div class="movie">
    <div class="movie__img--wrapper">
      <img class="movie__img" src="${movie.Poster}" alt="">
    </div>
    <div class="movie__title">
     <p class="movie-title">${movie.Title}<br></p>
    </div>
    <div class="movie__year">
    <p class="movie-year">${movie.Year}</p>
    </div>
  </div>`;
}

function filterMovies(event) {
  sortData(event.target.value);
}

function sortData(filter) {
  let sorted;
  console.log(movieData);
  if (filter === "OLD_TO_NEW") {
    sorted = movieData.Search.slice(0, 8).sort((a, b) => a.Year - b.Year);
  } else if (filter === "NEW_TO_OLD") {
    sorted = movieData.Search.slice(0, 8).sort((a, b) => b.Year - a.Year);
  }
  return renderMovie(sorted);
}
