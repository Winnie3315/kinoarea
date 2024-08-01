import { CardItem } from "../Types";

export function MovieCard(item: CardItem) {
    const card = document.createElement('div');
    const cardLeft = document.createElement('div');
    const miniPoster = document.createElement('img');
    const leftText = document.createElement('div');
    const title = document.createElement('h2');
    const originalTitle = document.createElement('p');
    const character = document.createElement('p');
    const cardRight = document.createElement('div');
    const rating = document.createElement('div');
    const ratingItem = document.createElement('div');
    const ratingValue = document.createElement('p');
    const ratingSource = document.createElement('span');
    const buttonContainer = document.createElement('div');
    const buttonLink = document.createElement('a');
    const button = document.createElement('button');

    card.classList.add('card');
    cardLeft.classList.add('card_left');
    miniPoster.classList.add('mini_poster');
    leftText.classList.add('left_text');
    originalTitle.classList.add('gray');

    character.classList.add('actor');
    cardRight.classList.add('card_right');
    rating.classList.add('reyting');
    ratingItem.classList.add('item');
    buttonContainer.classList.add('btn');

    miniPoster.src = item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/public/images/404poster.jpg';
    miniPoster.alt = '';

    title.innerHTML = item.title;
    originalTitle.innerHTML = item.original_title;
    character.innerHTML = item.character;
    ratingValue.innerHTML = item.vote_average.toFixed(1);
    ratingSource.innerHTML = 'TMDb';
    button.innerHTML = 'Карточка фильма';
    buttonLink.href = `/movie/?id=${item.id}`;

    ratingItem.append(ratingValue, ratingSource);
    rating.append(ratingItem);
    buttonLink.append(button);
    buttonContainer.append(buttonLink);
    cardRight.append(rating, buttonContainer);
    leftText.append(title, originalTitle, character);
    cardLeft.append(miniPoster, leftText);
    card.append(cardLeft, cardRight);

    return card;
}