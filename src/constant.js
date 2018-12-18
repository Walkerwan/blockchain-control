export const projectCatalog = [{
    name: '首页',
    label: 'homepage'
  },
  {
    name: '产品文档',
    label: 'productdoc'
  },
  {
    name: '技术文档',
    label: 'techdoc'
  },
  {
    name: '关于我们',
    label: 'aboutus'
  },
];

export const projectHomePageBottomList = [
  [{
    name: "中琛源区块链"
  },
  {
    name: "LOVE@BaaS.com"
  },
  {
    name: "400-888-888"
  }
  ],
  [{
    name: "产品方案"
  },
  {
    name: "Hyperledger Fabric"
  },
  {
    name: "积分商城"
  },
  {
    name: "形式化验证"
  }
  ],
  [{
    name: "帮助中心"
  },
  {
    name: "技术文档"
  },
  {
    name: "关于我们"
  }
  ],
];

export const contentCatalog = [
  {
    name: '首页',
    hierarchy: 1,
    expanded: true,
    url: "/project/content/homepage",
    children: [
      {
        name: "个人中心",
        hierarchy: 1,
        url: "/project/content/personer",
      },
      {
        name: "产品中心",
        hierarchy: 1,
        url: "/project/content/product",
        children: [
          {
            name: "积分通兑",
            url: "/project/content/product",
            hierarchy: 2,
          },
          {
            name: "我要定制",
            url: "/project/content/product/ording",
            hierarchy: 2,
          }
        ]
      },
      {
        name: "管理中心",
        hierarchy: 1,
        url: "/project/content/manage",
        children: [
          {
            name: "积分通兑",
            url: "/project/content/manage",
            hierarchy: 2,
            children: [
              {
                name: "API调用",
                url: "/project/content/manage/api",
                hierarchy: 3,
              },
              {
                name: "操作日志",
                url: "/project/content/manage/log",
                hierarchy: 3,
              }
            ]
          },
        ]
      },
      {
        name: "订单中心",
        hierarchy: 1,
        url: "/project/content/order",
      },
      {
        name: "发票中心",
        hierarchy: 1,
        url: "/project/content/invoice",
      },
    ]
  }
]

export const orderStateList = [
  {
    label: "全部",
    value: -1
  },
  {
    label: "未支付",
    value:0
  },
  {
    label: "正常",
    value:1
  },
  {
    label: "到期",
    value: 3
  },
  {
    label: "解散",
    value: 4
  },
  {
    label: "超时",
    value: 5
  },
  {
    label: "开通中",
    value: 6
  },
  {
    label: "开通失败",
    value: 7
  }
]
