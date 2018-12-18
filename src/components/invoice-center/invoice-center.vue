<template>
  <div class="invoice-container">
    <div class="invoice-container-content">
      <div class="invoice-container-content-title">
        <span>发票中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">发票列表</span>
      </div>
      <div class="order-operate">
        <div class="order-time">
          <span class="order-time-text">订单日期</span>
          <span class="time-select-start">
            <DatePicker type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
          <span>至</span>
          <span class="time-select-end">
            <DatePicker type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
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
      <div class="order-content-tab" id="invoice-content-tab">
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
            <Form id="invoiceForm" :model="formItem" :label-width="80">
              <FormItem class="form-item" label="发票类型">
                <RadioGroup class="radio-group" v-model="formItem.ticket">
                  <Radio label="addticket" style="fontSize:16px;">增值专票</Radio>
                  <Radio label="personerticket" style="fontSize:16px;">个人专票</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem class="form-item" label="公司名称:">
                <Input v-model="formItem.companyName" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" label="税号:">
                <Input v-model="formItem.duty" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" label="地址:">
                <Input v-model="formItem.address" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" label="电话:">
                <Input v-model="formItem.telephone" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" label="开户号:">
                <Input v-model="formItem.username" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" label="银行账号:">
                <Input v-model="formItem.account" placeholder></Input>
              </FormItem>
              <FormItem class="form-item">
                <div class="button-item">确认修改</div>
              </FormItem>
            </Form>
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
import InvoiceForm from "./mixin/invoice-form.vue";
export default {
  mixins: [InvoiceForm],
  data() {
    return {
      orderTypeValue: "全部",
      orderStateValue: "全部",
      formItem: {
        ticket: "addticket",
        companyName: "",
        duty: "",
        address: "",
        telephone: "",
        username: "",
        account: ""
      }
    };
  },
  methods: {
    handleSubmit() {}
  }
};
</script>

<style lang="less" scoped>
@import url("./style/invoice-center.less");
</style>
<style>
#invoice-content-tab .ivu-table-cell {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
#invoice-content-tab .ivu-table-header th {
  background-color: #8795a5 !important;
  color: #ffffff;
}
#invoiceForm .ivu-form-item .ivu-form-item-label {
  font-size: 16px;
  color: #3c3c3c;
}
#invoiceForm .ivu-form-item .ivu-input-default {
  font-size: 16px;
  color: #3c3c3c;
  font-weight: 400;
}
#invoiceForm .ivu-form-item .ivu-radio-wrapper .ivu-radio {
  margin-right: 13px;
}
</style>



