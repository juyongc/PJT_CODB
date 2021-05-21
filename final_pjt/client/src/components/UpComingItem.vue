<template>
  <div class="col-3">
    <img @click="searchMovie" :src="movie_poster" alt="" class="img-fluid img-thumbnail">
  </div>
</template>

<script>
export default {
  name: 'UpcomingItem',
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    searchMovie: function () {
      // console.log(this.movie.title)
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
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
.img-container > img {
  width: 220px;
  height: 320px;
  object-fit: fill;
}

</style>