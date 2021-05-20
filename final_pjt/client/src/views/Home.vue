<template>
  <div class="home">
    <div id="now-playing">
      <h2>현재 상영작</h2>
    </div>
    <UpComing/>
  </div>
</template>

<script>
// import SearchMovieForm from '@/components/SearchMovieForm.vue'
import UpComing from '@/components/UpComing.vue'

export default {
  name: 'Home',
  components: {
    UpComing
  },
  method: {
  }
}
</script>
