<template>
  <div class="container">
    <div>
      <subjectsTitle
        :total="counts"
        seachName="目录名称"
        addname="新增目录"
        :isShowState="true"
      />

      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 15px"
        :header-cell-style="headerColor"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="subjectName" label="所属学科"></el-table-column>
        <el-table-column prop="directoryName" label="标签名称"></el-table-column>
        <el-table-column prop="creator" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作" width="250px">
          <el-button type="text">禁用</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

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
    </div>
  </div>
</template>

<script>
import subjectsTitle from "../components/subjects-components/subjects-title.vue";
import { list } from "@/api/hmmm/directorys";
export default {
  data() {
    return {
      headerColor: {
        "background-color": "#FAFAFA",
        "border-bottom": "2px solid #E8E8E8",
      },
      tableData: [],
      counts: 0,
      page: 1,
      pagesize: 10,
    };
  },
  components: {
    subjectsTitle,
  },
  created() {
    this.getDirectionList();
  },
  methods: {
    // 获取目录列表
    async getDirectionList() {
      const {
        data: { counts, items },
      } = await list({ page: this.page, pagesize: this.pagesize });
      this.tableData = items;
      this.counts = counts;
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
