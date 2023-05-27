window.onkeyup = retrieveTitle;

function showUserInput(HomeTitle){
localStorage.setItem("HomeTitle",HomeTitle)
Window.location.href = `${window.location.origin}/movie.html`
}
function retrieveTitle(event) {
    let searchBtn = document.querySelector(".btn--search");
    const movieTitle = event.target.value;
    searchBtn.addEventListener("click", () => {
      movieTitle=showUserInput(movieTitle)
    });
    if (event.keycode == 13) {
      movieTitle=showUserInput(movieTitle)
    }
    return movieTitle
  }