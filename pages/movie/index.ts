import { getData } from './../../src/modules/request';
import { reload, reloadHeader } from "./../../src/modules/ui";
import { Data } from "./../../src/components/filmData";
import { InRole } from "./../../src/components/inRole"
import { createBackdrop } from "./../../src/components/creatingBG"
import { createImage } from "./../../src/components/creatingImg"
import { Movie } from "./../../src/components/movie"
// import { Chart } from 'chart.js';

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

        // let cdx = document.querySelector("#myPieChart") as HTMLCanvasElement
        // let myPieChart = new Chart(cdx, {
        //     type: 'pie',
        //     data: {
        //         labels: ['Red', 'Yellow', 'Green'],
        //         datasets: [{
        //             label: '',
        //             data: data.vote_average,
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        // })

        reload([data], Data, info_wrap);
    })

getData(`movie/${id}/credits?language=ru-RU`)
.then(res => {
    reload(res.data.cast.slice(0, 10), InRole, in_role_grid)
})

getData(`movie/${id}/videos?language=ru-RU`)
.then(res => {
    let result = res?.data.results.find((el: any) => el.type === "Trailer");
    if (result) {
        trailer_src.src = `https://www.youtube.com/embed/${result.key}`;
    }
    trailer_name.innerHTML = result.title
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
