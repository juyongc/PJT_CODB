<template>
  <div class="home">
    <MovieCurrent/>
    <UpComing/>
  </div>

</template>

<script>
// import SearchMovieForm from '@/components/SearchMovieForm.vue'
import UpComing from '@/components/UpComing.vue'
import MovieCurrent from '@/components/MovieCurrent.vue'

export default {
  name: 'Home',
  components: {
    UpComing,
    MovieCurrent,
  },
  method: {
  }
}
</script>

<style>
.home {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
  padding-top: 5vh !important;
  padding-bottom: 5vh !important;
}
</style>
