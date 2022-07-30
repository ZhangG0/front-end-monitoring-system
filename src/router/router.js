const routes = [
    {
       path:'/',
       name: 'Home',
       component:() => import("@/views/Home") 
    },
    {
       path:'/health',
       name: 'Health',
       component:() => import("@/views/Health") 
    },
    {
      path:'/performance',
      name: 'Performance',
      component:() => import("@/views/PerformancePreview") 
   },

   ]

export default routes