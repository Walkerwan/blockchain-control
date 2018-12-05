<script>
export default {
  data() {
    return {
      nodeRecordColumns: [
        {
          title: "高度",
          key: "height",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.height
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
          title: "代理节点",
          key: "clientnode",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.clientnode
            );
          }
        },
        {
          title: "区块大小(byte)",
          key: "byte",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  fontSize: "18px"
                }
              },
              params.row.byte
            );
          }
        }
      ],
      nodeRecordDaTa: [
        {
          height: "124515",
          time: "2018-11-01 11:38:53",
          money: "166",
          clientnode: "HKYA1",
          byte: "166"
        },
        {
          height: "124515",
          time: "2018-11-01 11:38:53",
          money: "166",
          clientnode: "HKYA1",
          byte: "166"
        },
        {
          height: "124515",
          time: "2018-11-01 11:38:53",
          money: "166",
          clientnode: "HKYA1",
          byte: "166"
        },
        {
          height: "124515",
          time: "2018-11-01 11:38:53",
          money: "166",
          clientnode: "HKYA1",
          byte: "166"
        },
      ]
    };
  }
};
</script>
