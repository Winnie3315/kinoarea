import { getData } from './../../src/modules/request';
import { reload, reloadHeader } from './../../src/modules/ui'
import { Movie } from "./../../src/components/movie"
import { MovieCard } from './../../src/components/actor-film'
import { ActorPhoto } from '../../src/components/actor-img';

const id = location.search.split('=').at(-1)
const header = document.querySelector("header")
const person_main_name = document.querySelector('.person_main_name') as HTMLElement
const person_orig_name = document.querySelector('.person_orig_name') as HTMLElement
const career = document.querySelector('.career') as HTMLElement
const personHeight = document.querySelector('.personHeight') as HTMLElement
const born_date = document.querySelector('.born_date') as HTMLElement
const born_place = document.querySelector('.born_place') as HTMLElement
const person_genres = document.querySelector('.person_genres') as HTMLElement
const all_movies_count = document.querySelector('.all_movies_count') as HTMLElement
const best_movies_wrap = document.querySelector('.films_flex') as HTMLElement
const gallery_name = document.querySelector('.gallery_name') as HTMLElement
const photos = document.querySelector('.photos') as HTMLElement
const person_photo = document.querySelector('.person_photo') as HTMLImageElement
const cards = document.querySelector('.cards') as HTMLElement

reloadHeader(header)

getData(`person/${id}?language=ru-RU`)
    .then(res => {
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
        reload(res.data.cast.slice(0, 4), Movie, best_movies_wrap)
        reload(res.data.cast.slice(0, 20), MovieCard, cards)
    })

getData(`person/${id}/images`)
    .then(res => {
        reload(res.data.profiles.slice(0, 6), ActorPhoto, photos)
    })