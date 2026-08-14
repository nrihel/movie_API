// API: http://www.omdbapi.com/?apikey=db4e97d3
const movieListEl = document.querySelector(".movie-list");
const titleInput = document.getElementById("Title");
const loader = document.getElementById("loader");

let movie = [];

async function main() {
  
    const Title =
        titleInput.value || localStorage.getItem("Title");

    if (!movieListEl) {
        localStorage.setItem("Title", Title);
        window.location.href = "movie.html";
        return;
    }


    loader.classList.add("visible");

    const response = await fetch(`https://www.omdbapi.com/?apikey=db4e97d3&s=${Title}`);
    const movieData = await response.json();
    movie = movieData.Search || [];

    setTimeout(() => {
    loader.classList.remove("visible");
    renderMovie();
    }, 1000);
}

if (movieListEl) {
  main();
}

function showMovie(title) {
    localStorage.setItem("Title", title);
    window.location.href = "./movie.html";
}

function movieHTML(movie) {
    return `<div class="movie-card" onclick="showMovie('${movie.Title}')">
    <div class="movie-card__container">
        <h3>${movie.Title}</h3>
        <p>Release Date: ${movie.Year}</p>
        <img src="${movie.Poster}" alt="${movie.Title}">
    </div>
</div>`;
}

function renderMovie(filter) {
  const movieWrapper = document.querySelector(".movie-list");

  if (filter === 'newest') {
    movie.sort((a, b) => (b.Year) - (a.Year));
  }  else if (filter === 'oldest') {
    movie.sort((a, b) => (a.Year) - (b.Year));
  }

  movieListEl.innerHTML = movie.map((movie) => movieHTML(movie)).join("");
}

function filterMovie(event) {
  renderMovie(event.target.value);
}
