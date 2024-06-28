export function faq() {
  $(document).ready(function () {
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
    });
  });
}
