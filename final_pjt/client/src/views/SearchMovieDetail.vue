<template>
  <div>
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.original_title }}</p>
    <img :src="movie_poster" alt="" style="width: 30%;">
    <p>감독</p>
    <p>주연 배우</p>
    <p>줄거리 : {{ movie.overview }}</p>
    <hr>
    <p>{{movie}}</p>
  </div>
</template>

<script>
export default {
  name: 'SearchMovieDetail',
  computed: {
    movie: function () {
      return this.$store.state.detail
    },
    movie_poster: function () {
      return 'https://www.themoviedb.org/t/p/original/' + this.movie.poster_path
    }
  }
}
</script>

<style>

</style>