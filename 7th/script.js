var blankerlCrawler = new XMLHttpRequest();
blankerlCrawler.open('GET', 'https://lab.isaaclin.cn/nCoV/api/area?latest=1', true);
blankerlCrawler.send();
blankerlCrawler.onreadystatechange = function() {
  if (blankerlCrawler.readyState == 4 && blankerlCrawler.status == 200) {
    var blankerlCrawlerResponse = blankerlCrawler.responseText;
    console.log(JSON.parse(blankerlCrawlerResponse))
  }
};

function createMarker(icon, x, y, title, address, source, name, telephone, type) {
  var marker = new AMap.Marker({
    position: new AMap.LngLat(x, y),
    icon: icon,
    title: title,
    anchor: 'bottom-center',
    bookBlogInfo: {
      x: x,
      y: y,
      title: title,
      address: address,
      source: source,
      name: name,
      telephone: telephone,
      type: type
    }
  })
  marker.on('click', function() {
    map.setZoom(17);
    map.setFitView(marker);
    $(".detail").addClass("hide");
    $(".controls").addClass("hide");
    $("[info=\"title\"]").html(title);
    $("[info=\"address\"]").html(address);
    $("[info=\"source\"]").html(source);
    $("[info=\"source\"]").attr("href", source);
    $("[info=\"name\"]").html(name);
    $("[info=\"telephone\"]").html(telephone);
    $("[info=\"telephone\"]").attr("href", ("tel:" + telephone));
    $("button[open-in=\"amap\"]").click(function() {
      marker.markOnAMAP({
        name: title,
        position: marker.getPosition()
      })
    });
    $("button[open-in=\"apple-map\"]").click(function() {
      window.location.href = "https://maps.apple.com/?q=" + address;
    });
    setTimeout(function() {
      $(".detail").removeClass("hide");
    }, 350)
  })
  return marker;
};

var marker = {
  hospital: {
    marker: [
      createMarker("./icon/hospital-marker.png", 114.275458, 30.584738, "协和医院", "武汉市江汉区汉口解放大道1277号", "https://news.sina.com.cn/gn/2020-01-30/detail-iimxxste7673100.d.html", "胡秋实", "13707162353", "hospital")
    ]
  },
  protect: []
};

$(".list-down").click(function() {
  $(".controls").addClass("down");
  $(".list-down").addClass("hide");
  $(".list-up").removeClass("hide");
})
$(".list-up").click(function() {
  $(".controls").removeClass("down");
  $(".list-up").addClass("hide");
  $(".list-down").removeClass("hide");
})

$("#hospital-length").html(marker.hospital.marker["length"]);

$(".refresh").click(function() {
  location.reload();
})

$(".change-source").click(function() {
  var hrefer;
  if (window.location.href.search("sdevxd.github.io") != -1) {
    hrefer = "https://book-blog.github.io/7th/";
  } else if (window.location.href.search("book-blog.github.io") != -1) {
    hrefer = "http://kt7yvd.coding-pages.com/7th/";
  } else if (window.location.href.search("kt7yvd.coding-pages.com") != -1) {
    hrefer = "https://book-blog.github.io/7th/";
  }
  window.location.href = hrefer;
})

// amap
var map = new AMap.Map('map');
map.on('complete', function() {
  $(".controls").removeClass("hide");
  map.add(marker.hospital.marker);
  $(".list-item[type]").click(function() {
    map.setFitView(marker.hospital.marker);
    $("[src=\"./icon/" + $(this).attr("type") + "-marker.png\"]").addClass("active");
    $(this).addClass("active");
  })
})
map.on('click', function() {
  $(".amap-icon img.active").removeClass("active");
  $(".list-item.active[type]").removeClass("active");
  $(".detail").addClass("hide");
  $(".controls").removeClass("hide");
})
