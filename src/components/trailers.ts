import { getData } from "../modules/request";
import { TrailerItem } from "./componentTypes";

export function Trailer(item: TrailerItem, link: HTMLIFrameElement, mainName: HTMLElement): HTMLElement {
    const tralerItem = document.createElement("div");
    const picture = document.createElement("img");
    const tralerName = document.createElement("h3");
    const play = document.createElement("div");

    tralerItem.classList.add("trailer-item");
    picture.classList.add("picture");
    play.classList.add("play");

    picture.src = `https://image.tmdb.org/t/p/original${item.poster_path}`;
    picture.alt = item.title;
    tralerName.innerHTML = item.title;

    tralerItem.onclick = () => {
        getData(`movie/${item.id}/videos`)
        .then(res => {
            let result = res?.data.results.find((el: any) => el.type === "Trailer");
            if (result) {
                link.src = `https://www.youtube.com/embed/${result.key}`;
            }
        }).catch(error => {
            console.error('Error fetching trailer data:', error);
        });

        mainName.innerHTML = item.title;
    };

    tralerItem.append(picture, tralerName, play);
    
    return tralerItem;
}