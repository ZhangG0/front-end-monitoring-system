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
import axios from 'axios'
import VueAxios from 'vue-axios'



dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

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
