<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 新增按钮 -->
      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="success" icon="el-icon-edit" size="small">
          新增试题</el-button
        >
      </el-row>
      <!-- 搜索表单 -->
      <search-form @search="search"></search-form>
      <!-- tab栏 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="待审核" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已审核" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth">定时任务补偿</el-tab-pane
        >
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
import SearchForm from "../components/search-form.vue";
import QuestionsTabs from '../components/questions-chioice-tabs.vue'

export default {
  components: {

    SearchForm,
    QuestionsTabs,
  },
  data() {
    return {
     
    };
  },
  created() {},
  methods: {
    // 搜索
    search(form) {
      console.log(form);
    },

  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 10px;
  margin: 10px 0;
}
.el-row {
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>
