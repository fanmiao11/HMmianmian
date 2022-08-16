<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-13 10:54:14
 * @LastEditors: sj
 * @LastEditTime: 2022-08-15 00:09:00
-->
<template>
  <el-table
    :data="tableData"
    :header-row-style="{
      backgroundColor: '#fafafa',
      borderBottom: '2px solid #e8e8e8',
    }"
    style="width: 100%"
  >
    <el-table-column type="selection" width="55" v-if="isShowCheckBox">
    </el-table-column>
    <el-table-column type="index" label="序号" width="180" v-if="isShowIndex">
    </el-table-column>
    <el-table-column
      v-for="(item, index) in tableHeadArr"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :formatter="formatter"
      :width="item.width"
    >
      <template slot-scope="scope">
        <div v-if="item.label === '题干'" v-html="scope.row.question"></div>
        <div
          v-else
          v-html="formatter(scope.row, scope.column, scope.row[item.prop])"
        ></div>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      :fixed="isFixedOpe"
      label="操作"
      v-if="isShowOpe"
      :width="widthOpe"
    >
      <template slot-scope="scope">
        <slot :row="scope.row"> </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  difficulty,
  questionType,
  status,
  chkType,
  publishType,
} from "@/api/hmmm/constants";
import { formatConstants } from "../../module-hmmm/utils";
import dayjs from "dayjs";
export default {
  props: {
    //是否显示多选框
    isShowCheckBox: {
      type: Boolean,
      default: false,
    },
    // 是否显示序号
    isShowIndex: {
      type: Boolean,
      default: false,
    },
    // 是否显示操作
    isShowOpe: {
      type: Boolean,
      default: true,
    },
    // 表头数组
    tableHeadArr: {
      type: Array,
    },
    // 表格信息数组
    tableData: {
      type: Array,
    },
    // 操作列是否固定
    isFixedOpe: {
      type: [Boolean, String],
      default: false,
    },
    widthOpe: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    formatter(row, column, cellValue) {
      if (
        column.label === "创建日期" ||
        column.label === "录入时间" ||
        column.label === "操作时间"
      ) {
        return dayjs(row.addDate).format("YYYY.MM.DD HH:mm:ss");
      } else if (column.label === "难度") {
        return formatConstants(difficulty, cellValue);
      } else if (column.label === "题型") {
        return formatConstants(questionType, cellValue);
      } else if (column.label === "状态") {
        return formatConstants(status, cellValue);
      } else if (column.label === "审核状态") {
        return formatConstants(chkType, cellValue);
      } else if (column.label === "发布状态") {
        return formatConstants(publishType, cellValue);
      }
      return cellValue;
    },
  },
};
</script>

<style scoped lang="less">
::v-deep.el-table th.el-table__cell {
  background-color: unset;
}
</style>
