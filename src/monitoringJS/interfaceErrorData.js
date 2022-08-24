
export function initInterfaceErrorEchartsData(Data,option) {
  const EchartsRequestData = Data[0];
  const EchartsRequestDataBefore = Data[1];
  console.log('test'+EchartsRequestData);
  //数据初始化
  //X轴数据定义
  const nowTime = new Date();
  const DataX = [];
  const DataXBefore = [];
  //之前一周或之前一天
  const beforeDay = 7;
  //X轴数据数组初始化
  const tempDate = (nowTime.getMonth()+1)+"-"+(nowTime.getDate()-beforeDay)+" "
  for (let i = 0; i < 12; i++) {
      let tempTime = (Math.abs(nowTime.getHours()-11+i)+":00").padStart(5,"0");

      DataX.push(tempTime);
      DataXBefore.push(tempDate+tempTime)
  }
  option.xAxis[0].data=DataX;
  option.xAxis[1].data=DataXBefore;

  //时间段内错误次数
  const DataToday = new Array(12).fill(0);
  //确认接口情况再考虑Before数据的处理方式 先写死
  const DataBefore = new Array(12).fill(0);
  // const DataBefore = [2,3,6,2,0,1,6,2,3,6,1,3];


  // const DataBeforeResources = [2,3,0,2,0,1,0,2,3,0,1,0];
  // 循环后端传来的今天的数据
  for (let echartsRequestDataKey in EchartsRequestData) {
      
      let requestData = EchartsRequestData[echartsRequestDataKey];
       //折线图各个小时发生的总错误量
       let timeSlot = requestData.portanomalyTime.substring(11,13)+":00";

       //防止后端数据异常
       if (DataX.indexOf(timeSlot) !== -1){
           DataToday[DataX.indexOf(timeSlot)]++;
       }
     
  }

  // 循环后端传来的之前的数据
  for (let echartsRequestDataBeforeKey in EchartsRequestDataBefore) {
      let requestDataBefore = EchartsRequestDataBefore[echartsRequestDataBeforeKey];

      //折线图各个小时发生的总错误量
      let timeSlot = requestDataBefore.portanomalyTime.substring(11,13)+":00";

      //防止后端数据异常
      if (DataX.indexOf(timeSlot) !== -1){
          DataBefore[DataX.indexOf(timeSlot)]++;
      }
  }
  option.series[1].data=DataToday;
  option.series[0].data=DataBefore;

}
