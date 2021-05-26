<template>
  <div class='position-absolute top-50 start-50 translate-middle border border-dark rounded' style="width: 500px">
    <h2 class="text-center">LOGIN</h2>
    <div class='mx-2 text-center'>
      <input type="text" placeholder=" 아이디" v-model="credentials.username">
      <!-- <label for="username">아이디: </label>
      <input type="text" id="username"  v-model="credentials.username"> -->
    </div>
    <div class='text-center'>
      <!-- <label for="password">패스워드: </label>
      <input type="text" id="password"  v-model="credentials.password"> -->
      <input type="password" placeholder=" 비밀번호"  v-model="credentials.password">
    </div>
    <div class='d-grid gap-2 col-4 mx-auto text-center'>
      <button class="btn btn-lg btn-primary" @click="login">로그인</button>
    </div>
      <button class="mx-auto" @click="moveSignup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    moveSignup: function () {
      this.$router.push({ name: 'Signup' })
    },
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
      .then((res) => {
        // console.log(res)
        localStorage.setItem('jwt', res.data.token)
        this.$emit('login')
        this.$router.push({ name: 'Home' })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>