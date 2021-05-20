<template>
  <div class="movie-info">
    <input type="text" v-model="inputText" @keyup.enter="searchMovie">
    <button @click="searchMovie">검색</button>
  </div>
</template>

<script>
export default {
  name: 'SearchMovieFrom',
  data: function () {
    return {
      inputText: null,
    }
  },
  methods: {
    searchMovie: function () {
      // console.log(this.inputText)
      this.$store.dispatch('searchMovie', this.inputText)
      this.$router.push({ name: 'SearchMovieList' })
    }
  }
}
</script>

<style>

</style>