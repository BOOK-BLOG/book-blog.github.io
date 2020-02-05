var consoleLogger = function(state, text) {
  switch (state) {
    case "success":
      console.info("%c " + text + " ", "color:#00b700;background-color:#d9ffd9;border-radius:4px;padding:initial 4px;");
      break;
    default:
      console.info(text);
  }
}

var chartDataSetter = function(source) {}

var blankerlCrawler = new XMLHttpRequest();
blankerlCrawler.open('GET', 'https://lab.isaaclin.cn/nCoV/api/overall?latest=0', true);
blankerlCrawler.send();
blankerlCrawler.onreadystatechange = function() {
  if (blankerlCrawler.readyState == 4 && blankerlCrawler.status == 200) {
    consoleLogger("success", ("Got response from: " + blankerlCrawler.responseURL));
    var blankerlCrawlerResponse = blankerlCrawler.responseText;
    blankerlCrawler.result = JSON.parse(blankerlCrawlerResponse);
    chartDataSetter(blankerlCrawler.result);
  }
};

var chart = echarts.init($("#chart")[0]);

chartSettings = {
  xAxis: [{
    type: 'category',
    data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
  }]
};

chart.setOption(chartSettings);
