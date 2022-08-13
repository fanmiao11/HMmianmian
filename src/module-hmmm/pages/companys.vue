<template>
  <div class="company-container">
    <el-card class="box-card">
      <!-- 顶部搜索 -->
      <el-form ref="form" :model="reqListParams" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="标签名称">
              <el-input
                v-model="reqListParams.tags"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-input
                v-model="reqListParams.province"
                placeholder="请选择"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-input
                v-model="reqListParams.city"
                placeholder="请选择"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input
                v-model="reqListParams.shortName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-input v-model="reqListParams.state"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 40px">
            <el-button size="mini">清空</el-button>
            <el-button size="mini" type="primary">搜索</el-button>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button size="mini" type="success" icon="el-icon-edit"
              >新增用户</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!-- 警告栏 -->
      <el-alert type="info" show-icon :closable="false">
        共 {{ counts }} 条记录</el-alert
      >
      <!-- table -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80"> </el-table-column>
        <el-table-column prop="number" label="企业编号"> </el-table-column>
        <el-table-column prop="company" label="企业名称"> </el-table-column>
        <el-table-column prop="tags" label="标签" width="80"> </el-table-column>
        <el-table-column prop="creatorID" label="创建者" width="80">
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="formatTime"
        >
        </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80"
          :formatter="formatStatus"
        >
        </el-table-column>
        <el-table-column label="操作" width="180">
          <el-button icon="el-icon-edit" circle class="editBtn"></el-button>
          <el-button icon="el-icon-close" circle class="closeBtn"></el-button>
          <el-button icon="el-icon-delete" circle class="deleteBtn"></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/hmmm/companys.js";
import baseApi from "@/api/base/baseApi";
import dayjs from "dayjs";
export default {
  name: "companys",
  data() {
    return {
      tableData: [], // 表格内容
      counts: "",
      // 用于请求table列表数据
      reqListParams: {
        page: 1, //当前页数
        pagesize: 10, //页尺寸
        tags: null, //标签名称
        province: "", //企业所在地省份
        city: "", //企业所在城市
        shortName: "", //企业简称
        state: null, //状态
      },
    };
  },

  created() {
    this.getTableList(this.reqListParams);
  },

  methods: {
    // 获取列表
    async getTableList(params) {
      const { data } = await list(params);
      console.log(data);
      this.counts = data.counts;
      this.tableData = data.items;
    },
    formatTime(row, column, cellValue, index) {
      // console.log(cellValue);
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    formatStatus(row, column, cellValue, index) {
      const findItem = baseApi.companysStatus.find((ele) => {
        return ele.id === cellValue;
      });
      return findItem ? findItem.value : "未知";
    },
  },
};
</script>

<style scoped lang="less">
.company-container {
  padding: 20px;
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
  .editBtn {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .closeBtn {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  .deleteBtn {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}
</style>
