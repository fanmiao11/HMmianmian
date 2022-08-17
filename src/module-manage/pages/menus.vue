<template>
  <div>
    <el-card>
      <!-- 搜索 -->
      <SeachTool btnText="添加菜单" :isShowLeft="false" />
      <br />
      <!-- 表单 -->

      <TreeTable
        :treeStructure="true"
        :data="tableData"
        :columns="columns"
        :defaultExpandAll="true"
      />

      <!-- 



       -->
    </el-card>
    <!-- 添加弹层 -->
    <!-- <MenuAdd
      :text="text"
      :pageTitle="pageTitle"
      :ruleInline="ruleInline"
      :formBase="formBase"
      :dialogFormVisible="dialogFormVisible"
      @handleCloseModal="handleCloseModal"
      @onSuccess="onSuccess"
    /> -->
  </div>
</template>

<script>
import TreeTable from "@/components/TreeTable";
import MenuAdd from "../components/menu-add.vue";
import SeachTool from "../components/SeachTool.vue";
import { list, remove, detail } from "@/api/base/menus";

export default {
  data() {
    return {
      tableData: [],
      columns: [
        {
          text: "标题",
          value: "title",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("i", {
                class: "ivu-icon " + params.row.icon,
                // class: "el-icon-view",

                style: {
                  marginLeft: `${20 * params.row.layer}px`,
                  marginRight: "5px",
                  fontSize: "16px",
                },
              }),
              h("i", params.row.title),
            ]);
          },
        },
        {
          text: "权限点代码",
          value: "code",
        },
      ],
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
    this.getMenuList();
  },
  components: {
    SeachTool,
    MenuAdd,
    TreeTable,
  },
  methods: {
    async getMenuList() {
      const { data } = await list();
      this.tableData = data;

      console.log(data);
    },
    handleCloseModal() {
      this.dialogFormVisible = false;
      this.formBase = {
        id: 0,
        create_date: "",
        title: "",
        permissions: [],
      };
    },
    onSuccess() {
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
