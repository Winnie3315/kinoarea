import { Type } from './../../src/components/filmType';
import { getData } from './../../src/modules/request';
import { reload, reloadHeader } from "./../../src/modules/ui";
import { Data } from "./../../src/components/filmData";
import { InRole } from "./../../src/components/inRole"
import { createBackdrop } from "./../../src/components/creatingBG"
import { createImage } from "./../../src/components/creatingImg"
import { Movie } from "./../../src/components/movie"
import { Chart, registerables } from 'chart.js';
import { Search } from "../.././src/components/search"

Chart.register(...registerables)
let id = location.search.split('=').at(-1);

const header = document.querySelector("header") as HTMLElement
const backdrop = document.querySelector('.backdrop') as HTMLElement;
const movie_name = document.querySelector('.movie_name') as HTMLElement;
const movie_name_orig = document.querySelector('.movie_name_orig') as HTMLElement;
const desc = document.querySelector('.desc') as HTMLElement;
const poster = document.querySelector('.poster') as HTMLImageElement;
const info_wrap = document.querySelector('.info') as HTMLElement;
const in_role_grid = document.querySelector('.in_role_grid') as HTMLElement
const trailer_src = document.querySelector('.trailer_src') as HTMLIFrameElement
const trailer_name = document.querySelector('.trailer_name') as HTMLElement
const postersBox = document.querySelector('.posters_box') as HTMLElement
const images_gallery = document.querySelector('.images_gallery') as HTMLElement
const similar_wrap = document.querySelector('.similar_wrap') as HTMLElement
const score_av = document.querySelector('.score_av') as HTMLElement
const scorePercent = document.querySelector('.percent') as HTMLElement
const scoreFill = document.querySelector('.fill') as HTMLElement
const trailerType = document.querySelector(".trailer-typebox") as HTMLElement
const search_btn = document.querySelector('.search_btn') as HTMLElement
const search_wrap = document.querySelector('.search_wrap') as HTMLElement
const nav = document.querySelector('nav') as HTMLElement
const close_btn = document.querySelector('.close') as HTMLElement
const search_inp = document.querySelector('#search_inp') as HTMLInputElement
const result_cont = document.querySelector(".result_cont") as HTMLElement
const body = document.body
reloadHeader(header)

getData(`/movie/${id}?language=ru-RU`)
    .then(res => {
        const data = res.data;
        backdrop.style.background = `url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center / cover`;
        poster.src = data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : '/public/images/404poster.jpg';
        movie_name.innerHTML = data.title;
        movie_name_orig.innerHTML = data.original_title;
        desc.innerHTML = data.overview;
        trailer_name.innerHTML = data.title
        let backgroundColor = getColor(data.vote_average);
        let borderColor = 'rgba(0, 0, 0, 0.1)'
        score_av.innerHTML = data.vote_average.toFixed(1)
        

        let cdx = document.querySelector("#cdx") as HTMLCanvasElement;
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
        scorePercent.innerHTML = `Рейтинг ожиданий ${+res.data.vote_average.toFixed(1) * 10}%`
        scoreFill.style.width = `${+res.data.vote_average.toFixed(1) * 10}%`


        reload([data], Data, info_wrap);
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

getData(`movie/${id}/videos?language=ru-RU`)
.then(res => {
    let result = res.data.results.find((el: any) => el.type === "Trailer");
    if (result) {
        trailer_src.src = `https://www.youtube.com/embed/${result.key}`;
        reload(res.data.results, Type, trailerType)
    }
})

getData(`movie/${id}/images`)
.then(res => {
    reload(res.data.backdrops.slice(0, 6), createBackdrop, images_gallery)
    reload(res.data.posters.slice(0,4), createImage,  postersBox)
})

getData(`movie/${id}/similar?language=ru-RU&page=1`)
    .then(res => {
        reload(res.data.results.slice(0, 4), Movie, similar_wrap)
    })


    
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

    search_inp.onkeyup = () => {

            const value = search_inp.value;
        
            getData(`search/multi?query=${value}`)
            .then((res) => reload(res.data.results, Search, result_cont))
            
            
        
    }