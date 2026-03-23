const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);
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
