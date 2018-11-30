<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './styles/base.less';
  #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Microsoft YaHei","宋体","Arial","黑体",sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

<style>
@import './font/style.css';
</style>


