<template>
  <div class="main1">
    <div>
      <el-form v-model="user">
        <el-form-item>
          <el-input placeholder="用户名" v-model="user.username" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="密码" v-model="user.password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    login () {
    }
  }
}
</script>

<style>
.main1 {
  width: 90%;
  margin: 10px auto
}
</style>
