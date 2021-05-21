<template>
  <li>
    <h5 @click="searchMovie">{{ movie.title }}</h5>
    <img :src="movie_poster" alt="" style="width: 30%;">
  </li>
</template>

<script>
export default {
  name: 'UpcomingItem',
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    searchMovie: function () {
      // console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
    }
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