import Swiper from "swiper"
import { DebounceLeading } from "../Types"
import { Navigation } from "swiper/modules"
import { getData } from "./request"
import { Search } from "../.././src/components/search"
import axios from "axios"

export function reloadHeader(header: any) {
  const containerDiv = document.createElement("div");
  const headerDiv = document.createElement("div");

  const left = document.createElement("div");
  const leftLink = document.createElement("a");
  const logo = document.createElement("img");
  const menuBtn = document.createElement("button")


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

  logo.src = "/images/logo.png";
  logo.alt = "logo";
  searchBtn.innerHTML = `<img src="/images/search.svg" alt="search">`;
  loginBtn.innerHTML = "Войти";
  closeBtn.innerHTML = "&#10005;";
  searchInput.placeholder = "Запрос";
  menuBtn.innerHTML = `<img src="/images/Меню.svg" alt="search">`;

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
  menuBtn.classList.add("menu")

  searchBox.append(searchInput, searchIcon, closeBtn);
  result.append(resultCont)
  searchWrap.append(searchBox, result);

  tools.append(searchBtn, loginBtn);
  right.append(tools);
  centerNav.append(navLink1, navLink2, navLink3, navLink4, navLink5, navLink6, navLink7);
  center.append(centerNav);
  leftLink.append(logo);
  left.append(leftLink, menuBtn);
  headerDiv.append(left, center, right);
  containerDiv.append(headerDiv, searchWrap);
  header.append(containerDiv);

  if (window.innerWidth <= 1200) {
    containerDiv.append(centerNav)
    center.append(leftLink)
    left.append(searchBtn)
  } else {
    center.append(centerNav);
    left.append(leftLink);
    tools.prepend(searchBtn)
  }

  window.onresize = () =>{
    const resizeHeader = () => {
      if (window.innerWidth <= 1200) {
        containerDiv.append(centerNav)
        center.append(leftLink)
        left.append(searchBtn)
      } else {
        center.append(centerNav);
        left.append(leftLink);
        tools.prepend(searchBtn)
      }
    };
    resizeHeader()
  }

  const modal = document.getElementById('modal-mobile') as HTMLElement
  const closeBt = document.getElementById('close-btn') as HTMLElement

  if(modal && closeBt){
      menuBtn.onclick = () => {
        modal.style.display = 'block';
      }

      closeBt.onclick = () => {
        modal.style.display = 'none';
      }
  }


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


export function setSwiper(arr = [], className = "", component: any, place: any,  backdrop?: any) {
  const swiperDiv = document.createElement("div");
  const swiperWrapper = document.createElement("div");
  const next = document.createElement("button");
  const prev = document.createElement("button");

  next.classList.add("swiper-button-next", `.${className}-next`);
  prev.classList.add(`swiper-button-prev`, `.${className}-prev` );
  swiperDiv.classList.add(className);
  swiperWrapper.classList.add("swiper-wrapper");

  swiperDiv.append(swiperWrapper, next, prev);
  place.append(swiperDiv);

  if(backdrop){
    reload(arr, component, swiperWrapper, backdrop);
  } else {
    reload(arr, component, swiperWrapper)
  }
  
  
  new Swiper(`.${className}`, {
    modules: [Navigation],
    slidesPerView: 4,
    spaceBetween: 23,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320:{
        slidesPerView: 1
      },
      490: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      567:{
        slidesPerView: 2, 
        spaceBetween: 10
      },
      768:{
        slidesPerView: 2,
        spaceBetween: 15
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 15
      }



    }
  });
}

export function reloadFooter(footer: HTMLElement) {
  const footerDiv = document.createElement("div");
  const footerTop = document.createElement("div");
  const logo = document.createElement("img");
  const footerCenter = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const inpDiv = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const form = document.createElement("form") as HTMLFormElement;

  footerDiv.classList.add("footer");
  footerTop.classList.add("footer-top");
  footerCenter.classList.add("footer-center");
  inpDiv.classList.add("inp");

  logo.src = "/images/Логотип.svg";
  logo.alt = "logo";
  title.innerHTML = "Подпишитесь на E-mail рассылку";
  description.innerHTML = "Если хотите быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку!";
  input.type = "text";
  input.placeholder = "Введите свой E-mail адрес";
  input.name = "email";
  button.innerHTML = "Подписаться";
  button.type = "submit";

  form.name = "emailForm";

  let canSubmit = true;
  const submitDelay = 60000000;

  form.onsubmit = (e: any) => {
    e.preventDefault();

    if (!canSubmit) {
      alert("Пожалуйста, подождите перед повторной отправкой формы.");
      return;
    }

    canSubmit = false;
    setTimeout(() => {
      canSubmit = true;
    }, submitDelay);

    const emailForm: any = {
      email: ""
    };

    const fm = new FormData(e.target);

    fm.forEach((value, key) => {
      emailForm[key] = value;
    });

    let text = `Новая заявка \n`;
    text += `Почта: ${emailForm.email}`;

    axios.post(`https://api.telegram.org/bot${"7284101349:AAFP2NSD3-Oe3-wYUqY0h4mG6Pfn6BjlrxA"}/sendMessage`, {
      chat_id: -1002208427557,
      text: text,
      mode: "HTML"
    });
    form.reset();
  };

  footerTop.append(logo);
  inpDiv.append(input, button);
  form.append(inpDiv);
  footerCenter.append(title, description, form);
  footerDiv.append(footerTop, footerCenter);

  footer.append(footerDiv);
}

export function creatingTrailer(place: HTMLElement, id: number, src: HTMLIFrameElement) {
  let selectedType: string = "Trailer";

  function Type(item: any) {
      const info = document.createElement("div");
      info.classList.add("item");
      info.innerHTML = item.type;
      
      if (item.type === selectedType) {
          info.classList.add("item_active");
      }

      info.onclick = () => {
          document.querySelectorAll(".item").forEach(el => el.classList.remove("item_active"));
          info.classList.add("item_active");
          selectedType = item.type;
          updateVideo(id, selectedType, src);
      };

      return info;
  }

  function updateVideo(id: number, type: string, src: HTMLIFrameElement) {
      getData(`movie/${id}/videos?language=ru-RU`).then(res => {
          let result = res.data.results.find((el: any) => el.type === type);
          if (result) {
              src.src = `https://www.youtube.com/embed/${result.key}`;
          } else {
              src.src = "";
          }
      });
  }


  getData(`movie/${id}/videos?language=ru-RU`).then(res => {
      let result = res.data.results.find((el: any) => el.type === selectedType);
      if (result) {
          src.src = `https://www.youtube.com/embed/${result.key}`;
      }
      reload(res.data.results, Type, place);
  });


}