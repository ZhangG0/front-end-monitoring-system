//节流
export function throttle(func, time) {
    let timer
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            console.log('this',this);
            func.apply(this, args)
            timer = null
        }, time)
    }
}

//防抖
export function debounce(func,time){
    let timer 
    return function (...args) { 
        if(timer) clearTimeout(timer)
        timer =  setTimeout(() => {
            func.apply(this,args)
            timer = null
        }, time);
     }
}

