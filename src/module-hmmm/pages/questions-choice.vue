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
    <el-card class="box-card">
      <!-- 新增按钮 -->
      <el-row type="flex" class="row-bg" justify="end">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="small"
          @click="$router.push('/questions/new')"
        >
          新增试题</el-button
        >
      </el-row>
      <!-- 搜索表单 -->
      <search-form @search="search"></search-form>
      <!-- tab栏 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"> </el-tab-pane>
        <el-tab-pane label="待审核" name="waiting"></el-tab-pane>
        <el-tab-pane label="已审核" name="over"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="reject"></el-tab-pane>
      </el-tabs>
      <!-- 提示 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        type="info"
        show-icon
        style="margin-bottom: 15px"
      />
      <!-- 表格 -->
      <comm-table
        isFixedOpe="right"
        :tableHeadArr="tableHeadArr"
        :tableData="tableData"
        widthOpe="200px"
      >
        <!-- 操作 -->
        <template v-slot="scope">
          <el-button type="text" @click="preview(scope)">预览</el-button>
          <el-button
            type="text"
            :disabled="scope.row.chkState !== 0"
            @click="chk(scope)"
            >审核</el-button
          >
          <el-button
            type="text"
            :disabled="scope.row.publishState === 1"
            @click="
              $router.push({
                path: '/questions/new',
                query: {
                  id: scope.row.id,
                },
              })
            "
            >修改</el-button
          >
          <el-button type="text" @click="publishClick(scope.row)">{{
            scope.row.publishState === 0 ? "上架" : "下架"
          }}</el-button>
          <el-button
            type="text"
            :disabled="scope.row.publishState === 1"
            @click="delquestion(scope)"
            >删除</el-button
          >
        </template>
      </comm-table>
      <!-- 分页 -->
      <pagination
        :pageSizes="pageSizes"
        :pageSize="pageSize"
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
    <!-- 题目审核 -->
    <el-dialog title="题目审核" :visible.sync="chkDialogVisible" width="30%">
      <el-form>
        <el-form-item>
          <el-radio-group v-model="chkForm.chkState">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            v-model="chkForm.chkRemarks"
            placeholder="请输入审核意见"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="chkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choiceCheckFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchForm from "../components/search-form.vue";
import CommTable from "@/components/CommTable";
import Pagination from "@/components/Pagination";
import QuestionsPreview from "../components/questions-preview.vue";

import {
  choice,
  choiceCheck,
  choicePublish,
  remove,
  detail,
} from "@/api/hmmm/questions.js";

export default {
  components: {
    SearchForm,
    Pagination,
    CommTable,
    QuestionsPreview,
  },
  data() {
    return {
      activeName: "first",
      // 表格
      tableHeadArr: [
        { prop: "number", label: "试题编号", width: "120px" },
        { prop: "subject", label: "学科", width: "120px" },
        { prop: "catalog", label: "目录", width: "120px" },
        { prop: "questionType", label: "题型", width: "120px" },
        { prop: "question", label: "题干", width: "280px" },
        { prop: "addDate", label: "录入时间", width: "180px" },
        { prop: "difficulty", label: "难度", width: "80px" },
        { prop: "creator", label: "录入人", width: "120px" },
        { prop: "chkState", label: "审核状态", width: "120px" },
        { prop: "chkRemarks", label: "审核意见", width: "150px" },
        { prop: "chkUser", label: "审核人", width: "120px" },
        { prop: "publishState", label: "发布状态", width: "150px" },
      ],
      tableData: [],
      // 分页
      pageSizes: [5, 10, 20, 50],
      pageSize: 5,
      pageNum: 1,
      counts: 0,
      // 题目预览
      isShowDialogPreveiew: false, // 是否显示题目预览弹框
      detailInfo: {}, // 基础题库详情
      // 题目审核
      chkDialogVisible: false,
      chkForm: {
        id: "",
        chkState: 1,
        chkRemarks: "",
  },
    };
  },
  created() {
    this.getChoice();
  },
  methods: {
    // 搜索
    search(form) {
      // console.log(form);
      let res = {};
      // 点击清除时 如果搜索框数据为空 加载全部数据
      for (let k in form) {
        if (form[k]) {
          res = form;
        }
      }
      this.getChoice(res);
    },
    // 点击切换tabs栏
    handleClick() {
      if (this.activeName === "all") {
        // 全部
        // console.log('all')
        this.getChoice();
      } else if (this.activeName === "waiting") {
        // 待审核
        // console.log('waiting');
        this.getChoice({
          chkState: 0,
        });
      } else if (this.activeName === "over") {
        // 已审核
        // console.log('over');
        this.getChoice({
          chkState: 1,
        });
      } else if (this.activeName === "reject") {
        // 已拒绝
        // console.log('reject');
        this.getChoice({
          chkState: 2,
        });
      }
    },
    // 获取精选题库列表
    async getChoice(obj) {
      const { data } = await choice({
        ...obj,
        pagesize: this.pageSize,
        page: this.pageNum,
      });
      this.counts = data.counts;
      this.tableData = data.items;
    },
    // 预览
    async preview({ row }) {
      // console.log(row);
    const { data} = await detail(row)
      this.detailInfo = data
      console.log(this.detailInfo);
      this.isShowDialogPreveiew = true
    },
    // 审核
    chk({ row }) {
      this.chkDialogVisible = true;
      this.chkForm.id = row.id;
    },
    // 提交审核
    async choiceCheckFn() {
      // console.log(this.chkForm);
      if (!this.chkForm.chkRemarks) {
        this.$message.warning("请输入审核意见");
      } else {
        await choiceCheck(this.chkForm);
        this.chkForm = {
          id: "",
          chkState: 1,
          chkRemarks: "",
        };
        this.chkDialogVisible = false;
        this.getChoice();
      }
    },
    // 上下架
    publishClick({ id, publishState }) {
      this.$confirm(
        `您确定${publishState === 0 ? "上架" : "下架"}这道题目吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          if (publishState === 0) {
            // 上架
            await choicePublish({
              id,
              publishState: 1,
            });
          } else {
            // 下架
            await choicePublish({
              id,
              publishState: 0,
            });
          }
          // 更新列表
          this.getChoice();
          // 操作成功提示
          this.$message({
            type: "success",
            message: `${publishState === 0 ? "上架" : "下架"}成功!`,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 删除
    delquestion({ row }) {
      console.log("删除");
      this.$confirm(`此操作将永久删除该题目，是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 删除当前试题
          await remove(row);
          // 更新列表
          this.getChoice();
          // 操作成功提示
          this.$message({
            type: "success",
            message: `删除成功!`,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 进入某一页
    pageChange(pageNum) {
      this.pageNum = pageNum;
      this.getChoice();
    },
    // 改变每页条数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getChoice();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 10px;
  margin: 10px 0;
}
.el-row {
  margin-bottom: 20px;
  margin-right: 10px;
}
.el-button--medium {
  font-size: 12px;
}
/deep/.el-dialog__footer {
  text-align: right !important;
}
</style>
