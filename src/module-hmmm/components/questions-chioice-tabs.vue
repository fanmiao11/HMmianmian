<template>
  <div>
    <!-- 表格 -->
    <comm-table></comm-table>
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
import CommTable from "@/components/CommTable";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination,
    CommTable,
  },
  data() {
    return {
      // 表格
      tableHeadArr: [
        { prop: "number", label: "试题编号" },
        { prop: "subject", label: "学科" },
        { prop: "catalog", label: "目录" },
        { prop: "question", label: "题干" },
        { prop: "questionType", label: "题型" },
        { prop: "addDate", label: "录入时间" },
        { prop: "difficulty", label: "难度" },
        { prop: "creator", label: "录入人" },
      ],
      tableData: [],
      counts: 0,
      // 分页
      pageSizes: [5, 20, 30, 50],
      pageSize: 20,
      total: 50,
    };
  },

  created() {},

  methods: {
    // 进入某一页
    pageChange(pageNum) {
      console.log(pageNum);
    },
    // 改变每页条数
    pageSizeChange(pageSize) {},
  },
};
</script>

<style scoped></style>
