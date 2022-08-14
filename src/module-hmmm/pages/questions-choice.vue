<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-13 17:01:02
 * @LastEditors: sj
 * @LastEditTime: 2022-08-13 17:06:53
-->
<template>
  <div class="container">
    精选题库
    <!-- 表单 -->
    <search-form @search="search"></search-form>
    <!-- 分页 -->
    <pagination
      :pageSizes="pageSizes"
      :pageSize="pageSize"
      :total="total"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    >
    </pagination>
  </div>
</template>

<script>
import SearchForm from "../components/search-form.vue";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
    SearchForm,
  },
  data() {
    return {

      // 分页
      pageSizes: [5, 20, 30, 50],
      pageSize: 20,
      total: 50,
    };
  },
  created(){
  },
  methods: {
    // 搜索
    search(form){
      console.log(form);
    },

    // 进入某一页
    pageChange(pageNum) {
      console.log(pageNum);
    },
    // 改变每页条数
    pageSizeChange(pageSize) {},
  },
};
</script>

<style scoped lang="less"></style>
