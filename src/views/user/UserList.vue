<template>
  <div class="emp_contaner">
    <el-table
      :data="userLists"
       border
      style="width: 100%">
      <el-table-column
        label="头像"
        width="300">
        <template slot-scope="scope">
          <img v-if="scope.row.headerimg" :src="BASEURL + scope.row.headerimg" width="80px" height="80px"/>
          <img v-else src="../../assets/images/y.jpg" width="80px" height="80px"/>
        </template>

      </el-table-column>
      <el-table-column
        label="用户名"
        width="300">
        <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        width="300">
         <template slot-scope="scope">
            <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>

       <el-table-column
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-delete"  @click="userDelete(scope.row.uid)" >删除</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="userUpdate(scope.row.uid)"  >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { RequestUserList, RequestUserDelete,baseUrl } from "api/api.js";
export default {
  created() {
    // console.log("create>>>>");
    this.userList();
  },
  mounted() {
    // console.log("mounted>>>>");
  },
  data() {
    return {
      userLists: [],
      BASEURL: baseUrl,
    };
  },
  methods: {
    userList() {
      RequestUserList().then(data => {
        if (data.resultCode === 1) {
          this.userLists = data.resultInfo;
        }
      });
    },
    userDelete(id) {
        this.$confirm('确认删除该记录吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                      const params = { params: { uid: id } };
                      RequestUserDelete(params).then(data => {
                        if (data.resultCode === 1) {
                          this.userList();
                            this.$message({
                              type: 'success',
                              message: '删除成功!'
                            });
                        }
                      });
             
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
    },
    userUpdate(id){
       this.$router.push({path:'user_update',query:{uid: id}});
    }
  }
};
</script>


<style scoped>
@import "../../assets/css/tables.css";
</style>



