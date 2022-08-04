const routes = [
    {
       path:'/',
       name: 'Home',
       component:() => import("@/views/Home") 
    },
    {
      path:'/error',
      name: 'Error',
      component:() => import("@/views/ErrorPreview") 
   },
   {
      path:'/performance',
      name: 'Performance',
      component:() => import("@/views/PerformancePreview") 
   },
   {
      path:'/userBehavior',
      name: 'UserBehavior',
      component:() => import("@/views/UserBehaviorPreview") 
   },
   {
      path:'/http',
      name: 'HTTP',
      component:() => import("@/views/HttpPreview") 
   },
    {
       path:'/health',
       name: 'Health',
       component:() => import("@/views/Health") 
    },
    

   ]

export default routes