<template>
  <div>
    <el-container>
      <el-header class="header">
        <!-- 头部区域 -->
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <!-- 菜单区域--->
          <nav-menu></nav-menu>
        </el-aside>

        <el-main>
          <!-- 内容区域-->
          
          <!--路由输出-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.header {
  height: 70px;
  overflow: hidden;
  background: url(../assets/images/bg.jpg) no-repeat 0 -1000px;
}
</style>

