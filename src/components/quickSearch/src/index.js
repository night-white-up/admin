import Vue from 'vue';
import query from './list.vue';

let QueryConstructor = Vue.extend(query);

let instance;
let seed = 1;

let elementNode;

/**
 * 设置提交按钮
 */
class Submit {
    constructor(func) {
        if (typeof func === 'function') {
            this.submitDataFunc = func;
        }
    }
}

class SetLists {
    constructor(config) {
        if (this.isType(config, "Object")) {
            this.options = config || {};
        } else {
            let defultDataFrom = { defultDataFrom: config }
            this.options = defultDataFrom || {};
        }
        this.init()
    }
    /**
     * @description: 首字母大写
     * @param {String} str 英语单词
     */
    english = str => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    // 转小写
    toLowerCase = str => str.toLowerCase()
    // 转大写

    /**
     * @description: 判断字符类型
     * @param {Object} obj 数组数据
     * @param {String} type 需要判断的字符串
     */
    isType = (obj, type) => toString.call(obj) === `[object ${this.english(this.toLowerCase(type))}]`

    /**
     * submit 提交查询方法 只能为function
     * @param {只能为function} submitFunc 
     */
    submit(submitFunc) {
        if (typeof submitFunc == "function") {
            this.submitFrom = submitFunc
        }

    }

    init() {
        let options = this.options
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }

        let id = 'Query_' + seed++;
        options.submit = from => {
            if (this.submitFrom) return new Submit(this.submitFrom).submitDataFunc(from)
        };

        instance = new QueryConstructor({
            data: options
        });

        instance.id = id;


        instance.$mount();

        for (let i = 0; i < elementNode.length; i++) {
            //elementNode.innerHTML =""
            elementNode[i].appendChild(instance.$el);
        }

        return instance;
    }
}

export default class Query {

    /**
     * 
     * new Query(Node).initQuery(from).submit(e=>{console.log(e)})
     * 
     * * new Query(Node) 
     * 
     * ** 获取查询列表 Node 节点
     * 
     * 
     * ** .initQuery(from)
     * 
     * 
     * * from 查询条件 
     * 
     * ** [{itemName:显示名称(自设), 
     *  placeholder:查询条件描述(自设),
     *  type:查询框类型 （select\input\date-picker\autocomplete）,
     *  option:[{"label":选项名称,"value":选项value}], // 在类型是select时才有效
     *  model:查询条件名称(自设),
     *  operate:后台查询条件(自设)}]
     * 
     * 
     * * .submit(e=>{console.log(e)})
     * 
     * ** 查询按钮执行的函数 function
     * 
     */
    constructor(main) {
        if (main) {
            if (typeof main == "object") {
                elementNode = [main]
            } else {
                if (document.querySelectorAll(main) && typeof main == "string") {
                    elementNode = document.querySelectorAll(main)
                }
            }
        } else {
            elementNode = [document.body]
        }
    }


    /**
     * 激活查询条件
     * config 
     *       {
     *          // 需要提交的数据
     *          formInline: {
     *              // 第几页数据 默认 1
     *              pageNum:1,
     *              // 一页显示多少条数据 默认 100
     *              pageSize:100,
     *              // 查询条件
     *              paramList:{}
     *          },
     *          // 默认数据
     *          defultDate:{
     *              countyName:null,
     *              groupName:null,
     *              userType:this.$app.usersType,
     *              status:null,
     *              branch:null,
     *              gridId:null,
     *              branchOfficeName:null,
     *              gridName:null,
     *          },
     *          submit:null,
     *          timeItem:null,
     *          defultDataFrom:"",
     *          // 放置重复点击
     *          bindClick:true,
     *          alluser:null,
     *       }
     */
    initQuery(config) {
        return new SetLists(config)
    }
}