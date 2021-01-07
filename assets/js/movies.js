let movieApi = 'http://www.omdbapi.com/?s=';
let posterApi = 'http://img.omdbapi.com/?s=';
let apiKey = '&apikey=15761393';
let movieName = "";
let movieFormEl = document.querySelector('#search-movie');
let errorSearchEl = document.querySelector('.error-msg');
let movieInputEl = document.querySelector('#movie-input');


let getMovies = function(movieName) {
    let apiUrl = movieApi + movieName + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            
            for (let i = 0; i < data["Search"].length; i++) {
                let displayMovie = data["Search"][i]["Title"];
                // displayMovie.textContent = "";
                let movieNameEl = document.querySelector('.movie-names');
                let movieNm = document.createElement('p');
                // movieNameEl.textContent = "";
                movieNameEl.appendChild(movieNm);
                movieNm.textContent = displayMovie;    
            }

            });
        } else {
            console(response.statustext);
        }
    })
    .catch(function (error) {
        console.error(err);
    });
};

let getSearchName = function (event) {
    event.preventDefault();
    errorSearchEl.textContent = "";
    movieName = movieInputEl.value.trim();
    if (movieName) {
        getMovies(movieName);
        movieInputEl.value ="";
    } else {
        errorSearchEl.textContent = "Please enter a valid movie name";
    }
};


movieFormEl.addEventListener("submit", getSearchName);