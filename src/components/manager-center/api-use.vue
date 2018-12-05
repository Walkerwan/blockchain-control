<template>
  <div class="api-container">
    <div class="api-container-content">
      <div class="api-container-content-title">
        <span>管理中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">API调用</span>
      </div>
      <div class="api-container-content-bottom">
        <div class="content-bottom-left">
          <div class="content-bottom-left-title">选择调试的API</div>
          <ul class="api-name">
              <li class="api-name-item" v-for="(item, index) in allApiName" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="content-bottom-right">
            <div class="block-english-title">Query Chain Detail</div>
            <div class="block-chinese-title">查看区块链详情</div>
            <div class="tilte-bottom-line"></div>
            <div class="content-bottom-right-bottom">
                <div class="left-part-debugger">
                    <div class="left-part-debugger-title">输入参数</div>
                    <div class="left-part-debugger-url">
                        <span class="url-name">URL</span>
                        <span class="url-way">Get</span>
                    </div>
                    <div class="debugger-url-content">http://baidu.com</div>
                    <div class="user-name">Authrization</div>
                    <Input class="user-name-input"></Input>
                    <div class="id-name">请输入链的ID</div>
                    <Input class="id-name-input"></Input>
                    <div class="debugger-button">调试</div>
                </div>
                <div class="right-part-result">
                    <div class="right-part-debugger-title">调试结果</div>
                    <div class="response-result">Http Response</div>
                    <textarea class="response-result-area" name="" id="" cols="30" rows="10"></textarea>
                    <div class="right-part-status-title">Http Status</div>
                    <Input class="status-result"></Input>
                </div>
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
      allApiName: [
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        },
        {
          name: "Get API Token"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./style/api-use.less");
</style>


