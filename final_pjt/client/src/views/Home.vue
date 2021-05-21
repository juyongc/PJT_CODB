<template>
  <div>
    <form action="">
      <input type="text">
      <button>검색</button>
    </form>
    <MovieCurrent />
  </div>

</template>

<script>

import MovieCurrent from '@/components/MovieCurrent.vue'
export default {
  name:'Home',
  components: {
    MovieCurrent,

  }
}
</script>
