<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleChange" />
    <a-button type="primary" @click="handleAddItem">添加事项</a-button>

    <a-list bordered :dataSource="todoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="cbItemChanged(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="status === 'all' ? 'primary' : 'default'" @click="changeViewStatus('all')">全部</a-button>
          <a-button :type="status === 'undo' ? 'primary' : 'default'" @click="changeViewStatus('undo')">未完成</a-button>
          <a-button :type="status === 'done' ? 'primary' : 'default'" @click="changeViewStatus('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearDoneItem">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['deleteItemById', 'changeViewStatus', 'cbItemChanged', 'clearDoneItem']),
    handleChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    handleAddItem () {
      if (!this.inputValue.trim()) return this.$message.warning('内容不能为空！')
      this.$store.commit('addItem')
    }
  },
  mounted () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapGetters(['undoLength', 'todoList']),
    ...mapState(['list', 'inputValue', 'status'])
  },
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
