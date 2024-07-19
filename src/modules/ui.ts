import { getData } from "./request"

export function reloadHeader(header: any) {
    const containerDiv = document.createElement("div")
    const headerDiv = document.createElement("div")

    const left = document.createElement("div")
    const leftLink = document.createElement("a")
    const logo = document.createElement("img")

    const center = document.createElement("div")
    const centerNav = document.createElement("nav")
    const navLink1 = document.createElement("a")
    const navLink2 = document.createElement("a")
    const navLink3 = document.createElement("a")
    const navLink4 = document.createElement("a")
    const navLink5 = document.createElement("a")
    const navLink6 = document.createElement("a")
    const navLink7 = document.createElement("a")

    const right = document.createElement("div")
    const tools = document.createElement('div')
    const searchBtn = document.createElement("button") 
    const loginBtn = document.createElement("button")

    leftLink.href = "/'"
    navLink1.href = "#"
    navLink2.href = "#"
    navLink3.href = "#"
    navLink4.href = "#"
    navLink5.href = "#"
    navLink6.href = "#"
    navLink7.href = "#"

    navLink1.innerHTML = "Афиша"
    navLink2.innerHTML = "Медиа"
    navLink3.innerHTML = "Фильмы"
    navLink4.innerHTML = "Актеры"
    navLink5.innerHTML = "Новости"
    navLink6.innerHTML = "Подборки"
    navLink7.innerHTML = "Категории"

    logo.src = "/public/images/logo.png"
    logo.alt = "logo"
    searchBtn.innerHTML ="<img src=/public/images/search.svg alt= search>"
    loginBtn.innerHTML = "Войти"

    containerDiv.classList.add("container")
    headerDiv.classList.add("header")

    left.classList.add("left")

    center.classList.add("center")
    centerNav.classList.add("navigation")
    right.classList.add("right")
    tools.classList.add("tools")
    searchBtn.classList.add("search_btn")
    loginBtn.classList.add("login")

    tools.append(searchBtn, loginBtn)
    right.append(tools)
    centerNav.append(navLink1, navLink2, navLink3, navLink4, navLink5, navLink6, navLink7)
    center.append(centerNav)
    left.append(leftLink, logo)
    headerDiv.append(left, center, right)
    containerDiv.append(headerDiv)
    header.append(containerDiv)
}

export function reloadGenres(arr:Array<any> , place: HTMLElement) {
    place.innerHTML = ''

    for (let item of arr) {
        let genre = document.createElement('h4')
        genre.classList.add('genre')
        genre.dataset.genre = item.id
        genre.innerHTML = item.name

        place.append(genre)
    }


    let allGenre = document.createElement('h4')
    allGenre.classList.add('genre', 'genre_active')
    allGenre.innerHTML = 'все'
    
    allGenre.dataset.genre = 'all'
    place.prepend(allGenre)
}

export function reloadMovies(arr, place) {
    const backdrop = document.querySelector('.backdrop')

    place.innerHTML = ''

    for (let item of arr) {
        const movie = document.createElement('a')
        const movie_card = document.createElement("div")
        const movie_poster = document.createElement("img")
        const average = document.createElement("span")
        const movie_name = document.createElement("div")

        movie_poster.classList.add("movie_poster")
        movie_name.classList.add("movie_name")
        movie_card.classList.add("movie_card")
        movie.classList.add('movie_card_link')
        average.classList.add('score')
        movie.href = `/pages/movie/?id=${item.id}`
        movie_poster.src = `https://image.tmdb.org/t/p/original${item.poster_path}`
        movie_poster.alt = "movie"
        average.innerHTML = item.vote_average
        movie_name.innerHTML = item.title

        movie.onmouseenter = () => {
            backdrop.style.background = `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) no-repeat center / cover`
        }

        

        movie_card.append(movie_poster, average, movie_name)
        movie.append(movie_card)
        place.append(movie)
    }
}

// export function reload(arr, component, place){
//     place.innerHTML = ""

//     for(let item of arr){
//         const elem = component(item)

//         place.append(elem)
//     }
// }


// export function reloadActors(arr, place){
//     place.innerHTML = "";

//     for(let item of arr){
//         let div = document.createElement("div")

//     }
// }

export function reloadTrailers(arr, place){
    place.innerHTML = "";

    const link = document.querySelector(".trailer-link");
    const mainName = document.querySelector(".traler-name h3");

    for(let item of arr) {
        const tralerItem = document.createElement("div");
        const picture = document.createElement("img");
        const tralerName = document.createElement("h3");
        const play = document.createElement("div");

        tralerItem.classList.add("trailer-item");
        picture.classList.add("picture");
        play.classList.add("play");

        picture.src = `https://image.tmdb.org/t/p/original${item.poster_path}`;
        tralerName.innerText = item.title

        tralerItem.onclick = () => {
            getData(`https://api.themoviedb.org/3/movie/${item.id}/videos`)
            .then(res => {
                let result = res.data.results.find(el => el.type === "Trailer");
                if(result) {
                    link.src = `https://www.youtube.com/embed/${result.key}`;
                }
            });

            mainName.innerText = item.title;
        }

        place.append(tralerItem);
        tralerItem.append(picture, tralerName, play);
    }
}

export function reloadStars(arr, place){
    place.innerHTML = "";

    for(let item of arr){
        const person = document.createElement("div")
        const img = document.createElement("img")
        const personInfo = document.createElement("div")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")

        person.classList.add("person")
        personInfo.classList.add("person-info")

        img.src = `https://image.tmdb.org/t/p/original${item.profile_path}`

        h3.innerHTML = item.name
        p.innerHTML = item.popularity

        place.append(person)
        person.append(img, personInfo)
        personInfo.append(h3, p)
    }
    
}

export function reloadActors(arr, place){
    place.innerHTML = ""
    let top_place: number = 3
    for(let item of arr) {
        let actor = document.createElement("div")
        let left = document.createElement("div")
        let h3 = document.createElement("h3")
        let p = document.createElement("p")
        let right = document.createElement("div")
        let p1 = document.createElement("p")

        actor.classList.add("actor")
        left.classList.add("left")
        right.classList.add("right")

        h3.innerHTML = item.name
        p.innerHTML = item.popularity
        p1.innerHTML = `${top_place++} место`

        place.append(actor)
        actor.append(left, right)
        left.append(h3, p)
        right.append(p1)
    }
}