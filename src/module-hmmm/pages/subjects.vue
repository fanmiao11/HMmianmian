<template>
  <div class="container">
    <div>
      <!-- title -->
      <subjectsTitle
        ref="subject"
        :total="counts"
        seachName="学科名称"
        addname="新增学科"
        @add="addSubjects"
        @search="getSubjectsList"
      />

      <!-- table -->
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%; margin-top: 15px"
        :header-cell-style="headerColor"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="subjectName" label="学科名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="filterTime"
          min-width="150px"
        >
        </el-table-column>
        <el-table-column
          prop="isFrontDisplay"
          :formatter="formatterIsFrontDisplay"
          label="前台是否显示"
          min-width="100px"
        >
        </el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二级目录">
        </el-table-column>
        <el-table-column prop="tags" label="标签"> </el-table-column>
        <el-table-column prop="totals" label="题目数量"> </el-table-column>
        <el-table-column prop="address" label="操作" width="250px">
          <template slot-scope="{ row }">
            <el-button type="text" @click="directorys(row)">学科分类</el-button>
            <el-button type="text" @click="tags(row)">学科标签</el-button>
            <el-button type="text" @click="addSubjects(row, 1)">修改</el-button>
            <el-button type="text" @click="removeSubjects(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" justify="end" style="margin-top: 15px">
        <el-pagination
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pagesize"
          :total="counts"
          @current-change="currentChange"
          @size-change="sizeChange"
          @prev-click="prevClick"
          layout="prev, pager, next,sizes, jumper"
        >
        </el-pagination>
      </el-row>
      <!-- 添加学科 -->
      <subjectsAdd
        title="新增学科"
        :visible.sync="dialogVisible"
        :centent="centent"
        :types="types"
        @refresh="getSubjectsList"
      >
      </subjectsAdd>
    </div>
  </div>
</template>

<script>
import subjectsTitle from "../components/subjects-components/subjects-title.vue";
import { list, remove } from "@/api/hmmm/subjects";
import dayjs from "dayjs";
import subjectsAdd from "../components/subjects-components/subjects-add.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      headerColor: {
        "background-color": "#FAFAFA",
        "border-bottom": "2px solid #E8E8E8",
      },
      tableData: [],
      counts: 0,
      page: 1,
      pagesize: 10,
      loading: false,
      centent: {},
      types: 0,
    };
  },
  components: {
    subjectsTitle,
    subjectsAdd,
  },
  created() {
    this.getSubjectsList();
  },
  methods: {
    // 获取学科列表
    async getSubjectsList() {
      this.loading = true;
      const {
        data: { counts, items },
      } = await list({
        page: this.page,
        pagesize: this.pagesize,
        subjectName: this.$refs?.subject?.input ? this.$refs?.subject?.input : null,
      });
      this.tableData = items;
      this.counts = counts;
      this.loading = false;
      console.log(items);
    },
    // 点击下一页和页码重新获取数据
    currentChange(index) {
      this.page = index;
      this.getSubjectsList();
    },
    // 点击每页显示多少条
    sizeChange(val) {
      this.pagesize = val;
      this.getSubjectsList();
    },
    // 输入框输入页数跳转
    prevClick() {},
    // 过滤
    formatterIsFrontDisplay(row, column, cellValue, index) {
      return cellValue ? "是" : "否";
    },
    // 过滤时间
    filterTime(row, column, cellValue, index) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    // 删除
    async removeSubjects(id) {
      try {
        await this.$confirm("此操作将永久删除该标签, 是否继续?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await remove({ id });
        this.getSubjectsList();
        this.$message.success("删除成功");
      } catch (error) {}
    },
    // 点击学科分类
    directorys(row) {
      console.log(row);
      this.$router.push({
        path: "directorys",
        name: "subjects-directorys",
        query: { id: row.id, name: row.subjectName },
      });
    },
    // 点击学科标签
    tags(row) {
      //  this.$router.push("tags");
      console.log(row);
      this.$router.push({
        path: "tags",
        name: "subjects-tags",
        query: { id: row.id, name: row.subjectName },
      });
    },
    // 添加
    addSubjects(val, type) {
      this.dialogVisible = true;
      this.centent = val;
      this.types = type;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 15px;
  > div {
    padding: 15px;
    border-radius: 2px;
    background-color: #fff;
  }
}
</style>
