<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light row g-3 text-center">
      <div class="col-md-2">
        <router-link to="/" class="nav-link">
          Home
        </router-link>
      </div>
      <div class="col-md-8">
        <SearchMovieForm class="form-horizontal"/>
      </div>
      <div class="col-md-2">
        <router-link to="/recommendation" class="nav-link">Recommendation</router-link>
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
