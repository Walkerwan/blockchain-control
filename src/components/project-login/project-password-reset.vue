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
            <input
              type="password"
              class="input-item"
              v-model="formInline.password"
              placeholder="请设置登录新密码"
            >
          </FormItem>
          <FormItem prop="passwordagain" class="form-item">
            <input
              type="password"
              class="input-item"
              v-model="formInline.passwordagain"
              placeholder="再次输入登录新密码"
            >
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
export default {
  data() {
    return {
      formInline: {
        password: "",
        passwordagain: ""
      },
      ruleInline: {}
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
        //   this.$router.push({ path: "/project/passwordreset" });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./styles/project-password-reset.less");
</style>


