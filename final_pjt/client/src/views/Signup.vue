<template>
  <div class='bg-dark text-white signupBox position-absolute top-50 start-50 translate-middle border border-dark rounded'>
    <h1 class="signupM" style="margin-top:50px">SIGNUP</h1>
    <div class="marginX" >
      <input class="loginBt p-3 bg-secondary text-white rounded border border-dark border-1" type="text" placeholder="아이디" v-model="credentials.username">
    </div>
    <div class="marginX">
      <input class="loginBt p-3 bg-secondary text-white rounded border border-dark border-1" type="password" placeholder="비밀번호"  v-model="credentials.password">
    </div>
    <div class="marginX">
      <input class="loginBt p-3 bg-secondary text-white rounded border border-dark border-1" type="password" placeholder="비밀번호 확인" v-model="credentials.passwordConfirmation">
    </div >
    <div class='marginX' style="margin-top: 30px">
      <button class="loginBt btn btn-lg btn-danger" @click="signup(credentials)">확인</button>
    </div>
  </div>
  <!-- <div>
    <h2>Signup</h2>
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">패스워드: </label>
      <input type="password" id="password" v-model="credentials.password">
    </div>
    <div>
      <label for="passwordConfirmation">패스워드 확인: </label>
      <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation">
    </div>
    <button @click="signup(credentials)">확인</button>
  </div> -->
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
      .then(() => {
        // console.log(res)
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
  .signupBox {
    width: 500px;
    height: 500px;
  }
  .loginBt {
    width: 100%;
    height: 60px;
    /* margin-top: 10px;
    margin-bottom: 10px; */
  }
  .signupM {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .marginX {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 1px;
    /* margin-bottom: 10px; */
  }
  input::placeholder { 
    color: rgba(255, 255, 255, 0.75);
  }
</style>