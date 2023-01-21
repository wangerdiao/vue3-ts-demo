<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content ep-bg-purple" />
            <img src="@/assets/logo.png" alt="" class="img"
          /></el-col>
          <el-col :span="16"
            ><div class="grid-content ep-bg-purple" />
            <span class="title">后台管理系统</span></el-col
          >
          <el-col :span="4" class="loginOut"
            ><div class="grid-content ep-bg-purple" @click="loginOut">
            退出登录</div></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="route.path"
            text-color="#fff"
            router
          >
          <!-- 上面的router表示ele-plus开启了路由模式 ，index可以通过item.path来进行跳转-->
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <!-- 组件展示的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter,useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
const list = router.getRoutes().filter( value => value.meta.isShow) //获取需要在侧边栏展示的路由数组
const loginOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
<style lang="less" scoped>
.el-header {
  height: 80px;
  background-color: #545c64;
  img {
    height: 80px;
  }
  .title {
    font-size: 30px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin-left: 490px;
    color: #fff;
    font-weight: 900;
  }
  .loginOut {
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
}
.el-aside {
  .el-menu  {
    //注意calc计算符号左右要有一个空格
    height: calc(100vh - 80px);
  }
}
</style>
