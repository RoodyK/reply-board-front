import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import CreateView from '@/views/PostCreateView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import PostListView from '@/views/PostListView.vue'

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
      component: CreateView
    },
    {
      path: '/post/detail',
      name: 'PostDetail',
      component: PostDetailView
    },
    {
      path: '/category/post',
      name: 'PostList',
      component: PostListView
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
