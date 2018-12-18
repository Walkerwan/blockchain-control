<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-form">
        <div class="register-title">欢迎注册中琛云链账号</div>
        <Form
          id="register-form-inline"
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          inline
          class="register-content-form"
        >
          <FormItem prop="email" class="form-item">
            <Input type="text" class="input-item" v-model="formInline.email" placeholder="邮箱地址"></Input>
          </FormItem>
          <FormItem prop="password" class="form-item">
            <Input
              type="password"
              class="input-item"
              v-model="formInline.password"
              placeholder="设置登录密码"
            ></Input>
          </FormItem>
          <FormItem prop="passwordagain" class="form-item">
            <Input
              type="password"
              class="input-item"
              v-model="formInline.passwordagain"
              placeholder="再次输入登录密码"
            ></Input>
          </FormItem>
          <FormItem prop="telephone" class="form-item">
            <Input
              type="text"
              class="input-item"
              v-model="formInline.telephone"
              placeholder="请输入手机号"
            ></Input>
          </FormItem>
          <FormItem prop="validatenum" class="form-item">
            <Input type="text" class="input-item validate-num" v-model="formInline.validatenum"></Input>
            <span v-if="isShowReadTimer" class="validate-time">({{registerValidateTimer}}s)</span>
            <span
              class="send-validate"
              :class="{disabled: registerTimer}"
              @click="sendValidate"
            >发送验证码</span>
          </FormItem>
          <FormItem prop="readprotocol" class="form-item">
            <Checkbox v-model="formInline.readprotocol" class="read-protocol">
              <span class="text-left">我已阅读并接受</span>
            </Checkbox>
            <span class="text-right-proto" @click="skipProtocol">《中琛源开发者服务协议》</span>
          </FormItem>
          <FormItem class="form-item">
            <Button
              type="primary"
              class="button-item"
              :class="{disabled:!formInline.readprotocol}"
              :disabled="!formInline.readprotocol"
              @click="handleSubmit('formInline')"
            >同意协议并提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import CommenUtil from "@/utils/common.js";
import LoginTool from "./utils/login-tool.js";
import RequestInterface from "@/api/interface.js";
import md5 from "MD5";

export default {
  data() {
    const that = this;
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
    // 密码重复校验
    const passwordAgainValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码！"));
        return;
      }
      if (!LoginTool.checkPassWordIsSame(value, that.formInline.password)) {
        callback(new Error("前后密码输入不一致！"));
        return;
      }
      callback();
    };
    // 手机号码校验
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
    return {
      formInline: {
        email: "",
        password: "",
        passwordagain: "",
        telephone: "",
        validatenum: "",
        readprotocol: false
      },
      ruleInline: {
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
        passwordagain: [
          {
            validator: passwordAgainValidate,
            trigger: "blur"
          }
        ],
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
        ]
      },
      registerTimer: null,
      isShowReadTimer: false, // 是否显示读秒
      registerValidateTimer: 60 // 发送验证码的读秒间隔
    };
  },
  methods: {
    // 提交注册信息
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = {
            eMail: this.formInline.email,
            phone: this.formInline.telephone,
            verificationCode: this.formInline.validatenum,
            password: md5(this.formInline.password),
          }
          RequestInterface.registryUser(params).then(res => {
            if(res.status == 0) {
              that.$Message.success(res.message);
              that.$router.push({ path: "/project/login" });
              return;
            }
             that.$Message.error(res.message);
          });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    // 发送验证码
    sendValidate() {
      const that = this;
      // 手机号码是否是正确的
      if (!this.formInline.telephone) {
        this.$Message.error("手机号码不能为空！");
        return;
      }
      if (!LoginTool.isTelephoneUser(this.formInline.telephone)) {
        this.$Message.error("请输入有效的手机号码！");
        return;
      }
      RequestInterface.sendIdentifyCode({
        type: "REGISTER",
        mobileNum: this.formInline.telephone
      }).then(res => {
        if (res.status == 0) {
          that.$Message.success(res.message);
          if (!that.registerTimer) {
            that.isShowReadTimer = true;
            that.registerValidateTimer = 60;
            that.registerTimer = window.setInterval(() => {
              that.registerValidateTimer--;
              if (that.registerValidateTimer <= 0) {
                window.clearInterval(that.registerTimer);
                that.registerTimer = null;
                that.isShowReadTimer = false;
              }
            }, 1000);
          }
          return;
        }
        if (res.status == -1) {
          that.$Message.error(res.message);
          return;
        }
      });
    },
    // 点击阅读协议
    skipProtocol(e) {
      CommenUtil.preventBubble(e);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./styles/project-register.less");
</style>

<style>
#register-form-inline .ivu-form-item {
  margin-bottom: 15px !important;
}

#register-form-inline .form-item .ivu-input {
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
#register-form-inline .form-item .ivu-form-item-error-tip {
  position: abosolute;
  width: 300px;
  padding-left: 10px;
  left: 100%;
  top: 9px;
}
</style>



