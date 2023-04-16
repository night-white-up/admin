/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-27 19:40:49
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-21 15:44:33
 */
const { moduleName } = require('./init/amb')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./config/store"
import "./router/permission"
Vue.config.productionTip = false
document.title = moduleName;
import element from "./config/element.config.js";
element.install(Vue);
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
