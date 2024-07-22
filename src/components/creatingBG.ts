import { BackdropItem } from "./componentTypes";

export function createBackdrop(item: BackdropItem) {
    const div = document.createElement('div');
    div.className = 'photo';
    div.style.background = `url(https://image.tmdb.org/t/p/original${item.file_path}) no-repeat center / cover`;
    return div;
}