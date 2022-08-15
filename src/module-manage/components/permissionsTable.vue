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
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" align="center" label="用户名" width="575">
      </el-table-column>
      <el-table-column label="日期" sortable width="573">
        <template slot-scope="{ row }">{{
          row.update_date.split("T")[0]
        }}</template>
      </el-table-column>
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
