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

            let display = document.querySelector('#display');
            display.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                getMovies(data[i])
            }
        }
    }
}

function getMovies(data) {
    let film = data.title;

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

                //Animation id:16
                //Original Language: japanese
                for (let i = 0; i < poster.results.length; i++) {
                    let language = poster.results[i].original_language;
                    let genres = poster.results[i].genre_ids;
                    let image = 'http://image.tmdb.org/t/p/w500/' + poster.results[i].poster_path;
                    let movieId = poster.results[i].id;

                    console.log(image);

                    if (language == "ja" && genres.includes(16)) {
                        display.innerHTML += `
                            <div class="col-md-4 movie-item mb-4">
                                <div class="card box-shadow h-100">
                                    <figure>
                                        <img class="card-img-top" src="${image}" alt="${film}">
                                        <a href="#" id="${movieId}" class="link-details"><i class="fas fa-info"></i></a>
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
            }
        }
    }
}

function getMovieInfo(id) {
    image = imageUrl + poster.results[i].poster_path;
    let movieId = poster.result[i].id;
    let movieUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb';

    const movieApi = new XMLHttpRequest();
    movieApi.open('GET', movieUrl, true);
    movieApi.send();

    let display = document.querySelector('#display');
}

