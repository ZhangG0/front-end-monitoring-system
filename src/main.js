import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  * as  echarts from 'echarts'
import "@/style/index.scss"
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/zh-cn' // import locale

dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale
Vue.use(ElementUI);


Vue.prototype.$echarts = echarts
Vue.prototype.$dayjs = dayjs



//组件全局注册
import Echarts from "@/components/Echarts"
Vue.component(Echarts.name,Echarts)



Vue.config.productionTip = false

// let monitorWhiteScreenNode = document.querySelector('#app');

// if (monitorWhiteScreenNode) {
//     setTimeout(() => {
//         try { 
//             console.log("app节点："+monitorWhiteScreenNode);
//             console.log("innerhtml:"+monitorWhiteScreenNode.innerHTML)
//             if (!monitorWhiteScreenNode.innerHTML) {
//               // 重要节点没有内容
//               console.log("白屏啦")  
//             }else{
//               console.log("没有白屏")
//             }
//         } catch (err) {
//           console.log("错误")
//         }
//     }, 2000);
// }

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

