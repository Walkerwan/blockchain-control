<template>
  <div class="homepage-container">
    <div class="homepage-content">
      <div class="homepage-content-title">首页</div>
      <ul class="homepage-content-list">
        <li class="list-item" @click="skipProductCenter">
          <div class="list-item-content">
            <span class="list-item-add"></span>
            <span class="list-item-add-describe">更多区块链产品请添加</span>
          </div>
        </li>
        <li class="list-item" v-for="(item,index) in homePageData" :key="index">
          <span class="list-item-title">
            <span class="title-text">{{item.cloudName}}</span>
            <Button class="title-manage" type="primary" @click="skipManageCenter">管理</Button>
          </span>
          <span class="list-item-title1">名称：{{item.name}}</span>
          <span class="list-item-type">类型： {{item.orderType == 0?"免费体检":"商户付费"}}</span>
          <span class="list-item-set">配置：{{item.attrs[0].val}}</span>
          <span class="list-item-time">
            <span class="time-title-text">
              <i class="text-left">{{item.orderType == 0?"免费体验时间：":"商务版本到期时间："}}</i>
              <i class="text-right">{{item.endTime}}</i>
            </span>
            <span class="time-title-dissolution" v-if="item.orderType == 0?true:false">解散</span>
          </span>
        </li>
      </ul>
      <div class="product-trend">
        <div class="product-trend-title">平台动态：</div>
        <div class="product-trend-content">
          <div class="trend-content-title">中琛区块链云链服务平台</div>
          <div
            class="trend-content-content"
          >集成新一代轻量级软件开发,集成,管理和运维集成新一代轻量级软件开发,集成,管理和运维集成新一代轻量级软件开发,集成,管理和运维</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestInterface from '@/api/interface.js';

export default {
  data() {
    return {
      homePageData: [],
    }
  },
  created() {
    const that = this;
    RequestInterface.getHomePageList().then(res => {
      if(res.status == 0) {
        that.homePageData = res.data;
        return;
      }
    })
  },
  methods: {
    // 点击管理跳转至管理中心
    skipManageCenter() {
      this.$router.push({ path: "/project/content/manage" });
    },
    // 跳转至产品中心
    skipProductCenter() {
      this.$router.push({ path: "/project/content/product" });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./style/homepage.less");
</style>


