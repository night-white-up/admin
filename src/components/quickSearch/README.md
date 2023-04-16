# 渲染列表查询组件说明

>引入 Query 方法
```javascript
import Query from '@/components/quickSearch/index'
```
>获取列表查询组件操作
```javascript
let Conditions = {
    formInline: {
        pageNum: 1,
        pageSize: 20,
        paramList: {}
    },
    defultDataFrom: [
        {
            itemName: "接口名称",
            placeholder: "请填写接口名称",
            type: "input",
            operate: "lk",
            model: "interfaceName"
        },
        {
            itemName: "是否成功",
            type: "select",
            placeholder: "全部",
            option: [
                { label: "成功", value: 0 },
                { label: "不成功", value: 0 }
            ],
            operate: "lk",
            model: "isSuccess"
        },
        {
            itemName: "请求时间",
            type: "date-picker",
            operate: "lk",
            model: "startTime,endTime"
        }
    ]
};
new Query(NODE).initQuery(Conditions).submit(e => {
    console.log(e);
});
```

# new Query(NODE).initQuery(config).submit() 
查询按钮执行的函数 (Function),返回参数 `config.formInline`

```js
    new Query(NODE).initQuery(Conditions).submit(e => {
        console.log(e); 
        A = {
            pageNum: 1, 
            paramList: [
                {
                    key: "lk"
                    operate: "interfaceName"
                    value: ""
                },
                {
                    key: "lk"
                    operate: "isSuccess"
                    value: ""
                },
                {
                    key: "lk"
                    operate: "startTime"
                    value: "2019-11-11 00:00:00"
                },
                {
                    key: "lk"
                    operate: "endTime"
                    value: "2019-11-12 00:00:00"
                }
            ], 
            pageSize: 20
        } 
    });
```

# new Query(NODE).initQuery(config) 说明

> **formInline**

自定义需要提交的数据 (Object)
```JS
formInline: {
    // 第几页数据 默认 1
    pageNum: 1,
    // 一页显示多少条数据 默认 100
    pageSize: 20,
    // 查询条件
    paramList: {}
}
```

> **defultDataFrom**

自定义显示条件 (Array)
```JS
defultDataFrom: [
    {
        itemName: "接口名称",
        placeholder: "请填写接口名称",
        type: "input",
        operate: "interfaceName"
    },
    {
        itemName: "是否成功",
        type: "select",
        placeholder: "全部",
        option: [
            { label: "成功", value: 0 },
            { label: "不成功", value: 0 }
        ],
        operate: "isSuccess"
    },
    {
        itemName: "请求时间",
        type: "date-picker",
        operate: "startTime,endTime"
    }
]
```

# defultDataFrom 详细说明

> **itemName**
<p>展示的名称 (String)</p>

> **type**
<p>展示的类型 (String) (select\input\date-picker\autocomplete)</p>

> **placeholder**
<p>查询条件描述(String)(自设)</p>

> **option**
<p>select option 选项，在类型是select时才有效。(Array)</p>

```javascript
option:[{"label":选项名称,"value":选项value}]
````

> **operate**
<p>查询条件名称 (String),对应后台查询参数名称</p>