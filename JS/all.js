$(document).ready(function () {
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