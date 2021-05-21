<template>
  <li>
    <!-- <p>{{ movie }}</p> -->
    <h5 @click="searchMovie">{{ movie.title }}</h5>
  </li>
</template>

<script>
export default {
  name: 'RecommendationItem',
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    searchMovie: function () {
      // console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail' })
    }
  }
}
</script>

<style>

</style>