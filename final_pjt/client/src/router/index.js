import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recommendation from '@/views/Recommendation.vue'
import SearchMovieList from '@/views/SearchMovieList.vue'
import SearchMovieDetail from '@/views/SearchMovieDetail.vue'
import ChoiceMovie from '@/views/ChoiceMovie.vue'
import Reviews from '@/views/community/ReviewList.vue'
import ReviewDetail from '@/views/community/ReviewListItem.vue'
import CreateReview from '@/views/community/CreateReview.vue'
import UpdateReview from '@/views/community/UpdateReview.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation,
  },
  {
    path: '/search',
    name: 'SearchMovieList',
    component: SearchMovieList,
  },
  {
    path: '/search/:title',
    name: 'SearchMovieDetail',
    component: SearchMovieDetail,
  },
  {
    path: '/recommendation/choice',
    name: 'ChoiceMovie',
    component: ChoiceMovie,
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
  },
  {
    path: '/reviews/create',
    name: 'CreateReview',
    component: CreateReview,
  },
  {
    path: '/reviews/:pk',
    name: 'ReviewDetail',
    component: ReviewDetail,
    props: true,
  },
  {
    path: '/reviews/:pk/update',
    name: 'UpdateReview',
    component: UpdateReview,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login/signup',
    name: 'Signup',
    component: Signup,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
