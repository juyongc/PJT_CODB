<template>
  <div>
    <h1 class="mx-3 my-4">내 영화목록</h1>
    <hr class="mx-3 my-4">
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

</style>