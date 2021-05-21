<template>
  <li>
    <h5 @click="searchMovie">{{ movie.title }}</h5>
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
      this.$store.dispatch('searchMovie', this.movie.title)
      this.$router.push({ name: 'SearchMovieList' })
    }
  }
}
</script>

<style>

</style>