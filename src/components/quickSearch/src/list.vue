<template>
  <div class="form-box" id="qeury-search">
    <el-form
      :inline="true"
      v-if="defultDataFrom"
      :model="formInline"
      class="el-list-query"
      :label-width="formInline.labelWth"
      ref="formInline"
    >
      <el-form-item
        v-for="(item, index) in defultDataFrom"
        :key="index"
        :label="item.itemName"
      >
        <!-- collapsetags 属性将它们合并为一段文字 multiple 属性即可启用多选 -->
        <el-select
          v-if="item.type == 'select' && item.show != false"
          v-model="formInline.paramList[item.model]"
          :size="item.size == undefined ? 'small' : item.size"
          :placeholder="item.placeholder"
          :prop="formInline.paramList[item.model]"
          :value="formInline.paramList[item.model]"
          clearable
          :multiple="item.multiple ? true : false"
          :collapse-tags="item.collapsetags ? true : false"
        >
          <!-- <el-option :label="item.placeholder" value></el-option> -->
          <el-option
            v-for="subItem in defultDate[item.model]"
            :key="subItem.countyId"
            :label="subItem.label"
            :value="subItem.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="item.type == 'input' && item.show != false"
          v-model="formInline.paramList[item.model]"
          :size="item.size == undefined ? 'small' : item.size"
          :placeholder="item.placeholder"
          :prop="formInline.paramList[item.model]"
          clearable
        ></el-input>
        <!-- 文本 -->
        <el-input
          type="textarea"
          v-model="formInline.paramList[item.model]"
          v-if="item.type == 'texterea' && item.show != false"
          :size="item.size == undefined ? 'medium ' : item.size"
          :placeholder="item.placeholder"
          :prop="formInline.paramList[item.model]"
        ></el-input>
        <el-date-picker
          v-if="item.type == 'date' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="date"
          format="yyyy-MM-dd"
          :placeholder="item.placeholder"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'month' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="month"
          placeholder="选择月"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'year' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="year"
          placeholder="选择年"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'year' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="year"
          placeholder="选择年"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'week' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-else-if="item.type == 'date-monthrange'"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="monthrange"
          unlink-panels
          align="right"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :style="item.style == undefined ? 'width: 100%' : item.style"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'date-picker' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          unlink-panels
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-date-picker
          v-if="item.type == 'datetime' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          type="datetime"
          placeholder="选择日期时间"
          :prop="formInline.paramList[item.model]"
        ></el-date-picker>
        <el-autocomplete
          v-if="item.type == 'autocomplete' && item.show != false"
          :size="item.size == undefined ? 'small' : item.size"
          v-model="formInline.paramList[item.model]"
          :fetch-suggestions="
            (queryString, cb) => {
              item.calback(queryString, cb);
            }
          "
          :placeholder="item.placeholder"
          :trigger-on-focus="item.attr == undefined ? true : item.attr"
          @select="
            (value) => {
              formInline.paramList[item.model] = value.value;
            }
          "
          @clear="formInline.paramList[item.model] = null"
          clearable
          :prop="formInline.paramList[item.model]"
        >
          <!-- <template slot-scope="{ item }">
						<div>{{ item.value }}</div>
						
					</template> -->
        </el-autocomplete>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item class="queryfooter">
        <el-button
          type="primary"
          @click="onSubmit"
          v-if="formInline.show != 'rename'"
          :size="formInline.hasOwnProperty('size') ? formInline.size : 'medium'"
          >查 询</el-button
        >
        <el-button
          type="primary"
          @click="onSubmit"
          v-else
          :size="formInline.hasOwnProperty('size') ? formInline.size : 'medium'"
          >{{ formInline.name }}</el-button
        >
        <template v-for="(item, index) in formInline.btn">
          <el-button
            :key="index"
            v-if="item.type == 'reset'"
            @click="resetForm(item.click)"
            :disabled="item.disabled"
            :size="item.hasOwnProperty('size') ? item.size : 'medium'"
            type="primary"
            >{{ item.name }}</el-button
          >
          <el-button
            :key="index"
            v-else
            @click="item.click"
            :disabled="item.disabled"
            :size="item.hasOwnProperty('size') ? item.size : 'medium'"
            >{{ item.name }}</el-button
          >
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mo from "moment";
import "./index.scss";
export default {
  name: "listQuery",
  data() {
    return {
      // 快捷选中时间条件
      pickerOptions: {
        shortcuts: [],
      },
      // 需要提交的数据
      formInline: {
        // 第几页数据
        pageNum: 1,
        pageSize: 100,
        labelWth: "120px",
        btn: [
          {
            name: "重置",
            type: "reset",
            click: function(val) {},
          },
        ],
        // 查询条件
        paramList: {},
      },
      // 默认数据
      defultDate: {
        countyName: null,
        groupName: null,
        status: null,
        branch: null,
        gridId: null,
        branchOfficeName: null,
        gridName: null,
      },
      submit: null,
      timeItem: null,
      defultDataFrom: "",
      // 放置重复点击
      bindClick: true,
      alluser: null,
      /**
       * option
       */
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  created() {
    this.setFormInline();
    this.initCreated();
  },
  destroyed() {
    this.$Storage.removeItem("queryFrom");
  },
  watch: {
    defultDataFrom() {
      this.initCreated();
    },
  },
  methods: {
    init() {
      let self = this;
      // self.onSubmit();
      self.initCreated();
    },
    querySearch(queryString, cb) {
      let self = this;
      let restaurants = self.$app.users;
      let results = queryString
        ? restaurants.filter(self.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 设置查询条件
    setFormInline() {
      let self = this;
      let par = {};
      let operate = {};
      self.timeItem = null;
      for (let li in self.defultDataFrom) {
        let fromData = self.defultDataFrom[li];

        par[fromData.model] = fromData.value; //回填
        operate[fromData.model] = fromData.operate;
        self.defultDate[fromData.model] = fromData.option;
        if (
          fromData.type.indexOf("date-") > -1 ||
          fromData.type.indexOf("DATE-") > -1
        ) {
          self.timeItem = self.timeItem + fromData.model + ",";
        }
      }
      self.formInline.paramList = par;
      self.formInline.operate = operate;
      setTimeout(() => {
        self.onSubmit();
      });
    },
    initCreated() {
      let self = this;
      self.setTime();
    },

    /**
     * 格式下拉数据
     *  config
     *        name 替换的参数名称
     *        value 替换的参数名称
     *        data 替换的数据
     */
    upDataSelect(config) {
      let obj = {
        name: "",
        value: "",
        data: "",
      };
      let json = Object.assign({}, obj, config);

      let counArr = [];
      for (let item in json.data) {
        let county = json.data[item];
        counArr.push({
          label: county[json.name],
          value: county[json.value],
        });
      }
      return counArr;
    },
    /**
     * 提交数据查询
     */
    onSubmit() {
      let self = this;
      let time;
      let cardingTime = {
        start: "",
        end: "",
      };
      let json = {};
      let types = "";

      for (let li in self.defultDataFrom) {
        let fromData = self.defultDataFrom[li];
        if (
          self.textIndexOf(fromData.type, "date-") ||
          self.textIndexOf(fromData.type, "DATE-")
        ) {
          time = self.formInline.paramList[fromData.model];

          if (self.textIndexOf(fromData.type, "monthrange")) {
            types = {
              name: fromData.type,
              time: time,
            };
          }
        }
      }

      if (time) {
        if (self.textIndexOf(types.name, "monthrange")) {
          cardingTime = {
            start: mo(types.time[0]).format("YYYY-MM"),
            end: mo(types.time[1]).format("YYYY-MM"),
          };
        } else {
          cardingTime = {
            start: mo(time[0]).format("YYYY-MM-DD 00:00:00"),
            end: mo(time[1]).format("YYYY-MM-DD HH:ss:mm"),
          };
        }
      }

      // 处理时间格式
      // 如果默认设置时间为空时，添加今日时间作为查询时间
      // if (time) {
      // 	cardingTime = {
      // 		start: mo(time[0]).format("YYYY-MM-DD 00:00:00"),
      // 		end: mo(time[1]).format("YYYY-MM-DD HH:ss:mm")
      // 	};
      // } else {
      // 	cardingTime = {
      // 		start: mo(new Date()).format("YYYY-MM-DD 00:00:00"),
      // 		end: mo(new Date()).format("YYYY-MM-DD HH:ss:mm")
      // 	};
      // }

      // // 向list页面提交时间区间 便于list页面实时展示
      // self.$store.commit("setCardingTime", cardingTime);
      // self.$store.commit("setQueryFrom", self.formInline);
      // // 从list页面获取一页显示多少条，作为查询条件
      // self.formInline.pageSize = self.$store.state.reg.currentSizes;
      // // 从list页面获取当前第几页，作为查询条件
      // self.formInline.pageNum = self.$store.state.reg.currentPage;
      // 处理请求格式
      for (let f in self.formInline) {
        let from = self.formInline;
        let arr = [];
        if (f != "operate") {
          json[f] = from[f];
        }
        if (from.paramList) {
          for (let li in from.paramList) {
            let list = from.paramList[li];

            let iMath = 0;
            if (!self.timeItem) {
              arr.push({
                key: li,
                value: list,
                operate: from.operate[li],
              });
            } else {
              if (self.timeItem.indexOf(li) != -1) {
                arr.push({
                  key: li.split(",")[0],
                  value: cardingTime.start,
                  operate: from.operate[li].split(",")[0],
                });
                arr.push({
                  key: li.split(",")[1]
                    ? li.split(",")[1]
                    : li.split(",")[0] + "1",
                  value: cardingTime.end,
                  operate: from.operate[li].split(",")[1]
                    ? from.operate[li].split(",")[1]
                    : from.operate[li].split(",")[1] + "1",
                });
              } else {
                arr.push({
                  key: li,
                  value: list,
                  operate: from.operate[li],
                });
              }
            }
          }

          json.paramList = arr;
        }
      }
      if (json.paramList != "" && self.bindClick) {
        // 从父级页面获取操作数据方法
        self.submit(json);
        self.bindClick = false;
      } else {
        self.submit(json);
      }
      setTimeout((e) => {
        self.bindClick = true;
      }, 100);
    },
    textIndexOf(item, text) {
      if (item && text) {
        return item.indexOf(text) != -1;
      }
    },
    //设置区间时
    setTime() {
      let self = this;
      let mon = [];
      let YYYY = mo().format("YYYY");
      let MM = mo().format("MM");
      let DD = mo().format("DD");
      for (let i = 1; i <= 12; i++) {
        mon.push(i);
      }
      self.pickerOptions.shortcuts = [
        {
          text: "今天",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
      ];

      self.pickerOptions.shortcuts.push(
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = mo(
              new Date(YYYY + "-" + (+MM - 1 < 1 ? 12 : +MM - 1) + "-" + DD)
            ).format();
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            let moth = MM - 3;
            if (moth < 0) {
              moth = mon[mon.length - mon];
            }
            const end = new Date();
            const start = mo(
              new Date(YYYY + "-" + (moth === 0 ? 1 : moth) + "-" + DD)
            ).format();
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近半年",
          onClick(picker) {
            let moth = MM - 6;
            if (moth < 0) {
              moth = mon[mon.length - mon];
            }
            moth = moth === 0 ? 1 : moth;
            const end = new Date();
            const start = mo(new Date(YYYY + "-" + moth + "-" + DD)).format();
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一年",
          onClick(picker) {
            const end = mo().format();
            const start = mo(new Date(YYYY - 1 + "-" + MM + "-" + DD)).format();
            picker.$emit("pick", [start, end]);
          },
        }
      );
    },
    resetForm(clickObj) {
      let paramList = this.formInline.paramList;
      for (const key in paramList) {
        if (Object.hasOwnProperty.call(paramList, key)) {
          paramList[key] = null;
        }
      }
      clickObj ? clickObj() : null;
      this.submit(paramList);
      this.$refs.formInline.resetFields();
    },
  },
};
</script>
