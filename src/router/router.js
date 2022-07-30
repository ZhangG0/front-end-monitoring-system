const routes = [
    {
       path:'/',
       name: 'Home',
       component:() => import("@/views/Home") 
    },
    {
       path:'/foot',
       name: 'Foot',
       component:() => import("@/views/Foot") 
    },
   ]

export default routes