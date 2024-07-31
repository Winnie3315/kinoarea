import { getData } from "../modules/request";
import { reload } from "../modules/ui";
import { Movie } from "./movie";

// export function setupYearSelection(place: HTMLElement) {
//     const container = document.querySelector(".years") as HTMLElement

//     const yearElements = container.querySelectorAll("h3");

//     yearElements.forEach(element => {
//         element.onclick = () => {
//             yearElements.forEach(el => el.classList.remove("year_active"));

//             element.classList.add("year_active");

//             const year = element.getAttribute("data-year");

//             if (year === "all") {
//                 getData('movie/now_playing?language=ru-RU&page=1').then(res => {
//                     reload(res.data.results, Movie, place);
//                 });
//             } else {
//                 getData(`discover/movie?primary_release_year=${year}&language=ru-RU&page=1`).then(res => {
//                     reload(res.data.results, Movie, place);
//                 });
//             }
//         };
//     })
// }

// export function setupYearSelection(place: HTMLElement) {
//     const container = document.getElementById("year-selection") as HTMLElement;

//     if (!container) {
//         console.warn("Year container not found!");
//         return;
//     }

//     const yearElements = container.querySelectorAll("h3");

//     yearElements.forEach(element => {
//         element.onclick = () => {
//             yearElements.forEach(el => el.classList.remove("year_active"));

//             element.classList.add("year_active");

//             const year = element.getAttribute("data-year");

//             if (year === "all") {
//                 getData('movie/now_playing?language=ru-RU&page=1').then(res => {
//                     reload(res.data.results, Movie, place);
//                 });
//             } else {
//                 getData(`discover/movie?primary_release_year=${year}&language=ru-RU&page=1`).then(res => {
//                     reload(res.data.results, Movie, place);
//                 });
//             }
//         };
//     });
// }

export function reloadYears(container: HTMLElement, place: HTMLElement) {
    if (!container) {
        console.warn("Year container not found!");
        return;
    }

    const years = [
        { year: "all", label: "Все время" },
        { year: "2019", label: "2019" },
        { year: "2018", label: "2018" },
        { year: "2017", label: "2017" },
        { year: "2016", label: "2016" },
        { year: "2015", label: "2015" },
        { year: "2014", label: "2014" }
    ];

    container.innerHTML = '';

    years.forEach(item => {
        const yearElement = document.createElement("h3");
        yearElement.textContent = item.label;
        yearElement.dataset.year = item.year;
        yearElement.classList.add("year");

        if (item.year === "all") {
            yearElement.classList.add("year_active");
        }

        yearElement.onclick = () => {
            container.querySelectorAll("h3").forEach(el => el.classList.remove("year_active"));
            yearElement.classList.add("year_active");

            const year = yearElement.getAttribute("data-year");

            if (year === "all") {
                getData('movie/now_playing?language=ru-RU&page=1').then(res => {
                    reload(res.data.results, Movie, place);
                });
            } else {
                getData(`discover/movie?primary_release_year=${year}&language=ru-RU&page=1`).then(res => {
                    reload(res.data.results, Movie, place);
                });
            }
        };

        container.appendChild(yearElement);
    });
}