import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import UserList from '@/views/user/UserList'
import UserAdd from '@/views/user/UserAdd'
import ContentList from '@/views/content/ContentList'
import ContentAdd from '@/views/content/ContentAdd'
import UserUpdate from '@/views/user/UserUpdate'
import store from '../store/store'
import jwt from 'jsonwebtoken'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/main',
      name: '用户管理',
      iconCls: 'el-icon-menu',
      component: Main,
      children: [{
          path: '/user_list',
          name: '用户列表',
          component: UserList,
          iconCls: 'el-icon-tickets',
        },
        {
          path: '/user_add',
          name: '添加用户',
          component: UserAdd,
          iconCls: 'el-icon-circle-plus-outline',
        },
        {
          path: '/user_update',
          name: '修改用户',
          component: UserUpdate,
          hidden: true
        }
      ]
    },
    {
      path:'/main',
      name: '栏目管理',
      component: Main,
      iconCls: 'el-icon-goods',
      // leaf: true,//只有一个节点
      children: [
        {
          path: '/content_list',
          name: '栏目列表',
          component: ContentList,
          iconCls: 'el-icon-share',
        },
        {
          path: '/content_add',
          name: '添加栏目',
          component: ContentAdd,
          iconCls: 'el-icon-setting',
       
        }
      ]
    },
     {
       path: '/main',
       name: '商品管理',
       component: Main,
       iconCls: 'el-icon-goods',
       // leaf: true,//只有一个节点
       children: [{
           path: '/content_list',
           name: '栏目列表',
           component: ContentList,
           iconCls: 'el-icon-share',
         },
         {
           path: '/content_add',
           name: '添加栏目',
           component: ContentAdd,
           iconCls: 'el-icon-setting',

         }
       ]
     }
  ]
})

// 有些页面是不需要登录验证
router.beforeEach((to, from, next) => {

  // '/' 和 登录页 直接放行
  if (to.path === '/login' || to.path === '/') {
    next();
    return;
  }

  //如果用户已经登录放行
  // const user = sessionStorage.getItem('user');
  const user = store.getters.getUser;
  // console.log(`beforeEach user = ${user}`);

  if (user != null && user != '') {
    next();
    return;
  }

  next({
    path: '/login'
  });

});

export default router;
