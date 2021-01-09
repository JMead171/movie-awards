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


let getMovies = function(movieName) {
    let apiUrl = movieApi + movieName + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            
            let inputEl = document.getElementById('movie-rm');
            if (inputEl != null) {
                inputEl.textContent = " ";
            };

            movieSearch = {};
            let resultsEl = document.querySelector('.movie-names');
            let results = document.createElement('h3');
            resultsEl.appendChild(results);
            results.textContent = "Results for: " + movieName;

            for (let i = 0; i < data["Search"].length; i++) {
                if (data["Search"][i]["Type"] === "movie") {
                    let displayMovie = data["Search"][i]["Title"];
                    let displayYear = data["Search"][i]["Year"];

                    // Search results
                    let movieNameEl = document.querySelector('.movie-names');
                    let movieNm = document.createElement('p');
                    movieNameEl.appendChild(movieNm);
                    movieNm.innerHTML = displayMovie + ", " + displayYear;
                    // Buttons
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
            console.log("Help: ", movieSearch);
            for (let i = 0; i < movieArr.length; i++) {
                if (movieArr[i] in movieSearch) {
                    let enable = movieSearch[movieArr[i]];
                    document.getElementById(enable).disabled = true;
                }
            }
            console.log("Obj: ", movieSearch);
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
    console.log("Button....: ", event);
    event.submitter.disabled = "true";
    let displayMovie = event.submitter.value;
    // Search results
    let movieNameEl = document.querySelector('.nominations');
    let movieNm = document.createElement('p');
    movieNameEl.appendChild(movieNm);
    movieNm.innerHTML = displayMovie;
    saveToStorage(displayMovie);
    // Buttons
    let movieBtnEl = document.querySelector('.nominations'); 
    let movieBtn = document.createElement('button');
    movieBtnEl.appendChild(movieBtn); 
    movieBtn.type = 'submit';
    movieBtn.value = displayMovie;
    movieBtn.textContent = "Remove";
    movieBtn.id = "button"
};


let removeNominee = function (event) {
    event.preventDefault();
    console.log("Remove.....", event.submitter.value);
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

let saveToStorage = function (movie) {
    if ("Nomination" in localStorage) {
        let storageData = localStorage.getItem("Nomination");
        movieArr = JSON.parse(storageData);
    };

    movieArr.push(movie);
    localStorage.setItem("Nomination", JSON.stringify(movieArr));
};

let loadNominations = function () {
    if ("Nomination" in localStorage) {
        let storageData = localStorage.getItem("Nomination");
        movieArr = JSON.parse(storageData);

        for (let i = 0; i < movieArr.length; i++) {
            let displayMovie = movieArr[i];
            // Search results
            let movieNameEl = document.querySelector('.nominations');
            let movieNm = document.createElement('p');
            movieNameEl.appendChild(movieNm);
            movieNm.innerHTML = displayMovie;
            // Buttons
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

loadNominations();
movieFormEl.addEventListener("submit", getSearchName);
nominateEl.addEventListener("submit", saveNominee);
removeNomEl.addEventListener("submit", removeNominee);