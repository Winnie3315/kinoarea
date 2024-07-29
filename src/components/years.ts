import { getData } from "../modules/request";
import { reload } from "../modules/ui";
import { Movie } from "./movie";

export function setupYearSelection() {
    const popularsCont = document.querySelector(".popular-playing") as HTMLElement
    const container = document.querySelector(".years") as HTMLElement

    const yearElements = container.querySelectorAll("h3");

    yearElements.forEach(element => {
        element.onclick = () => {
            yearElements.forEach(el => el.classList.remove("year_active"));

            element.classList.add("year_active");

            const year = element.getAttribute("data-year");

            if (year === "all") {
                getData('movie/now_playing?language=ru-RU&page=1').then(res => {
                    reload(res.data.results, Movie, popularsCont);
                });
            } else {
                getData(`discover/movie?primary_release_year=${year}&language=ru-RU&page=1`).then(res => {
                    reload(res.data.results, Movie, popularsCont);
                });
            }
        };
    })
}
