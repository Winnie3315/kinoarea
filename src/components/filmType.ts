import { TypeItem } from "../Types"

export function Type(item: TypeItem){
    const info = document.createElement("div")
    info.classList.add("item")

    info.innerHTML = item.type
    info.onclick = () => {
        if(!info.classList.contains("item_active")){
            info.classList.add("item_active")
        } else{
            info.classList.remove("item_active")
        }
    }
    return info
}