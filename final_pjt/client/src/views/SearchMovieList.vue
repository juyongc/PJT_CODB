<template>
  <div>
    <h2>검색 결과</h2>

    <div class="row row-cols-1">
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

</style>