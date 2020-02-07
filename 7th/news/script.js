var consoleLogger = function(state, text) {
    switch (state) {
        case "success":
            console.info("%c " + text + " ", "color:#00b700;background-color:#d9ffd9;border-radius:4px;padding:initial 4px;");
            break;
        default:
            console.info(text);
    }
}

// Send the requests: 
// https://lab.isaaclin.cn/nCoV/api/overall?latest=0
var blankerlCrawler = new XMLHttpRequest();
blankerlCrawler.open('GET', 'https://lab.isaaclin.cn/nCoV/api/overall?latest=0', true);
blankerlCrawler.send();
// https://lab.isaaclin.cn/nCoV/api/news?num=all
var blankerlCrawlerNews = new XMLHttpRequest();
blankerlCrawlerNews.open('GET', 'https://lab.isaaclin.cn/nCoV/api/news?num=10', true);
blankerlCrawlerNews.send();

var chartData;

blankerlCrawler.onreadystatechange = function() {
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
            series: [{
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
        consoleLogger("success", ("Chart is created successfully"));
    }
};

blankerlCrawlerNews.onreadystatechange = function() {
    if (blankerlCrawlerNews.readyState == 4 && blankerlCrawlerNews.status == 200) {
        consoleLogger("success", ("Got response from: " + blankerlCrawlerNews.responseURL));
        var blankerlCrawlerNewsResponse = blankerlCrawlerNews.responseText;
        blankerlCrawlerNews.result = JSON.parse(blankerlCrawlerNewsResponse);
        $("#loading").remove();
        var blankerlCrawlerNewsLength = blankerlCrawlerNews.result.results["length"];
        var conditionForWhile = blankerlCrawlerNews.result.results["length"];
        while (conditionForWhile > 0) {
            var resultsCache = blankerlCrawlerNews.result.results[blankerlCrawlerNewsLength - conditionForWhile];
            var StrEle = "<div><div class=\"news-content\"><h1>" + resultsCache.title + "</h1><p>" + resultsCache.summary + "</p><a class\"primary-button\" href=\"" + resultsCache.sourceUrl + "\">前往 " + resultsCache.infoSource + " 以查看更多</a></div></div>";
            var Ele = $(StrEle).addClass("news");
            $("#news-container").append(Ele);
            conditionForWhile--;
        }
        $("#news-container").append($("<a href=\"http://www.myzaker.com/channel/22068\">前往 ZAKER 频道：直击新冠肺炎疫情</a>").addClass("primary-button"));
        consoleLogger("success", ("News is shown successfully"));
    }
};