<template>
  <div class="main">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheHeader from "../components/TheHeader.vue";

  export default {
    name: "Main",
    components: {
      TheHeader
    }
  };
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
  }
</style>
