import { ActorItem } from "./componentTypes";

let top_place: number = 3
export function Actors(item: ActorItem): HTMLElement{

    let actor = document.createElement("div")
    let left = document.createElement("div")
    let h3 = document.createElement("h3")
    let p = document.createElement("p")
    let right = document.createElement("div")
    let p1 = document.createElement("p")

    actor.classList.add("actor")
    left.classList.add("left")
    right.classList.add("right")

    h3.innerHTML = item.name
    p.innerHTML = item.popularity.toString()
    p1.innerHTML = `${top_place++} место`

    actor.append(left, right)
    left.append(h3, p)
    right.append(p1)

    return actor
}