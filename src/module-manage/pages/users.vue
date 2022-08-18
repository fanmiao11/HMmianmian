<template>
  <div>
    <el-card>
      <!-- 搜索 -->
      <SeachTool btnText="新增用户" @onsave="onsave">
        <span slot="downtag"> 共{{ total }}条记录 ---- 沈寅武</span>
      </SeachTool>
      <br />
      <!-- 表单 -->
      <UsersTable
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
    <UserAdd
      ref="UserShow"
      :text="text"
      :pageTitle="pageTitle"
      :ruleInline="ruleInline"
      :formBase="formBase"
      :dialogFormVisible="dialogFormVisible"
      :PermissionGroupsList="PermissionGroupsList"
      @handleCloseModal="handleCloseModal"
      @newDataes="onSuccess"
    />
  </div>
</template>

<script>
import UserAdd from "../components/user-add.vue";
import PageTool from "../components/page-tool.vue";
import SeachTool from "../components/SeachTool.vue";
import UsersTable from "../components/usersTable.vue";
import { list, remove, detail, update } from "@/api/base/users";
import { simple } from "@/api/base/permissions";

import Cookies from "js-cookie";

export default {
  data() {
    return {
      total: 100,
      paginationPage: 1,
      paginationPagesize: Cookies.get("usersPagesize") || 10,
      tableData: [],
      text: "创建",
      pageTitle: "用户",
      ruleInline: {},
      formBase: {
        sex: 1,
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: "",
        phone: "",
        introduction: "",
      },
      dialogFormVisible: false,
      PermissionGroupsList: [],
    };
  },

  created() {
    this.getPermissionsList();
  },
  components: {
    UserAdd,
    PageTool,
    SeachTool,
    UsersTable,
  },
  methods: {
    // 渲染
    async getPermissionsList() {
      const { data } = await list({
        page: this.paginationPage,
        pagesize: this.paginationPagesize,
      });
      this.tableData = data.list;
      this.total = data.counts;
      this.paginationPage = data.page;
      this.paginationPagesize = data.pagesize;
      // console.log(data);
    },
    // 获取权限组
    async getPermission() {
      const { data } = await simple();
      this.PermissionGroupsList = data;
      // console.log(data);
    },
    // 隐藏
    handleCloseModal() {
      this.handleResetForm();
      this.$refs.UserShow.dialogFormH();
    },
    // 成功
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
      Cookies.set("usersPagesize", pagesize);
      this.usersPagesize = pagesize;
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
      console.log(row);

      const { data } = await detail(row);
      // console.log(data);
      this.formBase = data;

      // console.log(this.formBase);
      this.UserShow();
    },
    // 开启弹层
    UserShow() {
      this.getPermission();
      this.$refs.UserShow.dialogFormV();
    },
    // 表单重置
    handleResetForm() {
      this.formBase = {
        id: "",
        sex: 1,
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: "",
        phone: "",
        introduction: "",
      };
    },
    // 新增
    onsave() {
      this.text = "创建";
      this.UserShow();
    },
  },
};
</script>

<style scoped lang="less"></style>
