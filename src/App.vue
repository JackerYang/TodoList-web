<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style lang="less">
  @import "~view-design/src/styles/index.less";
  @import "./assets/less/reset.less";
</style>
