<template>
  <div id="SerchMovie">
    <h2 class="mb-4 text-warning fw-bold">Search Results</h2>

    <div class="container-fluid">
      <SearchMovieListItem
        v-for="(movie, idx) in movies"
        :key="idx"
        :movie="movie"
      />
    </div>
  </div>
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
#SerchMovie {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
</style>