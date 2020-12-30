<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">师傅邦满意度回访</div>

      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <router-link :to="{ path: '/index' }">首页</router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link :to="{ path: '/order' }">回访名单</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-fold-outlined
          class="trigger"
          @click="gotoLogin"
        />
      </a-layout-header>
      <a-layout-content
        class="h_content"
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {  MenuFoldOutlined } from "@ant-design/icons-vue";
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const { ctx } = getCurrentInstance()

    const gotoLogin = () => {
      ctx.$router.push('/')
    }

    return {
      gotoLogin
    }
  },
  components: {
    // MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      selectedKeys: ["1"],
      collapsed: false,
    };
  },
};
</script>
<style scoped>
.h_content {
  height: 100%;
  overflow: auto;
}
.ant-layout {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 0;
  color: aliceblue;
  font-weight: bolder;
  text-align: center;
  line-height: 32px;
  font-size: 20px;
}
</style>
