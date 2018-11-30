<template>
  <div class="tree-item-wrapper-walker">
    <div v-for="(item, index) in treeData" :key="randomKey(index)">
      <div class="tree-item" :style="levelStyle(item)" @click="skipRouter(item)">
        <span v-if="item.hierarchy===1&&item.name === '首页'?true:false" class="home-page"></span>
        <span v-if="item.hierarchy===1&&item.name === '个人中心'?true:false" class="personal"></span>
        <span v-if="item.hierarchy===1&&item.name === '产品中心'?true:false" class="product-center"></span>
        <span v-if="item.hierarchy===1&&item.name === '管理中心'?true:false" class="manage-center"></span>
        <span v-if="item.hierarchy===1&&item.name === '订单中心'?true:false" class="order-center"></span>
        <span v-if="item.hierarchy===1&&item.name === '发票中心'?true:false" class="invoice-center"></span>
        <span
          class="item-text"
          :title="itemText(item)"
          @click="arrowClicked(index)"
        >{{itemText(item)}}</span>
        <span
          v-if="hasChildren(item)"
          class="icon-mulu"
          :class="item.expanded?'tree-arrow-up':'tree-arrow-left'"
          @click="arrowClicked(index)"
        ></span>
      </div>
      <tree-item
        v-if="hasChildren(item)&&item.expanded"
        :treeData="cloneChildren(item)"
        :parentData="item"
      ></tree-item>
    </div>
  </div>
</template>

<script>
import TreeItem from "./tree-item.vue";
export default {
  name: "TreeItem",
  props: {
    treeData: Array,
    parentData: Object
  },
  methods: {
    levelStyle(item) {
      return {
        paddingLeft: 3 + item.hierarchy * 35 + "px"
      };
    },

    arrowClicked(index) {
      this.$set(
        this.treeData[index],
        "expanded",
        !this.treeData[index]["expanded"]
      );
    },

    randomKey(index) {
      return new Date().getTime() + index + 100000 * Math.random(0, 1);
    },

    hasChildren(item) {
      return item.children && item.children.length > 0;
    },
    itemText(item) {
      return item.name;
    },
    cloneChildren(item) {
      return item.children;
    },
    // 跳转对应路由
    skipRouter(item) {
      if(!item.url) {
        return;
      }
      this.$router.push({ path: item.url });
    }
  }
};
</script>
<style lang="less" scoped>
.tree-item-wrapper-walker {
  .tree-item {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    font-size: 16px;
    color: #fff;
    border-top: 1px solid #434e5b;
    border-bottom: 1px solid #434e5b;
    cursor: pointer;
    .tree-arrow-up {
      position: absolute;
      width: 12px;
      height: 12px;
      right: 20px;
      top: 26px;
      background: url("./assets/arrow-up.svg");
      background-repeat: no-repeat;
      background-position: center center;
    }
    .tree-arrow-left {
      position: absolute;
      width: 12px;
      height: 12px;
      right: 20px;
      top: 24px;
      background: url("./assets/arrow-left.svg");
      background-repeat: no-repeat;
      background-position: center center;
    }
    .home-page {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/home-page.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    .personal {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/personal.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    .product-center {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/product-center.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    .manage-center {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/manage-center.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    .order-center {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/order-center.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    .invoice-center {
        display: inline-block;
        width: 25px;
        height: 21px;
        background: url("./assets/invoice-center.png");
        background-repeat: no-repeat;
        position: relative;
        margin-right: 10px;
        top: 4px;
    }
    &:hover {
      background-color: #2b3541;
    }
  }
}
</style>


