<template>
  <div id="Mymovie">
    <h2 class="mb-4 text-warning fw-bold">MY Movie</h2>
    <hr style="color: rgb(255,193,7); border: 2px solid rgb(255,169,0); opacity: 1">
    <div class="row g-3 mx-3 my-3">
      <WatchlistItem
        v-for="movie in movieList" 
        :key="movie.movieid"
        :movie="movie"
      />      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import WatchlistItem from '@/components/WatchlistItem.vue'

export default {
  name: 'Watchlist',
  components: { 
    WatchlistItem, 
  },
  data: function () {
    return {
      movieList: [],
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },

  },
  created() {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/',
        headers: this.setToken()
      })
      .then((res) => {
        this.movieList = res.data
      })
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getReviews')
    }
    else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
#Mymovie {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
</style>