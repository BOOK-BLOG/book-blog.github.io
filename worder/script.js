$(document).ready(function() {
  $(".title-bar").html($(".tab.active").attr("title"));
})

$(".tab").click(function() {
  $(".tab").removeClass("active");
  $(this).addClass("active");
  currentTab = $(this).attr("title");
  currentTabID = $(this).attr("page");
  $(".title-bar").html(currentTab);
  $(".nav-title").addClass("opacity-hide");
  $(".nav-title").addClass("go-right");
  $(".page").removeClass("active");
  $(".page").addClass("go-right");
  $(".page[tab=\"" + currentTabID + "\"]").addClass("go-left");
  setTimeout(function() {
    $(".nav-title").html(currentTab);
    $(".nav-title").removeClass("go-right");
    $(".nav-title").addClass("go-left");
    $(".page").removeClass("go-right");
  }, 250)
  setTimeout(function() {
    $(".nav-title").removeClass("opacity-hide");
    $(".nav-title").removeClass("go-left");
    $(".page[tab=\"" + currentTabID + "\"]").addClass("active");
    $(".page[tab=\"" + currentTabID + "\"]").removeClass("go-left");
  }, 500)
})

// PWA - Progressive Web App - by https://www.pwabuilder.com/

// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("pwabuilder-sw.js", {
        scope: "./"
      })
      .then(function(reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}
