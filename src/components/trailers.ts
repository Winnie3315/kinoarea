import { getData } from "../modules/request";
import { TrailerItem } from "../Types";

export function Trailer(item: TrailerItem, link: HTMLIFrameElement, mainName: HTMLElement, arr: any): HTMLElement {
    const tralerItem = document.createElement("div");
    const picture = document.createElement("img");
    const tralerName = document.createElement("h3");
    const play = document.createElement("img");

    tralerItem.classList.add("trailer-item");
    picture.classList.add("picture");
    play.classList.add("play");

    picture.src = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
    picture.alt = item.title;
    tralerName.innerHTML = item.title;
    play.src = "/public/images/play.svg"

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
    mainName.innerHTML = arr[0].title
    getData(`movie/${arr[0].id}/videos?language=ru-RU`)
        .then(res => {
            if (res.data.results.length > 0) {
                let trailer = res.data.results.find((el: any) => el.type === 'Trailer')
                link.src = `https://www.youtube.com/embed/${trailer.key}`
            } else {
                getData(`movie/${arr[0].id}/videos?language=ru-RU`)
                    .then(res => {
                        let trailer = res.data.results.find((el: any) => el.type === 'Trailer')
                        link.src = `https://www.youtube.com/embed/${trailer.key}`
                    })
            }

        })

    
    tralerItem.append(picture, tralerName, play);
    
    return tralerItem;
}