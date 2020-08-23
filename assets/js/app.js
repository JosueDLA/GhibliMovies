document.querySelector('#movies').addEventListener('click', function () {
    getData();
});

function getData() {
    console.log('Movies!');
    let url = 'https://ghibliapi.herokuapp.com/films';

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let data = JSON.parse(this.responseText);

            let display = document.querySelector('#display');
            display.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                getPoster(data[i])
            }
        }
    }
}

function getPoster(data) {
    console.log('Poster!');
    let film = data.title

    if (film == '') {
        console.error('Film is empty');
        return 'https://i2.wp.com/www.theatrecr.org/wp-content/uploads/2016/01/poster-placeholder.png?ssl=1';
    }
    else {
        let url = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film.replace(/ /g, "%20");
        let imageUrl = 'http://image.tmdb.org/t/p/w500'

        const api = new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();

        api.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                let poster = JSON.parse(this.responseText);
                let image = imageUrl + poster.results[0].poster_path;

                let display = document.querySelector('#display');
                display.innerHTML += `
                    <div class="col-md-4">
                        <div class="card md-4 box-shadow">
                            <img class="card-img-top"
                                src="${image}"
                                alt="Movie">
                            <div class="card-body">
                                <p class="card-text">
                                    ${film}
                                </p>
                            </div>
                        </div>
                    </div>
                `;


            }
        }
    }
}