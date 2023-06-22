$(document).ready(function () {

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