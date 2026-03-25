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

  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
           ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget: </span>$${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue: </span>$${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} Minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
   </div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// Display tv Details
async function tvDetails() {
  const tvId = window.location.search.split("=")[1];
  console.log(tvId);
  const show = await fetchAPIData(`tv/${tvId}`);
  console.log(show);

  displayBackgroundImage("show", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${show.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
           ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            
            <li><span class="text-secondary">Runtime:</span> ${show.number_of_seasons} Seasons</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
   </div>
        </div>`;

  document.querySelector("#show-details").appendChild(div);
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

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayBackgroundImage(type, backdropPath) {
  const overlay = document.createElement("div");
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropPath})`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.opacity = "0.1";
  overlay.style.zIndex = "-1";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlay);
  } else {
    document.querySelector("#show-details").appendChild(overlay);
  }
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = ` 
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating"><i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10</h4>
            `;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
    case "flix-movie-app/index.html":
      displaySlider();
      displayPopularMovies();

      break;
    case "/shows.html":
    case "/flix-movie-app/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
    case "/flix-movie-app/movie-details.html":
      MovieDetails();
      break;
    case "/tv-details.html":
    case "/flix-movie-app/tv-details.html":
      tvDetails();
      break;
    case "/search.html":
    case "/flix-movie-app/search.html":
      console.log("Search");
      break;
  }
  highlightSection();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
