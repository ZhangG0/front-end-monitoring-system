export default  function dataProcess(data) {
    //数据初始化
    //X轴数据
    const nowTime = new Date();

    const DataX = [];
    const DataX2 = [];
    //之前一周或之前一天
    const beforeDay = 7;
    //X轴数据数组初始化
    for (let i = 0; i < 12; i++) {
        let tempTime = (Math.abs(nowTime.getHours()-11+i)+":00").padStart(5,"0");
        let tempDate = (nowTime.getMonth()+1)+"-"+(nowTime.getDate()-beforeDay)+" "
        DataX.push(tempTime);
        DataX2.push(tempDate+tempTime)
    }
    console.log("DataX:"+DataX);
    console.log("DataX2"+DataX2);

    console.log(data);
    let todayData=new Array(12).fill(0);//存储今天12个小时内，各个小时内发生的错误数量
    for(let index in data) {
        
        let hour=data[index].time.substring(11,13);
        todayData[DataX.indexOf(hour+":00")]++
    }
    return todayData
}

