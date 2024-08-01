import { SearchItem } from "../Types";

export function Search(item: SearchItem){
    const link = document.createElement('a');
    const leftDiv = document.createElement('div');
    const img = document.createElement('img');
    const infoDiv = document.createElement('div');
    const title = document.createElement('h3');
    const origTitle = document.createElement('h4');
    const releaseDate = document.createElement('p');
    const rateDiv = document.createElement('div');
    const rateText = document.createElement('span')

    link.classList.add('res_movie_card');
    leftDiv.classList.add('left_movie');
    infoDiv.classList.add('res_movie_info');
    title.classList.add('res_movie_name');
    origTitle.classList.add('res_movie_name_orig');
    releaseDate.classList.add('res_movie_date');
    rateDiv.classList.add('res_movie_rate');
    rateText.classList.add('res_movie_rate_text');

    link.href = `/movie/?id=${item.id}`;
    img.src = item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/public/images/404poster.jpg';
    img.alt = '';
    rateText.innerHTML = item.vote_average.toFixed(1)

    title.innerHTML = item.title || item.name 
    origTitle.innerHTML = item.original_title;
    releaseDate.innerHTML = item.release_date;

    infoDiv.append(title, origTitle, releaseDate);
    leftDiv.append(img, infoDiv);
    rateDiv.append(rateText);
    link.append(leftDiv, rateDiv);

    return link
}