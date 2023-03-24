import { createRouter, createWebHistory, type RouteLocationNamedRaw, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import type { Menu, Nav } from '@/typeing'
import { useMenu } from '@/stores'
import { useLogin } from '@/stores'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      //  redirect: "/login",
      //children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const loginstore = useLogin()
  console.log("to===:", to, router.getRoutes().length)
  //判断登陆状态
  if (loginstore.Info.access_token) {

    if (to.path == '/login') {
      //重定向
      next({ path: '/' })

    } else {
      if (router.getRoutes().length === 3) {
        const menu = useMenu()
        const routers = generateRouter(menu.menuList)
        routers.filter(one => {
          console.log("one==", one)

          router.addRoute(one)
          // next({ path: one.path })
        })
        //这里把，非正常的页面动态加载
        router.addRoute({
          path: '/:pathMatch(.*)',
          redirect: '404',
        })

        if (router.getRoutes().length !== 3) {
          return next({ path: to.path })
        }

      }
      next()
    }


  } else {

    if (to.path !== '/login') {
      next({ path: '/login' })

    } else {
      next()
    }


  }




  // //如果静态路由过少。等于静态配置。那么就直接。动态添加路由

})

//生成一个新的routes
function generateRouter(menus: Menu[]) {
  let newRoutes = menus.map(route => {
    let _route: RouteRecordRaw = {
      path: "/" + route.name,
      name: route.name,
      component: () => import(`@/views/${route.name}.vue`),
      children: []
    }
    if (route.children) {
      _route.children = generateRouter(route.children)
    }
    return _route
  });
  return newRoutes

}




export default router
