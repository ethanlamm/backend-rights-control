import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'

import store from '@/store'
Vue.use(Router)

const usersRoute = { path: '/users', component: Users }
const rolesRoute = { path: '/roles', component: Roles }
const goodsRoute = { path: '/goods', component: GoodsList }
const categoriesRoute = { path: '/categories', component: GoodsCate }

// 创建路由映射关系
const routesMap = {
  // rightlist中的路径path-(映射)-路由
  'users': usersRoute,
  'roles': rolesRoute,
  'goods': goodsRoute,
  'categories': categoriesRoute
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        // { path: '/users', component: Users },  // 用户列表
        // { path: '/roles', component: Roles },  // 角色管理
        // { path: '/goods', component: GoodsList },  // 商品列表
        // { path: '/categories', component: GoodsCate }  // 商品分类
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
// 动态添加路由函数
export function initDynamicRoutes() {
  // 根据rightlist，对路由router.options.routes进行动态添加
  // console.log(router.options.routes);
  let routelist = router.options.routes
  let rightlist = store.state.rightlist
  rightlist.forEach(item => {
    item.children.forEach(Item => {
      // console.log(Item.path);
      let temp = routesMap[Item.path]
      // 将rights传过去
      temp.meta = Item.rights
      routelist[2].children.push(temp)
    })
  })
  // 重新赋值
  router.addRoutes(routelist)
}


// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    let token = sessionStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
