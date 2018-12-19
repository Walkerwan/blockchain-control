import axios from "axios";
import vue from "vue";
class RequestInterface {
  /**
   * 接口中枢
   * @param {*} config
   */
  fetch(config) {
    return new Promise((resolve, reject) => {
      axios({
          // baseURL: 'http://172.16.8.33:8888',
          baseURL: 'http://172.16.5.113:8102',
          method: config.method,
          url: config.url,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            // VT: session.vt
          },
          data: config.method === "post" || config.method === "put" ?
            config.params : null,
          params: config.method === "get" || config.method === "delete" ?
            config.params : null
        })
        .then(function (res) {
          if (res.status == 200 && res.data) {
            if (res.data.status == -101) {
              new vue().$Message.error(res.data.message);
              return;
            }
            resolve(res.data);
          }
        })
        .catch(function (err) {
          new vue().$Message.error(err);
          reject(err);
        });
    });
  }

  // 重置fetch函数
  //   resetFetchFunc(params) {
  //     const headers = {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       // VT: session.vt
  //     };
  //     if (params.token) {
  //       headers["token"] = params.token
  //     }
  //     this.fetch = (config) => {
  //       return new Promise((resolve, reject) => {
  //         axios({
  //             // baseURL: 'http://172.16.8.33:8888',
  //             baseURL: 'http://172.16.5.113:8102',
  //             method: config.method,
  //             url: config.url,
  //             headers: headers,
  //             data: config.method === "post" || config.method === "put" ?
  //               config.params : null,
  //             params: config.method === "get" || config.method === "delete" ?
  //               config.params : null
  //           })
  //           .then(function (res) {
  //             if (res.status == 200 && res.data) {
  //               resolve(res.data);
  //             }
  //           })
  //           .catch(function (err) {
  //             vue.$Message.error(err);
  //             reject(err);
  //           });
  //       });
  //     }
  //   }
  // 校验用户名
  checkLoginUser(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/check",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }

  // 发送验证码
  sendIdentifyCode(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/verifycode",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 修改手机号码或者邮箱
  changePhoneOrEmail(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/update/account",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 用户注册
  registryUser(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/register",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 用户登录
  loginContent(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/login",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 验证码校验
  validateCode(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/checkVerifycode",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 修改密码
  changePassWord(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/update/password",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取首页列表
  getHomePageList() {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/order/homeOrderList",
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 解散服务
  dissolutionService(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/order/disOrder",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取用户信息
  getUserInfomation() {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/user/find",
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 个人中心修改用户名
  centerChangeUsername(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/update",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 个人中心修改密码
  centerChangePassWord(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/user/updatePwd",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取产品中心的列表
  getProductCenterList() {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/cloud/queryCloudSkuList",
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 产品中心的我要定制
  productOrding(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/customwords/save",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取定制列表
  getSettingList(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/cloud/queryCloudSkuInfo",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 创建订单
  createOrding(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/order/createOrder",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取订单列表
  getOrdingList(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/order/orderList",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取订单类型
  getOrdingListType(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/cloud/queryCloudList",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取发票列表
  getInvoiceDataList(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/invoice/list",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 获取发票地址信息
  getInvoiceAddressInfo() {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/invoice/config/find",
      }).then(res => {
        resolve(res);
      })
    })
  }
   // 修改发票地址信息
   reviseInvoiceAddressInfo(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/invoice/config/save",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 发票信息申请
  applyInvoiceOrder(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "post",
        url: "/zcmf-website-business-view/invoice/apply",
        params: params
      }).then(res => {
        resolve(res);
      })
    })
  }
  // 发票下载
  downloadInvoiceInterface(params) {
    return new Promise((resolve, reject) => {
      this.fetch({
        method: "get",
        url: "/zcmf-website-business-view/invoice/download/"+params.id,
      }).then(res => {
        resolve(res);
      })
    })
  }
}

export default new RequestInterface();
