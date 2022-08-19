<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-15 11:30:39
-->
<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-form :model="searchForm" label-width="80px" class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input
                v-model="searchForm.keyword"
                placeholder="根据编号搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" style="display: flex; justify-content: flex-end">
            <el-form-item>
              <el-button @click="clearForm" size="small">清除</el-button>
              <el-button type="primary" @click="search" size="small"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据 -->
      <el-alert
        :title="`数据一共 ${counts} 条 --- 范苗`"
        type="info"
        show-icon
        style="margin-bottom: 15px"
        :closable="false"
      />
      <!-- 表格 -->
      <comm-table
        :tableHeadArr="tableHeadArr"
        :tableData="tableData"
        widthOpe="80px"
        @preview="preview"
      >
        <!-- 操作 -->
        <template v-slot="scope">
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeRandoms(scope)"
          ></el-button>
        </template>
      </comm-table>
      <!-- 分页 -->
      <pagination
        :pageSizes="pageSizes"
        :pageSize="pages.pagesize"
        :total="counts"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      >
      </pagination>
    </el-card>
    <!-- 题目预览 -->
    <questions-preview
      :dialogPreveiew="isShowDialogPreveiew"
      :detailInfo="detailInfo"
      @close="isShowDialogPreveiew = false"
    />
  </div>
</template>

<script>
import CommTable from "@/components/CommTable";
import QuestionsPreview from "../components/questions-preview.vue";
import Pagination from "@/components/Pagination";

import { randoms, detail, removeRandoms } from "@/api/hmmm/questions";

export default {
  components: {
    CommTable,
    QuestionsPreview,
    Pagination
  },
  data() {
    return {
      // 搜索表单
      searchForm: {
        keyword: "", //关键字
      },
      // 数据
      counts: 0,
      // 表格
      tableHeadArr: [
        { prop: "id", label: "编号", width: "220px" },
        { prop: "questionType", label: "题型", width: "80px" },
        { prop: "questionIDs", label: "题目编号", width: "220px" },
        { prop: "addDate", label: "录入时间" },
        { prop: "totalSeconds", label: "答题时间" },
        { prop: "accuracyRate", label: "正确率" },
        { prop: "userName", label: "录入人" },
      ],
      tableData: [],
      pages: {
        page: 1, //当前页数
        pagesize: 20, //页尺寸
      },
      // 分页
      pageSizes: [20, 30, 50, 100],
      // 题目预览
      isShowDialogPreveiew: false, // 是否显示题目预览弹框
      detailInfo: {}, // 基础题库详情
    };
  },
  created() {
    this.getRandoms();
  },

  methods: {
    clearForm() {
      this.searchForm = {
        keyword: "",
      };
    },
    search() {
      // console.log("搜索");
      this.getRandoms()
    },
    // 获取组题列表
    async getRandoms() {
      const { data } = await randoms({
        ...this.searchForm,
        ...this.pages,
      });
      this.counts = data.counts;
      // console.log(res);
      this.tableData = data.items;
    },
    // 预览
    async preview(item) {
      // console.log(row);
      this.isShowDialogPreveiew = true;
      const { data } = await detail(item);
      this.detailInfo = data;
      // console.log(this.detailInfo);
    },
    // 删除
    async removeRandoms({ row }) {
      this.$confirm(`此操作将永久删除该题组，是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 删除当前试题
          await removeRandoms(row);
          // 更新列表
          this.getRandoms();
          // 操作成功提示
          this.$message({
            type: "success",
            message: `删除成功!`,
          });
        })
    },
        // 进入某一页
    pageChange(pageNum) {
      this.pages.page = pageNum; //当前页数
      this.getRandoms();
    },
    // 改变每页条数
    pageSizeChange(pageSize) {
      this.pages.pagesize = pageSize;
      this.getRandoms();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 10px;
  margin: 10px 0;
}
.el_input {
  width: 100%;
}
</style>
