export function item() {
  const apiPath =
    "https://raw.githubusercontent.com/Cty0305/2023-Software-Engineer-Experience-Camp/main/tools.json";
  const cardList = document.querySelector(".card-list");
  const pagination = document.querySelector(".pagination");

  let worksData = [];
  let pagesData = {};

  let data = {
    type: "",
    sort: 1,
    page: 1,
    search: "",
  };

  // 获取数据函数
  function getData({ type, sort, page, search }) {
    axios
      .get(apiPath)
      .then((res) => {
        // Combine data from all pages
        worksData = [
          ...res.data.ai_works.data,
          ...res.data.ai_works_page_2.data,
          ...res.data.ai_works_page_3.data,
        ];

        // 設置分頁信息
        const itemsPerPage = 6; // 每頁顯示的項目數
        const totalItems = worksData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        pagesData = {
          total_items: totalItems,
          total_pages: totalPages,
          current_page: page,
          has_pre: page > 1,
          has_next: page < totalPages,
        };

        // 根据 sort 进行排序
        worksData.sort((a, b) => {
          const dateA = new Date(a.create_time);
          const dateB = new Date(b.create_time);
          return sort === 1 ? dateB - dateA : dateA - dateB;
        });

        // 使用 slice 方法分頁顯示數據
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = worksData.slice(startIndex, endIndex);

        console.log(worksData);
        renderWorks(paginatedData);
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
  function renderWorks(paginatedData) {
    let works = "";
    paginatedData.forEach((item) => {
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

  function scrollToTop() {
    document
      .querySelector(".container-mid")
      .scrollIntoView({ behavior: "smooth" });
  }

  // 绑定分页事件
  function bindPaginationEvents() {
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;

      if (target.classList.contains("pagination-item")) {
        data.page = Number(target.dataset.page);
      } else if (target.classList.contains("prePage")) {
        if (data.page > 1) {
          data.page -= 1;
        }
      } else if (target.classList.contains("nextPage")) {
        if (data.page < pagesData.total_pages) {
          data.page += 1;
        }
      } else {
        return;
      }

      getData(data);
      scrollToTop();
    });
  }

  // 渲染分页
  function renderPages(pagesData) {
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

    bindPaginationEvents();
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

      scrollToTop();
      getData(data);
    });
  });

  $(".new-to-old").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由新到舊");
    data.sort = 1; // 1 表示由新到舊

    scrollToTop();
    getData(data); // 重新获取并渲染数据
  });

  $(".old-to-new").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由舊到新");
    data.sort = -1; // -1 表示由舊到新

    scrollToTop();
    getData(data); // 重新获取并渲染数据
  });
}
