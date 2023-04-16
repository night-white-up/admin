/*
 * @Autor        : Pat
 * @Description  : API
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-31 14:10:26
 * @LastEditors: chenjie 1030884759@qq.com
 * @LastEditTime: 2022-05-05 23:37:05
 */
import ylAxios from "@/api/axios/index.js"
import api from "@/init/api.js";
// require('@/mock/mock.create.js')
/**
 * @description: 用户登录接口
 * @param {params} params {USER_LOGIN_NAME USER_PASSWORD}
 * @return: USER_INFO
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const securityauth = async params => await ylAxios('postJson', `${api.requestUrl}/security/auth`, params)
/**
 * @Descripttion:电影列表 
 * @Author: 
 * @Date: 2022-05-03 14:30:14
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const movielist = async params => await ylAxios('get', `${api.requestUrl}/movie/list`, params)
/**
 * @Descripttion: 新增电影
 * @Author: 
 * @Date: 2022-05-03 17:25:38
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const movie = async params => await ylAxios('postJson', `${api.requestUrl}/movie`, params)
/**
 * @Descripttion: 删除电影
 * @Author: 
 * @Date: 2022-05-04 19:53:00
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const deletemovie = async params => await ylAxios('delete', `${api.requestUrl}/movie/${params.id}`)
/**
 * @Descripttion: 
 * @Author: 
 * @Date: 2022-05-04 20:08:17
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const putmovie = async params => await ylAxios('put', `${api.requestUrl}/movie`, params);
/**
 * @Descripttion: 新增电影类型
 * @Author: 
 * @Date: 2022-05-04 21:41:00
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const movieTypeAxios = async params => await ylAxios('postJson', `${api.requestUrl}/movieType`, params);
/**
 * @Descripttion:电影类型列表 
 * @Author:
 * @Date: 2022-05-04 21:45:18
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const list = async params => await ylAxios('get', `${api.requestUrl}/movieType/list`, params)
/**
 * @Descripttion:修改电影类型 
 * @Author: 
 * @Date: 2022-05-04 22:05:50
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const putmovieType = async params => await ylAxios('put', `${api.requestUrl}/movieType`, params);
/**
 * @Descripttion: 删除电影类型
 * @Author:
 * @Date: 2022-05-04 22:17:46
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const deletemovieType = async params => await ylAxios('delete', `${api.requestUrl}/movieType/${params.id}`);
/**
 * @Descripttion: 查询系统用户列表
 * @Author: 
 * @Date: 2022-05-04 22:38:42
 * @LastEditors: 
 * @param {*}
 * @return {*}
 */
export const getSysUserByPage = async () => await ylAxios('postJson', `${api.requestUrl}/system/user/getSysUserByPage`);
/**
 * @Descripttion:注册-添加系统用户 
 * @Author: 
 * @Date: 2022-05-04 23:03:57
 * @LastEditors: 
 * @param {*}
 * @return {*}
 */
export const insertSysUser = async params => await ylAxios('postJson', `${api.requestUrl}/system/user/insertSysUser`,params);
/**
 * @Descripttion: 
 * @Author: 
 * @Date: 2022-05-04 23:15:20
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const updateSysUser = async params => await ylAxios('postJson', `${api.requestUrl}/system/user/updateSysUser`,params)
/**
 * @Descripttion: 删除系统用户
 * @Author: 
 * @Date: 2022-05-04 23:31:06
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const delSysUser = async params => await ylAxios('get', `${api.requestUrl}/system/user/delSysUser`,params)
/**
 * @Descripttion: 
 * @Author: 
 * @Date: 2022-05-04 23:44:48
 * @LastEditors: 
 * @param {*} params
 * @return {*}
 */
export const movieTypelist = async () => await ylAxios('get', `${api.requestUrl}/movieType/list`)

