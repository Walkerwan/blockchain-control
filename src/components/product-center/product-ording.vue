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
              :rules="ruleInline"
              inline
              :label-width="120"
            >
              <FormItem label="行业类型：" prop="userType" class="form-item">
                <Input class="input-item" v-model="formInline.userType"></Input>
              </FormItem>
              <FormItem label="制定需求：" class="form-item form-item-setting">
                <textarea class="setting-text" cols="60" rows="5" v-model="formInline.textContent"></textarea>
              </FormItem>
              <FormItem label="联系电话：" prop="telenum" class="form-item">
                <Input class="input-item" v-model="formInline.telenum"></Input>
              </FormItem>
              <FormItem class="form-item">
                <div class="form-operate">
                  <Button class="form-button" @click="skipProductCenter">返回</Button>
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
import LoginTool from "@/components/project-login/utils/login-tool.js";
import RequestInterface from "@/api/interface.js";

export default {
  data() {
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
        userType: "",
        textContent:"",
        telenum: ""
      },
      ruleInline: {
        userType: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        telenum:[
          {
            validator: telValidate,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交定制
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          RequestInterface.productOrding({
            industryType: that.formInline.userType,
            costomDemand: that.formInline.textContent,
            mobileNumber: that.formInline.telenum,
          }).then(res => {
            if(res.status == 0) {
              that.$Message.success("定制成功");
              that.$router.push({ path: "/project/content/product" });
              return;
            }
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //返回产品中心
    skipProductCenter() {
      this.$router.push({ path: "/project/content/product" });
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
#left-part-left-form .form-item .ivu-input {
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
</style>

