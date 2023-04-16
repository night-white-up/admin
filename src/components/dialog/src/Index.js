/*
 * @Author: your name
 * @Date: 2021-06-20 13:54:09
 * @LastEditTime: 2022-05-03 11:50:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muluhuijiao\src\components\dialog\Index.js
 */
import Vue from 'vue';
import query from './Index.vue';
let elementNode=null;
let instance=null;
let id="dislog_form"
let DialogConstrutor=Vue.extend(query)
class SetBody{
        constructor(config){
                if (this.isType(config, "Object")) {
                    this.options = config || {};
                } else {
                    let defultDataFrom = { defultDataFrom: config }
                    this.options = defultDataFrom || {};
                }
                this.init();

        }
        english = str => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        isType = (obj, type) => toString.call(obj) === `[object ${this.english(this.toLowerCase(type))}]`
        // 转小写
        toLowerCase = str => str.toLowerCase()
        init(){
            let self=this;
             if(self.options.body){ //回显值
                let obj={}
                try {
                    for (const item of self.options.body) {
                        if(item.value !=undefined){
                            obj[item.fromName]=item.value;
                        }
                      
                        
                    }
                    
                } catch (error) {
                        console.error(error)
                }
             
                self.options.fromData=obj;
            }
            instance=new DialogConstrutor({
                data:self.options
            })
         
          
            instance.$mount();
            for (let i = 0; i < elementNode.length; i++) {
                elementNode[i].appendChild(instance.$el)
                
            }
        }

}


export  default  class Dialog{
    constructor(main){
        if(main){
            if(typeof main ==="object"){
                elementNode=[main]
            }else{
                if(document.querySelectorAll(main) && typeof main == "string"){
                    elementNode = document.querySelectorAll(main)
                }
            }
        }else{
            elementNode = [document.body]
        }
      
    }
    init(config){
            return new SetBody(config)
    }
}