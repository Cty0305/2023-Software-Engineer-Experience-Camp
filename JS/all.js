import { testimonial } from "./slider.js";
import { filter } from "./application.js";
import { sort } from "./application.js";
import { faq } from "./faq.js";
import { backToTop } from "./navigation.js";

testimonial();
filter();
sort();
faq();
backToTop();

const apiPath =
  "https://raw.githubusercontent.com/Cty0305/2023-Software-Engineer-Experience-Camp/main/tools.json";
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

// 获取数据函数
function getData({ type, sort, page, search }) {
  axios
    .get(apiPath)
    .then((res) => {
      worksData = res.data.ai_works.data;
      pagesData = res.data.ai_works.page;

      // 根据 sort 进行排序
      worksData.sort((a, b) => {
        const dateA = new Date(a.create_time);
        const dateB = new Date(b.create_time);
        return sort === 1 ? dateB - dateA : dateA - dateB;
      });

      renderWorks();
      renderPages(pagesData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// 页面加载时调用 getData
document.addEventListener("DOMContentLoaded", () => {
  getData(data);
});

// 渲染 AI 工具
function renderWorks() {
  let works = "";
  worksData.forEach((item) => {
    if (data.type === "" || item.type === data.type) {
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
            <a href=""><div class="fs-lg">${item.type}</div></a>
            <a href="${item.link}"><span class="material-icons">open_in_new</span></a>
          </div>
        </div>
      </li>`;
    }
  });
  cardList.innerHTML = works;
}

// 点击分页项切换页面
function changePage() {
  const pageLinks = document.querySelectorAll(".pagination-item");

  pageLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = e.target.dataset.page;
      data.page = Number(pageId); // 更新当前页码
      getData(data); // 获取新数据

      // 滑到搜索区最上方
      document
        .querySelector(".container-mid")
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// 点击上一页按钮
function prePage(pagesData) {
  const prePageBtn = document.querySelector(".prePage");

  prePageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    data.page = Number(pagesData.current_page) - 1; // 更新当前页码
    getData(data); // 获取新数据

    // 滑到搜索区最上方
    document
      .querySelector(".container-mid")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// 点击下一页按钮
function nextPage(pagesData) {
  const nextPageBtn = document.querySelector(".nextPage");

  nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    data.page = Number(pagesData.current_page) + 1; // 更新当前页码
    getData(data); // 获取新数据

    // 滑到搜索区最上方
    document
      .querySelector(".container-mid")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// 分页渲染至页面
function renderPages(pagesData) {
  // 清空 pagination 内容，避免重复渲染
  pagination.innerHTML = "";

  let pageStr = "";

  pageStr += `
  <li>
    <a href="#" class="prePage material-icons ${
      pagesData.has_pre ? "" : "disabled"
    }">
      keyboard_arrow_left
    </a>
  </li>`;

  for (let i = 1; i <= pagesData.total_pages; i += 1) {
    pageStr += `<li>
      <a href="#" class="pagination-item fs-md ${
        pagesData.current_page == i ? "active" : ""
      }" data-page="${i}">${i}</a>
    </li>`;
  }

  pageStr += `
  <li>
    <a href="#" class="nextPage material-icons ${
      pagesData.has_next ? "" : "disabled"
    }">
      keyboard_arrow_right
    </a>
  </li>`;

  pagination.innerHTML = pageStr;

  changePage();
  prePage(pagesData);
  nextPage(pagesData);
}

// 分类标签切换
const categories = document.querySelectorAll(".filter-list li");

// 预设 "全部" 标签为 active
categories.forEach((item) => {
  if (item.textContent === "全部") {
    item.classList.add("active");
  }
});

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
    item.classList.add("active");

    data.page = 1; // 切换分类时重置到第一页

    // 滑到搜索区最上方
    document
      .querySelector(".container-mid")
      .scrollIntoView({ behavior: "smooth" });

    getData(data);
  });
});

$(".new-to-old").click(function (e) {
  e.preventDefault();
  $(".filter-selector-dropdown-menu").toggleClass("show");
  $(".filter-selector-button-text").text("由新到舊");
  data.sort = 1; // 1 表示由新到舊

  // 滑到搜索区最上方
  document
    .querySelector(".container-mid")
    .scrollIntoView({ behavior: "smooth" });

  getData(data); // 重新获取并渲染数据
});

$(".old-to-new").click(function (e) {
  e.preventDefault();
  $(".filter-selector-dropdown-menu").toggleClass("show");
  $(".filter-selector-button-text").text("由舊到新");
  data.sort = -1; // -1 表示由舊到新

  // 滑到搜索区最上方
  document
    .querySelector(".container-mid")
    .scrollIntoView({ behavior: "smooth" });

  getData(data); // 重新获取并渲染数据
});
