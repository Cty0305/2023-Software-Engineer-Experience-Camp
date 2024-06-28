export function filter() {
  $(document).ready(function () {
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
  });
}

export function sort() {
  $(document).ready(function () {
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
  });
}
