class LoginTool {
  constructor() {}

  /**
   * 判断用户名是否是邮箱
   */
  isEmailUser(value) {
    const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!emailReg.test(value)) {
      return false;
    }
    return true;
  }

  /**
   * 判断用户名是否是电话号码
   * @param {*} value
   */
    isTelephoneUser(value) {
    // 校验手机号码的正则表达式
    const phoneReg = /^1[34578]\d{9}$/;
    if (!phoneReg.test(value)) {
      return false;
    }
    return true;
  }

  /**
   * 校验密码
   * @param {*} value
   */
  checkPassWord(value) {
    return true;
    }
    /**
     * 密码的重复校验
     * @param {*} value
     * @param {*} upValue
     */
  checkPassWordIsSame(value, upValue) {
    if (value !== upValue) {
      return false;
    }
    return true;
  }
}

export default new LoginTool();
