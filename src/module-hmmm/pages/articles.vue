<template>
  <div class="articles-container">
    <el-card class="box-card"
      ><el-form ref="form" :model="reqListParams" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="resData.keyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <!-- v-model="reqListParams.state" -->
              <el-select placeholder="请选择" v-model="resData.state">
                <el-option label="启用" value="1"> </el-option>
                <el-option label="禁用" value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 40px">
            <el-button size="mini" @click="empty" @empty="empty"
              >清空</el-button
            >
            <el-button size="mini" type="primary" @click="searchFn"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="6" style="text-align: right">
            <el-button size="mini" type="success" icon="el-icon-edit"
              >新增技巧</el-button
            >
            <!-- @click="addItem" -->
          </el-col>
        </el-row>
      </el-form>
      <!-- 警示框 -->
      <el-alert type="info" show-icon :closable="false">
        共{{ count }}条记录</el-alert
      >
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#fafafa' }"
      >
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="visits" label="阅读数" width="80">
        </el-table-column>
        <el-table-column prop="username" label="录入人" width="130">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          :formatter="formatTime"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80"
          :formatter="formatState"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text">预览</el-button>
            <el-button
              type="text"
              v-if="row.state === 1"
              @click="changState(row.id, row.state)"
              >禁用</el-button
            >
            <el-button type="text" v-else @click="changState(row.id, row.state)"
              >启用</el-button
            >
            <el-button type="text" :disabled="row.state === 1">修改</el-button>
            <el-button type="text" :disabled="row.state === 1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <my-pagination
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        :total="count"
      ></my-pagination>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import MyPagination from "@/components/Pagination";
import { list, changeState } from "@/api/hmmm/articles.js";
export default {
  name: "articles",
  data() {
    return {
      reqListParams: {},
      tableData: [],
      resData: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        keyword: null, //	关键字
        state: null, //	状态
      },
      count: null, // 数据总数
    };
  },

  methods: {
    // 请求渲染列表
    async getList(params) {
      const { data } = await list(params);
      this.count = data.counts;
      this.tableData = data.items;
      console.log(data);
    },
    formatTime(row, column, cellValue, index) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    formatState(row, column, cellValue, index) {
      if (cellValue === 1) {
        return "已启用";
      } else {
        return "已禁用";
      }
    },
    pageChange(num) {
      this.resData.page = num;
      this.getList(this.resData);
    },
    pageSizeChange(pageSize) {
      // console.log(pageSize);
      this.resData.pagesize = pageSize;
      this.getList(this.resData);
    },
    // 清除
    empty() {
      this.resData.keyword = null;
      this.resData.state = null;
    },
    searchFn() {
      this.resData.page = 1;
      this.getList(this.resData);
    },
    async changState(id, flag) {
      console.log(id);
      console.log(flag);
      let state;
      if (flag === 1) {
        state = 0;
      } else {
        state = 1;
      }
      const res = await changeState(id, state);
      this.getList(this.resData);
    },
  },

  created() {
    this.getList(this.resData);
  },

  components: { MyPagination },
};
</script>

<style scoped lang="scss">
.articles-container {
  padding: 10px;
  ::v-deep .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  ::v-deep .el-form-item__label {
    line-height: 32px;
  }
  .el-button--mini {
    height: 32px;
  }
  ::v-deep .el-alert__icon.is-big {
    font-size: 16px;
    width: 16px;
  }
  ::v-deep .el-alert .el-alert__description {
    font-size: 12px;
    margin: 0 0;
  }
  ::v-deep .el-alert {
    margin-bottom: 20px;
  }
}
</style>
