export function item() {
  function scrollToTop() {
    document
      .querySelector(".container-mid")
      .scrollIntoView({ behavior: "smooth" });
  }

  const apiPath =
    "https://raw.githubusercontent.com/Cty0305/2023-Software-Engineer-Experience-Camp/main/tools.json";
  const cardList = document.querySelector(".card-list");
  const pagination = document.querySelector(".pagination");

  let worksData = [];
  let pagesData = {
    total_items: 0,
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
  };

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

        // 根据选定的类型进行筛选
        if (type !== "") {
          worksData = worksData.filter((item) => item.type === type);
        }

        // 設置分頁信息
        const itemsPerPage = 6; // 每頁顯示的項目數
        const totalItems = worksData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        pagesData.total_items = totalItems;
        pagesData.total_pages = totalPages;
        pagesData.current_page = page;
        pagesData.has_pre = page > 1;
        pagesData.has_next = page < totalPages;

        // 根据 sort 进行排序
        worksData.sort((a, b) => {
          const dateA = new Date(a.create_time);
          const dateB = new Date(b.create_time);
          return sort === 1 ? dateB - dateA : dateA - dateB;
        });

        // 使用 slice 方法分页显示数据
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = worksData.slice(startIndex, endIndex);

        renderWorks(paginatedData);
        renderPages();
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
              <a href="#" class="item-type" data-type="${item.type}"><div class="fs-lg">${item.type}</div></a>
              <a href="${item.link}" class="item-link" target="_blank"><span class="material-icons">open_in_new</span></a>
            </div>
          </div>
        </li>`;
    });
    cardList.innerHTML = works;
  }

  // 绑定分页事件
  function bindPaginationEvents() {
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;

      if (target.classList.contains("pagination-item")) {
        data.page = Number(target.dataset.page);
      } else if (target.classList.contains("prePage")) {
        if (pagesData.has_pre) {
          data.page -= 1;
        }
      } else if (target.classList.contains("nextPage")) {
        if (pagesData.has_next) {
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
  function renderPages() {
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
          pagesData.current_page === i ? "active" : ""
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

      getData(data);
      scrollToTop();
    });
  });

  $(".new-to-old").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由新到舊");
    data.sort = 1; // 1 表示由新到舊

    getData(data); // 重新获取并渲染数据
    scrollToTop();
  });

  $(".old-to-new").click(function (e) {
    e.preventDefault();
    $(".filter-selector-dropdown-menu").toggleClass("show");
    $(".filter-selector-button-text").text("由舊到新");
    data.sort = -1; // -1 表示由舊到新

    getData(data); // 重新获取并渲染数据
    scrollToTop();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;

    // 检查点击的元素是否是 .item-type 中的链接
    if (target.closest(".item-type")) {
      e.preventDefault(); // 只在这里阻止默认行为
      const type = target.closest(".item-type").dataset.type; // 获取点击的 type 值

      // 更新 filter-list 中的激活状态
      const filterItems = document.querySelectorAll(
        ".filter-list .filter-item"
      );
      filterItems.forEach((item) => {
        if (item.getAttribute("data-type") === type) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // 更新数据对象中的 type，并重新获取数据
      data.type = type;
      data.page = 1; // 重置到第一页

      // 调用获取数据的函数，重新渲染卡片和分页
      getData(data);
      scrollToTop();
    }
  });
}
