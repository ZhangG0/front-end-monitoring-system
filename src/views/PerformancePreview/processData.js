export class Performance {
  constructor() {
    this.performanceFp = []
    this.performanceFcp = []
    this.performanceDomready = []
    this.performanceDnstime = []
    this.performanceResponse = []
    this.performanceResources = []
    this.performanceFirstpackage = []
    this.performancePagefull = []
  }
}

// 获取数组平均值函数，保留2位小数
export function getAve(arr) {
  let sum = 0,
    ave = 0,
    i = 0
  for (i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  ave = (sum / arr.length).toFixed(2) - 0
  return ave
}

// 获取符合对应时间的数据组成的数组
function getHourArray(arr, hour) {
  let hourArray = arr.filter((data) => {
    let re = /\s\d+/
    let h = re.exec(data.performanceTime) - 0
    if (h == hour) {
      return true
    } else {
      return false
    }
  })
  return hourArray
}

// push一小时/当天内的数据
function pushData(series, array) {
  // 一小时/当天内可能有好几个数据，先用临时对象存放今天所有的指标
  let tempDate = new Performance()
  // 先让临时变量拿到这一小时/当天内所有指标的数据
  for (const j of array) {
    Object.keys(tempDate).forEach((key) => {
      tempDate[key].push(j[key])
    })
  }
  // 再让临时变量每个指标都平均
  for (const key in tempDate) {
    tempDate[key] = getAve(tempDate[key])
  }
  // 最后push给series
  Object.keys(series).forEach((key) => {
    series[key].push(tempDate[key])
  })
}

// 处理数据
export function processData(resData) {
  let todaySeries = new Performance()
  let weekSeries = new Performance()

  // 处理日数据resData[0]
  for (let hour = 0; hour < 24; hour++) {
    let hourArray = getHourArray(resData.today, hour)
    pushData(todaySeries, hourArray)
  }

  let weekArray = ['sev', 'six', 'fiv', 'fou', 'thr', 'two', 'one']
  // 处理周数据resData[1]-[7]
  for (let i = 0; i < weekArray.length; i++) {
    pushData(weekSeries, resData[weekArray[i]])
  }

  return {
    todaySeries,
    weekSeries,
  }
}
