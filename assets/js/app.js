window.onload = function () {
    console.log("Ghibli Movies :D")
    getData();
};

function getData() {
    let ghibliUrl = 'https://ghibliapi.herokuapp.com/films';

    const ghibliApi = new XMLHttpRequest();
    ghibliApi.open('GET', ghibliUrl, true);
    ghibliApi.send();

    ghibliApi.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let data = JSON.parse(this.responseText);

            for (let i = 0; i < data.length; i++) {
                getMovies(data[i])
            }
        }
    }
}

function getMovies(movie) {
    let film = movie.title;

    if (film == '') {
        console.error('Film is empty');
    }
    else {
        let posterUrl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film.replace(/ /g, "%20");

        const posterApi = new XMLHttpRequest();
        posterApi.open('GET', posterUrl, true);
        posterApi.send();

        posterApi.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                let poster = JSON.parse(this.responseText);
                let display = document.querySelector('#display');

                //Animation id:16
                //Original Language: japanese
                for (let i = 0; i < poster.results.length; i++) {
                    let language = poster.results[i].original_language;
                    let genres = poster.results[i].genre_ids;
                    let image = 'https://image.tmdb.org/t/p/w500/' + poster.results[i].poster_path;
                    let movieId = poster.results[i].id;

                    if (language == "ja" && genres.includes(16)) {
                        display.innerHTML += `
                            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 movie-item mb-4">
                                <div class="card box-shadow h-100">
                                    <figure>
                                        <img class="card-img-top" src="${image}" alt="${film}">
                                        <a href="#" id="${movieId}" class="link-details" onclick="return false;"><i class="fas fa-info"></i></a>
                                    </figure>
                                    <div class="card-body">
                                        <p class="card-text">
                                            ${film}
                                        </p>
                                    </div>
                                </div>
                            </div>`;
                        break;
                    }
                }
                addMovieEvents();
            }
        }
    }
}

function addMovieEvents() {
    document.querySelectorAll('.link-details').forEach(function (element) {
        element.addEventListener('click', function () {
            getMovieInfo(this.id);
        })
    });
}

function getMovieInfo(movieId) {
    //image = 'https://image.tmdb.org/t/p/w500/' + poster.results[i].poster_path;
    // let movieId = poster.result[i].id;
    let movieUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb';

    const movieApi = new XMLHttpRequest();
    movieApi.open('GET', movieUrl, true);
    movieApi.send();

    movieApi.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let movie = JSON.parse(this.responseText);

            var poster = document.getElementById('poster');
            var modalTitle = document.querySelector('#modalTitle');
            var title = document.querySelector('#title');
            var original = document.querySelector('#original');
            var genres = document.querySelector('#genres');
            var sinopsis = document.querySelector('#sinopsis');
            var usrScore = document.querySelector('#usrScore');
            var date = document.querySelector('#date');
            var duration = document.querySelector('#duration');

            let movieGenres = '';
            for (let i in movie.genres) {
                if (i == (movie.genres.length - 1)) {
                    movieGenres += movie.genres[i].name;
                } else {
                    movieGenres += movie.genres[i].name + ', ';
                }
            }

            var time = function (n) {
                var minutes = n % 60;
                var hours = (n - minutes) / 60;
                return hours + 'h ' + minutes + 'm';
            };

            poster.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
            modalTitle.innerHTML = movie.title;
            title.innerHTML = movie.title;
            original.innerHTML = movie.original_title;
            genres.innerHTML = movieGenres;
            sinopsis.innerHTML = movie.overview;
            usrScore.innerHTML = (movie.vote_average * 10) + '%';
            date.innerHTML = movie.release_date;
            duration.innerHTML = time(movie.runtime);

            $('#movieModal').modal('show');
        }
    }
}