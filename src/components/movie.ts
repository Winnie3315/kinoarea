import { MovieItem } from "../Types";

export function Movie(item: MovieItem, backdrop: HTMLElement): HTMLElement {
    const movie = document.createElement('a');
    const movieCard = document.createElement("div");
    const moviePoster = document.createElement("img");
    const average = document.createElement("span");
    const movieName = document.createElement("div");

    moviePoster.classList.add("movie_poster");
    movieName.classList.add("movie_name");
    movieCard.classList.add("movie_card");
    movie.classList.add('movie_card_link');
    movie.classList.add("swiper-slide")
    average.classList.add('score');

    movie.href = `/pages/movie/?id=${item.id}`;
    moviePoster.src = item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : `/images/404poster.jpg`
    moviePoster.alt = item.title;
    average.innerHTML = item.vote_average.toFixed(1).toString()
    movieName.innerHTML = item.title;

    movie.onmouseenter = () => {
        backdrop.style.background = `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) no-repeat center / cover`;
    };

    movieCard.append(moviePoster, average, movieName);
    movie.append(movieCard);
    return movie;
}
