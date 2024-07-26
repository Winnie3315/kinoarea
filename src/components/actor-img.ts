import { PhotoItem } from "../Types";

export function ActorPhoto(photo: PhotoItem): HTMLElement {
    const item = document.createElement('div');
    item.classList.add('item');
    item.style.background = `url(https://image.tmdb.org/t/p/original${photo.file_path}) no-repeat center / cover`;
    return item;
}
