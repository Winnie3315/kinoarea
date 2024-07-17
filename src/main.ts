import { getData } from "./modules/request";
import { reloadGenres, reloadHeader, reloadMovies } from "./modules/ui";

reloadHeader(document.querySelector("header"))

const backdrop = document.querySelector(".backdrop")
const genres = document.querySelector(".genres")
const nowPlaying = document.querySelector(".now_playing")
const nowPlayingBtn = document.querySelector(".now_playing_show_more")
const genresCont = document.querySelector('.genres')

getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        reloadMovies(res.data.results.slice(0, 8), nowPlaying)
    })

getData('https://api.themoviedb.org/3/genre/movie/list?language=ru-RU')
    .then(res => {
        reloadGenres(res.data.genres.slice(0, 6), genresCont)
    })