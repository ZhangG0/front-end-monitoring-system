// 获取浏览器信息
function getBrowserInfo() {
    let browserName = navigator.userAgent;
    // i不区分大小写
    if (/edg/i.test(browserName)) {
        return 'Edg';
    } else if (/qqbrowser/i.test(browserName)) {
        return 'QQ';
    } else if (/Firefox/i.test(browserName)) {
        return 'Firefox';
    } else if (/Trident/i.test(browserName)) {
        return 'IE';
    } else if (/OPR/i.test(browserName)) {
        return 'Opera';
    } else if (/Chrome/i.test(browserName)) {
        return'Chrome';
    }else if((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))){
        return 'Safari'
    }else {
        return 'Other';
    }
   }

//Vue2 全局错误捕获
//需要在main.js中 handleError(Vue);
const handleError = Vue => {
    // vue 捕获错误钩子函数
    Vue.config.errorHandler = (err,vm, info) => {

        let errStr = err.stack.toString().split("\n");

        // time
        const time =new Date() - new Date(0);
        // 异常类型
        const Type = "AA"
        // JS错误类型
        const errorType =errStr[0].split(":")[0];
        //判断是否为资源异常

        // path 路径
        const path = window.location.href;
        console.log("捕获异常----------------------------------------------------");
        console.log("Type:"+Type);
        console.log("time:"+time);
        console.log("errorType:"+errorType)
        console.log("browserName:"+getBrowserInfo());
        console.log("path:"+path);
        console.log("捕获--------------------------------------------------------");
        console.log(errStr);
        console.log(err.stack);
        console.log(vm);
        console.log(info);
        console.log("捕获异常End--------------------------------------------------");

        /*
          上送报错信息
          这里可以定制任何信息,比如用户信息,用户点击历史记录,用户路由历史记录等
        */
        // axios({
        //     method: 'post',
        //     url: `${process.env.VUE_APP_MONITOR_BASE_API}/mointor/reportError`,
        //     data: {
        //         environment,
        //         location: window.location.href,
        //         message: err.message,
        //         stack: err.stack,
        //         // 当前组件
        //         component: vm.$vnode.tag,
        //         // 浏览器信息
        //         browserInfo: getBrowserInfo(),
        //         // 以下信息可以放在vuex store中维护
        //         // 用户ID
        //         userId:'001',
        //         // 用户名称
        //         userName:'张三',
        //         // 路由记录
        //         routerHistory:[
        //             {
        //                 fullPath:'/login',
        //                 name:'Login',
        //                 query:{},
        //                 params:{},
        //             },{
        //                 fullPath:'/home',
        //                 name:'Home',
        //                 query:{},
        //                 params:{},
        //             }
        //         ],
        //         // 点击记录
        //         clickHistory:[
        //             {
        //                 pageX:50,
        //                 pageY:50,
        //                 nodeName:'div',
        //                 className:'test',
        //                 id:'test',
        //                 innerText:'测试按钮'
        //             }
        //         ],
        //     }
        // });
    }}

// 捕获H5错误！
const handleErrorForH5 = () => {
  window.addEventListener("error", (error) => {
      //请求ID
      let RequestId ="A"+(new Date() - new Date(0));
      // 异常类型
      let Type = "异常上报"
      // JS错误类型
      // let errorType =
      console.log("捕获异常---------------------------------------------------------");
      console.log(RequestId);
      console.log(Type);
      console.log("捕获-------------------------------------------------------------");
      console.log(error);
      console.log(error.message);
      console.log("捕获异常监听End--------------------------------------------------");

  },
      //为True意味捕获阶段使用，为了能够捕获到资源加载异常
      true)
}

//自定义异常
 function MyError(message){
    this.name = 'MyError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.__proto__ = Error.prototype;
MyError.prototype.constructor = MyError;

export { handleError, handleErrorForH5, MyError }