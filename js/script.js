const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <div>
          <a href="movie-details.html?id=${movie.id}">
            
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
    console.log(results[0].title);
  });
}

async function fetchAPIData(endpoint) {
  const apiKey = "9de76fd013cee893b1bef49f5429526a";
  const apiUrl = "https://api.themoviedb.org/3/";
  const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`);
  const data = await response.json();

  return data;
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
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
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
