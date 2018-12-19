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
            :label-width="80"
          >
            <FormItem label="名称：" prop="username" class="form-item">
              <Input class="input-item" v-model="formInline.username"></Input>
            </FormItem>
            <FormItem :label="item.attrName+':'" class="form-item" v-for="(item,index) in settingData" :key="index">
              <div class="text-show">{{item.attrVals[0].attrVal}}</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import LoginTool from "@/components/project-login/utils/login-tool.js";
import RequestInterface from "@/api/interface.js";

export default {
  data() {
    return {
      formInline: {
        username: "",
        algorithm: ""
      },
      ruleInline: {
        username:[
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ]
      },
      settingData: []
    };
  },
  created() {
    const that =this;
    const skuId = this.$route.query.skuId;
    if(!skuId) {
      return
    }
    RequestInterface.getSettingList({
      skuId: skuId
    }).then(res => {
      if(res.status == 0) {
        if(res.data) {
          that.settingData = res.data;
        }
        return;
      }
    })
  },
  methods: {
    handleSubmit(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          RequestInterface.createOrding({
            skuId: that.$route.query.skuId,
            name: that.formInline.username,
          }).then(res => {
            if(res.status == 0) {
              that.$router.push({ path: "/project/content/order" });
              return;
            }
            if(res.status == -1) {
              that.$Message.error(res.message);
              return;
            }
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    skipProductCenter(){
      this.$router.push({ path: "/project/content/product" });
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
#content-center-form .form-item .ivu-input {
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



