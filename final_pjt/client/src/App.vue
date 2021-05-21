<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <SearchMovieForm style="display: inline-block;"/> | 
      <router-link to="/recommendation">Recommendation</router-link>
    </div>

    <router-view/>
  </div>
</template>

<script>
import SearchMovieForm from '@/components/SearchMovieForm.vue'

export default {
  components: {
    SearchMovieForm
  },
}
</script>
<style>

</style>
