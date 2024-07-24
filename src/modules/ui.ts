import { DebounceLeading } from "../Types"

export function reloadHeader(header: any) {
    const containerDiv = document.createElement("div")
    const headerDiv = document.createElement("div")

    const left = document.createElement("div")
    const leftLink = document.createElement("a")
    const logo = document.createElement("img")

    const center = document.createElement("div")
    const centerNav = document.createElement("nav")
    const navLink1 = document.createElement("a")
    const navLink2 = document.createElement("a")
    const navLink3 = document.createElement("a")
    const navLink4 = document.createElement("a")
    const navLink5 = document.createElement("a")
    const navLink6 = document.createElement("a")
    const navLink7 = document.createElement("a")

    const right = document.createElement("div")
    const tools = document.createElement('div')
    const searchBtn = document.createElement("button") 
    const loginBtn = document.createElement("button")

    leftLink.href = "/"
    navLink1.href = "#"
    navLink2.href = "#"
    navLink3.href = "#"
    navLink4.href = "#"
    navLink5.href = "#"
    navLink6.href = "#"
    navLink7.href = "#"

    navLink1.innerHTML = "Афиша"
    navLink2.innerHTML = "Медиа"
    navLink3.innerHTML = "Фильмы"
    navLink4.innerHTML = "Актеры"
    navLink5.innerHTML = "Новости"
    navLink6.innerHTML = "Подборки"
    navLink7.innerHTML = "Категории"

    logo.src = "/public/images/logo.png"
    logo.alt = "logo"
    searchBtn.innerHTML ="<img src=/public/images/search.svg alt= search>"
    loginBtn.innerHTML = "Войти"

    containerDiv.classList.add("container")
    headerDiv.classList.add("header")

    left.classList.add("left")

    center.classList.add("center")
    centerNav.classList.add("navigation")
    right.classList.add("right")
    tools.classList.add("tools")
    searchBtn.classList.add("search_btn")
    loginBtn.classList.add("login")

    tools.append(searchBtn, loginBtn)
    right.append(tools)
    centerNav.append(navLink1, navLink2, navLink3, navLink4, navLink5, navLink6, navLink7)
    center.append(centerNav)
    leftLink.append(logo)
    left.append(leftLink)
    headerDiv.append(left, center, right)
    containerDiv.append(headerDiv)
    header.append(containerDiv)
}


export function reload<T>(arr: T[], component: (item: T, ...args: any[]) => HTMLElement, place: HTMLElement, ...args: any[]): void {
    place.innerHTML = "";

    for (let item of arr) {
        const elem = component(item, ...args);
        place.append(elem);
    }
}

export const debounce_leading: DebounceLeading = (func, timeout = 300) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
      if (!timer) {
        func.apply(null, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  };