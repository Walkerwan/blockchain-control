<template>
  <div class="product-container">
    <div class="product-container-content">
      <div class="product-container-content-title">
        <span>产品中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">积分商城</span>
      </div>
      <div class="product-container-content-content">
        <ul class="content-content-setting">
          <li class="setting-item">
            <div class="setting-item-title">基础配置</div>
            <div class="setting-item-content">
              <div class="setting-item-title1">hyperledger fabric 环境构建</div>
              <div class="setting-item-title2">企业级联盟链</div>
              <div
                class="content-des"
              >yperledger Fabric是一个面向企业的分布式账本平台，具有高度的灵活性、模块化和可扩展性能。Zig-BaaS提供Hyperledger Fabric网络的快速构建与按需配置，并为开发者提供区块浏览器、链码管理、API调用、日志查看等功能。</div>
              <div class="content-des1">1核CPU 1G内存 50G系统盘</div>
              <div class="content-des2">2个CA节点，2个orderer节点，4个peer节点</div>
              <div class="show-details">查看详情</div>
              <div class="start-charging">按销售计费</div>
              <div class="money-hour">
                <span class="money-hour-des1">￥60</span>
                <span class="money-hour-des2">元/</span>
                <span class="money-hour-des3">小时</span>
              </div>
              <div class="setting-item-button">
                <span class="button" @click="skipProductSetting">免费体检</span>
              </div>
            </div>
          </li>
          <li class="setting-item">
            <div class="setting-item-title">中级配置</div>
            <div class="setting-item-content">
              <div class="setting-item-title1">hyperledger fabric 环境构建</div>
              <div class="setting-item-title2">企业级联盟链</div>
              <div
                class="content-des"
              >yperledger Fabric是一个面向企业的分布式账本平台，具有高度的灵活性、模块化和可扩展性能。Zig-BaaS提供Hyperledger Fabric网络的快速构建与按需配置，并为开发者提供区块浏览器、链码管理、API调用、日志查看等功能。</div>
              <div class="content-des1">1核CPU 1G内存 50G系统盘</div>
              <div class="content-des2">2个CA节点，2个orderer节点，4个peer节点</div>
              <div class="show-details">查看详情</div>
              <div class="start-charging">按销售计费</div>
              <div class="money-hour">
                <span class="money-hour-des1">￥28000</span>
                <span class="money-hour-des2">元/</span>
                <span class="money-hour-des3">月</span>
              </div>
              <div class="setting-item-button">
                <span class="button">购买</span>
              </div>
            </div>
          </li>
          <li class="setting-item">
            <div class="setting-item-title">高级配置</div>
            <div class="setting-item-content">
              <div class="setting-item-title1">hyperledger fabric 环境构建</div>
              <div class="setting-item-title2">企业级联盟链</div>
              <div
                class="content-des"
              >yperledger Fabric是一个面向企业的分布式账本平台，具有高度的灵活性、模块化和可扩展性能。Zig-BaaS提供Hyperledger Fabric网络的快速构建与按需配置，并为开发者提供区块浏览器、链码管理、API调用、日志查看等功能。</div>
              <div class="content-des1">1核CPU 1G内存 50G系统盘</div>
              <div class="content-des2">2个CA节点，2个orderer节点，4个peer节点</div>
              <div class="show-details">查看详情</div>
              <div class="start-charging">按销售计费</div>
              <div class="money-hour">
                <span class="money-hour-des1">￥168800</span>
                <span class="money-hour-des2">元/</span>
                <span class="money-hour-des3">年</span>
              </div>
              <div class="setting-item-button">
                <span class="button">购买</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="need-ording">我要定制</div>
        <div class="content-content-footer">
          <div class="customer-service-number">
            <div class="customer-service-number-title">客服服务号：</div>
            <div class="customer-service-number-content"></div>
          </div>
          <div class="privite-line">
            <div class="privite-line-title">专线定制：</div>
            <div class="privite-line-content">0755-88888888转1</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    skipProductSetting() {
      this.$router.push({ path: "/project/content/product/setting" });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./style/product-center.less");
</style>

