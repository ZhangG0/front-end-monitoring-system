//求整个数组的平均值(保留两位小数)
//参数1 数组 参数2 保留的位数(默认保留两位)
const arrayAverage = (array) => {
    let total = 0;
    for (let arrayKey in array) {
        total+=array[arrayKey];
    }
    // console.log((total / array.length).toFixed(2))
    return (total / array.length).toFixed(2)

}


function getAve(arr) {
    let sum = 0,
        ave = 0,
        i = 0;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    ave = (sum / arr.length).toFixed(2) - 0;
    return ave;
}

export {arrayAverage, getAve}
