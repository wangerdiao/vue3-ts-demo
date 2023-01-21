import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'goods',
    children:[
      {
        path:'goods',
        name:'goods',
        meta:{
          isShow:true,
          title:'商品列表'
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/GoodsView.vue')
      },
      {
        path:'user',
        name:'user',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/UserView.vue')
      },
      {
        path:'role',
        name:'role',
        meta:{
          isShow:true,
          title:'角色列表'
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/RoleView.vue')
      },
      {
        path:'authority',
        name:'authority',
        meta:{
          isShow:false,
          title:'权限列表'
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/AuthorityView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next) => {
   const token:string | null = localStorage.getItem('token')
   if(!token ) {
    if(to.path=='/login') next()
    else next('login')
   }else {
    next()
   }
})
export default router
