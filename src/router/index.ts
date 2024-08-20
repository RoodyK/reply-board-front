import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import PostCreateView from '@/views/PostCreateView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import PostByCategoryView from '@/views/PostByCategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/post/create',
      name: 'PostCreate',
      component: PostCreateView
    },
    {
      path: '/post/:postId',
      name: 'PostDetail',
      component: PostDetailView,
      props: true
    },
    {
      path: '/category/:categoryId/post',
      name: 'PostByCategoryView',
      component: PostByCategoryView,
      props: true
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
