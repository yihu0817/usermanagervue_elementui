<template>
  <div style="width:500px; border: 1px dashed #d9d9d9;padding:20px">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="姓名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
         <el-input v-model="form.password" type='password'></el-input>
      </el-form-item>
      <el-form-item label="头像">
          <el-upload
            name='headerImg'
            class="avatar-uploader"
            action="/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="userAdd">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { RequestUserAdd2,baseUrl } from "api/api.js";
export default {
  data() {
    return {
      form:{
        username: "",
        password: "",
      },
      file: "",
      imageUrl: '',
      url:'',
    };
  },
  methods: {
    userAdd() {
      this.$refs.form.validate((valid) => {
            if (valid) {
                RequestUserAdd2({username:this.form.username, psw:this.form.password, imgUrl: this.url})
                        .then(data => {
                          if (data.resultCode === 1) {
                            this.$message = "添加用户成功!";
                            this.$router.push({ path: "user_list" });
                          } else {
                            this.$message = "添加用户失败!";
                          }
                        }).catch(error => {
                          console.log(error);
                        });
            }
      })
    },
    
    beforeAvatarUpload(file) {
      let formData = new FormData(); // 创建Form表单对象
      formData.append("headerImg", file);
      this.$axios.post(`${baseUrl}/api/uploadFile`,formData).then( res => {
        this.url = res.data;
        this.imageUrl = `${baseUrl}/${res.data}`;
      });
    }
  }
};
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>