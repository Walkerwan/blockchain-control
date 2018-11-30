<template>
  <div class="find-password-container">
    <div class="find-password--content">
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
            <input
              type="text"
              class="input-item"
              v-model="formInline.telephone"
              placeholder="请输入手机号"
            >
          </FormItem>
          <FormItem prop="validatenum" class="form-item">
            <input type="text" class="input-item validate-num" v-model="formInline.validatenum">
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
export default {
  data() {
    return {
      formInline: {
        telephone: "",
        validatenum: ""
      },
      ruleInline: {},
      passwordTimer: null,
      isShowReadTimer: false, // 是否显示读秒
      passwordValidateTimer: 60 // 发送验证码的读秒间隔
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            this.$router.push({path: '/project/passwordreset'});
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
     // 发送验证码
    sendValidate() {
        if(!this.passwordTimer) {
            this.isShowReadTimer = true;
            this.passwordValidateTimer = 60;
            this.passwordTimer = window.setInterval(()=> {
                this.passwordValidateTimer--;
                if(this.passwordValidateTimer<=0) {
                    window.clearInterval(this.passwordTimer);
                    this.passwordTimer = null;
                    this.isShowReadTimer = false;
                }
            },1000)
        }
    },
  }
};
</script>

<style lang="less" scoped>
@import url("./styles/project-password-back.less");
</style>


