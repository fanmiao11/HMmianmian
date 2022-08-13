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
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      pageSizes: [5, 20, 30, 50],
      pageSize: 20,
      total: 50,
    };
  },
  methods: {
    // 进入某一页
    pageChange(pageNum) {},
    // 改变每页条数
    pageSizeChange(pageSize) {},
  },
};
</script>

<style scoped lang="less"></style>
