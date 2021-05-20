import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    searchs: [],
    detail : null,
    searchingList: [],
    upComingList: [],
  },
  mutations: {
    SEARCH_MOVIE: function (state, movieList) {
      state.searchs = movieList
      // console.log(state.searchs)
    },
    SEARCH_DETAIL: function (state, movieDetail) {
      state.detail = movieDetail
      // state.searchingList = []
    },
    SEARCHING_MOVIE: function (state, searchingList) {
      state.searchingList = searchingList
    },
    GET_UPCOMING_LIST: function (state, upComingList) {
      state.upComingList = upComingList
    }
  },
  actions: {
    searchMovie: function ({ commit }, inputText) {
      this.state.searchs = []
      // console.log(inputText)
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&query=${inputText}&include_adult=false`,
      })
      .then(res => {
        commit('SEARCH_MOVIE', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
    },
    searchDetail: function ({ commit }, movieId) {
      this.state.detail = null
      // console.log(movieId)
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR`
      })
      .then(res => {
        commit('SEARCH_DETAIL', res.data)
        // console.log(res.data)
      })
      .catch(err => (
        console.log(err)
      ))
    },
    searchingMovie: function ({ commit }, inputText) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&query=${inputText}&include_adult=false`,
      })
      .then(res => {
        commit('SEARCHING_MOVIE', res.data.results)
        // console.log(res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getUpComingList: function ({ commit }) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&page=1'
      })
      .then(res => {
        // console.log(res.data)
        commit('GET_UPCOMING_LIST', res.data.results)
      })
    }
  },
  modules: {
  }
})
