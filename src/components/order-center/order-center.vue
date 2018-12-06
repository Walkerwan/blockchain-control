<template>
  <div class="order-container">
    <div class="order-container-content">
      <div class="order-container-content-title">
        <span>订单中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">订单列表</span>
      </div>
      <div class="order-operate">
        <div class="order-number">
          <span class="order-number-text">订单号</span>
          <Input class="order-number-input"></Input>
        </div>
        <div class="order-time">
          <span class="order-time-text">订单日期</span>
          <span class="time-select-start">2018-09-26</span>
          <span>至</span>
          <span class="time-select-end">2018-09-26</span>
        </div>
        <div class="order-type">
          <span class="order-type-text">产生类型</span>
          <Select v-model="orderTypeValue" class="order-type-select" placeholder="请选择"></Select>
        </div>
        <div class="order-state">
          <span class="order-state-text">订单状态</span>
          <Select v-model="orderStateValue" class="order-state-select" placeholder="请选择"></Select>
        </div>
        <div class="button">
          <Button type="primary">确定</Button>
        </div>
      </div>
      <div class="order-content-tab" id="order-content-tab">
        <Table size="small" stripe :columns="orderColumns" :data="orderDaTa"></Table>
        <Page
          class="order-page"
          placement="bottom"
          prev-text="上一页"
          next-text="下一页"
          :total="orderTotal"
          :page-size="orderPageSize"
          @on-change="togglePage"
          show-elevator
        />
      </div>
      <div class="order-content-bottom">
        <div class="order-content-bottom-left">
          <div class="order-content-bottom-left-title">汇款信息</div>
          <div class="order-content-bottom-left-content">
            <div class="remit-info">平台唯一指定汇款信息  ：</div>
            <div class="account-name">
                <span class="name-text">开户名称 :</span>
                <span class="name-company">深圳中琛源科技有限公司</span>
            </div>
            <div class="bank-name">
                <span class="name-text">开户银行  :</span>
                <span class="name-company">中国建设银行深圳南山支行</span>
            </div>
            <div class="user-name">
                <span class="name-text">账户  :</span>
                <span class="name-company">8888  6666   1241  478</span>
            </div>
            <div class="warn-info">
                <div class="warn-info-title">
                    请在转账汇款时在备注栏注明以下信息：
                </div>
                <div class="warn-info-content">
                    <span class="text1">1、公司名称或者用户名</span>
                    <span class="text2">2、2个工作日内会有专职客服联系您。</span>
                </div>
            </div>
          </div>
        </div>
        <div class="order-content-bottom-right">
            <div class="privite-line">
            <div class="privite-line-title">专线定制：</div>
            <div class="privite-line-content">0755-88888888转1</div>
          </div>
          <div class="customer-service-number">
            <div class="customer-service-number-title">客服服务号：</div>
            <div class="customer-service-number-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "./mixin/order-form.vue";

export default {
  mixins: [OrderForm],
  data() {
    return {
      orderTypeValue: "全部",
      orderStateValue: "全部"
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./style/order-center.less");
</style>

<style>
#order-content-tab .ivu-table-cell {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
#order-content-tab .ivu-table-header th {
  background-color: #8795a5 !important;
  color: #ffffff;
}
</style>

