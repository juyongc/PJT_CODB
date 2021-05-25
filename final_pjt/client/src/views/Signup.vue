<template>
  <div>
    <h2>Signup</h2>
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">패스워드: </label>
      <input type="text" id="password" v-model="credentials.password">
    </div>
    <div>
      <label for="passwordConfirmation">패스워드 확인: </label>
      <input type="text" id="passwordConfirmation" v-model="credentials.passwordConfirmation">
    </div>
    <button @click="signup(credentials)">확인</button>
  </div>
</template>

<script>
import axios from 'axios'
 
export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  methods: {
    signup: function (credentials) {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: credentials,
      })
      .then((res) => {
        console.log(res)
        this.$router.push({ name: 'Login' })
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