
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// async function getMovies(url) {
//     try {
//         const res = await fetch(url)
//         const data = await res.json()
//         showMovies(data.results)
//     } catch (error) {
//         Swal.fire('Error en la ejecución',error)
//     }
// }

// const getMovies = (url) => {
//     const peticion = fetch(url)
//     peticion.then(res=>{
//         res.json().then(data =>{
//             showMovies(data.results)
//         }) 
//     })

// }

const getMovies = (url) => {

    const peticion = fetch(url)
    peticion.then(res=> res.json()) 
            .then(data => showMovies(data.results))
}


getMovies(API_URL)

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {

        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
               ${overview}
            </div>
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if (vote >= 8.0) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
      
    }
})