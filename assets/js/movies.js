let movieApi = 'http://www.omdbapi.com/?s=';
let posterApi = 'http://img.omdbapi.com/?s=';
let apiKey = '&apikey=15761393';
let movieName = "";
let movieFormEl = document.querySelector('#search-movie');
let nominateEl = document.querySelector('.movie-names')
let errorSearchEl = document.querySelector('.error-msg');
let movieInputEl = document.querySelector('#movie-input');


let getMovies = function(movieName) {
    let apiUrl = movieApi + movieName + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            
            let inputEl = document.getElementById('movie-rm');
            if (inputEl != null) {
                inputEl.placeholder = " ";
                inputEl.textContent = " ";
            };

            let resultsEl = document.querySelector('.movie-names');
            let results = document.createElement('h3');
            resultsEl.appendChild(results);
            results.textContent = "Results for: " + movieName;

            for (let i = 0; i < data["Search"].length; i++) {
                if (data["Search"][i]["Type"] === "movie") {
                    let displayMovie = data["Search"][i]["Title"];
                    // Search results
                    let movieNameEl = document.querySelector('.movie-names');
                    let movieNm = document.createElement('p');
                    movieNameEl.appendChild(movieNm);
                    movieNm.innerHTML = displayMovie;
                    // movieNm.className = "no-outline";
                    // Buttons
                    let movieBtnEl = document.querySelector('.movie-names'); 
                    let movieBtn = document.createElement('button');
                    movieBtnEl.appendChild(movieBtn); 
                    movieBtn.type = 'submit';
                    movieBtn.value = displayMovie;
                    movieBtn.textContent = "Nominate";
                    movieBtn.id = "button";
                }
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

let saveNominee = function (event) {
    event.preventDefault();
    let displayMovie = event.submitter.value;
    // Search results
    let movieNameEl = document.querySelector('.nominations');
    let movieNm = document.createElement('p');
    movieNameEl.appendChild(movieNm);
    movieNm.innerHTML = displayMovie;
    // movieNm.className = "no-outline";
    // Buttons
    let movieBtnEl = document.querySelector('.nominations'); 
    let movieBtn = document.createElement('button');
    movieBtnEl.appendChild(movieBtn); 
    movieBtn.type = 'submit';
    movieBtn.value = displayMovie;
    movieBtn.textContent = "Remove";
    movieBtn.id = "button"
};

movieFormEl.addEventListener("submit", getSearchName);
nominateEl.addEventListener("submit", saveNominee);