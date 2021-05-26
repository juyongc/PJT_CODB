import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// import router from 'src/router'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    currentMovieList: [],
    searchs: [],
    detail : null,
    searchingList: [],
    upComingList: [],
    recommendList: [],
    choiceList : [],
    myChoice: [],
    page: 1,
    backdropsImg: [],
    reviews: [],
    review: '',
    credits: [],
    isLogin: false,
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
    },
    CHOICE_MOVIE_SET: function (state, movieSet) {
      state.choiceList = movieSet
    },
    PREVIOUS_PAGE: function (state) {
      state.page -= 1
      // console.log(state.page)
    },
    NEXT_PAGE: function (state) {
      state.page += 1
      // console.log(state.page)
    },
    SET_PAGE: function (state, page) {
      state.page = page
    },
    UPDATE_CHOICE: function (state, movie) {
      if (!state.myChoice.includes(movie)) {
        state.myChoice.push(movie)
        // console.log(state.myChoice)
      }
      else {
        const index = state.myChoice.indexOf(movie)
        state.myChoice.splice(index, 1)
        // console.log(state.myChoice)
      }
    },
    MAKE_RECOMMENDATION: function (state, movieSet) {
      if (movieSet.length > 4) {
        const newMovieSet = movieSet.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        state.recommendList = state.recommendList.concat(newMovieSet)
      }
      // console.log(state.recommendList)
    },
    GET_IMAGES: function (state, filePath) {
      for (const path of filePath) {
        state.backdropsImg.push(path.file_path)
      }
      // console.log(state.backdropsImg)
    },
    GET_CREDITS: function (state, credits) {
      state.credits = credits
    },
    GET_REVIEWS: function (state, reviews) {
      state.reviews = reviews
      // console.log(state.reviews)
    },
    GET_REVIEW_DETAIL: function (state, review) {
      state.review = review
    },
    ON_LOGOUT: function (state) {
      state.isLogin = false
    },
    ON_LOGIN: function (state) {
      state.isLogin = true
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
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&page=1&region=KR'
      })
      .then(res => {
        // console.log(res.data)
        commit('GET_UPCOMING_LIST', res.data.results)
      })
    },
    choiceMovie: function ({ commit }, page) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&page=${page}`
      })
      .then(res => {
        commit('CHOICE_MOVIE_SET', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateChoice: function ({ commit }, movie) {
      commit('UPDATE_CHOICE', movie)      
    },
    makeRecommendation: function ({ commit }) {
      this.state.recommendList = []
      // console.log(this.state.myChoice)
      for (let movie of this.state.myChoice) {
        // console.log(movieId)
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR&page=1`
        })
        .then(res => {
          // console.log(res.data.results)
          commit('MAKE_RECOMMENDATION', res.data.results)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    getImages: function ({ commit }, movieId) {
      this.state.backdropsImg = []
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=7ecf0fa910e1bacb146ddf503cf3ec72`
      })
      .then(res => {
        // console.log(res.data.backdrops)
        commit('GET_IMAGES', res.data.backdrops)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCredits: function ({ commit }, movieId) {
      // this.state.credits = []
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7ecf0fa910e1bacb146ddf503cf3ec72&language=ko-KR`
      })
      .then(res => {
        // console.log(res.data)
        commit('GET_CREDITS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getReviews: function ({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/reviews/',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        // console.log(res.data)
        commit('GET_REVIEWS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getReviewDetail: function ({ commit }, reviewPk) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/community/review/${reviewPk}`,
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => {
        // console.log(res.data)
        commit('GET_REVIEW_DETAIL', res.data)
      })
      .catch(err => {
        alert(err)
      })
    },
    // 진짜 모르겠다. 여기 질문한번 해야할듯
    // createReview: function ({ commit }, data) {
    //   console.log(data)
    //   const reviewItem = {
    //     title: data.title,
    //     movie_title: data.movieTitle,
    //     rank: data.value,
    //     content: data.text,
    //   }
    //   axios({
    //     method: 'post',
    //     url: 'http://127.0.0.1:8000/community/reviews/',
    //     data: reviewItem,
    //   })
    //   .then(res => {
    //     if (res.status === 201) {
    //       commit('CREATE_REVIEW', res.data)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  modules: {
  },
})
