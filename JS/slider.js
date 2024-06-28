export function testimonial() {
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
  });
}
