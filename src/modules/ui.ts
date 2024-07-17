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

export function reloadGenres(arr:Array , place: HTMLElement) {
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
    place.prepend(allGenre)
    allGenre.dataset.genre = 'all'
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


        movie_card.append(movie_poster, average, )
        movie.append(movie_card)
        place.append(movie)
    }
}