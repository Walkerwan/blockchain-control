<template>
  <div class="product-setting-container">
    <div class="product-setting-container-content">
      <div class="product-setting-content-title">
        <span>产品中心</span>
        <span>/</span>
        <span>积分通兑</span>
        <span class="color-blue">/</span>
        <span class="color-blue">配置表</span>
      </div>
      <div class="product-setting-content-content">
        <div class="content-content-center">
          <div class="content-content-center-title">请填写配置基础信息</div>
          <Form
            class="content-center-form"
            id="content-center-form"
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            inline
            :label-width="60"
          >
            <FormItem label="名称：" class="form-item">
              <input v-model="formInline.username">
            </FormItem>
            <FormItem label="算法：" class="form-item">
              <input v-model="formInline.algorithm">
            </FormItem>
            <FormItem label="配置：" class="form-item form-item-setting">
                <textarea class="setting-text" name="" id="" cols="60" rows="5">基础配置:
                    FABRIC1.2  2核CPU 4G内存 50G系统盘
                    1个CA节点，1个orderer节点，1个peer节点
                </textarea>
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
        algorithm: ""
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
@import url("./style/product-setting.less");
</style>

<style>
#content-center-form .ivu-form-item-label {
  font-size: 16px !important;
}
</style>



