<template>
  <div class="root">
    <div class="main">
      <div class="left"></div>
      <div class="right">
        <div class="choose">
          <router-link to="/loginAndRegister/register" tag="span">注册</router-link>
          <router-link to="/loginAndRegister/login" tag="span">登录</router-link>
        </div>
        <div class="router-view">
          <router-view/>
        </div>
        <div class="login-or-register">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
  }
}
</script>

<style>
.root {
  text-align: center;
}
.main {
  height: 1000px;
  width: 90%;
  margin: 20px auto;
}
.left {
  width: 60%;
  height: 800px;
  float: left;
  margin-left: 5%;
  margin-top: 5%
}
.right {
  width: 25%;
  height: 800px;
  float: right;
  margin-right: 5%;
  margin-top: 5%;
  text-align: center;
  background: url('./../assets/bg1.jpg');
  background-size: 370px 800px;
}
.choose {
  width: 90%;
  margin: 20px auto
}
.logon-or-register {
  height: 500px;
}
.router-view {
  height: 400px;
}
p {
  width: 50px;
}
</style>
