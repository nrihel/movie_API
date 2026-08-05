// API: http://www.omdbapi.com/?apikey=db4e97d3
const movieListEl = document.querySelector(".movie-list");
const titleInput = document.getElementById("Title");

async function main() {
    const Title =
        titleInput.value || localStorage.getItem("searchTitle");

    if (!movieListEl) {
        localStorage.setItem("searchTitle", Title);
        window.location.href = "./movie.html";
        return;
    }

    const response = await fetch(`http://www.omdbapi.com/?apikey=db4e97d3&s=${Title}`);
    const movieData = await response.json();
    const movies = movieData.Search || [];

    movieListEl.innerHTML = movies
        .map((movie) => movieHTML(movie))
        .join("");
}

main();

function showMovie(title) {
    localStorage.setItem("Title", title);
    window.location.href = `${window.location.origin}/movie.html`;
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

