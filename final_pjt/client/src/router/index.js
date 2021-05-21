import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recommendation from '@/views/Recommendation.vue'
import SearchMovieList from '@/views/SearchMovieList.vue'
import SearchMovieDetail from '@/views/SearchMovieDetail.vue'
import ChoiceMovie from '@/views/ChoiceMovie.vue'

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

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
