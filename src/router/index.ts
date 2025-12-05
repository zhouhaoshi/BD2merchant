import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommodityView from '../views/commodity/CommodityView.vue'
import SenceView from '../views/SenceView.vue'
import charactarView from '../views/charactar/charactarView.vue'
import shaftView from '../views/Shaft/shaftView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '跑商',
      component: HomeView,
    },
    {
      path: '/shop',
      name: '商店管理',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShopView.vue'),
    },
    {
      path: '/commodity',
      name: '商品管理',
      component: CommodityView,
    },
    {
      path: '/sence',
      name: '场景管理',
      component: SenceView,
    },
    {
      path: '/charactar',
      name: '角色管理',
      component: charactarView,
    },
    {
      path: '/shaft',
      name: '排轴',
      component: shaftView,
    },
  ],
})

export default router
