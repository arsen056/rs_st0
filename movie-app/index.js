let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const movies = document.querySelector('.movies');
const search = document.querySelector('.search');

search.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        url = `https://api.themoviedb.org/3/search/movie?query=${this.value}&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
        getData();
    }
})
async function getData() {    
    const res = await fetch(url);
    const data = await res.json();
    const moviesArray = data.results;
    const keys = Object.keys(moviesArray);
    movies.innerHTML = "";
    keys.forEach(e => {
        movies.innerHTML += `
        <div class="movie-item">
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w1280/${moviesArray[e].poster_path}" alt="poster">
            <div class="title-container">
                <h2 class="movie-title">${moviesArray[e].title}</h2>
                <div class="movie-rating">${moviesArray[e].vote_average}</div>
            </div>
            <div class="movie-description">
            <h3>Overview</h3>
            <p>${moviesArray[e].overview}</p
            
            </div>
    </div>`
    })

    // Add color for rating
    const rating = document.querySelectorAll('.movie-rating');
    rating.forEach(element => {
        if (element.textContent > 8) {
            element.classList.add('green');
        } else if (element.textContent < 5) {
            element.classList.add('red');
        }
    })
}
getData();