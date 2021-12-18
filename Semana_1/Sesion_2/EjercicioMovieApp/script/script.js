const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

const getMovies = (url) => {
    const peticion = fetch(url)
    peticion.then(resp=> resp.json())
    // .then(data => console.log(data.results)) 
        .then(data => showMovies(data.results)) 
        .catch(error => 
            swal.fire({
                title: 'Hubo un error con el servidor',
                text: 'Intente de nuevo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }))
}

// request asincronica
/* const getMovies2 = async(url) => {
    const resp = await fetch(url)
    const data = await resp.json()
     console.log(data.results); 
} */

getMovies(API_URL)

const showMovies = (movies) =>{
    main.innerHTML = '' //inner  limpiar el main
    movies.forEach(movie => {
        //en cada ciclo desectructura las variables - los elementos que nos importn
        const {title, poster_path, vote_average, overview} = movie
        const divMovie = document.createElement('div') // por cada pelicula crea un div
        divMovie.classList.add('movie')
        divMovie.innerHTML =` 
        <img src = "${IMG_PATH + poster_path}" alt = "">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="green">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${overview}
        </div>
         `
         main.appendChild(divMovie)
         //comillas invertidas ALT GR + ]} (tecla)
    });
}
const getclassByRate = (rate) => {
    if (rate < 4){
        return "red"
    }else if(rate > 6){
        return "green"
    } else{
        return "orange"
    }
}

//crear evento submit
form.addEventListener('submit',e =>{ //e hace referencia al submit event
    e.preventDefault() //prevenir que la página se recargue
    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
        search.value = ""        
    }else{
        window.location.reload()
        }
})

