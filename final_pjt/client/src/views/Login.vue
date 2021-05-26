<template>
  <div class='loginBox bg-dark text-white position-absolute top-50 start-50 translate-middle border border-dark rounded'>
    <h1 class="loginM">LOGIN</h1>
    <div class="marginManual" >
      <input class="loginBt p-3 bg-secondary text-white rounded border border-dark border-1" type="text" placeholder="아이디" v-model="credentials.username">
    </div>
    <div class="marginManual">
      <input class="loginBt p-3 bg-secondary text-white rounded border border-dark border-1" type="password" placeholder="비밀번호"  v-model="credentials.password">
    </div>
    <div class='marginManual' style="margin-top: 40px">
      <button class="loginBt btn btn-lg btn-danger" @click="login">로그인</button>
    </div>
    <div class='marginManual' style="margin-top: 20px" >
    <div>
    <label for="goSignup">회원이 아닌가요?</label>
    <router-link id="goSignup" :to="{ name: 'Signup' }" class="nav-link d-inline fw-bold">지금 회원가입하세요!</router-link>
    </div>
    </div>
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
        console.log(res)
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
  .loginBox {
    width: 500px;
    height: 420px;
  }
  .loginBt {
    width: 100%;
    height: 60px;
    /* margin-top: 10px;
    margin-bottom: 10px; */
  }
  .loginM {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .marginManual {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 1px;
    /* margin-top: 40px;
    margin-bottom: 40px; */
  }
  input::placeholder { 
    color: rgba(255, 255, 255, 0.75);
  }
</style>