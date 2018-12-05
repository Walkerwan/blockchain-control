<script>
export default {
  data() {
    return {
      tradeRecordColumns: [
        {
          title: "交易ID",
          key: "tradeId",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.tradeId
            );
          }
        },
        {
          title: "时间",
          key: "time",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.time
            );
          }
        },
        {
          title: "金额",
          key: "money",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.money
            );
          }
        },
        {
          title: "详情",
          key: "detail",
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
      tradeRecordDaTa: [
        {
          tradeId: "342euriewfewwreie3423efewfwfwff3453dgf",
          time: "2018-11-01 11:38:53",
          money: "166"
        },
        {
          tradeId: "342euriewfewwreie3423efewfwfwff3453dgf",
          time: "2018-11-01 11:38:53",
          money: "166"
        },
        {
          tradeId: "342euriewfewwreie3423efewfwfwff3453dgf",
          time: "2018-11-01 11:38:53",
          money: "166"
        },
        {
          tradeId: "342euriewfewwreie3423efewfwfwff3453dgf",
          time: "2018-11-01 11:38:53",
          money: "166"
        }
      ]
    };
  }
};
</script>
