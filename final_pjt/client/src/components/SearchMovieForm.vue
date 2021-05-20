<template>
  <div class="movie-info">
    <input 
      type="text" 
      v-model="inputText" 
      @keyup.enter="searchMovie" 
      name='searchingList' 
      list='searchingList'
      @input="searchingMovie"
    >
    <datalist id="searchingList">
      <option
        v-for="movie in searchingMovies"
        :key="movie.id"
      >{{ movie.title }}</option>
    </datalist>
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
      if (this.$route.path !== '/search') {
        this.$router.push({ name: 'SearchMovieList' })
      }
      // this.$router.go(this.$router.currentRoute)
      this.inputText = ''
    },
    searchingMovie: function () {
      // console.log(this.inputText)
      if (this.inputText){
        if (this.inputText.length > 1) {
          this.$store.dispatch('searchingMovie', this.inputText)
          }
        }
      }
  },
  computed: {
    searchingMovies: function () {
      return this.$store.state.searchingList
    }
  }
}
</script>

<style>

</style>