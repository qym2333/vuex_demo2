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
    // 根据id删除事项
    deleteItemById (state, id) {
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) state.list.splice(index, 1)
    },
    // 修改事项状态
    cbItemChanged (state, id) {
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) state.list[index].done = !state.list[index].done
    },
    // 筛选列表
    changeViewStatus (state, type) {
      state.status = type
    },
    // 清空已完成
    clearDoneItem (state) {
      // state.list = state.list.reduce((acc, cur) => {
      //   if (cur.done === false)
      //     acc.push(cur)
      //   return acc
      // }, [])
      state.list = state.list.filter(item => !item.done)
    }
  },
  actions: {
    async getList (context) {
      const { data: res } = await axios.get('/list.json')
      context.commit('initList', res)
    }
  },
  getters: {
    // 统计未完成事项数
    undoLength (state) {
      return state.list.filter(item => !item.done).length
    },
    // 筛选列表
    todoList (state) {
      const statusMap = {
        all: state.list,
        undo: state.list.filter(item => item.done === false),
        done: state.list.filter(item => item.done)
      }
      return statusMap[state.status]
    }
  },
  modules: {
  }
})
