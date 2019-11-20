<template>
  <div class="opera-btns">
    <Button v-for="btn in btnLists"
            :key="btn.label"
            shape="circle"
            :type="btn.type"
            :ghost="btn.ghost"
            :icon="btn.icon"
            :disabled="btn.disabled ? btn.disabled === 1 ? selectRow.length !== 1 : selectRow.length === 0 : false"
            @click="btn.fn(selectRow)">
      {{btn.label}}
    </Button>
  </div>
</template>

<script>
  export default {
    name: "OperatBtns",
    props: {
      btnLists: {
        type: Array,
        required: true
      },
      selectRow: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="less" scoped>
  .opera-btns {
    width: 100%;
  }
</style>