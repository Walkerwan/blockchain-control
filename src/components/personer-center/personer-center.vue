<template>
  <div class="personor-container">
    <div class="personor-container-content">
      <div class="personor-content-left">
        <div class="personor-content-left-title">基本信息</div>
        <div class="left-title-username">
          <span class="item-title">用户名：</span>
          <span class="item-content" v-if="notShowUserInput" @dblclick="dblClickUser">{{userInfomation?userInfomation.nickName:''}}</span>
          <Input class="item-content-input" type="text" v-if="!notShowUserInput" @on-blur="userBlur"></Input>
        </div>
        <div class="left-title-tel">
          <span class="item-title">手机号码：</span>
          <span class="item-content">{{userInfomation?userInfomation.phone:''}}</span>
          <span class="item-set" @click="revisePhone('phone')">修改</span>
        </div>
        <div class="left-title-email">
          <span class="item-title">邮箱：</span>
          <span class="item-content">{{userInfomation?userInfomation.eMail:''}}</span>
          <span class="item-set" @click="revisePhone('email')">修改</span>
        </div>
        <div class="left-title-psd">
          <span class="item-title">登录密码：</span>
          <span class="item-content">已设置</span>
          <span class="item-set" @click="revisePhone('password')">修改</span>
        </div>
      </div>
      <div class="personor-content-right">
        <img v-if="!userInfoLogo" class="content-right-icon" src='./assets/user-icon.svg' alt="用户头像">
        <img v-if="userInfoLogo" class="content-right-icon" :src='userInfoLogo' alt="用户头像">
        <Upload
          ref="upload"
          :show-upload-list="false"
          with-credentials
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-success="uploadSuccess"
          :on-exceeded-size="handleMaxSize"
          action="http://172.16.5.113:8102/zcmf-website-business-view/user/upload"
        >
          <Button class="change-icon" icon="ios-cloud-upload-outline">更改图像</Button>
        </Upload>
      </div>
      <Modal v-model="changePhone" width="360" id="chage-phone-modal">
        <p slot="header" style="color:#000;text-align:left">{{phoneTitleText}}</p>
        <div>
          <Form
            id="change-phone"
            ref="phonerFormInline"
            :model="phonerFormInline"
            :rules="ruleInline"
            inline
            class="change-phone"
          >
            <FormItem prop="telephone" class="form-item">
              <Input
                type="text"
                class="input-item"
                v-model="phonerFormInline.telephone"
                placeholder="请输入手机号"
              ></Input>
            </FormItem>
            <FormItem prop="validatenum" class="form-item">
              <Input
                type="text"
                class="input-item validate-num"
                v-model="phonerFormInline.validatenum"
              ></Input>
              <span v-if="isShowReadTimer" class="validate-time">({{passwordValidateTimer}}s)</span>
              <span
                class="send-validate"
                :class="{disabled: passwordTimer}"
                @click="sendValidate"
              >发送验证码</span>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            size="large"
            long
            @click="handleSubmit('phonerFormInline')"
          >{{phoneSubmitText}}</Button>
        </div>
      </Modal>
      <Modal v-model="settingAccount" width="360" id="setting-user-modal">
        <p slot="header" style="color:#000;text-align:left">{{settingTitleText}}</p>
        <div>
          <Form
            id="setting-user"
            ref="settingUserFormInline"
            :model="settingUserFormInline"
            :rules="ruleInline"
            inline
            class="setting-user"
          >
            <FormItem prop="email" class="form-item" v-if="this.type == 'email'?true:false">
              <Input
                type="text"
                class="input-item"
                v-model="settingUserFormInline.email"
                :placeholder="settingTitleText"
              ></Input>
            </FormItem>
            <FormItem prop="password" class="form-item" v-if="this.type == 'password'?true:false">
              <Input
                type="password"
                class="input-item"
                v-model="settingUserFormInline.password"
                :placeholder="settingTitleText"
              ></Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            size="large"
            long
            @click="handleSettingSubmit('settingUserFormInline')"
          >提交</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import RequestInterface from "@/api/interface.js";
import LoginTool from "@/components/project-login/utils/login-tool.js";
import md5 from "MD5";

