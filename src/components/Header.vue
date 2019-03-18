<template>
  <el-col :span="24" class="header">
    <el-col :span="20" class="logo">后台管理系统</el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="userinfo-inner">
          <img :src="require('../assets/images/y.jpg')">
          {{user.username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    //  this.user = sessionStorage.getItem('user');
    this.user = this.$store.getters.getUser;
  },
  methods: {
    logout() {
      // sessionStorage.removeItem('user');
      this.$store.dispatch("clearUser");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  line-height: 60px;
}
.logo {
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
  color: white;
}
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

</style>