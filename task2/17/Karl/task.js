/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: Object.keys(aqiSourceData)[0],
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart = document.querySelector('.aqi-chart-wrap');
  while(chart.firstChild) {
    chart.removeChild(chart.firstChild);
  }
  for(var date in chartData) {
    var pillar = document.createElement('span');
    var quality;
    switch (true) {
      case chartData[date]<100:
        quality = 'excellent';
        break;
      case chartData[date]<200:
        quality = 'good';
        break;
      case chartData[date]<300:
        quality = 'average';
        break;
      case chartData[date]<400:
        quality = 'bad';
        break;
      default:
        quality = 'worst';
        break;
    }
    pillar.setAttribute('class',pageState.nowGraTime+' '+quality);
    pillar.setAttribute('title',date+':'+chartData[date]);
    pillar.style.height = (chartData[date]/500)*100+'%';
    chart.appendChild(pillar);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var time = document.querySelector('input[name=gra-time]:checked').value;
  if(time == pageState.nowGraTime) {return false;}
  // 设置对应数据
  pageState.nowGraTime = time;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var select = document.querySelector('#city-select');
  var city = select.options[select.selectedIndex].value;
  // 设置对应数据
  pageState.nowSelectCity = city;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.querySelector('#form-gra-time').addEventListener('click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.querySelector('#city-select');
  for(city in aqiSourceData) {
    var option = document.createElement('option');
    option.textContent = city;
    citySelect.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var allData = aqiSourceData[pageState.nowSelectCity];
  chartData = {};
  if(pageState.nowGraTime == 'day') {
    chartData = allData;
  }
  if(pageState.nowGraTime == 'week') {
    var averageApi,
        countedDays = 0,
        sum = 0,
        week = 1;
    for(var date in allData) {
      var day = (new Date(date)).getDay();
      sum += allData[date];
      countedDays++;
      // 每周日or最后一天结算
      if(day == 6 || date == Object.keys(allData)[Object.keys(allData).length-1]) {
        averageApi = parseInt(sum/countedDays);
        chartData['第'+week+'周'] = averageApi;
        // reset
        countedDays = 0, sum = 0, week++;
      }
    }
  }
  if(pageState.nowGraTime == 'month') {
    var averageApi = 0,
        sum = 0,
        countedDays = 0;
    for(var date in allData) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var totalDays = (new Date(year,month+1,0)).getDate();
      sum += allData[date];

      if(day == totalDays) {
        averageApi = parseInt(sum/totalDays);
        chartData[(month+1)+'月'] = averageApi;
        averageApi=0, sum=0, countedDays=0;
      }
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  // 一开始先渲染一次
  renderChart();
}

init();