export default {
  data() {
    const telValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号码！"));
        return;
      }
      if (!LoginTool.isTelephoneUser(value)) {
        callback("请输入正确的手机号码！");
        return;
      }
      callback();
    };
    // 校验邮箱
    const emailValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱！"));
        return;
      }
      if (!LoginTool.isEmailUser(value)) {
        callback(new Error("请输入正确的邮箱！"));
        return;
      }
      RequestInterface.checkLoginUser({
        eMail: value
      }).then(res => {
        if(res.status == 0) {
          callback();
          return;
        }
        callback(new Error(res.message))
      })
    };
    // 密码校验
    const passwordValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码！"));
        return;
      }
      if (!LoginTool.checkPassWord(value)) {
        callback(new Error("密码是由数字,字母组成！"));
        return;
      }
      callback();
    };
    return {
      phonerFormInline: {
        telephone: "",
        validatenum: "",
        password: "",
      },
      ruleInline: {
        telephone: [
          {
            validator: telValidate,
            trigger: "blur"
          }
        ],
        validatenum: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: emailValidate,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: passwordValidate,
            trigger: "blur"
          },
          {
            type: "string",
            min: 8,
            message: "密码不能少于8位！",
            trigger: "blur"
          }
        ],
      },
      settingUserFormInline: {
        email: ""
      },
      notShowUserInput:true,
      type: "phone", // 修改类型
      codeType: "UPDATE_ACCOUNT", // 验证码类型
      userInfomation: null,
      changePhone: false, // 手机号码修改的模态框
      settingAccount: false, // 邮箱或者密码修改的模态框
      phoneSubmitText: "提交", // 手机验证的调教按钮的文本信息
      phoneTitleText: "设置新手机号码",
      settingTitleText: "设置新邮箱",
      passwordTimer: null,
      isShowReadTimer: false, // 是否显示读秒
      passwordValidateTimer: 60 // 发送验证码的读秒间隔
    };
  },
  created() {
    const that = this;
    RequestInterface.getUserInfomation().then(res => {
      if (res.status == 0) {
        that.userInfomation = res.data;
        this.$store.commit("personer/setUserInfoLogo",res.data.logoPath);
        return;
      }
      if(res.status == -1) {
        this.$store.commit("personer/setUserInfoLogo",'');
        return;
      }
    });
  },
  computed: {
    userInfoLogo() {
      return this.$store.state.personer.userInfoLogo
    }
  },
  methods: {
    handleFormatError() {},
    uploadSuccess(res) {
      if(res.status == 0) {
        if(res.data) {
          this.$store.commit("personer/setUserInfoLogo",res.data);
        }
      } else {
        this.$store.commit("personer/setUserInfoLogo",'');
      }
    },
    handleMaxSize() {},
    revisePhone(type) {
      this.type = type;
      this.changePhone = true;
      this.initSetting();
      if (this.type === "phone") {
        this.phoneSubmitText = "提交";
        this.phoneTitleText = "设置新手机号码";
      } else if (this.type === "email" || this.type === "password") {
        this.phoneSubmitText = "下一步";
        this.phoneTitleText = "手机号码验证";
      }
    },
    // 双击修改用户名
    dblClickUser() {
      this.notShowUserInput = false;
    },
    userBlur(e) {
      const that = this;
      const targetValue = e.target.value;
      if(!targetValue) {
        this.notShowUserInput = true;
        return;
      }
      RequestInterface.centerChangeUsername({
        nickName: targetValue,
      }).then(res => {
        if(res.status == 0) {
          that.notShowUserInput = true;
          that.$Message.success(res.message);
          if(that.userInfomation) {
            that.$set(that.userInfomation,"nickName",targetValue);
          }
          return;
        }
        if(res.status == 0) {
          that.$Message.success(res.message);
          return;
        }
      })
    },
    // 发送验证码
    sendValidate() {
      const that = this;
      // 手机号码是否是正确的
      if (!this.phonerFormInline.telephone) {
        this.$Message.error("手机号码不能为空！");
        return;
      }
      if (!LoginTool.isTelephoneUser(this.phonerFormInline.telephone)) {
        this.$Message.error("请输入有效的手机号码！");
        return;
      }
      if(this.type === 'phone'|| this.type === 'email') {
        this.codeType = "UPDATE_ACCOUNT"
      } else if(this.type === 'password') {
        this.codeType = "UPDATEPWD"
      }
      RequestInterface.sendIdentifyCode({
        type: this.codeType,
        mobileNum: this.phonerFormInline.telephone
      }).then(res => {
        if (res.status == 0) {
          that.$Message.success(res.message);
          return;
        }
        if (res.status == -1) {
          that.$Message.error(res.message);
          return;
        }
      });
      if (!that.passwordTimer) {
        that.isShowReadTimer = true;
        that.passwordValidateTimer = 60;
        that.passwordTimer = window.setInterval(() => {
          that.passwordValidateTimer--;
          if (that.passwordValidateTimer <= 0) {
            window.clearInterval(that.passwordTimer);
            that.passwordTimer = null;
            that.isShowReadTimer = false;
          }
        }, 1000);
      }
    },
    // 提交手机验证
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (that.type === "phone") {
            that.setNewPhoneNumOrEmail();
            return;
          }
          if (that.type === "email" || that.type === "password") {
            RequestInterface.validateCode({
              phone: that.phonerFormInline.telephone,
              verificationCode: that.phonerFormInline.validatenum,
              type: this.codeType
            }).then(res => {
              if(res.status == 0) {
                if(that.type == "phone") {
                  that.$set(that.userInfomation,"phone",that.phonerFormInline.telephone);
                  return;
                }
                that.changePhone = false;
                that.settingAccount = true;
                if(that.type === "email") {
                  that.settingTitleText = "设置新邮箱";
                } else {
                  that.settingTitleText = "设置新密码";
                }
                return;
              }
              if(res.status == -1) {
                that.$Message.error(res.message);
                return;
              }
            });
          }
        } else {
          that.$Message.error("提交失败!");
        }
      });
    },
    // 提交邮箱或者密码修改
    handleSettingSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if(that.type == "email") {
            that.setNewPhoneNumOrEmail(()=> {
              that.settingAccount = false;
              that.$set(that.userInfomation,"eMail",that.settingUserFormInline.email);
              that.initSetting();
            });
            return;
          };
          if(that.type == "password") {
            RequestInterface.centerChangePassWord({
              phone: that.phonerFormInline.telephone,
              verificationCode: that.phonerFormInline.validatenum,
              newPassword: md5(that.phonerFormInline.password),
            }).then(res => {
              if(res.status == 0) {
                that.$Message.success(res.message);
                that.settingAccount = false;
                return;
              }
              if(res.status == -1) {
                that.$Message.error(res.message);
                return;
              }
            })
            return;
          }
        }
      });
    },
    // 完成修改后初始化邮箱
    initSetting() {
      this.phonerFormInline.telephone = '';
      this.phonerFormInline.validatenum = '';
      this.settingUserFormInline.email = '';
    },
    // 设置新的手机号码
    setNewPhoneNumOrEmail(callback) {
      const that = this;
      RequestInterface.changePhoneOrEmail({
        eMail: that.settingUserFormInline.email,
        phone: that.phonerFormInline.telephone,
        verificationCode: that.phonerFormInline.validatenum
      }).then(res => {
        if (res.status == 0) {
          that.$Message.success(res.message);
          that.changePhone = false;
          callback?callback():null;
          return;
        }
        if (res.status == -1) {
          that.$Message.error(res.message);
          return;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./style/personer-center.less");
</style>

<style>
#change-phone .form-item .ivu-input,
#setting-user .form-item .ivu-input{
  height: 36px;
  line-height: 36px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0px;
  color: #a7a6a6;
  text-indent: 12px;
  outline-color: rgba(255, 255, 255, 0);
}
#chage-phone-modal .ivu-modal-header,
#setting-user-modal .ivu-modal-header{
  border-bottom: none;
}

#chage-phone-modal .ivu-modal-footer,
#setting-user-modal .ivu-modal-footer{
  border-top: none;
}
#chage-phone-modal .ivu-modal-body,
#setting-user-modal .ivu-modal-body{
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>


