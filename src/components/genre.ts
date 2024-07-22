import { GenreItem } from "./componentTypes";


export function Genres(item: GenreItem): HTMLElement {
    let genre = document.createElement('h4');
    genre.classList.add('genre');
    genre.dataset.genre = item.id;
    genre.innerHTML = item.name;

    let allGenre = document.createElement('h4');
    allGenre.classList.add('genre', 'genre_active');
    allGenre.innerHTML = 'все';
    allGenre.dataset.genre = 'all';
    
    genre.onclick = () => {
        
    }

    return genre;
}

export function AllGenres(): HTMLElement{
    let allGenre = document.createElement('h4');
    allGenre.classList.add('genre', 'genre_active');
    allGenre.innerHTML = 'все';
    allGenre.dataset.genre = 'all';
    return allGenre
}