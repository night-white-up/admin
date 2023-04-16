/*
 * @Autor        : Pat
 * @Description  : User Store
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-15 11:28:41
 */
const state = {
    user: {}
}

const mutations = {
    SET_USERINFO: (state, user) => {
        state.user = user
    }
}

const actions = {
    generateUser({ commit }, info) {
        return new Promise(resolve => {
            commit('SET_PERMISSIONS', info)
            resolve(info)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
