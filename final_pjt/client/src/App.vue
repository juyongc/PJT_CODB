<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div class="container-fluid justify-content-center">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <img src="./assets/logo.jpg" alt="" width="70" height="35" class="d-inline-block align-text-top" style="border-radius: 10%">
        </router-link>
        <SearchMovieForm/>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Recommendation' }">Recommendation</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Reviews' }">Community</router-link>
            </li>

            <!-- 로그인 X => Login / 로그인 => User 보여주기 -->
            <li class="nav-item dropdown" v-if="isLogin">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="dropdown-item" :to="{ name: 'Watchlist' }">Watchlist</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <router-link class="dropdown-item" v-if="isLogin" @click.native="onLogout" to="#">Logout</router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" :to="{ name: 'Login' }" >Login</router-link>
            </li>
              
            <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" v-if="isLogin" @click.native="onLogout" to="#">Logout</router-link>
                  <router-link class="dropdown-item" v-else :to="{ name: 'Login' }">Login</router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link class="dropdown-item" :to="{ name: 'Watchlist' }">Watchlist</router-link></li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <router-view @login="onLogin"/>
  </div>
</template>

<script>
import SearchMovieForm from '@/components/SearchMovieForm.vue'

export default {
  name: 'App',
  components: {
    SearchMovieForm
  },
  methods: {
    onLogout: function () {
      localStorage.removeItem('jwt')
      this.$store.commit('ON_LOGOUT')
      this.$router.push({ name: 'Login' })
    },
    onLogin: function () {
      this.$store.commit('ON_LOGIN')
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      // console.log(token)
      this.$store.state.isLogin = true
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  }
}
</script>
<style>
.navbar {
  padding-left: 10vw !important;
  padding-right: 10vw !important;
}
router-view {
  padding-left: 10vw !important;
  padding-right: 10vw !important;  
}
</style>
