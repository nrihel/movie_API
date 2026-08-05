// API: http://www.omdbapi.com/?apikey=db4e97d3
const movieListEl = document.querySelector(".movie-list");

async function main() {
    const movies = await fetch(`http://www.omdbapi.com/?apikey=db4e97d3&s=${Title.value}`);
    const movieData = await movies.json();document.getElementById("Title");
    movieListEl.innerHTML = movieData.map((movie) => movieHTML(movie)).join("");
}

main();

function showMovie(title) {
    localStorage.setItem("Title", title);
    window.location.href = `${window.location.origin}/movie.html`
}

function movieHTML(movie) {
    return `<div class="movie-card" onclick="showMovie('${movie.Title}')">
    <div class="movie-card__container">
        <h3>${movie.Title}</h3>
        <p>Release Date: ${movie.Released}</p>
        <p>Genre: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
    </div>
</div>`;
}

