<template>
  <div class="manager-container">
    <div class="manage-container-content">
      <div class="manage-container-content-title">
        <span>管理中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">积分通兑</span>
      </div>
      <div class="setting-info">
        <span class="setting-info-text">配置信息</span>
        <input type="text" class="setting-info-search" placeholder="搜索">
      </div>
      <div class="setting-content">
        <div class="setting-content-left">
          <ul class="setting-content-left-list">
            <li class="list-item" v-for="(item,index) in settingDesData" :key="index">
              <div class="list-item-name">{{item.name}}</div>
              <div class="list-item-text">{{item.text}}</div>
            </li>
          </ul>
        </div>
        <div class="setting-content-right">
          <ul class="setting-content-right-list">
            <li class="right-list-item">
              <div class="node-icon"></div>
              <div class="list-item-right">
                <span class="top-num">2</span>
                <span class="bottom-text">节点数量</span>
              </div>
            </li>
            <li class="right-list-item">
              <div class="block-icon"></div>
              <div class="list-item-right">
                <span class="top-num">3</span>
                <span class="bottom-text">区块数量</span>
              </div>
            </li>
          </ul>
          <ul class="setting-content-right-list">
            <li class="right-list-item">
              <div class="trade-icon"></div>
              <div class="list-item-right">
                <span class="top-num">4</span>
                <span class="bottom-text">交易数量</span>
              </div>
            </li>
            <li class="right-list-item">
              <div class="constract-icon"></div>
              <div class="list-item-right">
                <span class="top-num">1</span>
                <span class="bottom-text">合约数量</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="trade-record">实时交易记录</div>
      <div class="trade-record-form" id="trade-record-form">
          <Table size="small" stripe :columns="tradeRecordColumns" :data="tradeRecordDaTa"></Table>
      </div>
      <div class="node-record">实时节点记录</div>
      <div class="node-record-form" id="node-record-form">
          <Table size="small" stripe :columns="nodeRecordColumns" :data="nodeRecordDaTa"></Table>
      </div>
    </div>
  </div>
</template>

<script>

import TradeRecordForm from "./mixin/trade-record-form.vue";
import NodeRecordForm from "./mixin/node-record-form.vue";

export default {
  mixins: [TradeRecordForm,NodeRecordForm],
  data() {
    return {
      settingDesData: [
        {
          name: "名称:",
          text: "小王的积分通通兑"
        },
        {
          name: "配置:",
          text: "Fabric 基础配置"
        },
        {
          name: "算法:",
          text: "solo"
        },
        {
          name: "通道名称:",
          text: "粮票/积分"
        },
        {
          name: "创建时间:",
          text: "2018-11-01 09:46:37"
        },
        {
          name: "运行状态:",
          text: "运行中"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./style/manager-center.less");
</style>

<style>
#trade-record-form .ivu-table-cell,
#node-record-form .ivu-table-cell  {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
}
#trade-record-form .ivu-table-header th,
#node-record-form .ivu-table-header th{
    background-color: #8795a5 !important;
    color: #ffffff;
}
</style>


