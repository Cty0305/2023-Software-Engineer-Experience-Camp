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
const cardList = document.querySelector(".card-list");
const pagination = document.querySelector(".pagination");

let worksData = [];
let pagesData = [];

const data = {
  type: "",
  sort: 0,
  page: 1,
  search: "",
};

function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ""
  }${search ? `search=${search}` : ""}`;

  axios.get(apiUrl).then((res) => {
    worksData = res.data.ai_works.data;
    pagesData = res.data.ai_works.page;

    console.log(res.data);
    renderWorks();
    renderPages(pagesData);
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
          <div class="author fs-lg">${item.discordId}</div>
        </div>
        <div class="card-share">
          <a href="${item.link}"><div class="fs-lg">${item.type}</div></a>
          <a href=""><span class="material-icons">share</span></a>
        </div>
      </div>
    </li>`;
  });
  cardList.innerHTML = works;
}

// 切換分頁
const searches = document.querySelectorAll(".container-mid");

function changePage() {
  const pageLinks = document.querySelectorAll(".pagination-item");
  let pageId = "";

  pageLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);
      getData(data);

      // 滑到搜尋區最上方
      searches.forEach((search) => {
        search.scrollIntoView({ behavior: "smooth" });
      });
    });
  });
}

// 上一頁
function prePage(pagesData) {
  const prePage = document.querySelector(".prePage");

  prePage.addEventListener("click", (e) => {
    e.preventDefault();
    data.page = Number(pagesData.current_page) - 1;
    getData(data);

    // 滑到搜尋區最上方
    searches.forEach((search) => {
      console.log(search);

      search.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// 下一頁
function nextPage(pagesData) {
  const nextPage = document.querySelector(".nextPage");

  nextPage.addEventListener("click", (e) => {
    e.preventDefault();
    data.page = Number(pagesData.current_page) + 1;
    getData(data);

    // 滑到搜尋區最上方
    searches.forEach((search) => {
      console.log(search);

      search.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// 分頁選染至畫面
function renderPages(pagesData) {
  let pageStr = "";
  // console.log(pagesData.has_pre);
  // console.log(pagesData.has_next);

  pageStr += `
	<li>
		<a href="#" class="prePage material-icons${
      pagesData.has_pre ? "" : "disabled"
    } ">
				keyboard_arrow_left
		</a>
	</li>`;

  for (let i = 1; i <= pagesData.total_pages; i += 1) {
    pageStr += `<li>
		<a href="#" class="pagination-item fs-md ${
      pagesData.current_page == i ? "active" : ""
    } ${
      pagesData.current_page == i ? "disabled" : ""
    }" data-page="${i}">${i}</a>
	</li>`;
  }

  pageStr += `
	<li>
		<a href="#" class="nextPage material-icons${
      pagesData.has_next ? "" : "disabled "
    }">
				keyboard_arrow_right
		</a>
	</li>`;

  // console.log(pageStr);

  pagination.innerHTML = pageStr;

  changePage();
  prePage(pagesData);
  nextPage(pagesData);
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
      item.classList.add("active");
    } else {
      data.type = item.textContent;
      item.classList.add("active");
    }

    getData(data);
  });
});
