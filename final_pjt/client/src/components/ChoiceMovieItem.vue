<template>
  <div class="col-12 col-sm-6 col-md-3 col-lg-2">
    <div class="card">
        <img class="card-img" :src="movie_poster" alt="movie poster">
      <div class="card-img-overlay">
        <input type="checkbox" class="form-check-input" @click="updateChoice" :id="movie.id" :checked="inMyList">
        <label class="form-check-label" :for="movie.id"></label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChoiceMovieItem',
  props: {
    movie: {
      type: Object,
    }
  },
  data: function () {
    return {
      inMyList: false,
    }
  },
  methods: {
    updateChoice: function () {
      this.$store.dispatch('updateChoice', this.movie)
    },
    // recommend header용
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  },
  // created: function () {
  //   if (this.$store.state.myChoice.includes(this.movie)) {
  //     this.inMyList = true
  //   }
  //   else {
  //     this.inMyList = false
  //   }
  // },

  // 새로 만든 created
  created() {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/movies/recommend/',
        data: {
          title: this.movie.title,
          recommend_movieid: this.movie.id,
          recommend_poster: this.movie.poster_path
        },
        headers: this.setToken()
      })
      .then((res) => {
        console.log(res.data)
      })
  },
  computed: {
    movie_poster: function () {
      return 'https://www.themoviedb.org/t/p/original/' + this.movie.poster_path
    }
  }
}
</script>

<style>

</style>