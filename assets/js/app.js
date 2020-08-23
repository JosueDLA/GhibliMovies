document.querySelector('#movies').addEventListener('click', function () {
    getData();
});

function getData() {
    console.log('movies!');
    let url = 'https://ghibliapi.herokuapp.com/films';

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            //console.log(this.responseText);
            let data = JSON.parse(this.responseText);
            //console.log(data);
            //console.log(data[0].title)

            let titles = document.querySelector('#titles');
            titles.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                titles.innerHTML += '<li>' + data[i].title + '</li>'
            }
        }
    }
}