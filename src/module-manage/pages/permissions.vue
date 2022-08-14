<template>
  <div>
    <el-card>
      <!-- 搜索 -->
      <SeachTool btnText="新增权限组" @onsave="dialogFormVisible = true">
        <span slot="downtag"> 共{{ total }}条记录</span>
      </SeachTool>
      <br />
      <!-- 表单 -->
      <PermissionsTable
        :tableData="tableData"
        @deletePermission="deletePermission"
        @updatePermission="updatePermission"
      />
      <!-- 分页 -->
      <PageTool
        :total="total"
        :paginationPage="paginationPage"
        :paginationPagesize="paginationPagesize"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </el-card>
    <!-- 添加弹层 -->
    <PermissionsAdd
      :text="text"
      :pageTitle="pageTitle"
      :ruleInline="ruleInline"
      :formBase="formBase"
      :dialogFormVisible="dialogFormVisible"
      @handleCloseModal="handleCloseModal"
      @onSuccess="onSuccess"
    />
  </div>
</template>

<script>
import PermissionsAdd from "../components/permissions-add.vue";
import PageTool from "../components/page-tool.vue";
import SeachTool from "../components/SeachTool.vue";
import PermissionsTable from "../components/permissionsTable.vue";
import { list, remove, detail } from "@/api/base/permissions";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      total: 100,
      paginationPage: 1,
      paginationPagesize: Cookies.get("paginationPagesize") || 10,
      tableData: [],
      text: "创建",
      pageTitle: "权限组",
      ruleInline: {},
      formBase: {
        id: 0,
        create_date: "",
        title: "",
        permissions: [],
      },
      dialogFormVisible: false,
    };
  },

  created() {
    this.getPermissionsList();
  },
  components: {
    PermissionsAdd,
    PageTool,
    SeachTool,
    PermissionsTable,
  },
  methods: {
    async getPermissionsList() {
      const { data } = await list({
        page: this.paginationPage,
        pagesize: this.paginationPagesize,
      });
      this.tableData = data.list;
      this.total = data.counts;
      this.paginationPage = data.page;
      this.paginationPagesize = data.pagesize;
      console.log(data);
    },
    handleCloseModal() {
      this.dialogFormVisible = false;
    },
    onSuccess() {
      this.getPermissionsList();
    },
    // 进入某一页
    pageChange(page) {
      this.paginationPage = page;
      this.getPermissionsList();
    },
    // 每页显示信息条数
    pageSizeChange(pagesize) {
      Cookies.set("paginationPagesize", pagesize);
      this.paginationPagesize = pagesize;
      this.getPermissionsList();
    },
    // 删除
    async deletePermission(row) {
      await this.$confirm("是否删除该数据？");
      await remove(row);
      this.getPermissionsList();
    },
    // 修改
    async updatePermission(row) {
      this.text = "编辑";

      const { data } = await detail(row);

      this.formBase = data;
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style scoped lang="less"></style>
