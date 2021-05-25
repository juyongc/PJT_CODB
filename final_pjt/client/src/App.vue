<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light row g-3 text-center">
      <div class="col-md-1">
        <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
      </div>
      <div class="col-md-8">
        <SearchMovieForm class="form-horizontal"/>
      </div>
      
      <div class="col-md-1">
        <router-link :to="{ name: 'Recommendation' }" class="nav-link">Recommendation</router-link>
      </div>
      <div class="col-md-1">
        <router-link :to="{ name: 'Reviews' }" class="nav-link">Community</router-link>
      </div>
      <div class="col-md-1">
        <router-link :to="{ name: 'Home' }" class="nav-link">Sign in</router-link>
      </div>
    </nav>

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
