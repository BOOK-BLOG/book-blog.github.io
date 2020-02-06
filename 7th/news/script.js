var consoleLogger = function (state, text) {
  switch (state) {
    case "success":
      console.info("%c " + text + " ", "color:#00b700;background-color:#d9ffd9;border-radius:4px;padding:initial 4px;");
      break;
    default:
      console.info(text);
  }
}

var chartData;
var blankerlCrawler = new XMLHttpRequest();
blankerlCrawler.open('GET', 'https://lab.isaaclin.cn/nCoV/api/overall?latest=0', true);
blankerlCrawler.send();
blankerlCrawler.onreadystatechange = function () {
  if (blankerlCrawler.readyState == 4 && blankerlCrawler.status == 200) {
    consoleLogger("success", ("Got response from: " + blankerlCrawler.responseURL));
    var blankerlCrawlerResponse = blankerlCrawler.responseText;
    blankerlCrawler.result = JSON.parse(blankerlCrawlerResponse);
    // Set Data for Echarts: 
    var blankerlCrawlerLength = blankerlCrawler.result.results["length"];
    var conditionForWhile = blankerlCrawler.result.results["length"];
    chartData = {
      rawDate: new Array(),
      date: new Array(),
      confirmed: new Array(),
      serious: new Array(),
      suspected: new Array(),
      dead: new Array(),
      cured: new Array()
    };
    while (conditionForWhile > 0) {
      chartData.rawDate[blankerlCrawlerLength - conditionForWhile] = new Date();
      chartData.rawDate[blankerlCrawlerLength - conditionForWhile].setTime(blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].updateTime);
      chartData.date[blankerlCrawlerLength - conditionForWhile] = chartData.rawDate[blankerlCrawlerLength - conditionForWhile].getDate();
      chartData.confirmed[blankerlCrawlerLength - conditionForWhile] = blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].confirmedCount;
      chartData.serious[blankerlCrawlerLength - conditionForWhile] = blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].seriousCount;
      chartData.suspected[blankerlCrawlerLength - conditionForWhile] = blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].suspectedCount;
      chartData.dead[blankerlCrawlerLength - conditionForWhile] = blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].deadCount;
      chartData.cured[blankerlCrawlerLength - conditionForWhile] = blankerlCrawler.result.results[blankerlCrawlerLength - conditionForWhile].curedCount;
      conditionForWhile--;
    };
    chartData.rawDate.reverse();
    chartData.date.reverse();
    chartData.confirmed.reverse();
    chartData.serious.reverse();
    chartData.suspected.reverse();
    chartData.dead.reverse();
    chartData.cured.reverse();
    // Create Chart: 
    var chart = echarts.init($("#chart")[0]);
    chartSettings = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#808080'
          }
        }
      },
      legend: {
        data: ['确诊', '重症', '疑似', '死亡', '治愈'],
      },
      xAxis: {
        type: 'category',
        data: chartData.date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '确诊',
          data: chartData.confirmed,
          type: 'line',
          smooth: true
        },
        {
          name: '重症',
          data: chartData.suspected,
          type: 'line',
          smooth: true
        },
        {
          name: '疑似',
          data: chartData.suspected,
          type: 'line',
          smooth: true
        },
        {
          name: '死亡',
          data: chartData.dead,
          type: 'line',
          smooth: true
        },
        {
          name: '治愈',
          data: chartData.cured,
          type: 'line',
          smooth: true
        }
      ]
    };
    chart.setOption(chartSettings);
  }
};