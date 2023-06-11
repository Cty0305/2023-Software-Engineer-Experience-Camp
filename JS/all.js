$(document).ready(function () {
  
  // 點擊.filter-sign按钮时切换.clicked
  $(".filter-sign").click(function() {
    $(this).toggleClass("clicked");
  });
  // 點擊其他地方移除.clicked
  $(document).click(function(event) {
    var clickedElement = event.target;
    if (!$(clickedElement).hasClass("filter-sign")) {
      $(".filter-sign").removeClass("clicked");
    }
  }); 

  // 點擊.faq-item按钮时切换.clicked
  $(".faq-item").click(function() {
    $(this).toggleClass("clicked");
  });
  // 點擊其他地方移除.clicked
  $(document).click(function(event) {    
    if (!$(clickedElement).hasClass(".faq-item")) {
      $(".faq-item").removeClass("clicked");
    }
  }); 


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
