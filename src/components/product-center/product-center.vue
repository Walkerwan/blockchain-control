<template>
  <div class="product-container">
    <div class="product-container-content">
      <div class="product-container-content-title">
        <span>产品中心</span>
        <span class="color-blue">/</span>
        <span class="color-blue">积分商城</span>
      </div>
      <div class="product-container-content-content">
        <ul class="content-content-setting">
          <li
            class="setting-item"
            v-for="(item,index) in productListData?productListData.skus:[]"
            :key="index"
          >
            <div class="setting-item-title">{{item.name}}</div>
            <div class="setting-item-content">
              <div class="setting-item-title1">{{item.title}}</div>
              <div class="setting-item-title2">{{item.summary}}</div>
              <div class="content-des">{{item.content}}</div>
              <ul class="func-list">
                <li class="func-list-item" v-for="(listItem, index) in item.contentList?item.contentList.split(','):[]" :key="index">{{(index+1) +'. '+ listItem}}</li>
              </ul>
              <div class="content-des1">{{item.attrs[0].val}}</div>
              <div class="content-des2">{{item.attrs[1].val}}</div>
              <div class="show-details"><a :href="productListData.urlPath" class="show-details-href">查看详情</a></div>
              <div class="start-charging">按销售计费</div>
              <div class="money-hour">
                <span class="money-hour-des1">{{item.priceUnit + item.price}}</span>
                <span class="money-hour-des2">元/</span>
                <span class="money-hour-des3">{{item.longTime + item.timeUnit}}</span>
              </div>
              <div class="setting-item-button">
                <span class="button" @click="skipProductSetting($event,item.id)">{{item.isFee==1? "免费体检":"购买"}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="need-ording" @click="skipOrding">我要定制</div>
        <div class="content-content-footer">
          <div class="customer-service-number">
            <div class="customer-service-number-title">客服服务号：</div>
            <div class="customer-service-number-content"></div>
          </div>
          <div class="privite-line">
            <div class="privite-line-title">专线定制：</div>
            <div class="privite-line-content">0755-88888888转1</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestInterface from "@/api/interface.js";
import CommonUtil from "@/utils/common.js"
export default {
  data() {
    return {
      productListData: null
    };
  },
  created() {
    const that = this;
    RequestInterface.getProductCenterList().then(res => {
      if (res.status == 0) {
        that.productListData =
          res.data && res.data.length > 0 ? res.data[0] : that.productListData;
      }
    });
  },
  methods: {
    skipProductSetting(e, skuId) {
      CommonUtil.preventBubble(e);
      this.$router.push({ path: "/project/content/product/setting", query: {
        skuId:skuId
      }});
    },
    // 跳转至我要定制
    skipOrding(e) {
      CommonUtil.preventBubble(e);
      this.$router.push({ path: "/project/content/product/ording" });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./style/product-center.less");
</style>

