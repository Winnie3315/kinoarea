
import { getData } from './../../src/modules/request';
import { creatingTrailer, reload, reloadHeader, setSwiper } from "./../../src/modules/ui";
import { Data } from "./../../src/components/filmData";
import { InRole } from "./../../src/components/inRole"
import { createBackdrop } from "./../../src/components/creatingBG"
import { createImage } from "./../../src/components/creatingImg"
import { Movie } from "./../../src/components/movie"
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables)
let id = location.search.split('=').at(-1);

const header = document.querySelector("header") as HTMLElement
const backdrop = document.querySelector('.backdrop') as HTMLElement;
const movie_name = document.querySelector('.movie_name') as HTMLElement;
const movie_name_mobile = document.querySelector('.movie_name_mobile') as HTMLElement;
const movie_name_orig = document.querySelector('.movie_name_orig') as HTMLElement;
const movie_name_orig_mobile = document.querySelector('.movie_name_orig_mobile') as HTMLElement;
const desc = document.querySelector('.desc') as HTMLElement;
const poster = document.querySelector('.poster') as HTMLImageElement;
const info_wrap = document.querySelector('.info') as HTMLElement;
const info_wrap_mobile = document.querySelector('.info_mobile') as HTMLElement;
const in_role_grid = document.querySelector('.in_role_grid') as HTMLElement
const trailer_src = document.querySelector('.trailer_src') as HTMLIFrameElement
const trailer_name = document.querySelector('.trailer_name') as HTMLElement
const postersBox = document.querySelector('.posters_box') as HTMLElement
const images_gallery = document.querySelector('.images_gallery') as HTMLElement
const similar_wrap = document.querySelector('.similar_wrap') as HTMLElement
const score_av = document.querySelector('.score_av') as HTMLElement
const score_av_mobile = document.querySelector('.score_av_mobile') as HTMLElement
const scorePercent = document.querySelector('.percent') as HTMLElement
const scorePercent_mobile = document.querySelector('.percent_mobile') as HTMLElement
const scoreFill = document.querySelector('.fill') as HTMLElement
const scoreFill_mobile = document.querySelector('.fill_mobile') as HTMLElement
const trailerType = document.querySelector(".trailer-typebox") as HTMLElement

const poster_mobile = document.querySelector(".poster_mobile") as HTMLImageElement
const desc_mobile = document.querySelector(".desc_mobile") as HTMLElement 

reloadHeader(header)

getData(`/movie/${id}?language=ru-RU`)
    .then(res => {
        const data = res.data;
        backdrop.style.background = `url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center / cover`;
        poster.src = data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : '/public/images/404poster.jpg';
        poster_mobile.src = data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : '/public/images/404poster.jpg';
        movie_name.innerHTML = data.title;
        movie_name_mobile.innerHTML = data.title
        movie_name_orig.innerHTML = data.original_title;
        movie_name_orig_mobile.innerHTML = data.original_title
        desc.innerHTML = data.overview;
        desc_mobile.innerHTML = data.overview;
        trailer_name.innerHTML = data.title
        let backgroundColor = getColor(data.vote_average);
        let borderColor = 'rgba(0, 0, 0, 0.1)'
        score_av.innerHTML = data.vote_average.toFixed(1)
        score_av_mobile.innerHTML = data.vote_average.toFixed(1)
        

        let cdx = document.querySelector("#cdx") as HTMLCanvasElement;
        let cdx_mobile = document.querySelector("#cdx_mobile") as HTMLCanvasElement;
        new Chart(cdx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Vote Average',
                    data: [data.vote_average,  10 - data.vote_average],
                    backgroundColor: [backgroundColor, 'rgba(0, 0, 0, 0.1)'],
                    borderColor: [borderColor, 'rgba(0, 0, 0, 0.1)'],
                    borderWidth: 1
                }]
            }
        })
        new Chart(cdx_mobile, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Vote Average',
                    data: [data.vote_average,  10 - data.vote_average],
                    backgroundColor: [backgroundColor, 'rgba(0, 0, 0, 0.1)'],
                    borderColor: [borderColor, 'rgba(0, 0, 0, 0.1)'],
                    borderWidth: 1
                }]
            }
        })

        scorePercent.innerHTML = `Рейтинг ожиданий ${+res.data.vote_average.toFixed(1) * 10}%`
        scorePercent_mobile.innerHTML = `Рейтинг ожиданий ${+res.data.vote_average.toFixed(1) * 10}%`
        scoreFill.style.width = `${+res.data.vote_average.toFixed(1) * 10}%`
        scoreFill_mobile.style.width = `${+res.data.vote_average.toFixed(1) * 10}%`


        reload([data], Data, info_wrap);
        reload([data], Data, info_wrap_mobile);
    })

    function getColor(vote_average: number): string {
        const red = Math.floor(255 * (10 - vote_average) / 10);
        const green = Math.floor(255 * vote_average / 10);
        return `rgb(${red}, ${green}, 0)`;
    }


getData(`movie/${id}/credits?language=ru-RU`)
.then(res => {
    reload(res.data.cast.slice(0, 10), InRole, in_role_grid)
})

creatingTrailer(trailerType, id, trailer_src)

getData(`movie/${id}/images`)
.then(res => {

    if(innerWidth <= 1200) {
        reload(res.data.backdrops.slice(0, 3), createBackdrop, images_gallery)
    } else {
        reload(res.data.backdrops.slice(0, 6), createBackdrop, images_gallery)
    }
    
    reload(res.data.posters.slice(0,4), createImage,  postersBox)
})

getData(`movie/${id}/similar?language=ru-RU&page=1`)
    .then(res => {
        setSwiper(res.data.results, "swiper", Movie, similar_wrap, backdrop)
    })
