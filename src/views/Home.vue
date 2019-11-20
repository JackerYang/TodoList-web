<template>
  <div class="home">
    <div class="operate">
      <operate-btns :btnLists="btnLists" :selectRow="selectRow"></operate-btns>
    </div>

    <div class="data">
      <Table :columns="columns" ref="table" :row-class-name="rowSetColor" border :data="dataList"
             @on-row-click="rowClick"
             @on-selection-change="selectRow = $event">
        <template slot-scope="{ row }" slot="todo">
          <Icon v-if="row.state !== 1" class="finish" title="完成事项： 置为已完成" @click.stop="finish(row.id)"
                type="md-checkmark-circle-outline"/>
          <Icon v-if="row.state !== 2" class="cancel" title="取消事项： 置为已取消" @click.stop="cancel(row.id)" type="md-close"/>
          <Icon v-if="row.state !== 0" class="revert" title="还原事项： 置为未完成" @click.stop="revert(row.id)" type="ios-undo"/>
        </template>
      </Table>
    </div>

  </div>
</template>

<script>
  import OperateBtns from "../components/OperateBtns";
  import {getItemList, upldateItem, delItems} from "../api/api";

  export default {
    name: "Home",
    components: {
      OperateBtns
    },
    data () {
      return {
        // 操作按钮
        btnLists: [
          {
            label: "添加",
            icon: "md-add",
            type: "default",
            ghost: false,
            disabled: 0,
            fn: this.add
          },
          {
            label: "编辑",
            icon: "md-create",
            type: "default",
            ghost: false,
            disabled: 1,
            fn: this.edit
          },
          {
            label: "删除",
            icon: "ios-trash",
            type: "error",
            ghost: true,
            disabled: 2,
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
            width: 100,
            filters: [
              {
                label: "已完成",
                value: 1
              },
              {
                label: "未完成",
                value: 0
              },
              {
                label: "已取消",
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              return row.state === value;
            }
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
            width: 100
          }
        ],
        // 表格行数据
        dataList: [],

        stateObj: {
          0: "未完成",
          1: "已完成",
          2: "已取消"
        },

        // 选中的行
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

      // 点击行事件
      rowClick (data, index) {
        this.$refs.table.toggleSelect(index);
      },

      // 添加
      add () {
        this.$router.push({name: "add-item"});
      },
      // 编辑
      edit (sR) {
        this.$router.push({
          name: "edit-item",
          params: {
            id: sR[0].id
          }
        });
      },
      // 删除
      del (sR) {
        let ids = sR.map(i => i.id);
        delItems(ids).then(res => {
          if (res.data.status === 200) {
            this.getData();
            this.selectRow = [];
            this.$Message.success("删除成功！");
          }
        });
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
      },

      // 不同行设置不同颜色
      rowSetColor (row) {
        if (row.state === 0) {
          // 未完成
          return "row-undone";
        } else if (row.state === 1) {
          // 已完成
          return "row-finish";
        } else if (row.state === 2) {
          // 已取消
          return "row-cancel";
        }
      }
    },
    created () {
      this.getData();
    }
  };
</script>

<style lang="less">
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
        .ivu-table-body {
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

          .row-finish {
            td {
              color: #c5c8ce;
            }
          }

          .row-undone {
            td {
              color: #17233d;
            }
          }

          .row-cancel {
            td {
              color: #c5c8ce;
              text-decoration: line-through;
            }
          }
        }

      }
    }
  }
</style>