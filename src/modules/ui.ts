import Swiper from "swiper"
import { DebounceLeading } from "../Types"
import { Navigation } from "swiper/modules"
import { getData } from "./request"
import { Search } from "../.././src/components/search"

export function reloadHeader(header: any) {
  const containerDiv = document.createElement("div");
  const headerDiv = document.createElement("div");

  const left = document.createElement("div");
  const leftLink = document.createElement("a");
  const logo = document.createElement("img");

  const center = document.createElement("div");
  const centerNav = document.createElement("nav");
  const navLink1 = document.createElement("a");
  const navLink2 = document.createElement("a");
  const navLink3 = document.createElement("a");
  const navLink4 = document.createElement("a");
  const navLink5 = document.createElement("a");
  const navLink6 = document.createElement("a");
  const navLink7 = document.createElement("a");

  const right = document.createElement("div");
  const tools = document.createElement("div");
  const searchBtn = document.createElement("button");
  const loginBtn = document.createElement("button");

  const searchWrap = document.createElement("div");
  const searchBox = document.createElement("div");
  const searchInput = document.createElement("input");
  const searchIcon = document.createElement("div");
  const closeBtn = document.createElement("button");
  const resultCont = document.createElement("div");
  const result = document.createElement("div");

  searchBtn.onclick = () => {
      searchBtn.classList.add('invisible');
      centerNav.classList.add('invisible');
      searchWrap.classList.remove('invisible');
      document.body.style.overflowY = 'hidden';
  };

  closeBtn.onclick = () => {
      searchBtn.classList.remove('invisible');
      centerNav.classList.remove('invisible');
      searchWrap.classList.add('invisible');
      document.body.style.overflowY = 'visible';
  };

  searchInput.onkeyup = () => {
      const value = searchInput.value;
      getData(`search/multi?query=${value}`)
      .then((res) => reload(res.data.results, Search, resultCont));
  };

  leftLink.href = "/";
  navLink1.href = "#";
  navLink2.href = "#";
  navLink3.href = "#";
  navLink4.href = "#";
  navLink5.href = "#";
  navLink6.href = "#";
  navLink7.href = "#";

  navLink1.innerHTML = "Афиша";
  navLink2.innerHTML = "Медиа";
  navLink3.innerHTML = "Фильмы";
  navLink4.innerHTML = "Актеры";
  navLink5.innerHTML = "Новости";
  navLink6.innerHTML = "Подборки";
  navLink7.innerHTML = "Категории";

  logo.src = "/public/images/logo.png";
  logo.alt = "logo";
  searchBtn.innerHTML = `<img src="/public/images/search.svg" alt="search">`;
  loginBtn.innerHTML = "Войти";
  closeBtn.innerHTML = "&#10005;";
  searchInput.placeholder = "Запрос";

  containerDiv.classList.add("container");
  headerDiv.classList.add("header");

  left.classList.add("left");

  center.classList.add("center");
  centerNav.classList.add("navigation");
  right.classList.add("right");
  tools.classList.add("tools");
  searchBtn.classList.add("search_btn");
  loginBtn.classList.add("login");
  searchWrap.classList.add("search_wrap", "invisible");
  searchBox.classList.add("search_box");
  searchIcon.classList.add("logo_search");
  resultCont.classList.add("result_cont");
  result.classList.add("results")

  searchBox.append(searchInput, searchIcon, closeBtn);
  result.append(resultCont)
  searchWrap.append(searchBox, result);

  tools.append(searchBtn, loginBtn);
  right.append(tools);
  centerNav.append(navLink1, navLink2, navLink3, navLink4, navLink5, navLink6, navLink7);
  center.append(centerNav);
  leftLink.append(logo);
  left.append(leftLink);
  headerDiv.append(left, center, right);
  containerDiv.append(headerDiv, searchWrap);
  header.append(containerDiv);
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


export function setSwiper(arr = [], className = "", component, place, backdrop) {
  const swiperDiv = document.createElement("div");
  const swiperWrapper = document.createElement("div");
  const next = document.createElement("button");
  const prev = document.createElement("button");

  next.classList.add("swiper-button-next");
  prev.classList.add("swiper-button-prev");
  swiperDiv.classList.add(className);
  swiperWrapper.classList.add("swiper-wrapper");

  swiperDiv.append(swiperWrapper, next, prev);
  place.append(swiperDiv);

  reload(arr, component, swiperWrapper, backdrop);

  new Swiper(`.${className}`, {
    modules: [Navigation],
    slidesPerView: 4,
    spaceBetween: 23,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}