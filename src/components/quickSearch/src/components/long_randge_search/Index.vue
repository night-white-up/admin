<!--
 * @Author: your name
 * @Date: 2021-02-08 11:21:32
 * @LastEditTime: 2021-03-03 18:38:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shemijianguan2021\src\commponents\long_randge_search\Index.vue
-->
<template>
  <div id="autocomplete">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :placeholder="placehodeer"
      @select="handleSelect"
      @clear="clearInput"
      clearable
    ></el-autocomplete>
  </div>
</template>

<script>
import Vue from "vue";
import "./src/scss/index.scss";
import Component from "vue-class-component";
// @Component({})
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
    };
  },
  props: {
    option: {
      type: Array,
      // default(){
      //     return [
      //                 { "value": "北京市", "id": "北京市" },
      //                 { "value": "天津市", "id": "天津市" },

      //          ]
      // }
    },
    placehodeer: {
      type: String,
    },
  },
  methods: {
    loadAll() {
      return this.option;
    },
    querySearchAsync(queryString, cb) {
      this.$emit("inputValue", queryString);
      let self = this;
      let time = setInterval(function() {
        if (self.option) {
          cb(self.option);
        }
        clearInterval(time);
      }, 500);
      //不做过滤 直接返回结果

      return;
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.$emit("changeValue", item);
    },
    clearInput() {
      this.$emit("inputValue", null);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>
