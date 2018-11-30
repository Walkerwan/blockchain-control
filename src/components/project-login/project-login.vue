<template>
    <div class="login-containor">
      <div class="login-containor-left"></div>
      <div class="login-containor-right">
        <div class="login-content">
          <div class="login-content-title">控制台登录</div>
          <Form id="form-inline" ref="formInline" :model="formInline" :rules="ruleInline" inline class="login-content-form">
              <FormItem prop="user" class="form-item">
                <input type="text" class="input-item" v-model="formInline.user" placeholder="请输入手机号或邮箱">
                <i class="login-user"></i>
                <i class="login-line"></i>
              </FormItem>
              <FormItem prop="password" class="form-item">
                <input type="password" class="input-item" v-model="formInline.password" placeholder="请输入密码">
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
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请填写账号!",
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
          this.$router.push({path: '/project/content'})
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
</style>

