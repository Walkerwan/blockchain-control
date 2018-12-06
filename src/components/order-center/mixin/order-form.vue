<script>
export default {
  data() {
    return {
      orderColumns: [
        {
          title: "序号",
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
          title: "订单金额",
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
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              "详情"
            );
          }
        }
      ],
      orderDaTa: [
        {
          sortNum: 1,
          orderNum: "yl233434ssf",
          productType: "积分商城A",
          bilingWay: "包年",
          orderMoney: "7888.12元",
          orderTime: "2018-09-26 00:50:13",
          orderState: "待支付"
        },
        {
          sortNum: 1,
          orderNum: "yl233434ssf",
          productType: "积分商城A",
          bilingWay: "包年",
          orderMoney: "7888.12元",
          orderTime: "2018-09-26 00:50:13",
          orderState: "待支付"
        },
        {
          sortNum: 1,
          orderNum: "yl233434ssf",
          productType: "积分商城A",
          bilingWay: "包年",
          orderMoney: "7888.12元",
          orderTime: "2018-09-26 00:50:13",
          orderState: "待支付"
        },
        {
          sortNum: 1,
          orderNum: "yl233434ssf",
          productType: "积分商城A",
          bilingWay: "包年",
          orderMoney: "7888.12元",
          orderTime: "2018-09-26 00:50:13",
          orderState: "待支付"
        }
      ],
      orderTotal: 100,
      orderPageSize: 10
    };
  },
  methods: {
    // 切换页
    togglePage() {}
  }
};
</script>
