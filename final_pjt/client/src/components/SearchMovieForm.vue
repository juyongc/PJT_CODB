<template>
  <form class="row g-3">
    <div class="col-sm-10">
      <input 
        type="search" 
        v-model="inputText" 
        @keyup.enter="searchMovie" 
        @input="searchingMovie"
        class="form-control me-2 "
        name='searchingList' 
        list='searchingList'
        placeholder="Search"
      >
      <datalist id="searchingList">
        <option
          v-for="movie in searchingMovies"
          :key="movie.id"
        >{{ movie.title }}</option>
      </datalist>
    </div>
    <div class="col-sm-2">
      <button @click="searchMovie" class="btn btn-outline-dark">검색</button>
    </div>
  </form>
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