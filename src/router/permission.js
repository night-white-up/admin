/*
 * @Author: chenjie 1030884759@qq.com
 * @Date: 2022-05-02 16:58:48
 * @LastEditors: chenjieweb 1030884759@qq.com
 * @LastEditTime: 2023-04-16 22:16:56
 * @FilePath: \admin\src\router\permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import router from './index'
import store from "@/config/store/index"
import { asyncRoutes } from "@/config/routerConfig";
import Storage from "@/config/Storage.js";
//路由拦截
router.beforeEach(async (to, from, next) => {
    const USER_INFO = Storage.getItem("userInfo"),
        { getters: { permission_routes: permissionRoutes }, dispatch: vuexDispatch } = store,
    //用来做登录页不能浏览器前进回退
        { meta: { name: TO_NAME, allowBack: TO_BACK }, path: TO_PATH } = to;
    // if (USER_INFO) {
    //     store.commit('UserInfo/SET_USERINFO', USER_INFO);
    // } else { 
    //     if (TO_PATH !== "/login") {
    //         next("/login");
    //     } else { 
    //         next()
    //     }
    // }
    if (TO_NAME) { document.title = TO_NAME }
    if (typeof TO_BACK !== "undefined") { localStorage.setItem("allowBack", TO_BACK); }
    if (!TO_BACK) { history.pushState(null, null, location.href) }
    if (TO_PATH === "/") {
   
        next("/login");
    } else {
        const hasPermissions = permissionRoutes && permissionRoutes.length > 0
        if (!hasPermissions) {
            const accessRoutes = await vuexDispatch('permission/generateRoutes', asyncRoutes)
            accessRoutes.push({ path: '*', redirect: '/error' })
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
        } else {
            next();
        }
    }
})