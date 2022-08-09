import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  * as  echarts from 'echarts'


dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale
Vue.use(ElementUI);


Vue.prototype.$echarts = echarts
Vue.prototype.$dayjs = dayjs



//组件全局注册
import Echarts from "@/components/Echarts"
Vue.component(Echarts.name,Echarts)



Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
