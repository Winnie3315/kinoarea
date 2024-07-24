import { DataItem } from "../Types";

export function Data(item: DataItem): HTMLElement {
    const dataMain = document.createElement("div");
    const leftInfo = document.createElement('div');
    const rightInfo = document.createElement('div');

    leftInfo.classList.add('left_info');
    rightInfo.classList.add('right_info');
    dataMain.classList.add("c")

    const createInfoItem = (questionText: string, answerText: string): HTMLDivElement => {
        const infoItem = document.createElement('div');
        infoItem.classList.add('info_item');

        const question = document.createElement('h3');
        question.classList.add('question');
        question.innerHTML = questionText;

        const answer = document.createElement('h3');
        answer.classList.add('answer');
        answer.innerHTML = answerText;

        infoItem.append(question, answer);

        return infoItem;
    };

    leftInfo.append(
        createInfoItem('Год:', item.release_date),
        createInfoItem('Страна:', item.production_countries[0]?.name || 'Unknown'),
        createInfoItem('Слоган:', ' - '),
        createInfoItem('Режиссер:', ' - '),
        createInfoItem('Сценарий:', ' - '),
        createInfoItem('Продюссер:', ' - '),
        createInfoItem('Оператор:', ' - '),
        createInfoItem('Композитор:', ' - ')
    );

    rightInfo.append(
        createInfoItem('Художник:', ' - '),
        createInfoItem('Монтаж:', ' - '),
        createInfoItem('Жанр:', `${item.genres[0]?.name || 'Unknown'}, ${item.genres[1]?.name || 'Unknown'}..`),
        createInfoItem('Сборы в мире:', `${item.revenue}$`),
        createInfoItem('Премьера (мир):', item.release_date),
        createInfoItem('Премьера (РФ):', item.release_date),
        createInfoItem('Возраст:', '16+'),
        createInfoItem('Время:', `${item.runtime} мин.`)
    );

    dataMain.append(leftInfo, rightInfo);

    return dataMain;
}