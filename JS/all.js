$(document).ready(function () {

  // Slider
  const swiper = new Swiper('.testimonial-content', {
    slidesPerView:3,
    slidesPerGroup:1,
    spaceBetween:24,
    loop:true,
    centerSlide:"true",
    fade:"true",
    // 分頁   
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets:true,
    },
    breakpoints:{
      992:{
        grabCursor:"false",
        slidesPerView:3,
      },
      767:{
        grabCursor:"true",
        slidesPerView:2,
      },
      0:{
        grabCursor:"true",
        slidesPerView:1,
      }
    }
  });
  


  // Filter

  // 點擊.filter-sign-button按钮时切换.show
  $(".filter-sign-button").click(function() {
    $(".filter-sign-dropdown-menu").toggleClass("show");
  });

  // 點擊其他地方移除.show
  $(document).click(function(event) {
    var target = $(event.target);
    if (!target.closest('.filter-sign-button').length && !target.closest('.filter-sign-dropdown-menu').length) {
      $('.filter-sign-dropdown-menu').removeClass('show');
    }
  });

  // 點擊選項後更改Filter-sign-button內容
  $('.filter-sign-dropdown-menu .option').click(function(e) {
    e.preventDefault();    
    var optionText = $(this).text();
    $('.filter-sign-button-text').text(optionText);
    $(".filter-sign-button").find(".material-icons").css({"background-color":"#020202","color":"#ffffff"});
    $(".filter-sign-dropdown-menu").removeClass("show");
  });





  // 點擊.filter-selector-button按钮时切换.show
  $(".filter-selector-button").click(function() {
    $(".filter-selector-dropdown-menu").toggleClass("show");
  });

  // 點擊其他地方移除.show
  $(document).click(function(event) {
    var target = $(event.target);
    if (!target.closest('.filter-selector-button').length && !target.closest('.filter-selector-dropdown-menu').length) {
      $('.filter-selector-dropdown-menu').removeClass('show');
    }
  });
  
  $('.new-to-old').click(function(e) {
    e.preventDefault();
    $('.filter-selector-dropdown-menu').toggleClass('show');
    $('.filter-selector-button-text').text('由新到舊');
  });
  
  $('.old-to-new').click(function(e) {
    e.preventDefault();
    $('.filter-selector-dropdown-menu').toggleClass('show');
    $('.filter-selector-button-text').text('由舊到新');
  });
  
  // FAQ區塊
  
  // 點擊faq-item 加.clicked icon变回"add"
  $(".faq-item").click(function(event) {
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
  $(document).click(function(event) {
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


const apiPath = "https://2023-engineer-camp.zeabur.app";
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
	const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ""}${search ? `search=${search}` : ""}`;
	axios.get(apiUrl).then((res) => {
		worksData = res.data.ai_works.data;
		pagesData = res.data.ai_works.page;

		renderWorks();
		renderPages(pagesData);
	});
}

getData(data);

// 渲染 AI 工具
function renderWorks() {
	let works = "";

	worksData.forEach((item) => {
		works += /*html*/`
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
    </li>
	</li>`;
	});
	cardList.innerHTML = works;
}
