import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightlist: JSON.parse(sessionStorage.getItem('rightlist')) || [],
    username: sessionStorage.getItem('username')
  },
  mutations: {
    // 将rights存储与state和sessionStorage中，并使两者保持同步
    getRightList(state, data) {
      state.rightlist = data
      sessionStorage.setItem('rightlist', JSON.stringify(data))
    },
    // 用户名
    getUserName(state, data) {
      state.username = data
      sessionStorage.setItem('username', data) // 本来就是字符串，不需要转化
    },
    // 退出登陆清空数据
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
  },
  getters: {
  }
})
