<template>
  <div class="login">
    <div class="login-form">
      <div class="r-title">
        <img class="logo" src="../../assets/logo/logo.png" alt="Vue Admin Logo" />
        <span>Vue Admin WebApp</span>
      </div>
      <el-form :model="loginInfo" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginInfo.username" prefix-icon="el-icon-user"> </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginInfo.password" prefix-icon="el-icon-lock" type="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        // 用户名和密码
        username: 'xiaohao',
        password: '123123',
      },
      rules: {
        // 表单验证
        username: [
          { require: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 8, message: '账号长度在3到8个字符', trigger: 'blur' },
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '密码长度在3到8个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/_login', this.loginInfo).then((res) => {
            if (res.code === 0) {
              this.$router.push({ path: this.$route.query.redirect }).catch((e) => e)
            }
          })
        } else {
          return
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  background: url('../../assets/login/login.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    padding: 30px;
    text-align: center;
    border-radius: 20px;
    // background-color: rgb(136, 45, 45);

    .r-title {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;

      .logo {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// reset Element UI
.el-form-item {
  width: 400px;
  margin: 20px auto;
}
.el-button {
  width: 100%;
}
</style>
