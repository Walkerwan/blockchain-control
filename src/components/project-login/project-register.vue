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
          <FormItem prop="user" class="form-item">
            <input type="text" class="input-item" v-model="formInline.user" placeholder="邮箱地址">
          </FormItem>
          <FormItem prop="password" class="form-item">
            <input
              type="password"
              class="input-item"
              v-model="formInline.password"
              placeholder="设置登录密码"
            >
          </FormItem>
          <FormItem prop="passwordagain" class="form-item">
            <input
              type="password"
              class="input-item"
              v-model="formInline.passwordagain"
              placeholder="再次输入登录密码"
            >
          </FormItem>
          <FormItem prop="telephone" class="form-item">
            <input
              type="text"
              class="input-item"
              v-model="formInline.telephone"
              placeholder="请输入手机号"
            >
          </FormItem>
          <FormItem prop="validatenum" class="form-item">
            <input type="text" class="input-item validate-num" v-model="formInline.validatenum">
            <span v-if="isShowReadTimer" class="validate-time">({{registerValidateTimer}}s)</span>
            <span class="send-validate" :class="{disabled: registerTimer}" @click="sendValidate">发送验证码</span>
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
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        passwordagain: "",
        telephone: "",
        validatenum: "",
        readprotocol: false
      },
      ruleInline: {
        // user: [
        //   {
        //     required: true,
        //     message: "请填写账号!",
        //     trigger: "blur"
        //   }
        // ],
        // password: [
        //   {
        //     required: true,
        //     message: "请填写密码！",
        //     trigger: "blur"
        //   }
        // {
        //   type: "string",
        //   min: 6,
        //   message: "The password length cannot be less than 6 bits",
        //   trigger: "blur"
        // }
        // ]
      },
      registerTimer:null,
      isShowReadTimer:false,// 是否显示读秒
      registerValidateTimer: 60 // 发送验证码的读秒间隔
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("提交成功!");
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    // 发送验证码
    sendValidate() {
        if(!this.registerTimer) {
            this.isShowReadTimer = true;
            this.registerValidateTimer = 60;
            this.registerTimer = window.setInterval(()=> {
                this.registerValidateTimer--;
                if(this.registerValidateTimer<=0) {
                    window.clearInterval(this.registerTimer);
                    this.registerTimer = null;
                    this.isShowReadTimer = false;
                }
            },1000)
        }
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
</style>



