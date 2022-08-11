

function timeFormat(time) {
    return   time.getFullYear()+"-"+
            (time.getMonth()+1).toString().padStart(2,"0")+"-"+
             time.getDate().toString().padStart(2,"0")+" "+
             time.getHours().toString().padStart(2,"0")+":"+
             time.getMinutes().toString().padStart(2,"0")+":"+
             time.getSeconds().toString().padStart(2,"0");
}

// 得到当前时间 格式为 [YYYY-MM-DD HH:MM:SS]
const getNowTime = () => {
    return timeFormat(new Date());
}


export {getNowTime}