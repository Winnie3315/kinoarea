import { GenreItem } from "../Types";

export function Genres(item: GenreItem): HTMLElement {
    let genre = document.createElement('h4');

    if (item.name === "All") {
        genre.classList.add("genre_active");
        // location.href = "/"
    }

    genre.classList.add('genre');
    genre.dataset.genre = item.id ? item.id : '';
    genre.innerHTML = item.name;

    genre.onclick = () => {
        const params = new URLSearchParams(window.location.search);

        if (item.name === "All") {
            params.delete('genre');
        } else if (item.id) {
            params.set('genre', item.id);
        }

        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        location.reload();
    }

    return genre;
}