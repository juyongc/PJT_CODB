<template>
  <!-- <form class="row">
    <div class="col-11"> -->
    <div class="input-group search-bar me-2 d-flex">
      <input 
        type="search" 
        v-model="inputText" 
        @keyup.enter="searchMovie" 
        @input="searchingMovie"
        class="form-control"
        list='searchingList'
        placeholder="Search Movie"
        style="width: 35vw; !important"
      >
      <datalist id="searchingList">
        <option
          v-for="movie in searchingMovies"
          :key="movie.id"
        >
          {{ movie.title }}
        </option>
      </datalist>
      <button @click="searchMovie" class="btn btn-outline-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
        
    </div>
    <!-- </div>
  </form> -->
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
.search-bar {
  width: 70%;
}
</style>