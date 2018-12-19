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
            <DatePicker  @on-change="getLastLoginStart" type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
          <span>至</span>
          <span class="time-select-end">
            <DatePicker @on-change="getLastLoginEnd" type="date" placeholder="选择日期" style="width: 120px;float:left;"></DatePicker>
          </span>
        </div>
        <div class="order-type">
          <span class="order-type-text">产品类型</span>
          <Select v-model="invoiceTypeValue" class="order-type-select" placeholder="全部">
            <Option value="">全部</Option>
            <Option v-for="(item, index) in invoiceType" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <div class="order-state">
          <span class="order-state-text">发票状态</span>
          <Select v-model="invoiceStateValue" class="order-state-select" placeholder="全部">
            <Option v-for="(item, index) in invoiceStateList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </div>
        <div class="button">
          <Button type="primary" @click="searchInvoiceList">确定</Button>
        </div>
      </div>
      <div class="order-content-tab" id="invoice-content-tab">
        <Table size="small" stripe :columns="invoiceColumns" :data="invoiceDaTa"></Table>
        <Page
          class="order-page"
          placement="bottom"
          prev-text="上一页"
          next-text="下一页"
          :total="invoiceTotal"
          :page-size="invoicePageSize"
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
            <Form
              id="invoiceForm"
              :model="formItem"
              :label-width="100"
              ref="formItem"
              :rules="ruleInline"
            >
              <FormItem class="form-item" prop="invoiceType" label="发票类型">
                <RadioGroup class="radio-group" v-model="formItem.invoiceType">
                  <Radio label="addticket" style="fontSize:16px;">增值专票</Radio>
                  <Radio label="personerticket" style="fontSize:16px;">个人专票</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem class="form-item" prop="companyName" label="公司名称:">
                <Input v-model="formItem.companyName" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" prop="taxNum" label="税号:">
                <Input v-model="formItem.taxNum" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" prop="companyAddtress" label="地址:">
                <Input v-model="formItem.companyAddtress" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" prop="companyTelephone" label="电话:">
                <Input v-model="formItem.companyTelephone" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" prop="bankName" label="开户号:">
                <Input v-model="formItem.bankName" placeholder></Input>
              </FormItem>
              <FormItem class="form-item" prop="bankNo" label="银行账号:">
                <Input v-model="formItem.bankNo" placeholder></Input>
              </FormItem>
              <FormItem class="form-item">
                <div class="button-item" @click="handleSubmit('formItem')">确认修改</div>
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
    <Modal v-model="showInvoiceDetail" width="400" id="show-more-invoice-detail">
      <p
        slot="header"
        style="color:#000;text-align:left;fontSize:18px;color:#515a6e;"
      >{{targetInvoiceData&&targetInvoiceData.status == 1?"查看详情：": "申请发票："}}</p>
      <div>
        <Form inline class="show-more-invoice-detail" :label-width="120">
          <FormItem class="form-item" label="发票类型：">
            <div class="form-item-text">{{formItem?formItem.invoiceType:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="公司名称：">
            <div class="form-item-text">{{formItem?formItem.companyName:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="税号：">
            <div class="form-item-text">{{formItem?formItem.taxNum:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="地址：">
            <div class="form-item-text">{{formItem?formItem.companyAddtress:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="电话：">
            <div class="form-item-text">{{formItem?formItem.companyTelephone:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="开户号：">
            <div class="form-item-text">{{formItem?formItem.bankName:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="银行账号：">
            <div class="form-item-text">{{formItem?formItem.bankNo:''}}</div>
          </FormItem>
          <FormItem class="form-item" label="发票金额：">
            <div class="form-item-text">{{targetInvoiceData?targetInvoiceData.orderPrice:''}}</div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button v-if="targetInvoiceData&&targetInvoiceData.status !== 1" type="primary" size="large" style="width:100px" @click="saveInvoice">确定</Button>
        <Button v-if="targetInvoiceData&&targetInvoiceData.status !== 1" style="margin-left: 8px;width:100px" size="large" @click="cancelInvoice">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import InvoiceForm from "./mixin/invoice-form.vue";
import RequestInterface from "@/api/interface.js";

export default {
  mixins: [InvoiceForm],
  data() {
    return {
      orderTypeValue: "全部",
      orderStateValue: "全部",
      formItem: {
        invoiceType: "addticket",
        companyName: "",
        taxNum: "",
        companyAddtress: "",
        companyTelephone: "",
        bankName: "",
        bankNo: ""
      },
      ruleInline: {
        companyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur"
          }
        ],
        taxNum: [
          {
            required: true,
            message: "税号不能为空",
            trigger: "blur"
          }
        ],
        companyAddtress: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        companyTelephone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: "开户号不能为空",
            trigger: "blur"
          }
        ],
        bankNo: [
          {
            required: true,
            message: "银行账号不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getInvoiceAddressInterface();
    this.getInvoiceDataListInterFace({
      page: this.targetPageIndex,
      rows: this.invoicePageSize,
    });
    this.getOrderListTypeData();
  },
  computed: {},
  methods: {
    // 确认修改发票地址
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          RequestInterface.reviseInvoiceAddressInfo({
            invoiceType: this.formItem.invoiceType == "personerticket" ? 1 : 2,
            companyName: this.formItem.companyName,
            taxNum: this.formItem.taxNum,
            companyAddtress: this.formItem.companyAddtress,
            companyTelephone: this.formItem.companyTelephone,
            bankName: this.formItem.bankName,
            bankNo: this.formItem.bankNo
          }).then(res => {
            if (res.status == 0) {
              that.$Message.success("修改成功");
              return;
            }
            if (res.status == -1) {
              that.$Message.success(res.message);
              return;
            }
          });
        }
      });
    },
    // 获取发票地址信息
    getInvoiceAddressInterface() {
      const that = this;
      RequestInterface.getInvoiceAddressInfo().then(res => {
        if (res.status == 0) {
          if (!res.data) {
            return;
          }
          that.formItem.invoiceType =
            res.data.invoiceType == 1 ? "personerticket" : "addticket";
          that.formItem.companyName = res.data.companyName;
          that.formItem.taxNum = res.data.taxNum;
          that.formItem.companyAddtress = res.data.companyAddtress;
          that.formItem.companyTelephone = res.data.companyTelephone;
          that.formItem.bankName = res.data.bankName;
          that.formItem.bankNo = res.data.bankNo;
          return;
        }
        if (res.status == -1) {
          return;
        }
      });
    },
    // 获取发票列表
    getInvoiceDataListInterFace(params) {
      const that = this;
      if (!params) {
        params = {};
      }
      RequestInterface.getInvoiceDataList(params).then(res => {
        if (res.status == 0) {
          if (res.data && res.page) {
            that.invoiceDaTa = res.data.map((item, index) => {
              return {
                ...item,
                sortNum: index + 1,
                orderPrice: item.orderPrice + "元",
              };
            });
            that.invoiceTotal = res.page.total;
          }
          return;
        }
        if (res.status == -1) {
          that.$Message.error(res.message);
          return;
        }
      });
    },
    // 获取类型列表
    getOrderListTypeData() {
      const that = this;
      RequestInterface.getOrdingListType().then(res => {
        if(res.status == 0) {
          that.invoiceType = res.data;
          return;
        }
      })
    }
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
#show-more-invoice-detail .ivu-form-item-content {
  font-size: 16px;
}
#show-more-invoice-detail .ivu-input-default {
  font-size: 16px;
  height: 36px;
}
#show-more-invoice-detail .ivu-form-item-label {
  font-size: 16px;
}
#show-more-invoice-detail .ivu-form-item {
  width: 100%;
  margin-bottom: 15px;
}
#show-more-invoice-detail .ivu-modal-header p {
  font-size: 20px;
  font-weight: normal;
}
#show-more-invoice-detail .ivu-modal-footer {
  padding-top: 0px;
  padding-bottom: 20px;
  border-top: none;
  text-align: center;
}
</style>



