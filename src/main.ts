import { Actors } from "./components/actors";
import {  Genres } from "./components/genre";
import { Stars } from "./components/stars";
import { Trailer } from "./components/trailers";
import { getData } from "./modules/request";
import { Movie } from "./components/movie";
import { reload, reloadGenres, reloadHeader,  } from "./modules/ui";

const header = document.querySelector("header");
if (header) {
    reloadHeader(header);
}

const backdrop = document.querySelector(".backdrop") as HTMLElement
const nowPlaying = document.querySelector(".now_playing") as HTMLElement
const nowPlayingBtn = document.querySelector(".now_playing_show_more") as HTMLElement
const genresCont = document.querySelector('.genres') as HTMLElement
const popularsCont = document.querySelector('.popular-playing') as HTMLElement 
const trailers = document.querySelector('.trailers') as HTMLElement 
const personCont = document.querySelector('.person-cont') as HTMLElement 
const personTab = document.querySelector('.person-tab') as HTMLElement
const link = document.querySelector(".trailer-link");
const mainName = document.querySelector(".traler-name h3");
let showAllMovies: boolean = false

getData('movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        if (nowPlaying) {
            reload(res.data.results.slice(0, 8), Movie, nowPlaying, backdrop);
        }
    });

    getData('genre/movie/list?language=ru-RU')
    .then(res => {
        if (genresCont) {
            reloadGenres(res.data.genres, Genres, genresCont);

            const genreWithData = document.querySelectorAll(".genre") as NodeListOf<HTMLElement>;

            let prevGenre = 0;
            genreWithData.forEach((tab, idx) => {
                tab.onclick = () => {
                    genreWithData[prevGenre].classList.remove('genre_active');
                    tab.classList.add('genre_active');
                    prevGenre = idx;

                    const genreId = tab.dataset.genre;
                    const params = new URLSearchParams(window.location.search);

                    if (genreId) {
                        params.set('with_genres', genreId);
                    } else {
                        params.delete('with_genres');
                    }
                    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);


                    if (genreId === 'all') {
                        getData('movie/now_playing?language=ru-RU&page=1')
                            .then(res => {
                                if (nowPlaying) {
                                    ShowOrHide(res.result)
                                }
                            });
                    } else {
                        getData(`discover/movie?with_genres=${genreId}&language=ru-RU`)
                            .then(res => {
                                if (nowPlaying) {
                                    ShowOrHide(res.data.results)
                                }
                            });
                    }
                };
            });
        }
    });

    function ShowOrHide(arr: any){
        if(!showAllMovies) {
            reload(arr, Movie, nowPlaying, backdrop);
            showAllMovies = true
        } else {
            reload(arr, Movie, nowPlaying, backdrop);
            showAllMovies = false
        }
    }


    getData('movie/popular?language=ru-RU&page=1')
    .then(res => {
        if (popularsCont) {
            reload(res.data.results.slice(0, 8), Movie, popularsCont, backdrop);
        }
    });

    nowPlayingBtn.onclick = () => {
    if (!nowPlayingBtn.classList.contains('active')) {
        nowPlayingBtn.classList.add('active')

        getData('movie/now_playing?language=ru-RU&page=1')
            .then(res => reload(res.data.results, Movie, nowPlaying, backdrop))

            nowPlayingBtn.innerHTML = 'Скрыть'
    } else {
        nowPlayingBtn.classList.remove('active')

        getData('movie/now_playing?language=ru-RU&page=1')
            .then(res => reload(res.data.results.slice(0, 8), Movie, nowPlaying, backdrop))

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
            getData('movie/now_playing?language=ru-RU&page=1')
                .then(res => {
                    if (nowPlaying) {
                        reload(res.data.results.slice(0, 8), Movie, popularsCont, backdrop);
                    }
                });
        } else {
            getData(`discover/movie?primary_release_year=${tab.dataset.year}&language=ru-RU&page=1`)
                .then(res => {
                    if (nowPlaying) {
                        reload(res.data.results.slice(0, 8), Movie, popularsCont, backdrop);
                    }
                });
            }
       };
    });
    

    getData('movie/upcoming?language=ru-RU&page=1')
    .then(res => reload(res.data.results, Trailer, trailers, link, mainName))

    getData('person/popular?language=ru-RU&page=1')
    .then(res => reload(res.data.results.slice(0, 2), Stars, personCont))

    getData('/person/popular?language=ru-RU&page=1')
    .then(res => reload(res.data.results.slice(3), Actors, personTab))