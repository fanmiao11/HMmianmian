<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :headerCellStyle="tableTh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="phone" label="联系电话"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="permission_group_title" label="权限组名称">
      </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            :plain="true"
            @click="$emit('updatePermission', row)"
          ></el-button>
          <el-button
            v-if="row.id !== 2"
            type="danger"
            icon="el-icon-delete"
            circle
            :plain="true"
            @click="$emit('deletePermission', row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableTh: {
        backgroundColor: "#fafafa",
        borderBottom: "2px solid #e8e8e8",
      },
    };
  },
  props: {
    tableData: {
      type: Array,
      default: [],
    },
  },

  created() {},

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped lang="less"></style>
