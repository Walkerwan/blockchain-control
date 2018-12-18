<template>
  <div class="reset-continor">
    <div class="reset-content">
      <div class="reset-form">
        <div class="reset-form-title">密码重置</div>
        <Form
          id="reset-form-inline"
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          inline
          class="reset-content-form"
        >
          <FormItem prop="password" class="form-item">
            <Input
              type="password"
              class="input-item"
              v-model="formInline.password"
              placeholder="请设置登录新密码"
            ></Input>
          </FormItem>
          <FormItem prop="passwordagain" class="form-item">
            <Input
              type="password"
              class="input-item"
              v-model="formInline.passwordagain"
              placeholder="再次输入登录新密码"
            ></Input>
          </FormItem>
          <FormItem class="form-item">
            <Button type="primary" class="button-item" @click="handleSubmit('formInline')">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTool from "./utils/login-tool.js";
import RequestInterface from '@/api/interface.js';
import md5 from "MD5";
export default {
  data() {
    const that = this;
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
    return {
      formInline: {
        password: "",
        passwordagain: ""
      },
      ruleInline: {
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
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      const that =this;
      this.$refs[name].validate(valid => {
        if (valid) {
          const params= {
            phone :that.$store.state.login.regstryTelephone,
            verificationCode: that.$store.state.login.regstryVerificationCode,
            newPassword: md5(that.formInline.password),
            affirmPassword: md5(that.formInline.passwordagain)
          };
          RequestInterface.changePassWord(params).then(res => {
            if(res.status == 0) {
               that.$router.push({ path: "/project/login" });
               return;
            }
            if(res.status == -1) {
               that.$Message.error(res.message);
               return;
            }
          })
          //   this.$router.push({ path: "/project/passwordreset" });
        } else {
          that.$Message.error("提交失败!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./styles/project-password-reset.less");
</style>

<style>
#reset-form-inline .form-item .ivu-input {
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
#reset-form-inline .form-item .ivu-form-item-error-tip {
  position: abosolute;
  width: 300px;
  padding-left: 10px;
  left: 100%;
  top: 9px;
}
</style>



