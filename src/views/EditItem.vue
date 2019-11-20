<template>
  <div class="edit-item">
    <div class="nav">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>{{isAdd ? "添加事项" : "编辑事项"}}</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="form">
      <Form ref="formValidate" :model="dataObj" :rules="rules" :label-width="80">
        <FormItem label="事项" prop="item">
          <Input v-model="dataObj.item" placeholder="请输入事项"></Input>
        </FormItem>
        <FormItem label="时间" prop="time">
          <DatePicker v-model="dataObj.time" format="yyyy-MM-dd HH:mm:ss"
                      type="datetime" placeholder="请选择时间"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button type="error" ghost @click="handleReset('formValidate')">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import {addItem, getItem, upldateItem} from "../api/api";
  import {timeFormat} from "../libs/utils";

  export default {
    name: "EditItem",
    computed: {
      isAdd () {
        return this.$route.path.indexOf("add") > -1;
      }
    },
    data () {
      return {
        dataObj: {
          item: "",
          time: ""
        },
        rules: {
          item: [
            {required: true, message: "请输入事项", trigger: "change"}
          ],
          time: [
            {required: true, type: "date", message: "请选择时间", trigger: "change"}
          ]
        }
      };
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            let {item, time} = this.dataObj;
            let reqObj = {
              item,
              time: timeFormat(time)
            };
            if (this.isAdd) {
              // 添加
              addItem(reqObj).then(res => {
                if (res.data.status === 200) {
                  this.$router.push({name: "home"});
                  this.$Message.success("添加成功！");
                }
              });
            } else {
              // 修改
              upldateItem(reqObj).then(res => {
                if (res.data.status === 200) {
                  this.$router.push({name: "home"});
                  this.$Message.success("修改成功！");
                }
              });
            }
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
    created () {
      if (!this.isAdd) {
        let id = this.$route.path.split("/").reverse()[0];
        getItem(id).then(res => {
          if (res.data.status === 200) {
            let {time, item} = res.data.data;
            this.dataObj.time = time;
            this.dataObj.item = item;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/less/common.less";

  .edit-item {
    width: @width-content;
    margin: 50px auto;

    .nav {
      margin: 20px 0;

      .ivu-breadcrumb {
        font-size: 16px;
      }
    }

    .form {
      width: 400px;
      margin: 100px auto;

      .ivu-form {
        .ivu-date-picker {
          width: 320px;
        }

        .ivu-btn {
          margin-top: 50px;
          width: 120px;
          margin-right: 20px;
        }
      }
    }
  }
</style>