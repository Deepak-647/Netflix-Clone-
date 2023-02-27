// //consts
const apikey = "f698128273e9ae27845b26528639770e";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apiPaths = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
  // fetchTrending :
  // fetchLatest:
  // fetchNetflixOriginals:
  // fetchTopRated:
  // fetchSimilarMovies:
  fetchMoviesList: (id) =>
    `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
};

// // boots up the app
function init() {
  fetchAndBuildAllSections();
}

function fetchAndBuildAllSections() {
  fetch(apiPaths.fetchAllCategories)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.genres;
      if (Array.isArray(categories) && categories.length) {
        categories.forEach((category) => {
          fetchAndbuildMovieSection(
            apiPaths.fetchMoviesList(category.id),
            category
          );
        });
      }
    })
    .catch((err) => console.error(err));
}

function fetchAndbuildMovieSection(fetchUrl, category) {
  console.log(fetchUrl, category);
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      // console.table(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMoviesSection(movies, category.name);
      }
    })
    .catch((err) => console.error(err));
}

function buildMoviesSection(list, categoryName) {
  console.log(list, categoryName);

  const moviesCont = document.getElementById("movies-cont");
  const moviesListHTML = list.map(item => {
      return`
      <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
      `;
            
        
    }).join("");
  const moviesSectionHTML = `
        <h2 class ="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
        <div class="movies-row">
        ${moviesListHTML}
        </div>
     
    `;
  console.log(moviesSectionHTML);

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHTML;

  //append HTML into movies container
  moviesCont.append(div);
}
window.addEventListener("load", function () {
  init();
});
