<script>
import RequestInterface from "@/api/interface.js";
import InvoiceTool from "@/components/invoice-center/utils/invoice-tool.js";
import { invoiceStateList } from "@/constant.js";
export default {
  data() {
    return {
      invoiceColumns: [
        {
          title: "序号",
          width: 80,
          key: "sortNum",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.sortNum
            );
          }
        },
        {
          title: "订单号",
          width: 200,
          key: "orderNo",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderNo
            );
          }
        },
        {
          title: "产品类型",
          key: "cloudName",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.cloudName
            );
          }
        },
        {
          title: "计费方式",
          key: "timeUnit",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.timeUnit
            );
          }
        },
        {
          title: "订单金额",
          key: "orderPrice",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderPrice
            );
          }
        },
        {
          title: "订单时间",
          width: 250,
          key: "createTime",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.createTime
            );
          }
        },
        {
          title: "发票状态",
          key: "statusDesc",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.statusDesc
            );
          }
        },
        {
          title: "操作",
          key: "operate",
          ellipsis: true,
          render: (h, params) => {
            const that = this;
            if (params.row.status == 0 || params.row.status == 3) {
              return h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    fontSize: "18px"
                  },
                  on: {
                    click: () => {
                      that.applyInvoice(params);
                    }
                  }
                },
                "申请发票"
              );
            }
            if (params.row.status == 2) {
              return h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    fontSize: "18px"
                  },
                  on: {
                    click: () => {
                      that.downloadInvoice(params);
                    }
                  }
                },
                "下载发票"
              );
            }
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  fontSize: "18px"
                },
                on: {
                  click: () => {
                    that.checkMoreDetail(params);
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      invoiceDaTa: [],
      invoiceTotal: 100,
      invoicePageSize: 10,
      invoiceTypeValue: "",// 产品类型的选中值
      invoiceStateValue: "",// 状态的选中值
      showInvoiceDetail: false, //模态框
      targetInvoiceData: null, //目标行
      targetPageIndex: 1,
      invoiceType:[],//产品类型
      invoiceStateList: invoiceStateList, //状态列表
      lastLoginStart:'',
      lastLoginEnd: '',
    };
  },
  methods: {
    // 切换页
    togglePage(index) {
      this.targetPageIndex = index;
      this.getInvoiceDataListInterFace({
        page: this.targetPageIndex,
        rows: this.invoicePageSize
      });
    },
    // 切换页码数
    togglePageSize(size) {
      this.invoicePageSize = size;
      this.getInvoiceDataListInterFace({
        page: this.targetPageIndex,
        rows: this.invoicePageSize
      });
    },
     // 搜索订单
    searchInvoiceList() {
      this.targetPageIndex = 1;
      this.getInvoiceDataListInterFace({
        cloudId: this.invoiceTypeValue,
        status: this.invoiceStateValue,
        lastLoginStart: this.lastLoginStart,
        lastLoginEnd: this.lastLoginEnd,
        page: this.targetPageIndex,
        rows: this.invoicePageSize,
      });
    },
    //申请发票
    applyInvoice(params) {
      this.targetInvoiceData = params.row;
      this.showInvoiceDetail = true;
    },
    // 查看详情
    checkMoreDetail(params) {
      this.targetInvoiceData = params.row;
      this.showInvoiceDetail = true;
    },
    // 下载发票
    downloadInvoice(params) {
      const that = this;
      this.targetInvoiceData = params.row;
      if (!this.targetInvoiceData.id) {
        return;
      }
      InvoiceTool.downloadFile(
        "http://172.16.5.113:8102/zcmf-website-business-view/invoice/download/" +
          this.targetInvoiceData.id
      );
    },
    //保存发票修改
    saveInvoice() {
      const that = this;
      if (!this.targetInvoiceData.id) {
        return;
      }
      RequestInterface.applyInvoiceOrder({
        id: this.targetInvoiceData.id
      }).then(res => {
        if (res.status == 0) {
          that.getInvoiceDataListInterFace();
          that.$Message.success("申请成功！");
          that.showInvoiceDetail = false;
          return;
        }
        if (res.status == -1) {
          that.$Message.error(res.message);
          return;
        }
      });
    },
    //取消发票修改
    cancelInvoice() {
      this.showInvoiceDetail = false;
    },
     // 获取起始日期
    getLastLoginStart(val,type){
      this.lastLoginStart = val;
    },
    // 获取结束日期
    getLastLoginEnd(val,type) {
      this.lastLoginEnd = val;
    }
  }
};
</script>
