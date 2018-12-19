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
          <Input class="order-number-input" v-model="orderNum"></Input>
        </div>
        <div class="order-time">
          <span class="order-time-text">订单日期</span>
          <span class="time-select-start">
            <DatePicker @on-change="getLastLoginStart" type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
          <span>至</span>
          <span class="time-select-end">
            <DatePicker @on-change="getLastLoginEnd" type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
        </div>
        <div class="order-type">
          <span class="order-type-text">产品类型</span>
          <Select v-model="orderTypeValue" class="order-type-select" placeholder="全部">
            <Option value="">全部</Option>
            <Option v-for="(item, index) in orderType" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <div class="order-state">
          <span class="order-state-text">订单状态</span>
          <Select v-model="orderStateValue" class="order-state-select" placeholder="全部">
              <Option v-for="(item, index) in orderStateList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </div>
        <div class="button">
          <Button type="primary" @click="searchOrderList">确定</Button>
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
          :current="targetPageIndex"
          :page-size="orderPageSize"
          @on-change="togglePage"
          @on-page-size-change="togglePageSize"
          show-elevator
          show-sizer
        />
      </div>
      <div class="order-content-bottom">
        <div class="order-content-bottom-left">
          <div class="order-content-bottom-left-title">汇款信息</div>
          <div class="order-content-bottom-left-content">
            <div class="remit-info">平台唯一指定汇款信息 ：</div>
            <div class="account-name">
              <span class="name-text">开户名称 :</span>
              <span class="name-company">深圳中琛源科技有限公司</span>
            </div>
            <div class="bank-name">
              <span class="name-text">开户银行 :</span>
              <span class="name-company">中国建设银行深圳南山支行</span>
            </div>
            <div class="user-name">
              <span class="name-text">账户 :</span>
              <span class="name-company">8888 6666 1241 478</span>
            </div>
            <div class="warn-info">
              <div class="warn-info-title">请在转账汇款时在备注栏注明以下信息：</div>
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
    <Modal v-model="showOrderDetail" width="360" id="show-more-detail">
        <p slot="header" style="color:#000;text-align:left">订单详情：</p>
        <div>
          <Form
            inline
            class="show-more-detail"
            :label-width="120"
          >
            <FormItem  class="form-item" label= "订单编号：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.orderNum:''}}</div>
            </FormItem>
            <FormItem  class="form-item" label= "产品类型：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.productType:''}}</div>
            </FormItem>
            <FormItem  class="form-item" label= "计费方式：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.bilingWay:''}}</div>
            </FormItem>
            <FormItem  class="form-item" label= "订单金额：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.orderMoney+'元':''}}</div>
            </FormItem>
            <FormItem  class="form-item" label= "订单时间：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.orderTime:''}}</div>
            </FormItem>
            <FormItem  class="form-item" label= "订单状态：" >
              <div class="form-item-text">{{targetOrderRow?targetOrderRow.orderState:''}}</div>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
        </div>
      </Modal>
  </div>
</template>

<script>
import OrderForm from "./mixin/order-form.vue";
import RequestInterface from "@/api/interface.js";

export default {
  mixins: [OrderForm],
  data() {
    return {
      orderTypeValue: "",
      orderStateValue: "",
      orderNum: '',
      showOrderDetail:false,
    };
  },
  created() {
    this.getOrderListData({
      page: this.targetPageIndex,
      rows: this.orderPageSize,
    });
    this.getOrderListTypeData();
  },
  methods: {
    // 获取列表数据
    getOrderListData(params) {
      const that = this;
      if(!params) {
        params = {}
      }
      RequestInterface.getOrdingList(params).then(res => {
        if (res.status == 0) {
          that.orderTotal = res.page.total;
          that.orderDaTa = res.data.map((item, index) => {
            return {
              sortNum: index + 1,
              orderNum: item.orderNo,
              productType: item.cloudTypeName,
              bilingWay: item.timeUnit,
              orderMoney: item.orderPrice,
              orderTime: item.createTime,
              orderState: item.orderStatusDesc,
              orderStatus: item.orderStatus
            };
          });
        }
      });
    },
    // 获取类型列表
    getOrderListTypeData() {
      const that = this;
      RequestInterface.getOrdingListType().then(res => {
        if(res.status == 0) {
          that.orderType = res.data;
          return;
        }
      })
    }
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
#show-more-detail .ivu-form-item-content {
  font-size: 18px;
}
#show-more-detail .ivu-form-item-label {
  font-size: 18px;
}
#show-more-detail .ivu-modal-header p {
  font-size: 20px;
  font-weight: normal;
}
#show-more-detail .ivu-modal-footer {
  padding: 0;
  border-top: none;
}
</style>

