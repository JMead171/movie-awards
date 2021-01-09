// Declare variables
let movieApi = 'http://www.omdbapi.com/?s=';
let posterApi = 'http://img.omdbapi.com/?s=';
let apiKey = '&apikey=15761393';
let movieName = "";
let movieFormEl = document.querySelector('#search-movie');
let removeNomEl = document.querySelector('.nominations')
let nominateEl = document.querySelector('.movie-names')
let errorSearchEl = document.querySelector('.error-msg');
let movieInputEl = document.querySelector('#movie-input');
let movieArr = [];
let movieSearch = {};

// Fetch API and create DOM elements from search results
let getMovies = function(movieName) {
    let apiUrl = movieApi + movieName + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            // console.log(data);
            
            let inputEl = document.getElementById('movie-rm');
            if (inputEl != null) {
                inputEl.textContent = " ";
            };

            movieSearch = {};
            let resultsEl = document.querySelector('.movie-names');
            let results = document.createElement('h3');
            results.classList.add("results");
            resultsEl.appendChild(results);
            results.textContent = "Results for: ";
            let forMovieEl = document.querySelector('.movie-names');
            let forMovie = document.createElement('h3');
            forMovie.classList.add("for-results");
            forMovieEl.appendChild(forMovie);
            forMovie.innerHTML = `&nbsp` + movieName.toUpperCase();
           

            for (let i = 0; i < data["Search"].length; i++) {
                if (data["Search"][i]["Type"] === "movie") {
                    let displayMovie = data["Search"][i]["Title"];
                    let displayYear = data["Search"][i]["Year"];

                    // Create DOM elements for search results
                    let movieNameEl = document.querySelector('.movie-names');
                    let movieNm = document.createElement('p');
                    movieNameEl.appendChild(movieNm);
                    movieNm.innerHTML = displayMovie + ", " + displayYear;
                    // Create DOM nominate buttons
                    let movieBtnEl = document.querySelector('.movie-names'); 
                    let movieBtn = document.createElement('button');
                    movieBtnEl.appendChild(movieBtn); 
                    movieBtn.type = 'submit';
                    movieBtn.value = displayMovie + ", " + displayYear;
                    movieBtn.textContent = "Nominate";
                    movieBtn.id = "button"+i;
                    movieSearch[movieNm.innerHTML] = movieBtn.id;
                }
            }
            // Check to disable nominate button
            for (let i = 0; i < movieArr.length; i++) {
                if (movieArr[i] in movieSearch) {
                    let enable = movieSearch[movieArr[i]];
                    document.getElementById(enable).disabled = true;
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

// Get movie name from search 
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

// Save nominated movie to local storage and DOM
let saveNominee = function (event) {
    event.preventDefault();
    event.submitter.disabled = "true";
    let displayMovie = event.submitter.value;
    // Create DOM for nominated movies
    let movieNameEl = document.querySelector('.nominations');
    let movieNm = document.createElement('p');
    movieNameEl.appendChild(movieNm);
    movieNm.innerHTML = displayMovie;
    saveToStorage(displayMovie);
    // Create DOM remove buttons
    let movieBtnEl = document.querySelector('.nominations'); 
    let movieBtn = document.createElement('button');
    movieBtnEl.appendChild(movieBtn); 
    movieBtn.type = 'submit';
    movieBtn.value = displayMovie;
    movieBtn.textContent = "Remove";
    movieBtn.id = "button"
};

// Remove nominated movie from local storage and DOM
let removeNominee = function (event) {
    event.preventDefault();
    let removeMovie = event.submitter.value;
    if ("Nomination" in localStorage) {
        let storageData = localStorage.getItem("Nomination");
        movieArr = JSON.parse(storageData);

        for (let i = 0; i < movieArr.length; i++) {
            if (removeMovie === movieArr[i]) {
                movieArr.splice(i,1);
                localStorage.setItem("Nomination", JSON.stringify(movieArr));
                let enable = movieSearch[removeMovie];
                if (document.getElementById(enable) != null) {
                    document.getElementById(enable).disabled = false;
   
                }
            }   
        }
        let inputEl = document.getElementById('nom-rm');
        if (inputEl != null) {
            inputEl.textContent = " ";
            let nomEl = document.querySelector('.nominations');
            let nomin = document.createElement('h3');
            nomEl.appendChild(nomin);
            nomin.textContent = "Nominations";
        };
        loadNominations(); 
    }
};

// Save nominations to local storage
let saveToStorage = function (movie) {
    if ("Nomination" in localStorage) {
        let storageData = localStorage.getItem("Nomination");
        movieArr = JSON.parse(storageData);
    };

    movieArr.push(movie);
    localStorage.setItem("Nomination", JSON.stringify(movieArr));
};

// First time load nominations from local storage
let loadNominations = function () {
    if ("Nomination" in localStorage) {
        let storageData = localStorage.getItem("Nomination");
        movieArr = JSON.parse(storageData);

        for (let i = 0; i < movieArr.length; i++) {
            let displayMovie = movieArr[i];
            // Create DOM nominations from local storage
            let movieNameEl = document.querySelector('.nominations');
            let movieNm = document.createElement('p');
            movieNameEl.appendChild(movieNm);
            movieNm.innerHTML = displayMovie;
            // Create DOM remove buttons
            let movieBtnEl = document.querySelector('.nominations'); 
            let movieBtn = document.createElement('button');
            movieBtnEl.appendChild(movieBtn); 
            movieBtn.type = 'submit';
            movieBtn.value = displayMovie;
            movieBtn.textContent = "Remove";
            movieBtn.id = "button"
        }
    } 
};

// First time in 
loadNominations();

// Listen for button clicks
movieFormEl.addEventListener("submit", getSearchName);
nominateEl.addEventListener("submit", saveNominee);
removeNomEl.addEventListener("submit", removeNominee);