<template>
      <!-- 菜单区域--->
    <aside>
        <div class="leftnav-title"><strong><span class="icon-list"></span>菜单列表</strong></div>
        <!--导航菜单-->
        <el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router >
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                    <template slot="title"><i :class="item.iconCls"/>{{item.name}}</template>
                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"/>{{child.name}}</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> -->
            </template>
        </el-menu>

         <!-- <el-menu  >
            <template v-for="(item,index) in $router.options.routes" >
                <el-submenu :index="index+''" >
                    <template slot="title">{{item.name}}</template>
                    <el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu> -->
     </aside>
	
    
</template>
<script>
export default{
    data(){
        return{
          
        }
    },
    methods:{
        handleopen(){
            console.log('handleopen>>>');
        },
        handleclose(){
            console.log('handleclose>>>');
        },
        handleselect(){
            console.log('handleselect>>>');
        }
    }
}
    
</script>
<style scoped>
.leftnav-title { height:50px; background:url(../assets/images/bg.jpg) no-repeat 0 -1000px;  color:#FFF; padding-left:22px;  font-size:14px; line-height:50px;}
.leftnav-title span{ margin-right:10px;}
</style>
