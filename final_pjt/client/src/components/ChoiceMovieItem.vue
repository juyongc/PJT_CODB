<template>
  <div class="col-12 col-sm-6 col-md-3 col-lg-2">
    <div class="card">
        <img class="card-img" :src="movie_poster" alt="movie poster">
      <div class="card-img-overlay">
        <input type="checkbox" class="form-check-input" @click="updateChoice" :id="movie.id" :checked="inMyList">
        <label class="form-check-label" :for="movie.id"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoiceMovieItem',
  props: {
    movie: {
      type: Object,
    }
  },
  data: function () {
    return {
      inMyList: false,
    }
  },
  methods: {
    updateChoice: function () {
      this.$store.dispatch('updateChoice', this.movie)
    }
  },
  created: function () {
    if (this.$store.state.myChoice.includes(this.movie)) {
      this.inMyList = true
    }
    else {
      this.inMyList = false
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