$(".dlmodes[mode]").click(function() {
  if ($(".dlmodes[mode]").attr("mode") == "light") {
    $(".dlmodes[mode]").attr("mode", "dark");
    $("body").addClass("dark-mode");
  } else {
    $(".dlmodes[mode]").attr("mode", "light");
    $("body").removeClass("dark-mode");
  }
})
