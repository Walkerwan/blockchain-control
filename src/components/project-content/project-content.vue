<template>
  <div class="content-container">
    <div class="content-top">
      <div class="content-top-logo"></div>
      <div class="content-top-login">
        <div class="login-icon"></div>
        <div class="login-username">2431136239@qq.com</div>
        <div class="login-control"></div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-left">
        <tree-item :treeData="catalogData"></tree-item>
      </div>
      <div class="content-bottom-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./tree-item.vue";
import { contentCatalog } from "@/constant.js";
export default {
  components: {
    TreeItem
  },
  data() {
    return {
      catalogData: contentCatalog
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./style/project-content.less");
</style>

