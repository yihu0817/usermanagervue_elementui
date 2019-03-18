<template>
  <div>
    <el-form :model="roleForm" class="login-container" :rules="rules">
      <h3 class="title">登录界面</h3>
      <el-form-item prop="username">
        <el-input v-model="roleForm.username" placeholder="请输入用户名"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="roleForm.password" placeholder="请输入密码"/>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="roleForm.checked" checked>记住密码</el-checkbox>
      </el-form-item>
      {{error}}
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="login" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { RequestLogin } from "api/api.js";
export default {
  data() {
    return {
      logining: false,
      roleForm: {
        username: "",
        password: "",
        checked: ""
      },
      error: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.logining = true;
      RequestLogin({
        username: this.roleForm.username,
        password: this.roleForm.password
      })
        .then(data => {
          if (data.resultCode === 1) {
            this.$store.dispatch("saveUser", {
              username: this.roleForm.username,
              token: data.token
            });
            this.logining = false;
            this.$router.push({
              path: "main",
              params: { username: this.roleForm.username }
            });

          } else {
            this.$message({
              message: data.resultInfo,
              type: "error"
            });
            this.logining = false;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>


