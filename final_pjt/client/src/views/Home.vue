<template>
  <div class="home">
    <SearchMovieForm/>

    <div id="now-playing">
      <h2>현재 상영작</h2>
    </div>
  </div>
</template>

<script>
import SearchMovieForm from '@/components/SearchMovieForm.vue'

export default {
  name: 'Home',
  components: {
    SearchMovieForm
  },
  method: {
  }
}
</script>
