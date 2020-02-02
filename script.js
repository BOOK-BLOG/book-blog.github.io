$("[link]").click(function() {
  window.open($(this).attr("link"))
})

$("body")[0].onload = function() {
  setTimeout(
    function() {
      $("body>h2")[0].classList.add("hidden");
      $("body>.row")[0].classList.add("show");
    }, 1500)
}
