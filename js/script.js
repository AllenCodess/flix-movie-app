const global = {
  currentPage: window.location.pathname,
};

// Display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <div>
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img 
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">${movie.release_date}</small>
            </p>
          </div>
        </div>`;
    const popularMoviesEl = document.querySelector("#popular-movies");
    popularMoviesEl.appendChild(div);
  });
}

// Display Popular Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <div>
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.original_name}"
            />`
                : `<img 
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.original_name}">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">${show.first_air_date}</small>
            </p>
          </div>
        </div>`;
    const popularShowsEl = document.querySelector("#popular-shows");
    popularShowsEl.appendChild(div);
  });
}

// Display Movie Details
async function MovieDetails() {
  const movieId = window.location.search.split("=")[1];
  console.log(movieId);
  const movie = await fetchAPIData(`movie/${movieId}`);
  console.log(movie);
  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average}
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>${movie.genres[0].name}</li>
              <li>${movie.genres[1].name}</li>
              <li>${movie.genres[2].name}</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies[0].name}, ${movie.production_companies[1].name}, ${movie.production_companies[2].name} </div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// Fetches Data
async function fetchAPIData(endpoint) {
  const apiKey = "9de76fd013cee893b1bef49f5429526a";
  const apiUrl = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`);
  const data = await response.json();
  hideSpinner();
  return data;
}

// Cosmetics
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightSection() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      MovieDetails();
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightSection();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
