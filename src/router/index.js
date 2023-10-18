import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login', 
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/manage',

      component: () => import('@/views/manage/ManagePage.vue')
    },
    {
      path: '/chat',
      component: () => import('@/views/chat/ChatPage.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/test',
      component: () => import('@/views/TestPage.vue')
    },
    {
      path: '/404',
      component: ()=> import('@/views/error/ErrorPage.vue')
    },
    {
      path: '/emoji',
      component: ()=> import('@/components/Emoji.vue')
    },
    {
      path: '/dialog',
      component: ()=> import('@/components/Dialog.vue')
    }
  ]
})
router.beforeEach((to, from, next) =>{
  if(to.matched.length === 0){
    next('/404')
  }
  else{
    next()
  }
  const useStore = useUserStore()
  if(useStore.token === '' && to.path !== '/login')return '/login'
})
export default router
