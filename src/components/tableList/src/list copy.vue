<!--
 * @Description: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-24 16:36:32
 -->
  <template>
  <div class="tableList tablelist-element" >
    <el-table
      :data="tableData"
       ref="multipleTable"
      style="width: 100%"
      :border="false"
      stripe
      :header-row-style="{fontSize:'14px'}"
      :max-height="maxheight"
        @selection-change="handleSelectionChange"
         @current-change="handleCurrentChange"
       :row-class-name="tableRowClassName"
      highlight-current-row
       id="elementTable"
      
  >     
        >
       >
    >
     <!-- 展开行 -->
        <el-table-column :type="expand ?'expand':null" v-if="expand" >
            <template slot-scope="props" >
              <el-table :data="props.row.children" 
                  style="width: 100%"
                    stripe
                    class="expand-table"
                     :border="false"
                  >
                  <template   v-for="(value,key,index) in expand">
                    <el-table-column
                        :prop="key"
                        :label="value.label"
                        v-if="!value.prop && !value.condition"
                        :key="index"
                        :show-overflow-tooltip="true"
                        :style="{width:value.width+'px',color:value.color}"
                        :width="value.width"
                        :type="value.type"
                        :sortable="value.sortable!='undefined'?value.sortable:false"
                        :align="value.align"
                    >
                    </el-table-column>
                       <el-table-column
                        :prop="key"
                        :label="value.label"
                        v-else-if="value.condition"
                        :key="index"
                        :show-overflow-tooltip="true"
                            :style="{width:value.width+'px',color:value.color}"
                          :width="value.width"
                          :type="value.type"
                          :sortable="value.sortable!='undefined'?value.sortable:false"
                          :align="value.align"
                      >
                        <template slot-scope="scope">
                          <template v-for="(itemkey,indx) in value.condition">
                            <span  :key="indx" :style="itemkey.style" v-if="scope.row[key]===itemkey.value">{{itemkey.label}}</span>
                          </template>
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                     <el-table-column
                        :prop="key"
                        :label="value.label"
                        v-else
                        :key="index"
                        :show-overflow-tooltip="true"
                            :style="{width:value.width+'px',color:value.color}"
                          :width="value.width"
                          :type="value.type"
                          :sortable="value.sortable!='undefined'?value.sortable:false"
                          :align="value.align"
                      >
                        <template slot-scope="scope">
                            <template v-for="(opr,index) in value.prop">
                                 <el-button
                                :icon="opr.icon"
                                :key="index"
                                :style="{color:opr.color,fontSize:opr.fontSize}"
                                :type="!opr.type?'success':opr.type"
                                @click="opr.handleClick(scope.row,index,props.row)"
                                :size="opr.size!='undefined'?opr.size:'small'"
                                v-if="!opr.change"
                              >{{opr.name}}</el-button>
                                 <el-button
                                :icon="opr.icon"
                                :key="index"
                                :style="{color:opr.color,fontSize:opr.fontSize}"
                                :type="!opr.type?'success':opr.type"
                                @click="opr.handleClick(scope.row,index,props.row)"
                                :size="opr.size!='undefined'?opr.size:'small'"
                                v-if="(opr.change&&opr.change.value.indexOf(scope.row[opr.change.propName]) !=-1)"
                              >{{opr.name}}</el-button>
                              
                            </template>
                        </template>
                    </el-table-column>


                  </template>
                  
                 </el-table>
          </template>
     </el-table-column>
      <!-- 多选框 -->
      <el-table-column :align="align" v-if="isShowSelection" type="selection" width="60" ></el-table-column>
      <!-- 序号 -->
      <el-table-column :align="align" v-if="isShowNumber" label="序号" type="index" width="80"></el-table-column>
      <!-- 内容 -->
      <!-- v-if="item.label!='操作'||(item.type&&item.type!='operation')" -->
      <!-- :show-overflow-tooltip='true'超出规定列款式隐藏 -->
      <template v-for="(item,index) in condition">
        <el-table-column
          :key="index"
          :style="{width:item.width+'px',color:item.color}"
          :prop="item.prop"
          :width="item.width"
          :type="item.type"
          :sortable="item.sortable!='undefined'?item.sortable:false"
          v-if="item.type!='operation'"
          :align="align"
          :label="item.label"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <!-- <div v-html="scope.row[item.prop]"></div> -->
            <div  v-if="item.handleClick" @click="item.handleClick(scope.row)" :style="item.style?item.style:null">
              <i v-if="item.icon" :class="item.icon" style="font-size:40px;"></i>
              <span v-html="scope.row[item.prop]" class="cnt"  :style="{textDecoration:item.underline?'underline':null,color:item.color}">{{scope.row}}</span>
            </div>
            <div  v-else-if="!item.handleClick">
              <i v-if="item.icon" :class="item.icon" style="font-size:40px;"></i>
              <span v-html="scope.row[item.prop]" class="cnt"  :style="{color:item.color}"></span>
            </div>
          </template>
        </el-table-column>
      <!--  动态操作-->
      <el-table-column
          :key="index"
          :style="{width:item.width+'px'}"
          :width="item.width"
          :sortable="item.sortable!='undefined'?item.sortable:false"
          v-else-if="item.dynamick && item.type=='operation'"
          :align="align"
          :label="item.label"
        >
        <template    slot-scope="scope">
                <template v-if="(item.defalult !=undefined)">
                         <el-button
                              :icon="ob.icon"
                                :disabled="ob.disabled"
                              v-for="(ob,obindex) in item.defalult"
                              :style="{color:ob.color,fontSize:ob.fontSize}"
                              @click="ob.handleClick(scope.row)"
                              :type="!ob.type?'success':ob.type"
                              :size="!ob.size?ob.size:'small'"
                               :key="(obindex+ob.label)" 
                            >{{ob.label}} </el-button>
                      </template>
                  <template v-for="(key,index) in item.prop">
                      <el-button
                        :key="index" v-if="scope.row[item.change?(item.propName+'1'):item.propName]===key.value"
                        :icon="key.icon"
                          :disabled="key.disabled"
                          :style="{color:key.color,fontSize:key.fontSize}"
                          @click="key.handleClick(scope.row,index)"
                          :type="!key.type?'success':key.type"
                          :size="!key.size?key.size:'small'"
                        >  <span v-if="key.after" v-html="key.after"></span>{{key.hasOwnProperty('addjudegment')?(scope.row[key.addjudegment.prop].includes(key.addjudegment.value)?key.label:null):key.label}}
                        </el-button>
                        <!-- 操作包含多种情况的时候 -->
                        <el-button
                        :key="index" v-if="item.changArray&&key.value.includes(scope.row[item.changArray?(item.propNameArray+'1'):item.propNameArray])"
                        :icon="key.icon"
                          :disabled="key.disabled"
                          :style="{color:key.color,fontSize:key.fontSize}"
                          @click="key.handleClick(scope.row,index)"
                          :type="!key.type?'success':key.type"
                          :size="!key.size?key.size:'small'"
                        >  <span v-if="key.after" v-html="key.after"></span>{{key.hasOwnProperty('addjudegment')?(scope.row[key.addjudegment.prop].includes(key.addjudegment.value)?key.label:null):key.label}}
                        </el-button>
                      </template> 
        </template>
    </el-table-column>



        
        <!-- 操作 -->
        <el-table-column
          :key="index"
          :style="{width:item.width+'px'}"
          :width="item.width"
          :sortable="item.sortable!='undefined'?item.sortable:false"
          v-else
          :align="align"
          :label="item.label"
        >
        <!-- 动态操作餐牛 -->
        <!-- <template   v-if="item.dynamick" slot-scope="scope">
                  <template v-for="(key,index) in item.prop">
                      <el-button
                        :key="index" v-if="scope.row[item.propName+'1']===key.value"
                        :icon="key.icon"
                  
                          :style="{color:key.color,fontSize:key.fontSize}"
                          @click="key.handleClick(scope.row,index)"
                          :type="!key.type?'success':key.type"
                          :size="!key.size?key.size:'small'"
                        >{{key.label}}
                        </el-button>
                      </template> 
                    
                      <template v-if="(item.defalult !=undefined)">
                         <el-button
                             :key="(obindex+item)" 
                              :icon="ob.icon"
                              v-for="(ob,obindex) in item.defalult"
                              :style="{color:ob.color,fontSize:ob.fontSize}"
                              @click="ob.handleClick(scope.row,key)"
                              :type="!ob.type?'success':ob.type"
                              :size="!ob.size?ob.size:'small'"
                            >{{ob.label}} </el-button>
                      </template>
        </template> -->
        <!-- 固定操作按钮 -->
          <template slot-scope="scope" >
            <template v-for="(opr,index) in item.prop">
              <template v-if="opr.params">
                <el-button
                  :icon="opr.icon"
                  :key="index"
                  :class="item.class?item.class:null"
                  :style="{color:opr.color,fontSize:opr.fontSize}"
                  v-if="(String(opr.params.value).indexOf(String(scope.row[opr.params.prop]))>-1||String(scope.row[opr.params.prop]).indexOf(String(opr.params.value))>-1)&&!opr.params.show"
                  :type="!opr.type?'success':opr.type"
                  @click="opr.handleClick(scope.row,index)"
                  :size="opr.size!='undefined'?opr.size:'small'"
                  :disabled="opr.params.disabled ? false:true"
                >{{opr.name}}</el-button>
                <el-button
                  :key="index"
                  :icon="opr.icon"
                  :style="{color:opr.color,fontSize:opr.fontSize}"
                  :class="item.class?item.class:null"
                  :type="!opr.type?'':opr.type"
                  v-else-if="!opr.params.disabled||!opr.params.show"
                  @click="opr.handleClick(scope.row,index)"
                  :size="opr.size!='undefined'?opr.size:'small'"
                  :disabled="!opr.params.disabled ? false:true"
                >{{opr.name}}</el-button>
              </template>
              <el-button
                v-else-if="opr.condition"
                :icon="opr.icon"
                :key="index"
                :class="item.class?item.class:null"
                :style="{color:opr.color,fontSize:opr.fontSize}"
                @click="opr.handleClick(scope.row,index)"
                :type="!opr.type?'success':opr.type"
                :size="!opr.size?opr.size:'small'"
              >
                <template v-for="(key1,idx) in opr.condition" >
                  <span v-if="key1.equality" :key="idx">{{scope.row[opr.prop]?key1.label:null}}</span>
                  <span :key="idx" :style="key1.value===scope.row[opr.prop?opr.prop:(opr.prop+'1')]?key1.style:null" v-else-if="!key1.equality">
                   
                     
                      {{key1.value==scope.row[opr.prop?opr.prop:(opr.prop+'1')]?key1.label:null}}
                  </span>
                 
                </template>
              </el-button>
              <el-button
                v-else
                :icon="opr.icon"
                :key="index"
                :class="item.class?item.class:null"
                :style="{color:opr.color,fontSize:opr.fontSize}"
                @click="opr.handleClick(scope.row,index)"
                :type="!opr.type?'success':opr.type"
                :size="!opr.size?opr.size:'small'"
              >{{opr.name}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="padding:15px 0"
      background
      :small="false"
      @size-change="page.handleSizeChange"
      @current-change="page.handleCurrentChange"
      :current-page="page.current"
      :page-sizes="page.sizes"
      :page-size="page.size"
      :layout="page.layout"
      :total="total"
      v-if="pageShow"
    ></el-pagination>
  </div>
</template>

  <script>

export default {
 
  data() {
    return {
      //总条目数
      total: 100,
      pageShow:true,  
      expand:null,
      maxheight:'100%',
      tableRowClassName:"",
      obj:null,
      handleSelectionChange(val){
          console.log(`选择: ${val}`);
      },
      handleCurrentChange(val){
        console.log(`选择: ${val}`);
      },
      // lazy:{
      //           lazy:true,
      //           key:"name",
      //           load(tree, treeNode, resolve) {
                  
      //                 resolve([
      //                   {
      //                     id: 31,
      //                     date: '2016-05-01',
      //                     name: '王小虎',
      //                     address: '上海市普陀区金沙江路 1519 弄'
      //                   }, {
      //                     id: 32,
      //                     date: '2016-05-01',
      //                     name: '王小虎',
      //                     address: '上海市普陀区金沙江路 1519 弄'
      //                   }
      //                 ])
                   
      //           }
      //       },
      page: {
        // 每页显示条目个数，支持 .sync 修饰符
        size: 10,
        sizes: [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        current: 1,
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
     
      },
      // 是否显示多选框
      isShowSelection: false,
      // 是否显示序号
      isShowNumber: false,
      border: false,
      // 对齐方式
      align: "center",
      tableData: [],
      condition: [
        {
          width: "180",
          prop: "name",
          type: "",
          label: "名称"
        }
      ]
    };
  },
  updated(){
    this.obj=this.$refs.multipleTable;
   
  },
  mounted(){
      this.obj=this.$refs.multipleTable;
   
  },
  methods: {
    iHeaderRowStyle: function({ row, rowIndex }) {
      return "height:40px";
    },
    load(tree, treeNode, resolve){
      
        this.lazy.load(tree, treeNode, resolve)
    },
    
    multipe(row){
        //this.obj继承前的vue對象 
       this.obj.toggleRowSelection(row)
      
    },
     setCurrent(sort) {
     
        this.obj.setCurrentRow(this.tableData[sort]);
      }
  }
};
</script>
<style lang="scss" scoped>
.el-button--text {
  .el-icon-picture-outline {
    font-size: 14px;
  }
}
.el-table th,
.el-table tr {
  background: #e6edf2 !important;
}
.el-table td {
  padding: 0;
}
.td {
  font-size: 14px !important;
}
.cnt {
  display: inline-block;
  width: 97%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-table {
  font-size: 14px;
  // line-height: 28px;
}

.el-table .cell {
  // font-size: 14px;
  line-height: 18px;
}

.el-button {
  font-size: 14px;
}
</style>