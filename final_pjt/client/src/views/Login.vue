<template>
  <div>
    <h2>LOGIN</h2>
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username"  v-model="credentials.username">
    </div>
    <div>
      <label for="password">패스워드: </label>
      <input type="text" id="password"  v-model="credentials.password">
    </div>
    <button @click="login">로그인</button>
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
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
      .then((res) => {
        console.log(res)
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