import { Actors } from "./components/actors";
import { Genres } from "./components/genre";
import { Stars } from "./components/stars";
import { Trailer } from "./components/trailers";
import { getData } from "./modules/request";
import { Movie } from "./components/movie";
import { reload, reloadFooter, reloadHeader, setSwiper } from "./modules/ui";
import 'swiper/css';
import { reloadYears } from "./components/years";


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
const upcoming_wrap = document.querySelector('.upcoming') as HTMLElement
const footer = document.querySelector("footer") as HTMLElement
const genre_menu = document.querySelector(".genre-menu") as HTMLElement
const modal = document.querySelector('.modal-genre') as HTMLElement
const closeBt = document.querySelector('#close-btn-genre') as HTMLElement
const content = document.querySelector('.content-genre') as HTMLElement
const modalYear = document.querySelector('.modal-year') as HTMLElement
const closeBtYear = document.querySelector('#close-btn-year') as HTMLElement
const year_menu = document.querySelector(".year-menu") as HTMLElement
let limitForArr: any

function ShowOrHide(arr: any[], limit: number = 8) {
    if (showAllMovies) {
        reload(arr, Movie, nowPlaying, backdrop);
    } else {
        if (window.innerWidth <= 766) {
            limit = 8;
        } else if (window.innerWidth <= 991) {
            limit = 9;
        } else {
            limit = 8;
        }
        reload(arr.slice(0, limit), Movie, nowPlaying, backdrop);
    }
    limitForArr = limit
}

getData('movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        if (nowPlaying && !currentGenre) {
            ShowOrHide(res.data.results);
        }
    });

getData('genre/movie/list?language=ru-RU')
    .then(res => {
        if (window.innerWidth <= 766) {
            reload([ {name: "All"}, ...res.data.genres], Genres, content)
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
                                    // ShowOrHide(res.data.results);
                                    reload(res.data.results.slice(0, limitForArr), Movie, nowPlaying, backdrop)
                                }
                            });
                    }
                    
                };
                
            })
        }else {
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
        }

        

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


 getData('movie/now_playing?language=ru-RU&page=1')
   .then(res => {
     if (popularsCont) {
       setSwiper(res.data.results, "swiper", Movie, popularsCont, backdrop);
     }
   });


   reloadYears(document.querySelector(".years") as HTMLElement, popularsCont)



getData('movie/now_playing?language=ru-RU&page=1')
  .then(res => { 
  setSwiper(res.data.results, "swiper", Movie, popularsCont, backdrop);
})


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

getData('movie/upcoming?language=ru-RU&page=1')
    .then(res => {
        setSwiper(res.data.results, "swiper", Movie, upcoming_wrap, backdrop)
})
 

reloadFooter(footer)






if(modalYear && closeBtYear){
    year_menu.onclick = () => {
      modalYear.style.display = 'block';
        
    }

    closeBtYear.onclick = () => {
      modalYear.style.display = 'none';
    }
}



    if (modal && closeBt) {
        genre_menu.onclick = () => {
            modal.style.display = 'block';
        }
    
        closeBt.onclick = () => {
            modal.style.display = 'none';
        }
    }
    
    if (modalYear && closeBtYear) {
        year_menu.onclick = () => {
            modalYear.style.display = 'block';
            reloadYears(modalYear.querySelector('.years') as HTMLElement, popularsCont);
        }
    
        closeBtYear.onclick = () => {
            modalYear.style.display = 'none';
        }
    }