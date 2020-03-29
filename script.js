$(window).ready(function () {
    $(".slide-content-ctn").attr("show", "false");
    $(".slide-content-ctn[slide-num=\"1\"]").attr("show", "true");
    $(".slide-bottom-label-ctn").attr("show", "false");
    $(".slide-bottom-label-ctn[slide-num=\"1\"]").attr("show", "true");
    $("[slide-action=\"previous\"]").click(function () {
        windowOnScrollUp()
    })
    $("[slide-action=\"next\"]").click(function () {
        windowOnScrollDown()
    })
})

function windowOnScrollUp() {
    var activeSlideNum = parseInt($("[show=\"true\"]").attr("slide-num"));
    if (activeSlideNum > 1) {
        activeSlideNum--;
        $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").addClass("go-up");
        setTimeout(function () {
            $(".slide-content-ctn").attr("show", "false");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").attr("show", "true");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").removeClass("go-up");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum + 1) + "\"]").addClass("go-down");
        }, 500)
        $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").addClass("go-up");
        setTimeout(function () {
            $(".slide-bottom-label-ctn").attr("show", "false");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").attr("show", "true");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").removeClass("go-up");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum + 1) + "\"]").addClass("go-down");
        }, 500)
    }
}

function windowOnScrollDown() {
    var activeSlideNum = parseInt($("[show=\"true\"]").attr("slide-num"));
    if (activeSlideNum < 3) {
        activeSlideNum++;
        $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").addClass("go-down");
        setTimeout(function () {
            $(".slide-content-ctn").attr("show", "false");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").attr("show", "true");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").removeClass("go-down");
            $(".slide-content-ctn[slide-num=\"" + String(activeSlideNum - 1) + "\"]").addClass("go-up");
        }, 500)
        $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").addClass("go-down");
        setTimeout(function () {
            $(".slide-bottom-label-ctn").attr("show", "false");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").attr("show", "true");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum) + "\"]").removeClass("go-down");
            $(".slide-bottom-label-ctn[slide-num=\"" + String(activeSlideNum - 1) + "\"]").addClass("go-up");
        }, 500)
    }
}

var windowOnScroll = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
            windowOnScrollUp();
        }
        if (e.wheelDelta < 0) {
            windowOnScrollDown();
        }
    } else if (e.detail) {
        if (e.detail > 0) {
            windowOnScrollUp();
        }
        if (e.detail < 0) {
            windowOnScrollDown();
        }
    }
}

if (document.attachEvent) {
    document.attachEvent('onmousewheel', windowOnScroll);

}

if (document.addEventListener) {//firefox
    document.addEventListener('DOMMouseScroll', windowOnScroll, false);
}

window.onmousewheel = windowOnScroll;
