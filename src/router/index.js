import Router from "vue-router"
import Vue from "vue"
Vue.use(Router)

const routes = [
 {
    path:'/home',
    component:() => import("@/views/Home") 
 },
 {
    path:'/foot',
    component:() => import("@/views/Foot") 
 },
]


const router = new Router({
    routes
})

export default router