<!--
 * @Author: your name
 * @Date: 2022-05-02 17:25:37
 * @LastEditTime: 2023-04-16 22:27:09
 * @LastEditors: chenjieweb 1030884759@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \admin\src\page\MovieType\Movietype.vue
-->
<template>
  <div id="useradmin">
    <el-button type="primary" @click="addmovetype">新增</el-button>
    <div id="movetype-table" class="movetype-type" ref="useradmin"></div>
    <div ref="useradmindialog"></div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import "./src/scss/user.scss";
import TableList from "@/components/tableList/index.js";
import Dialog from "@/components/dialog/Index.js";
import {
  getSysUserByPage,
  insertSysUser,
  updateSysUser,
  delSysUser,
} from "@/api/index.js";
@Component({})
export default class movieType extends Vue {
  constructor() {
    super();
    this.poupObj = null;
  }
  mounted() {
    this.poupObj = new Dialog(this.$refs.useradmindialog); //创建弹框对象
    this.rendertablelist();
  }
  addmovetype() {
    let _this = this;
    this.poupObj.init({
      title: "增加",
      labelWidth: "70px",
      width: "400px",
      body: [
        {
          name: "账号",
          placeholder: ``,
          type: "input",
          fromName: "account",
          value: "",
        },
        {
          name: "密码",
          placeholder: ``,
          type: "input",
          fromName: "password",
          value: "",
        },
      ],
      placeholder: null,
      submit: (e) => {
        insertSysUser({ account: e.account, password: e.password }).then(
          (res) => {
            if (res.code == "0000") {
              _this.rendertablelist();
            } else {
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }
            console.log("保存", res);
          }
        );
      },
      //  rules:self.Pouprules,
    });
  }
  showdetail(val) {
    this.poupObj.init({
      title: "详情",
      labelWidth: "70px",
      width: "400px",
      body: [
        {
          name: "账号",
          placeholder: ``,
          type: "input",
          disabled: true,
          fromName: "account",
          value: val.account,
        },
        //   {
        //     name: "创建时间",
        //     placeholder: ``,
        //     type: "input",
        //     fromName: "createTime",
        //     disabled:true,
        //     value:val.createTime,
        // },
        {
          name: "密码",
          placeholder: ``,
          type: "input",
          fromName: "password",
          disabled: true,
          value: val.password,
        },
      ],
      placeholder: null,
      submit: (e) => {
        console.log("保存", e);
      },
      //  rules:self.Pouprules,
    });
  }
  /**
   * @Descripttion: 编辑
   * @Author:
   * @Date: 2022-05-03 16:37:35
   * @LastEditors:
   * @param {*} val
   * @return {*}
   */
  edit(val) {
    let _this = this;
    this.poupObj.init({
      title: "编辑",
      labelWidth: "70px",
      width: "400px",
      body: [
        {
          name: "账号",
          placeholder: ``,
          type: "input",

          fromName: "account",

          value: val.account,
        },
        //    {
        //         name: "创建时间",
        //         placeholder: ``,
        //         type: "input",
        //         fromName: "createTime",

        //         value:val.createTime,
        //     },
        {
          name: "密码",
          placeholder: ``,
          type: "input",
          fromName: "password",

          value: val.password,
        },
      ],
      placeholder: null,
      submit: (e) => {
        updateSysUser({
          id: val.id,
          account: e.account,
          password: e.password,
        }).then((res) => {
          if (res.code == "0000") {
            _this.rendertablelist();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
        console.log("保存", e);
      },
      //  rules:self.Pouprules,
    });
  }
  delete(val) {
    let _this = this;
    this.$confirm("是否删除?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        delSysUser({ id: val.id }).then((res) => {
          _this.rendertablelist();
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
  /**
   * @Descripttion:渲染表格
   * @Author:
   * @Date: 2022-05-03 16:31:03
   * @LastEditors:
   * @param {*}
   * @return {*}
   */
  rendertablelist() {
    let _this = this;
    let tabledata = [
      {
        readNmae: "",
        date: "2016-05-02",
        account: "王小虎",
        password: 212121,
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        account: "王小虎",
        password: 212121,
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        account: "王小虎",
        password: 212121,
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        account: "王小虎",
        password: 212121,
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ];
    new TableList(this.$refs.useradmin).initTable({
      total: 30,
      isShowSelection: false,
      isShowNumber: false,
      align: "left",
      pageShow: false,
      page: {
        size: 10,
        sizes: [10, 20, 50, 100],
        current: 1,
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
      },
      tableData: tabledata,
      condition: [
        {
          prop: "account",
          label: "账号",
        },
        {
          prop: "password",
          label: "密码",
        },
        {
          type: "operation",
          label: "操作",
          prop: [
            {
              name: "查看",
              handleClick: (val) => {
                _this.showdetail(val);
              },
              size: "small",
            },
            {
              name: "编辑",
              handleClick: (val) => {
                _this.edit(val);
              },
              size: "small",
            },
            {
              name: "删除",
              type: "danger",
              handleClick: (val) => {
                _this.delete(val);
              },
              size: "small",
            },
          ],
        },
      ],
    });
  }
}
</script>

<style lang="scss" scoped>
</style>