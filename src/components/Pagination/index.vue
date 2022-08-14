<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-13 17:14:46
 * @LastEditors: sj
 * @LastEditTime: 2022-08-13 17:49:44
-->
<template>
  <!-- 分页组件 -->
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next,sizes,jumper"
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    // 每页信息条数选择
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50],
    },
    // 每页信息条数
    pageSize: {
      type: Number,
    },
    // 数据总条数
    total: {
      type: Number,
      // required:true
      default: 20,
    },
  },
  methods: {
    // 进入某一页
    onPageChange: function (pageNum) {
      this.$emit("pageChange", pageNum);
    },
    // 每页显示信息条数
    onPageSizeChange: function (pageSize) {
      this.$emit("pageSizeChange", pageSize);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  background-color: #fff;
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
