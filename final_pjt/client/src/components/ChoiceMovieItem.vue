<template>
  <div class="col">
    <div class="card">
      <img class="card-img" :src="movie_poster" alt="movie poster">
      <div class="card-img-overlay">
        <input type="checkbox"  @click="updateChoice" :id="movie.id" :value="movie.id" :checked="inMyList">
        <!-- <label :for="movie.id">{{ movie.title }}</label> -->
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
      this.$store.dispatch('updateChoice', this.movie.id)
    }
  },
  created: function () {
    if (this.$store.state.myChoice.includes(this.movie.id)) {
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