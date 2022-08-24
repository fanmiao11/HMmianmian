<template>
  <div class="container">
    <div>
      <subjectsTitle
        ref="directorys"
        :total="counts"
        seachName="目录名称"
        addname="新增目录"
        :isShowState="true"
        :isReturn="isReturn"
        :isBreadcrumb="isBreadcrumb"
        title3="目录管理"
        :title2="title2"
        @add="addDirectorys"
        @search="getDirectionList"
      />

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%; margin-top: 15px"
        :header-cell-style="headerColor"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="subjectName" label="所属学科"></el-table-column>
        <el-table-column
          prop="directoryName"
          label="目录名称"
        ></el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="filterTime"
          min-width="150px"
        >
        </el-table-column>
        <el-table-column prop="totals" label="面试题数量"> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :formatter="formatterIsFrontDisplay"
        >
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="{ row }">
            <el-button type="text" @click="isDisabled(row.id, row.state)">
              {{ row.state ? "禁用" : "启用" }}
            </el-button>
            <el-button
              type="text"
              :disabled="row.state === 1"
              @click="directorysUpdate(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="row.state === 1"
              @click="removeDirectorys(row.id)"
              >删除</el-button
            >
          </template>
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

      <!-- 修改弹窗 -->
      <directoryUpdate
        :visible.sync="dialogVisible"
        :content="content"
        @refresh="getDirectionList"
        :title="title"
        :types="type"
      />
    </div>
  </div>
</template>

<script>
import subjectsTitle from "../components/subjects-components/subjects-title.vue";
import { list, changeState, remove } from "@/api/hmmm/directorys";
import dayjs from "dayjs";
import directoryUpdate from "../components/subjects-components/directorys-add.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      title2: "",
      type: 0,
      isBreadcrumb: false,
      isReturn: false,
      headerColor: {
        "background-color": "#FAFAFA",
        "border-bottom": "2px solid #E8E8E8",
      },
      tableData: [],
      counts: 0,
      page: 1,
      pagesize: 10,
      loading: false,
      content: {},
      title: "",
    };
  },
  components: {
    subjectsTitle,
    directoryUpdate,
  },
  created() {
    this.getDirectionList();
  },
  methods: {
    // 获取目录列表
    async getDirectionList() {
      this.loading = true;
      this.title2 = this.$route.query.name;
      if (this.$route.query.id) {
        this.isReturn = true;
        this.isBreadcrumb = true;
      }
      const {
        data: { counts, items },
      } = await list({
        page: this.page,
        pagesize: this.pagesize,
        subjectID: this.$route.query.id ? this.$route.query.id : null,
        directoryName: this.$refs?.directorys?.input
          ? this.$refs?.directorys?.input
          : null,
        state: this.$refs?.directorys?.value
          ? this.$refs?.directorys?.value
          : null,
      });
      this.tableData = items;
      this.counts = counts;
      this.loading = false;
      console.log(items);
    },
    // 点击下一页和页码重新获取数据
    currentChange(index) {
      this.page = index;
      this.getDirectionList();
    },
    // 点击每页显示多少条
    sizeChange(val) {
      this.pagesize = val;
      this.getDirectionList();
    },
    // 输入框输入页数跳转
    prevClick() {},
    // 过滤
    formatterIsFrontDisplay(row, column, cellValue, index) {
      return cellValue ? "已启用" : "已禁用";
    },
    // 过滤时间
    filterTime(row, column, cellValue, index) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    // 点击启用按钮
    async isDisabled(id, state) {
      try {
        let index;
        state ? (index = 0) : (index = 1);
        await changeState({ id: id, state: index });
        this.getDirectionList();
        this.$message.success("操作成功");
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    // 点击删除
    async removeDirectorys(id) {
      try {
        await this.$confirm("此操作将永久删除该目录, 是否继续?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await remove({ id });
        this.getDirectionList();
        this.$message.success("删除成功");
      } catch (error) {}
    },
    // 修改添加
    directorysUpdate(val) {
      this.title = "添加目录";
      this.dialogVisible = true;
      this.content = val;
    },
    // 添加弹窗
    addDirectorys() {
      this.title = "添加目录";
      this.dialogVisible = true;
      this.type = 1;
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
