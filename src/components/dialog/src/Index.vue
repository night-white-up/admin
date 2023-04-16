<template>
  <el-dialog
    id="dialog-form"
    :title="title"
    :distinguishCancelAndClose="false"
    :visible.sync="dialogVisible"
    :closeOnClickModal="closeOnClickModal"
    :width="width ? width : '30%'"
    :before-close="handleClose"
  >
    <el-form
      ref="dialogFrom"
      :model="fromData"
      :label-width="labelWidth"
      :rules="rules"
      :style="style"
      :class="className"
    >
      <el-form-item
        v-for="(item, index) in body"
        :label="item.name"
        :key="index"
        :prop="item.fromName"
        :required="item.required"
        :title="
          fromData[item.fromName] instanceof Array
            ? null
            : fromData[item.fromName]
        "
      >
        <el-input
          v-if="item.type == 'input'"
          :placeholder="item.placeholder"
          :type="item.type"
          v-model="fromData[item.fromName]"
          :size="item.size == undefined ? 'mini' : item.size"
          :style="item.style == undefined ? 'width: 100%' : item.style"
          :class="item.class == undefined ? '' : item.class"
          :disabled="item.disabled === true ? true : false"
        >
        </el-input>
        <el-input
          v-if="item.type == 'textarea'"
          :placeholder="item.placeholder"
          :type="item.type"
          v-model="fromData[item.fromName]"
          :rows="item.rows === undefined ? 5 : item.rows"
          :size="item.size == undefined ? 'mini' : item.size"
          :style="item.style == undefined ? 'width: 100%' : item.style"
          :class="item.class == undefined ? '' : item.class"
          :disabled="item.disabled === true ? true : false"
        >
        </el-input>
        <el-select
          v-if="item.type == 'select'"
          v-model="fromData[item.fromName]"
          :placeholder="item.placeholder"
          :class="item.class == undefined ? '' : item.class"
          :disabled="item.disabled === true ? true : false"
          @change="item.change"
          :filterable="item.filterable"
        >
          <el-option
            :label="keyitem.label"
            :value="keyitem.value"
            v-for="(keyitem, i) in item.option"
            :key="i"
            :class="keyitem.class == undefined ? '' : keyitem.class"
          ></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
        <template v-if="item.type == 'link'">
          <!-- <p v-for="(key,index) in item.value" :key="index" :class="item.class">
                 <el-link :type="item.typelink?item.typelink:'primary'"  @click="key.click?key.click(key):null"   :underline="item.underline" :title="key.value">{{key.value}}</el-link>
            </p> -->
          <p :class="item.class">
            <el-link
              :type="item.typelink ? item.typelink : 'primary'"
              @click="item.click ? item.click(key) : null"
              :underline="item.underline"
              :title="key.value"
              v-for="(key, index) in item.value"
              :key="index"
              >{{ key.value }}&nbsp;&nbsp;</el-link
            >
          </p>
        </template>
         <template v-if="item.type =='upload'">
              <Upload
                class="avatar-uploader"
                  action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :disabled="!item.disabled ? false : true"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </Upload>


         </template>
      </el-form-item>
    </el-form>
    <div v-if="placeholder" :class="placeholder ? placeholder.class : null">
      {{ placeholder ? placeholder.label : null }}
    </div>
    <span slot="footer" class="dialog-footer" v-if="!button">
      <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-if="button">
      <el-button type="primary" @click="onSubmit" size="small">{{
        button["primary"]
      }}</el-button>
      <el-button
        @click="dialogVisible = false"
        size="small"
        v-if="button['cancel']"
        >{{ button["cancel"] }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import "./Index.scss";
import { Upload } from "element-ui";
export default {
  name: "Dialog",
  data() {
    return {
      dialogVisible: true,
      labelWidth: "100px",
      width: "30%",
      body: [],
      fromData: {},
      style: [],
      className: "",
      rules: null,
      placeholder: null,
      button: null,
      closeOnClickModal: false, //是否通过点击遮罩层关闭,true为可以
      imageUrl:'',
    };
  },
  components:{
    Upload
  },
  created() {
    let formdata=this.fromData;
    if(formdata['upload']){
      this.imageUrl=formdata['upload'];
    }
    console.log('图片',this.imageUrl)
     
  },
  mounted() {
    //     if(this.body){
    //       for (const item of this.body) {
    //             if(item.hasOwnProperty('value')){
    //                 this.fromData[item.fromName]=item.value;
    //                 console.log('对象32', this.fromData)
    //             }
    //       }
    //   }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res, file){
       this.imageUrl = URL.createObjectURL(file.raw);
   
      

    },
    beforeAvatarUpload(file){
       this.imageUrl = URL.createObjectURL(file);
       this.fromData.upload=file;
     
    },
    onSubmit() {
      let self = this;
      // 判断是否验证
      if (this.rules) {
        this.$refs["dialogFrom"].validate((valid) => {
          if (this.submit && valid) {
            self.dialogVisible = false;
            self.submit(self.fromData, function (flag) {
              self.dialogVisible = flag;
            });
          }
        });
      } else {
        self.dialogVisible = false;
        self.submit(this.fromData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>