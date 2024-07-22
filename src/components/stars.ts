import { StarItem } from "./componentTypes"

export function Stars(item: StarItem): HTMLElement{
    const person = document.createElement("div")
    const img = document.createElement("img")
    const personInfo = document.createElement("div")
    const h3 = document.createElement("h3")
    const p = document.createElement("p")

    person.classList.add("person")
    personInfo.classList.add("person-info")

    img.src = `https://image.tmdb.org/t/p/original${item.profile_path}`

    h3.innerHTML = item.name
    p.innerHTML = item.popularity.toString()

    person.append(img, personInfo)
    personInfo.append(h3, p)

    return person
}