import { API_URL } from "./config.js";

// html 설정
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieOverview = document.getElementById("movie-overview");
const movieRating = document.getElementById("movie-rating");
const movieActors = document.getElementById("movie-actors");
const favoritesContainer = document.getElementById("favorites-container");

// url 설정
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function searchMovies(query) {
  try {
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>No result found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);

    moviesContainer.innerHTML = `<p>Error fetching movies. Please try again.</p>`;
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${
        movie.Poster !== "N/A" ? movie.Poster : "assets/no-image.png"
      }" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <button class="favorite-btn">Add to Favorites</button>
    `;

    movieCard.addEventListener("click", (e) => {
      if (e.target.classList.contains("favorite-btn")) {
        toggleFavorite();

        e.stopPropagation();
      } else {
        window.location.href = `details.html?id=${movie.imdbID}`;
      }
    });

    moviesContainer.appendChild(movieCard);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query) {
    searchMovies(query);
  }
});
