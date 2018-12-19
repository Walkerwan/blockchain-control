<script>
import { orderStateList } from "@/constant.js";

export default {
  data() {
    return {
      orderColumns: [
        {
          title: "序号",
          key: "sortNum",
          ellipsis: true,
          width: 80,
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
          key: "orderNum",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderNum
            );
          }
        },
        {
          title: "产品类型",
          key: "productType",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.productType
            );
          }
        },
        {
          title: "计费方式",
          key: "bilingWay",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.bilingWay
            );
          }
        },
        {
          title: "订单金额（/元）",
          key: "orderMoney",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderMoney
            );
          }
        },
        {
          title: "订单时间",
          key: "orderTime",
          ellipsis: true,
          width: 250,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderTime
            );
          }
        },
        {
          title: "订单状态",
          key: "orderState",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.orderState
            );
          }
        },
        {
          title: "操作",
          key: "operate",
          ellipsis: true,
          render: (h, params) => {
            const that = this;
            return h(
              "span",
              {
                style: {
                  fontSize: "18px",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    that.targetOrderRow = params.row;
                    that.showOrderDetail =true;
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      orderDaTa: [],
      orderType:[],
      orderTotal: 100,
      orderPageSize: 10,
      targetPageIndex: 1,
      orderStateList: orderStateList,
      lastLoginStart:'',
      lastLoginEnd: '',
      targetOrderRow:null,
    };
  },
  methods: {
    // 切换页
    togglePage(index) {
      this.targetPageIndex = index;
      this.getOrderListData({
        page: this.targetPageIndex,
        rows: this.orderPageSize
      });
    },
    // 切换页码数
    togglePageSize(size) {
      this.orderPageSize = size;
      this.getOrderListData({
        page: this.targetPageIndex,
        rows: this.orderPageSize
      });
    },
    // 搜索订单
    searchOrderList() {
      this.targetPageIndex = 1;
      this.getOrderListData({
        orderNo: this.orderNum,
        cloudId: this.orderTypeValue,
        status: this.orderStateValue,
        lastLoginStart: this.lastLoginStart,
        lastLoginEnd: this.lastLoginEnd,
        page: this.targetPageIndex,
        rows: this.orderPageSize,
      });
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
