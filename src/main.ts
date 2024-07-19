import { getData } from "./modules/request";
import { reloadActors, reloadGenres, reloadHeader, reloadMovies, reloadStars, reloadTrailers } from "./modules/ui";


const header = document.querySelector("header");
if (header) {
    reloadHeader(header);
}

const backdrop = document.querySelector(".backdrop");
const genres = document.querySelector(".genres");
const nowPlaying = document.querySelector(".now_playing") as HTMLElement | null;
const nowPlayingBtn = document.querySelector(".now_playing_show_more");
const genresCont = document.querySelector('.genres') as HTMLElement | null;
const popularsCont = document.querySelector('.popular-playing') as HTMLElement | null;
const trailers = document.querySelector('.trailers') as HTMLElement | null;
const personCont = document.querySelector('.person-cont') as HTMLElement | null;
const personTab = document.querySelector('.person-tab') as HTMLElement | null;

getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        if (nowPlaying) {
            reloadMovies(res.data.results.slice(0, 8), nowPlaying);
        }
    });

getData('https://api.themoviedb.org/3/genre/movie/list?language=ru-RU')
    .then(res => {
        if (genresCont) {
            reloadGenres(res.data.genres, genresCont);

            const genreWithData = document.querySelectorAll(".genre") as NodeListOf<HTMLElement>;

            let prevGenre = 0;
            genreWithData.forEach((tab, idx) => {
                tab.onclick = () => {
                    genreWithData[prevGenre].classList.remove('genre_active');
                    tab.classList.add('genre_active');
                    prevGenre = idx;

                    if (tab.dataset.genre === 'all') {
                        getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
                            .then(res => {
                                if (nowPlaying) {
                                    reloadMovies(res.data.results.slice(0, 8), nowPlaying);
                                }
                            });
                    } else {
                        getData(`https://api.themoviedb.org/3/discover/movie?with_genres=${tab.dataset.genre}&language=ru-RU`)
                            .then(res => {
                                if (nowPlaying) {
                                    reloadMovies(res.data.results.slice(0, 8), nowPlaying);
                                }
                            });
                    }
                };
            });
        }
    });



    getData('https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1')
    .then(res => {
        if (popularsCont) {
            reloadMovies(res.data.results.slice(0, 8), popularsCont);
        }
    });

    nowPlayingBtn.onclick = () => {
    if (!nowPlayingBtn.classList.contains('active')) {
        nowPlayingBtn.classList.add('active')

        getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
            .then(res => reloadMovies(res.data.results, nowPlaying))

            nowPlayingBtn.innerHTML = 'Скрыть'
    } else {
        nowPlayingBtn.classList.remove('active')

        getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
            .then(res => reloadMovies(res.data.results.slice(0, 8), nowPlaying))

            nowPlayingBtn.innerHTML = 'Показать все'
    }
}

const yearWithData = document.querySelectorAll(".year") as NodeListOf<HTMLElement>;

let prevGenre = 0;
yearWithData.forEach((tab, idx) => {
    tab.onclick = () => {
        yearWithData[prevGenre].classList.remove('year_active');
        tab.classList.add('year_active');
        prevGenre = idx;

        if (tab.dataset.year === 'all') {
            getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
                .then(res => {
                    if (nowPlaying) {
                        reloadMovies(res.data.results.slice(0, 8), popularsCont);
                    }
                });
        } else {
            getData(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${tab.dataset.year}&language=ru-RU&page=1`)
                .then(res => {
                    if (nowPlaying) {
                        reloadMovies(res.data.results.slice(0, 8), popularsCont);
                    }
                });
            }
       };
    });
    

    getData('https://api.themoviedb.org/3/movie/upcoming?language=ru-RU&page=1')
    .then(res => reloadTrailers(res.data.results, trailers))

    getData('https://api.themoviedb.org/3/person/popular?language=ru-RU&page=1')
    .then(res => reloadStars(res.data.results.slice(0, 2), personCont))

    getData('https://api.themoviedb.org/3/person/popular?language=ru-RU&page=1')
    .then(res => reloadActors(res.data.results.slice(3), personTab))