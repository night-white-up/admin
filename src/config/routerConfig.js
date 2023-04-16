/*
 * @Author: your name
 * @Date: 2022-05-02 16:58:48
 * @LastEditTime: 2023-04-16 22:25:37
 * @LastEditors: chenjieweb 1030884759@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \admin\src\config\routerConfig.js
 */
import { moduleName } from "@/init/amb.js"
const Layout = () => import("@/components/nav/index.vue")
const Home = () => import("@/page/home.js")
// 静态路由配置
export const constantRoutes = [
    {
        path: '/home',
        component: Layout,
        children: [
        {
                path: '/home',
                name: moduleName,
                component: Home,
                meta: { title: moduleName, isShowMenu: true },
                hidden: true
          }, 
          {
            path:'/moviewtype',
            component: () => import("@/page/MovieType/Movietype.vue"),
            meta: {
                isShowMenu: true,
                icon: "el-icon-s-home",
                name: "展馆信息管理"
            },
            // hidden: false
        },
            {
                path: '/error',
                name: "Error",
                component: () => import("@/page/error.js"),
                meta: { title: "Error", isShowMenu: true }
            }
        ],
        meta: {
            name: "展馆信息管理",
            icon: "el-icon-s-home"
        }
    }, 
    {
        path: '/login',
        component: () => import("@/page/login.js"),
        meta: {
            isShowMenu: true,
            name: "登陆"
        }
    },
   
]

// 动态路由配置
export const asyncRoutes = [
    {
        name: '展品管理',
        path: "/moviewtype",
        component: Layout,
        redirect: "noredirect",
        children: [
            {
                path: 't',
                component: () => import("@/page/MovieType/Movietype.vue"),
                meta: {
                    name: '展品管理',
                    icon: "el-icon-star-on"
                },
                // hidden: true,
            }
        ]
    },
    {
        name: '用户管理',
        path: "/useradmin",
        component: Layout,
        redirect: "noredirect",
        children: [
            {
                path: 't',
                component: () => import("@/page/user/uer.vue"),
                meta: {
                    name: '用户管理',
                    icon: "el-icon-thumb"
                },
                hidden: true,
            }
        ]
    },
]