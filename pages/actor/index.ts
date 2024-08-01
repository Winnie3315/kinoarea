import { BackdropItem } from './../../src/Types';
import { getData } from './../../src/modules/request';
import { reload, reloadHeader, setSwiper } from './../../src/modules/ui'
import { Movie } from "./../../src/components/movie"
import { MovieCard, MovieCardMobile } from './../../src/components/actor-film'
import { ActorPhoto } from '../../src/components/actor-img';

const id = location.search.split('=').at(-1)
const header = document.querySelector("header")
const person_main_name = document.querySelector('.person_main_name') as HTMLElement
const person_main_name_mobile = document.querySelector('.main_name') as HTMLElement
const person_orig_name = document.querySelector('.person_orig_name') as HTMLElement
const career = document.querySelector('.career') as HTMLElement
const born_date = document.querySelector('.born_date') as HTMLElement
const born_place = document.querySelector('.born_place') as HTMLElement
const best_movies_wrap = document.querySelector('.films_flex') as HTMLElement
const gallery_name = document.querySelector('.gallery_name') as HTMLElement
const photos = document.querySelector('.photos') as HTMLElement
const person_photo = document.querySelector('.person_photo') as HTMLImageElement
const cards = document.querySelector('.cards') as HTMLElement

reloadHeader(header)

getData(`person/${id}?language=ru-RU`)
    .then(res => {
        person_main_name_mobile.innerHTML = res.data.name
        person_main_name.innerHTML = res.data.name
        person_orig_name.innerHTML = res.data.name
        gallery_name.innerHTML = res.data.name
        career.innerHTML = res.data.known_for_department
        born_date.innerHTML = res.data.birthday
        born_place.innerHTML = res.data.place_of_birth
        person_photo.src = `https://image.tmdb.org/t/p/original${res.data.profile_path}`
    })

getData(`person/${id}/movie_credits?language=ru-RU'`)
    .then(res => {
        setSwiper(res.data.cast, "swiper", Movie, best_movies_wrap, )
        reload(res.data.cast.slice(0, 20), MovieCard, cards)

        if(innerWidth <= 768){
            reload(res.data.cast.slice(0, 20), MovieCardMobile, cards)
        } else{
            reload(res.data.cast.slice(0, 20), MovieCard, cards)
        }
    })

getData(`person/${id}/images`)
    .then(res => {
        if(innerWidth <= 1200){
            reload(res.data.profiles.slice(0, 3), ActorPhoto, photos)
        } else {
            reload(res.data.profiles.slice(0, 6), ActorPhoto, photos)
        }
        
    })