<template>
  <div class="ording-container">
    <div class="ording-container-content">
      <div class="ording-container-content-title">
        <span>产品中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">我要定制</span>
      </div>
      <div class="ording-container-content-bottom">
        <div class="bottom-left-part">
          <div class="left-part-left"></div>
          <div class="left-part-center">
            <div class="left-part-center-title">我要定制</div>
            <Form
              class="left-part-left-form"
              id="left-part-left-form"
              ref="formInline"
              :model="formInline"
              inline
              :label-width="100"
            >
              <FormItem label="行业类型：" class="form-item">
                <input v-model="formInline.username">
              </FormItem>
              <FormItem label="制定需求：" class="form-item form-item-setting">
                <textarea class="setting-text" cols="60" rows="5"></textarea>
              </FormItem>
              <FormItem label="联系电话：" class="form-item">
                <input v-model="formInline.telenum">
              </FormItem>
              <FormItem class="form-item">
                <div class="form-operate">
                  <Button class="form-button">返回</Button>
                  <Button
                    class="form-button"
                    type="primary"
                    @click="handleSubmit('formInline')"
                    style="margin-left: 8px"
                  >提交</Button>
                </div>
              </FormItem>
            </Form>
          </div>
          <div class="left-part-right"></div>
        </div>
        <div class="bottom-right-part">
          <div class="privite-line">
            <div class="privite-line-title">专线定制：</div>
            <div class="privite-line-content">0755-88888888转1</div>
          </div>
          <div class="customer-service-number">
            <div class="customer-service-number-title">客服服务号：</div>
            <div class="customer-service-number-content"></div>
          </div>
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
        username: "",
        telenum: ""
      },
      ruleInline: {
        // user: [
        //   {
        //     required: true,
        //     message: "Please fill in the user name",
        //     trigger: "blur"
        //   }
        // ],
        // password: [
        //   {
        //     required: true,
        //     message: "Please fill in the password.",
        //     trigger: "blur"
        //   },
        //   {
        //     type: "string",
        //     min: 6,
        //     message: "The password length cannot be less than 6 bits",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./style/product-ording.less");
</style>

<style>
#left-part-left-form .ivu-form-item-label {
  font-size: 16px !important;
}
</style>

