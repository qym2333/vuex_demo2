import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    status: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    },
    // 添加项
    addItem (state) {
      const item = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(item)
      state.nextId++
      state.inputValue = ''
    },
    // 删除项
    deleteItem (state, id) {
      const index = state.list.findIndex((item) => {
        if (item.id === id) return true
      })
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 修改状态
    changeStatus (state, type) {
      state.status = type
    }
  },
  actions: {
    async getList (context) {
      const { data: res } = await axios.get('/list.json')
      context.commit('initList', res)
    }
  },
  getters: {
    // 统计未完成任务的数量
    undoLength (state) {
      return state.list.filter(item => item.done === false).length
    },
    // 筛选列表
    todoList (state) {
      if (state.status === 'all') {
        return state.list
      }
      if (state.status === 'undo') {
        return state.list.filter(item => item.done === false)
      }
      if (state.status === 'done') {
        return state.list.filter(item => item.done)
      }
    }
  },
  modules: {
  }
})
