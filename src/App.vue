<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleChange" />
    <a-button type="primary" @click="handleAddItem">添加事项</a-button>

    <a-list bordered :dataSource="$store.getters.todoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{$store.getters.undoLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="status === 'all' ? 'primary' : 'default'" @click="handleViewChange('all')">全部</a-button>
          <a-button :type="status === 'undo' ? 'primary' : 'default'" @click="handleViewChange('undo')">未完成</a-button>
          <a-button :type="status === 'done' ? 'primary' : 'default'" @click="handleViewChange('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    handleChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    handleAddItem () {
      if (!this.inputValue.trim()) return this.$message.warning('内容不能为空！')
      this.$store.commit('addItem')
    },
    handleViewChange (type) {
      this.$store.commit('changeStatus', type)
    }
  },
  mounted () {
    this.$store.dispatch('getList')
  },
  computed: {
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
