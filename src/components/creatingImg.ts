import { ImageItem } from "./componentTypes";

export function createImage(item: ImageItem) {
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${item.file_path}`;
    img.alt = '';
    return img;
}
