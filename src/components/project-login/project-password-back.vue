<template>
  <div class="find-password-container">
    <div class="find-password-content">
      <div class="find-password-form">
        <div class="find-password-title">密码找回</div>
        <Form
          id="find-password-form-inline"
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          inline
          class="find-password-content-form"
        >
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
            <span v-if="isShowReadTimer" class="validate-time">({{passwordValidateTimer}}s)</span>
            <span
              class="send-validate"
              :class="{disabled: passwordTimer}"
              @click="sendValidate"
            >发送验证码</span>
          </FormItem>
          <FormItem class="form-item">
            <Button type="primary" class="button-item" @click="handleSubmit('formInline')">下一步</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTool from "@/components/project-login/utils/login-tool.js";
import RequestInterface from "@/api/interface.js";
import md5 from "MD5";
export default {
  data() {
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
        telephone: "",
        validatenum: ""
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
        ]
      },
      passwordTimer: null,
      isShowReadTimer: false, // 是否显示读秒
      passwordValidateTimer: 60 // 发送验证码的读秒间隔
    };
  },
  methods: {
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          that.$store.commit("login/setTelephone", '');
          RequestInterface.validateCode({
            phone: that.formInline.telephone,
            verificationCode: that.formInline.validatenum,
            type: "UPDATEPWD"
          }).then(res => {
            if(res.status ==0) {
              // 存储号码和验证码
              that.$store.commit("login/setTelephone", that.formInline.telephone);
              that.$store.commit("login/setVerificationCode", that.formInline.validatenum);
              that.$router.push({ path: "/project/passwordreset" });
              return;
            }
            if(res.status == -1) {
              that.$Message.error(res.message);
              return;
            }
          })
        } else {
          that.$Message.error("提交失败!");
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
        type: "UPDATEPWD",
        mobileNum: this.formInline.telephone
      }).then(res => {
        if (res.status == 0) {
          that.$Message.success(res.message);
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
@import url("./styles/project-password-back.less");
</style>

<style>
#find-password-form-inline .form-item .ivu-input {
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
#find-password-form-inline .form-item .ivu-form-item-error-tip {
  position: abosolute;
  width: 300px;
  padding-left: 10px;
  left: 100%;
  top: 9px;
}
</style>



