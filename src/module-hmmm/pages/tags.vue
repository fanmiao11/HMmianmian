<template>
  <div class="container">
    <div>
      <subjectsTitle
        total="10"
        seachName="标签名称"
        addname="新增标签"
        :isShowState="true"
      />

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%; margin-top: 15px"
        :header-cell-style="headerColor"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="subjectName" label="所属学科"></el-table-column>
        <el-table-column prop="tagName" label="目录名称"></el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="filterTime"
          min-width="150px"
        >
        </el-table-column>
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
            <el-button type="text" :disabled="row.state === 1">修改</el-button>
            <el-button
              type="text"
              :disabled="row.state === 1"
              @click="removeTags(row.id)"
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
    </div>
  </div>
</template>

<script>
import subjectsTitle from "../components/subjects-components/subjects-title.vue";
import { list, changeState, remove } from "@/api/hmmm/tags";
import dayjs from "dayjs";

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
      loading: false,
      state: 1,
      id: 0,
    };
  },
  components: {
    subjectsTitle,
  },
  created() {
    this.getTagsList();
  },
  methods: {
    // 获取标签列表
    async getTagsList() {
      this.loading = true;
      const {
        data: { counts, items },
      } = await list({ page: this.page, pagesize: this.pagesize });
      this.tableData = items;
      this.counts = counts;
      this.loading = false;
      console.log(items);
    },
    // 点击下一页和页码重新获取数据
    currentChange(index) {
      this.page = index;
      this.getTagsList();
    },
    // 点击每页显示多少条
    sizeChange(val) {
      this.pagesize = val;
      this.getTagsList();
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
        this.getTagsList();
        this.$message.success("操作成功");
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    // 点击删除
    async removeTags(id) {
      try {
        await this.$confirm("此操作将永久删除该标签, 是否继续?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await remove({ id });
        this.getTagsList();
        this.$message.success("删除成功");
      } catch (error) {}
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
