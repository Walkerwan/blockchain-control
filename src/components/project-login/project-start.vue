<template>
  <div class="project-container">
    <div class="project-top">
      <div class="project-top-left"></div>
      <div class="project-top-center">
        <div class="project-top-center-icon"></div>
        <ul class="project-catalog">
          <li class="item" v-for="(item,index) in projectCatalog" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="project-top-right">
        <div class="control">控制台</div>
        <div class="login-or-register">
          <Button class="register-or-login" type="primary">
            <span @click="skipRegister">注册</span>
            <span>/</span>
            <span @click="skipLogin">登录</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="project-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="project-bottom">
      <div class="project-bottom-left"></div>
      <div class="project-bottom-center">
        <div class="project-bottom-center-icon"></div>
        <ul
          class="project-bottom-list"
          v-for="(listItem,index) in projectHomePageBottomList"
          :key="index"
        >
          <li class="list-item" v-for="(item, index) in listItem" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="project-bottom-right">
        <div class="project-bottom-right-code"></div>
        <div class="project-bottom-right-left"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectCatalog, projectHomePageBottomList } from "@/constant.js";
export default {
  data() {
    return {
      projectCatalog: projectCatalog, // 目录列表
      projectHomePageBottomList: projectHomePageBottomList // 底部list
    };
  },
  methods: {
    skipRegister() {
      this.$router.push({ path: "/project/register" });
    },
    skipLogin() {
        this.$router.push({ path: "/project/login" });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./styles/project-start.less";
</style>
