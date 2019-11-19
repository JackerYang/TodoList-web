<template>
  <div class="home">
    <div class="operate">
      <Button v-for="btn in btnLists"
              :key="btn.label"
              shape="circle"
              :type="btn.type"
              :ghost="btn.ghost"
              :icon="btn.icon"
              :disable="btn.disable"
              @click="btn.fn">
        {{btn.label}}
      </Button>
    </div>

    <div class="data">
      <Table :columns="columns" border :data="dataList" @on-select="selectRow = $event">
        <template slot-scope="{ row }" slot="todo">
          <Icon v-if="row.state !== 1" class="finish" title="完成事项： 置为已完成" @click="finish(row.id)"
                type="md-checkmark-circle-outline"/>
          <Icon v-if="row.state !== 2" class="cancel" title="取消事项： 置为已取消" @click="cancel(row.id)" type="md-close"/>
          <Icon v-if="row.state !== 0" class="revert" title="还原事项： 置为未完成" @click="revert(row.id)" type="ios-undo"/>
        </template>
      </Table>
    </div>

  </div>
</template>

<script>
  import {getItemList, upldateItem, delItems} from "../api/api";

  export default {
    name: "Home",
    data () {
      return {
        // 操作按钮
        btnLists: [
          {
            label: "添加",
            icon: "md-add",
            type: "default",
            ghost: false,
            fn: this.add
          },
          {
            label: "编辑",
            icon: "md-create",
            type: "default",
            ghost: false,
            fn: this.edit
          },
          {
            label: "删除",
            icon: "ios-trash",
            type: "error",
            ghost: true,
            fn: this.del
          }
        ],

        // 表格列数据
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "状态",
            key: "_state",
            align: "center",
            width: 80
          },
          {
            title: "事项",
            key: "item",
            align: "center"
          },
          {
            title: "时间",
            key: "time",
            align: "center",
            width: 175
          },
          {
            title: "操作",
            slot: "todo",
            align: "center",
            width: 175
          }
        ],
        // 表格行数据
        dataList: [],

        stateObj: {
          0: "未完成",
          1: "已完成",
          2: "已取消"
        },

        selectRow: []
      };
    },
    methods: {
      // 获取数据
      getData () {
        getItemList().then(res => {
          if (res.data.status === 200) {
            this.dataList = res.data.data.map(item => {
              item._state = this.stateObj[item.state];
              return item;
            });
          }
        });
      },

      // 添加
      add () {
        this.$router.push({name: "add-item"});
      },
      // 编辑
      edit (id) {
        if(this.selectRow.length === 1) {
          this.$router.push({
            name: "edit-item",
            params: {
              id: this.selectRow[0].id
            }
          });
        } else {
          this.$Message.warning("请选中一项！")
        }
      },
      // 删除
      del () {
        if(this.selectRow.length > 0) {
          let ids = this.selectRow.map(item => item.id)
          delItems(ids).then(res => {
            if (res.data.status === 200) {
              this.getData()
              this.$Message.success("删除成功！")
            }
          })
        } else {
          this.$Message.warning("请至少选中一项！")
        }
      },

      // 更新事项状态
      updateState (id, state) {
        upldateItem({id, state}).then(res => {
          if (res.data.status === 200) {
            this.getData();
            this.$Message.success("更新成功！");
          }
        });
      },
      // 完成事项
      finish (id) {
        this.updateState(id, 1);
      },
      // 取消事项
      cancel (id) {
        this.updateState(id, 2);
      },
      // 还原事项
      revert (id) {
        this.updateState(id, 0);
      }
    },
    created () {
      this.getData();
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/less/common.less";

  .home {
    width: @width-content;
    margin: 50px auto;

    .operate {
      width: 100%;
      margin: 20px 0;

      .ivu-btn {
        margin-right: 10px;
      }
    }

    .data {
      width: 100%;

      .ivu-table-wrapper {
        .ivu-icon {
          font-size: 22px;
          margin: 0 3px;
          cursor: pointer;
        }

        .finish {
          color: @color-success;
        }

        .cancel {
          color: @color-error;
        }

        .revert {
          color: @color-warning;
        }
      }
    }
  }
</style>