
export function initJSErrorEchartsData(Data,option,RingData) {
    const EchartsRequestData = Data[0];
    const EchartsRequestDataBefore = Data[1];
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
    //JS异常图表 X轴
    option.JSErrorEchartOption.xAxis[0].data = DataX;
    option.JSErrorEchartOption.xAxis[1].data = DataXBefore;
    //资源异常图表 X轴
    option.ResourcesErrorEchartOption.xAxis[0].data = DataX;
    option.ResourcesErrorEchartOption.xAxis[1].data = DataXBefore;

    //时间段内错误次数
    const DataToday = new Array(12).fill(0);
    const DataBefore = new Array(12).fill(0);

    const DataTodayResources = new Array(12).fill(0);
    const DataBeforeResources = new Array(12).fill(0);

    //各JS错误小类错误量，用于Ring
    const errTypeCount = {
        Error: {
            errType:'其他错误',
            count:0,
        },
        ReferenceError: {
            errType:'引用错误',
            count:0,
        },
        TypeError: {
            errType:'类型错误',
            count:0,
        },
        RangeError: {
            errType:'边界错误',
            count:0,
        },
        ResourceError: {
            errType:'资源异常',
            count:0,
        },
        URIError: {
            errType:'URL错误',
            count:0,
        },
        total:0
    };
    // 循环后端传来的今天的数据
    for (let echartsRequestDataKey in EchartsRequestData) {
        let requestData = EchartsRequestData[echartsRequestDataKey];

        //区分为js异常还是资源异常 src为”null“ || "" || null 则为JS异常 且判断errorType
        if ((requestData.src === "null" || requestData.src === "" || requestData.src === null) && requestData.errorType !== "ResourceError" ){
            // JS错误异常
            //折线图各个小时发生的总错误量
            let timeSlot = requestData.time.substring(9,11)+":00";
            //防止后端数据异常
            if (DataX.indexOf(timeSlot) !== -1){
                errTypeCount.total++;
                DataToday[DataX.indexOf(timeSlot)]++;
                switch (requestData.errorType) {
                    //饼状图用计算各种错误的百分比
                    case "Error":
                        errTypeCount.Error.count++;
                        break;
                    case "ReferenceError":
                        errTypeCount.ReferenceError.count++;
                        break;
                    case "TypeError":
                        errTypeCount.TypeError.count++;
                        break;
                    case "RangeError":
                        errTypeCount.RangeError.count++;
                        break;
                    case "URIError":
                        errTypeCount.URIError.count++;
                        break;
                }
            }

        }else{
            // 资源异常
            errTypeCount.ResourceError.count++;

            //折线图各小时发生的资源异常
            let timeSlot = requestData.time.substring(9,11)+":00";
            if (DataX.indexOf(timeSlot) !== -1){
                DataTodayResources[DataX.indexOf(timeSlot)]++;
            }

        }
    }
    // 循环后端传来的之前的数据
    for (let echartsRequestDataBeforeKey in EchartsRequestDataBefore) {
        let requestDataBefore = EchartsRequestDataBefore[echartsRequestDataBeforeKey];

        //区分为js异常还是资源异常 src为”null“ || "" || null 则为JS异常 且判断errorType
        if ((requestDataBefore.src === "null" || requestDataBefore.src === "" || requestDataBefore.src === null) && requestDataBefore.errorType !== "ResourceError" ){
            // JS错误异常

            //折线图各个小时发生的总错误量
            let timeSlot = requestDataBefore.time.substring(9,11)+":00";

            //防止后端数据异常
            if (DataX.indexOf(timeSlot) !== -1){
                DataBefore[DataX.indexOf(timeSlot)]++;
            }

        }else{
            // 资源异常
            errTypeCount.ResourceError.count++;

            //折线图各小时发生的资源异常
            let timeSlot = requestDataBefore.time.substring(9,11)+":00";
            if (DataX.indexOf(timeSlot) !== -1){
                DataBeforeResources[DataX.indexOf(timeSlot)]++;
            }

        }
    }

    option.JSErrorEchartOption.series[1].data = DataToday;
    option.JSErrorEchartOption.series[0].data = DataBefore;
    option.ResourcesErrorEchartOption.series[1].data = DataTodayResources;
    option.ResourcesErrorEchartOption.series[0].data = DataBeforeResources;

    RingData.TypeError = ((errTypeCount.TypeError.count/errTypeCount.total)*100).toFixed(2) - 0;
    RingData.RangeError = ((errTypeCount.RangeError.count/errTypeCount.total)*100).toFixed(2) - 0;
    RingData.ReferenceError = ((errTypeCount.ReferenceError.count/errTypeCount.total)*100).toFixed(2) - 0;
    RingData.URIError = ((errTypeCount.URIError.count/errTypeCount.total)*100).toFixed(2) - 0;
    RingData.OtherError = ((errTypeCount.Error.count/errTypeCount.total)*100).toFixed(2) - 0;
}
