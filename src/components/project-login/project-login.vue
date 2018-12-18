<template>
    <div class="login-containor">
      <div class="login-containor-left"></div>
      <div class="login-containor-right">
        <div class="login-content">
          <div class="login-content-title">控制台登录</div>
          <Form id="form-inline" ref="formInline" :model="formInline" :rules="ruleInline" inline class="login-content-form">
              <FormItem prop="user" class="form-item">
                <Input type="text" class="input-item" v-model="formInline.user" placeholder="请输入手机号或邮箱"></Input>
                <i class="login-user"></i>
                <i class="login-line"></i>
              </FormItem>
              <FormItem prop="password" class="form-item">
                <Input type="password" class="input-item" v-model="formInline.password" placeholder="请输入密码"></Input>
                <i class="login-password"></i>
                <i class="login-line"></i>
              </FormItem>
              <FormItem class="form-item">
                <div class="validate-sure"></div>
              </FormItem>
              <FormItem class="form-item">
                  <Button type="primary" class="button-item" @click="handleSubmit('formInline')">登录</Button>
              </FormItem>
          </Form>
          <div class="login-content-bottom">
            <span class="forget-password" @click="skipForgetPassword">忘记密码？</span>
            <span class="bottom-register">
              <i class="register" @click="skipRegister">注册</i>
              <i class="now">立即</i>
            </span>
            <span class="bottom-text">没有账号？</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import RequestInterface from '@/api/interface.js';
import LoginTool from "./utils/login-tool.js";
import md5 from "MD5";
export default {
  data() {
    // 校验用户名
    const validateUser = (rule, value, callback) => {
      if(!value) {
        callback(new Error('请输入邮箱或者手机号!'));
        return
      }
      let params;
      if(!LoginTool.isEmailUser(value)&&!LoginTool.isTelephoneUser(value)) {
        callback(new Error('请输入正确的邮箱或者手机号！'));
        return;
      }
      callback();
    };
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            validator: validateUser,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码！",
            trigger: "blur"
          },
        ]
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("提交成功!");
          let params;
          if(LoginTool.isEmailUser(this.formInline.user)) {
            params = {
              eMail: this.formInline.user,
              password:md5(this.formInline.password),
            }
          } else if(LoginTool.isTelephoneUser(this.formInline.user)) {
            params = {
              phone: this.formInline.user,
              password:md5(this.formInline.password),
            }
          } else {
            return;
          }
          RequestInterface.loginContent(params).then(res => {
            if(res.status == 0) {
              this.$router.push({path: '/project/content'});
              return;
            }
            if(res.status == -1) {
              this.$Message.error(res.message);
              return;
            }
          });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    // 跳转至注册页面
    skipRegister() {
      this.$router.push({path: '/project/register'})
    },
    //跳转至忘记密码页面
    skipForgetPassword() {
      this.$router.push({path: '/project/passwordback'})
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./styles/project-login.less");
</style>

<style>
#form-inline .ivu-form-item{
  margin-bottom: 20px !important;
}

#form-inline .form-item .ivu-input {
  height: 34px;
  line-height: 34px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0px;
  color: #c6c6c6;
  text-indent: 36px;
  outline-color: rgba(255, 255, 255, 0);
}
/* #form-inline .form-item .ivu-input:focus {
  border: none !important;
  outline: none !important;
} */
</style>

