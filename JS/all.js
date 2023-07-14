$(document).ready(function () {
  // Slider
  const swiper = new Swiper(".testimonial-content", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 24,
    loop: true,
    centerSlide: "true",
    fade: "true",
    // 分頁
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      992: {
        grabCursor: "false",
        slidesPerView: 3,
      },
      767: {
        grabCursor: "true",
        slidesPerView: 2,
      },
      0: {
        grabCursor: "true",
        slidesPerView: 1,
      },
    },
  });

  // Filter

  // 點擊.filter-sign-button按钮时切换.show
  $(".filter-sign-button").click(function () {
    $(".filter-sign-dropdown-menu").toggleClass("show");
  });

  // 點擊其他地方移除.show
  $(document).click(function (event) {
    var target = $(event.target);
    if (
      !target.closest(".filter-sign-button").length &&
      !target.closest(".filter-sign-dropdown-menu").length
    ) {
      $(".filter-sign-dropdown-menu").removeClass("show");
    }
  });

  // 點擊選項後更改Filter-sign-button內容
  $(".filter-sign-dropdown-menu .option").click(function (e) {
    e.preventDefault();
    var optionText = $(this).text();
    $(".filter-sign-button-text").text(optionText);
    $(".filter-sign-button")
      .find(".material-icons")
      .css({ "background-color": "#020202", color: "#ffffff" });
    $(".filter-sign-dropdown-menu").removeClass("show");
  });

  // 點擊.filter-selector-button按钮时切换.show
  $(".filter-selector-button").click(function () {
    $(".filter-selector-dropdown-menu").toggleClass("show");
  });

  // 點擊其他地方移除.show
  $(document).click(function (event) {
    var target = $(event.target);
    if (
      !target.closest(".filter-selector-button").length &&
      !target.closest(".filter-selector-dropdown-menu").length
    ) {
      $(".filter-selector-dropdown-menu").removeClass("show");
    }
  });

  $(".new-to-old").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由新到舊");
  });

  $(".old-to-new").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由舊到新");
  });

  // 获取所有的.filter-item元素
  const filterItems = document.querySelectorAll(".filter-item");

  // 为每个.filter-item元素添加点击事件监听器
  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 切换.active类的存在
      this.classList.toggle("active");
    });
  });

  // 點擊pagination-item 加.active icon变回"add"
  $(".pagination-item").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".pagination-item.active").removeClass("active");
      $(this).addClass("active");
    }
  });

  // FAQ區塊

  // 點擊faq-item 加.clicked icon变回"add"
  $(".faq-item").click(function (event) {
    event.stopPropagation();
    if ($(this).hasClass("clicked")) {
      $(this).removeClass("clicked");
      $(this).find(".material-icons").text("add");
    } else {
      $(".faq-item.clicked").removeClass("clicked");
      $(".faq-item .material-icons").text("add");
      $(this).addClass("clicked");
      $(this).find(".material-icons").text("remove");
    }
  });

  // 點擊其他地方移除.clicked icon变回"add"
  $(document).click(function (event) {
    var clickedElement = event.target;

    if (!$(clickedElement).hasClass("faq-item")) {
      $(".faq-item.clicked").removeClass("clicked");
      $(".faq-item .material-icons").text("add");
    }

    // backtotop
    $(".backtotop").click(function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
    });
  });
});

// 資料串接
const apiPath =
  "https://raw.githubusercontent.com/alanchou0305/AI-Tool-King/main/tools.json";
let worksData = [];
let pagesData = [];

const data = {
  type: "",
  sort: 0,
  page: 1,
  search: "",
};

const cardList = document.querySelector(".card-list");
const pagination = document.querySelector(".pagination");

function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ""
  }${search ? `search=${search}` : ""}`;
  axios.get(apiUrl).then((res) => {
    worksData = res.data.ai_works.data;
    pagesData = res.data.ai_works.page;

    renderWorks();
    // renderPages(pagesData);
  });
}

getData(data);

// 渲染 AI 工具
function renderWorks() {
  let works = "";

  worksData.forEach((item) => {
    works += /*html*/ `
    <li class="card">
      <div class="card-img">
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
      <div class="card-content">
        <div class="card-detail">
          <div class="fs-h6">${item.title}</div>
          <p class="fs-md">${item.description}</p>
        </div>
        <div class="card-info">
          <div class="fs-lg">AI 模型</div>
          <div class="author fs-lg">${item.model}</div>
        </div>
        <div class="card-share">
          <a href=""><div class="fs-lg">${item.type}</div></a>
          <a href=""><span class="material-icons">share</span></a>
        </div>
      </div>
    </li>`;
  });
  cardList.innerHTML = works;
}

// 分類標籤切換
const categories = document.querySelectorAll(".filter-list li");
categories.forEach((item) => {
  item.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("active");
    });

    if (item.textContent === "全部") {
      data.type = "";
    } else {
      data.type = item.textContent;
    }

    getData(data);
  });
});

// 切換分頁
// function changePage(pagesData) {
//   const pageLinks = document.querySelectorAll(".pagination-item");
//   let pageId = "";

//   pageLinks.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.preventDefault();
//       pageId = e.target.dataset.page;
//       data.page = Number(pageId);

//       if (!pageId) {
//         data.page = Number(pagesData.current_page) + 1;
//       }

//       getData(data);
//     });
//   });
