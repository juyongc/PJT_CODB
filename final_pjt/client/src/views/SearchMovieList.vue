<template>
  <ul>
    <SearchMovieListItem
      v-for="(movie, idx) in movies"
      :key="idx"
      :movie="movie"
    />
  </ul>
</template>

<script>
import SearchMovieListItem from '@/components/SearchMovieListItem'

export default {
  name: 'SearchMovieList',
  components: {
    SearchMovieListItem,
  },
  computed: {
    movies: function () {
      return this.$store.state.searchs
    }
  }
}
</script>

<style>

</style>