<template>
  <div class="container">
    <el-card>
      <!-- 搜索 -->
      <SeachTool btnText="添加菜单" :isShowLeft="false" @onsave="addMenuFn" />
      <br />
      <!-- 表单 -->

      <TreeTable
        :treeStructure="true"
        :data="tableData"
        :columns="columns"
        @handleUpdate="handleUpdate"
        @handleDelete="handleDelete"
      />
      <!-- :defaultExpandAll="true" -->
    </el-card>
    <!-- 添加弹层 -->
    <MenuAdd
      :text="text"
      :pageTitle="pageTitle"
      :ruleInline="ruleInline"
      :formMenu="formBase"
      :dialogFormVisible="dialogFormVisible"
      :typeStatus="typeStatus"
      @handleCloseModal="handleCloseModal"
      @onSuccess="onSuccess"
    />
  </div>
</template>

<script>
import TreeTable from "@/components/TreeTable";
import MenuAdd from "../components/menu-add.vue";
import SeachTool from "../components/SeachTool.vue";
import { list, remove, detail } from "@/api/base/menus";

export default {
  components: {
    SeachTool,
    MenuAdd,
    TreeTable,
  },
  data() {
    return {
      tableData: [],
      columns: [
        {
          text: "标题",
          prop: "title",
          width: 200,
          render: (h, params) => {
            // console.log(params.row);
            let icon = "";
            // 如果是权限点 小眼睛图标
            if (params.row.is_point) icon = "el-icon-view";
            // 如果不是权限点 也没有childs
            else if (!params.row.childs) icon = "el-icon-document-remove";
            // 如果有childs
            else icon = "el-icon-folder-opened";
            return h("div", [
              h("span", {
                // 图标
                class: icon,
                // 标题样式
                style: {
                  marginLeft: `${20 * params.row._level}px`,
                  marginRight: "5px",
                  fontSize: "16px",
                },
              }),
              // 标题内容
              h("span", params.row.title),
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
        // create_date: "",
        // title: "",
        // permissions: [],
        pid: "", // 父级Id
        is_point: "", // 是否权限点
        code: "", // 菜单代码
        title: "", // 标题
      },
      dialogFormVisible: false,
      typeStatus: false,
    };
  },

  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const { data } = await list();
      // console.log(data);
      this.tableData = data;
    },
    addMenuFn() {
      // 点击修改后再点击添加，单选框状态改回可用状态
      this.typeStatus = false
      this.dialogFormVisible = true;
    },
    handleCloseModal() {
      this.dialogFormVisible = false;
      this.formBase = {
        id: 0,
        // create_date: "",
        // title: "",
        // permissions: [],
        pid: "", // 父级Id
        is_point: "", // 是否权限点
        code: "", // 菜单代码
        title: "", // 标题
      };
    },
    onSuccess() {
      this.getMenuList();
    },

    // 删除
    async handleDelete(id) {
      console.log("删除");
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await remove({ id });
          this.getMenuList();
          this.$message({
            type: "success",
            message: "成功删除了用户!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 修改
    async handleUpdate(row) {
      console.log("编辑");
      this.text = "编辑";
      const { data } = await detail({ id: row.id });

      console.log(data);
      this.formBase = {
        id: data.id,
        is_point: data.is_point,
        code: data.code,
        title: data.title,
        pid: data.pid,
      };
      this.dialogFormVisible = true;
      this.typeStatus = true;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 10px;
  margin: 10px 0;
}
</style>
