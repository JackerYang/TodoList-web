<template>
  <div class="the-header">
    <div class="logo">{{ title }}</div>
  </div>
</template>

<script>
  export default {
    name: "TheHeader",
    data () {
      return {
        title: "ToDo List"
      };
    }
  };
</script>

<style lang="less" scoped>
  .the-header {
    width: 100%;
    height: 60px;
    box-shadow: 1px 1px 3px #5b4e7a;
    .logo {
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      color: blueviolet;
    }
  }
</style>
