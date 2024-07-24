import { Actors } from "./components/actors";
import { Genres } from "./components/genre";
import { Stars } from "./components/stars";
import { Trailer } from "./components/trailers";
import { getData } from "./modules/request";
import { Movie } from "./components/movie";
import { debounce_leading, reload, reloadHeader } from "./modules/ui";
import { Search } from ".././src/components/search"
import Swiper from 'swiper';
import 'swiper/css';
import { Navigation } from "swiper/modules";

const header = document.querySelector("header");
if (header) {
    reloadHeader(header);
}

const backdrop = document.querySelector(".backdrop") as HTMLElement;
const nowPlaying = document.querySelector(".now_playing") as HTMLElement;
const nowPlayingBtn = document.querySelector(".now_playing_show_more") as HTMLElement;
const genresCont = document.querySelector('.genres') as HTMLElement;
const popularsCont = document.querySelector('.popular-playing') as HTMLElement;
const trailers = document.querySelector('.trailers') as HTMLElement;
const personCont = document.querySelector('.person-cont') as HTMLElement;
const personTab = document.querySelector('.person-tab') as HTMLElement;
const link = document.querySelector(".trailer-link");
const mainName = document.querySelector(".traler-name h3");
let showAllMovies: boolean = false;
const urlParams = new URLSearchParams(window.location.search);
const initialGenre = urlParams.get('genre');
let currentGenre: any = initialGenre;
const search_btn = document.querySelector('.search_btn') as HTMLElement
const search_wrap = document.querySelector('.search_wrap') as HTMLElement
const nav = document.querySelector('nav') as HTMLElement
const close_btn = document.querySelector('.close') as HTMLElement
const search_inp = document.querySelector('#search_inp') as HTMLInputElement
const result_cont = document.querySelector(".result_cont") as HTMLElement
const body = document.body


function ShowOrHide(arr: any[], limit: number = 8) {
    if (showAllMovies) {
        reload(arr, Movie, nowPlaying, backdrop);
    } else {
        reload(arr.slice(0, limit), Movie, nowPlaying, backdrop);
    }
}

getData('movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        if (nowPlaying && !currentGenre) {
            ShowOrHide(res.data.results);
        }
    });

getData('genre/movie/list?language=ru-RU')
    .then(res => {
        if (genresCont) {
            // reloadGenres(res.data.genres, Genres, genresCont);
            reload([ {name: "All"}, ...res.data.genres], Genres, genresCont)

            const genreWithData = document.querySelectorAll(".genre") as NodeListOf<HTMLElement>;

            let prevGenre = 0;
            genreWithData.forEach((tab, idx) => {
                if (tab.dataset.genre === currentGenre) {
                    tab.classList.add('genre_active');
                    prevGenre = idx;
                }

                tab.onclick = () => {
                    genreWithData[prevGenre].classList.remove('genre_active');
                    tab.classList.add('genre_active');
                    prevGenre = idx;

                    currentGenre = tab.dataset.genre;

                    const params = new URLSearchParams(window.location.search);
                    if (currentGenre) {
                        params.set('genre', currentGenre);
                    } else {
                        params.delete('genre');
                    }
                    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

                    if (currentGenre === 'all') {
                        getData('movie/now_playing?language=ru-RU&page=1')
                            .then(res => {
                                if (nowPlaying) {
                                    ShowOrHide(res.data.results);
                                }
                            });
                    } else {
                        getData(`discover/movie?with_genres=${currentGenre}&language=ru-RU`)
                            .then(res => {
                                if (nowPlaying) {
                                    ShowOrHide(res.data.results);
                                }
                            });
                    }
                };
            });

            if (currentGenre) {
                if (currentGenre === 'all') {
                    getData('movie/now_playing?language=ru-RU&page=1')
                        .then(res => {
                            if (nowPlaying) {
                                ShowOrHide(res.data.results);
                            }
                        });
                } else {
                    getData(`discover/movie?with_genres=${currentGenre}&language=ru-RU`)
                        .then(res => {
                            if (nowPlaying) {
                                ShowOrHide(res.data.results);
                            }
                        });
                }
            }
        }
    });

getData('movie/popular?language=ru-RU&page=1')
    .then(res => {
        if (popularsCont) {
            ShowOrHide(res.data.results);
        }
    });

nowPlayingBtn.onclick = () => {
    showAllMovies = !showAllMovies;
    if (showAllMovies) {
        nowPlayingBtn.classList.add('active');
        nowPlayingBtn.innerHTML = 'Скрыть';
    } else {
        nowPlayingBtn.classList.remove('active');
        nowPlayingBtn.innerHTML = 'Показать все';
    }

    if (currentGenre === 'all' || !currentGenre) {
        getData('movie/now_playing?language=ru-RU&page=1')
            .then(res => {
                ShowOrHide(res.data.results);
            });
    } else {
        getData(`discover/movie?with_genres=${currentGenre}&language=ru-RU`)
            .then(res => {
                ShowOrHide(res.data.results);
            });
    }
};

getData('movie/now_playing?language=ru-RU&page=1')
                .then(res => {
                    if (popularsCont) {
                        reload(res.data.results, Movie, popularsCont, backdrop)
                    }
                });

const yearWithData = document.querySelectorAll(".year") as NodeListOf<HTMLElement>;

let prevYear = 0;
yearWithData.forEach((tab, idx) => {
    tab.onclick = () => {
        yearWithData[prevYear].classList.remove('year_active');
        tab.classList.add('year_active');
        prevYear = idx;

        const year = tab.dataset.year;
        if (year === 'all') {
            getData('movie/now_playing?language=ru-RU&page=1')
                .then(res => {
                    if (popularsCont) {
                        reload(res.data.results, Movie, popularsCont, backdrop)
                    }
                });
        } else {
            getData(`discover/movie?primary_release_year=${year}&language=ru-RU&page=1`)
                .then(res => {
                    if (popularsCont) {
                        reload(res.data.results, Movie, popularsCont, backdrop)
                    }
                });
        }
    };
});

getData('movie/upcoming?language=ru-RU&page=1')
    .then(res => {
        if (trailers && link && mainName) {
            reload(res.data.results, Trailer, trailers, link, mainName, res.data.results);
        }
    });

getData('person/popular?language=ru-RU&page=1')
    .then(res => {
        if (personCont) {
            reload(res.data.results.slice(0, 2), Stars, personCont);
        }
    });

getData('person/popular?language=ru-RU&page=1')
    .then(res => {
        if (personTab) {
            reload(res.data.results.slice(3), Actors, personTab);
        }
    });


    
    search_btn.onclick = () => {
        search_btn.classList.add('invisible')
        nav.classList.add('invisible')
        search_wrap.classList.remove('invisible')
        body.style.overflowY = 'hidden'
    }
    
    close_btn.onclick = () => {
        search_btn.classList.remove('invisible')
        nav.classList.remove('invisible')
        search_wrap.classList.add('invisible')
        body.style.overflowY = 'visible'
    }
    const debouncedItem = debounce_leading((e) => {
        const value = e.target.value;
    
        getData(`search/multi?query=${value}`)
          .then((res) => reload(res.data.results, Search, result_cont));
        
    }, 2000)

    search_inp.onkeyup = debouncedItem

    new Swiper('.swiper', {
        modules: [Navigation],
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });