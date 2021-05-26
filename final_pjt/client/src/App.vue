<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light row g-3 text-center">
      <div class="col-md-1">
        <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
      </div>
      <div class="col-md-6">
        <SearchMovieForm class="form-horizontal"/>
      </div>
      <div class="col-md-1">
        <router-link :to="{ name: 'Recommendation' }" class="nav-link">Recommendation</router-link>
      </div>
      <div class="col-md-1">
        <router-link :to="{ name: 'Reviews' }" class="nav-link">Community</router-link>
      </div>
      <div class="col-md-1">
        <router-link :to="{ name: 'Watchlist' }" class="nav-link">Watchlist</router-link>
      </div>
      <div class="col-md-1" v-if="isLogin">
        <router-link @click.native="logout" :to="{ name: 'Home' }" class="nav-link">Logout</router-link>
      </div>
      <div class="col-md-1" v-else>
        <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
      </div>
    </nav>
    <router-view @login="isLogin=true" />
  </div>
</template>

<script>
import SearchMovieForm from '@/components/SearchMovieForm.vue'

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  components: {
    SearchMovieForm
  },
  methods: {
    logout: function () {
      localStorage.removeItem('jwt')
      this.isLogin=false
      this.$router.push({ name: 'Login' })
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.isLogin = true
    }
  }
}
</script>
<style>

</style>
