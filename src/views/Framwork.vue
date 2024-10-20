
<script setup>
import { onMounted, reactive, ref } from 'vue';
import router from "@/router";
import { useRoute } from 'vue-router';
const route = useRoute()
//菜单栏
const menus = [
    {
      index: 1,
      text: '账户分析',
      path: '/index',
    },
    {
      index: 2,
      text: '交易统计',
      path: '/staticsInfo',
    },
    {
      index: 3,
      text: '平仓记录',
      path: '/offsetRecord',
    },
    {
      index: 4,
      text: '期末持仓',
      path: '/positionRecord',
    },
    {
      index: 5,
      text: '成交记录',
      path: '/matchRecord',
    },
  ]
//确认当前菜单（路由）
const curIndex = ref(1)
const getCurIndex = () => {
  let path = route.path
  for (let item of menus) {
    if (item.path == path) {
      curIndex.value = item.index
      break
    }
  }
}
getCurIndex()
//菜单栏切换
const changeMenu = (item) => {
  curIndex.value = item.index
  router.push(item.path)
}
const imageUrl = ref("https://i1mena-web.oss-cn-beijing.aliyuncs.com/ca7bb205-5f1e-4e7f-928a-e69bfb4b129c.jpg")
</script>

<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="/logo.png">
        <div class="name"> 期货账户分析</div>
      </div>
      <div class="menus">
        <span class="menu" :class="{ active: item.index == curIndex }" @click="changeMenu(item)" v-for="item in menus">
          <!-- <el-icon><component :is="item.icon" /></el-icon> -->
          <span>{{ item.text }}</span>

        </span>
      </div>
      <div class="user-info">
        <div class="avatar">
          <el-avatar :src="imageUrl" />
        </div>
        <span class="nick-name">user1</span>
      </div>
    </div>
    <div class="body">

      <div class="context-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
  height: 56px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 200px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      font-weight: bold;
      margin-left: 5px;
      font-size: 25px;
      color: #05a1f5;
    }
  }

  .menus {
    display: flex;

    .menu {
      display: flex;
      cursor: pointer;
      width: 100px;
      height: 56px;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid #ffffff;
    }

    .menu:hover {
      color: rgb(5, 161, 245);
      border-bottom: 2px solid rgb(5, 161, 245);

      background-color: rgb(236, 245, 255);
    }

    .active {
      color: rgb(5, 161, 245);
      border-bottom: 2px solid rgb(5, 161, 245);
    }
  }
  .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .nick-name {
        margin-left: 5px;
        color: #05a1f5;
      }
    }
}

.body {
  display: flex;

  .context-body {
    flex: 1;
    width: 0;
    height: 100%;
    padding-left: 20px;
  }
}</style>