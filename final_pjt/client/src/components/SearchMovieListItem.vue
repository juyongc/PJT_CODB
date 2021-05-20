<template>
  <li>
    <h5 @click="clickList">{{ movie.title }}</h5>
    <p>{{movie}}</p>
    <!-- <p>{{ movie.overview }}</p> -->
  </li>
</template>

<script>
export default {
  name: 'SearchMovieListItem',
  props: {
    movie: {
      type: Object
    }
  },
  methods:{
    clickList: function () {
      // const index = this.$store.state.searchs.indexOf(this.movie)
      // this.$router.push({ name: 'SearchMovieDetail', params: { index: index, title: this.movie.title }})
      this.$store.dispatch('searchDetail', this.movie.id)
      this.$router.push({ name: 'SearchMovieDetail', params: { title: this.movie.title }})
    }
  }
}
</script>

<style>

</style>