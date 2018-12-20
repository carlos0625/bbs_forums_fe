<template>
  <div class="main2">
    <div class="outer">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            clearable
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input
            type="password"
            v-model="form.repeatPassword"
            autocomplete="off"
            clearable
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即注册</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.match(/^[A-Za-z][0-9A-Za-z]*/g) === null) {
        callback(new Error('用户名由字母开头，由数字字母组成，不可有空格'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 18) {
        callback(new Error('密码长度8-18位字母数字组合'))
      } else {
        if (this.form.repeatPassword !== '') {
          this.$refs.form.validateField('repeatPassword')
        }
        callback()
      }
    }
    var validatepassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      rules: {
        username: [{validator: validateUsername, trigger: 'blur'}],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        repeatPassword: [{ validator: validatepassword2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    register () {
      this.$store.commit('setUsername', this.form.username)
      this.$store.commit('setPassword', this.form.password)
      this.$axios.post('/api/user/addUser', this.user)
        .then(res => {
          if (res.data.status === 100) {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('login')
          } else if (res.data.status === 101) {
            this.resetForm('form')
            this.$message({
              showClose: true,
              message: '该用户已存在',
              type: 'warning'
            })
          }
          console.log(res.data)
        }).catch(error => {
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
.main2 {
  width: 90%;
  text-align: center;
  margin: 10px auto
}
.outer {
  margin: 20px auto;
}
</style>
