let movieApi = 'http://www.omdbapi.com/?s=';
let posterApi = 'http://img.omdbapi.com/?s=';
let apiKey = '&apikey=15761393';
let movieName = "";


let getMovies = function(movieName) {
    let apiUrl = movieApi + movieName + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            console(response.statustext);
        }
    })
    .catch(function (error) {
        console.error(err);
    });
};

getMovies("rambo");