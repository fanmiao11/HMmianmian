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
              <el-select
                v-model="reqListParams.province"
                clearable
                filterable
                placeholder="请选择"
                @change="handleProvince"
              >
                <el-option
                  v-for="item in citySelect.province"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-select
                v-model="reqListParams.city"
                clearable
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in citySelect.cityDate"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
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
              <el-select v-model="reqListParams.state" placeholder="请选择">
                <el-option label="启用" value="1"> </el-option>
                <el-option label="禁用" value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 40px">
            <el-button size="mini" @click="empty">清空</el-button>
            <el-button size="mini" type="primary" @click="searchFn"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit"
              @click="addItem"
              >新增用户</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!-- 警告栏 -->
      <el-alert type="info" show-icon :closable="false">
        共 {{ counts }} 条记录 --- 徐庆哲</el-alert
      >
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#fafafa' }"
      >
        <el-table-column prop="id" label="序号" width="80"> </el-table-column>
        <el-table-column prop="number" label="企业编号"> </el-table-column>
        <el-table-column prop="company" label="企业名称"> </el-table-column>
        <el-table-column prop="tags" label="所属公司" width="80">
        </el-table-column>
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
          <template slot-scope="{ row }">
            <!-- 编辑按钮 -->
            <el-button
              icon="el-icon-edit"
              circle
              class="editBtn"
              @click="editBtn(row)"
            ></el-button>
            <!-- 启用/禁止 -->
            <el-button
              v-if="row.state === 1"
              icon="el-icon-close"
              circle
              class="closeBtn"
              @click="stateBtn(row)"
            ></el-button>
            <el-button
              v-else
              icon="el-icon-check"
              circle
              class="check"
              @click="stateBtn(row)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              icon="el-icon-delete"
              circle
              class="deleteBtn"
              @click="delBtn(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <my-pagination
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        :total="counts"
      ></my-pagination>
    </el-card>
    <add-companys
      ref="add"
      :titleInfo="titleInfo"
      :formBase="formBase"
      @newDataes="newDataesFn"
    ></add-companys>
  </div>
</template>

<script>
import { list, disabled, remove } from "@/api/hmmm/companys.js";
import { status } from "@/api/hmmm/constants";
import MyPagination from "@/components/Pagination";
import { provinces, citys } from "@/api/hmmm/citys.js";
import AddCompanys from "../components/companys-add.vue";
import dayjs from "dayjs";
export default {
  name: "companys",
  data() {
    return {
      tableData: [], // 表格内容
      counts: 0,
      // 用于请求table列表数据
      reqListParams: {
        page: 1, //当前页数
        pagesize: 10, //页尺寸
        tags: null, //标签名称
        province: "", //企业所在城市
        city: "", //企业所在区
        shortName: "", //企业简称
        state: null, //状态
      },
      citySelect: {
        province: [],
        cityDate: [],
      },
      titleInfo: { text: "创建", pageTitle: "用户" },
      formBase: {
        shortName: "",
        company: "",
        province: "",
        tags: "",
        remarks: "",
        isFamous: "",
        city: "",
      },
    };
  },

  created() {
    this.getTableList(this.reqListParams);
    this.getCityData();
  },

  methods: {
    // 获取列表
    async getTableList(params) {
      const { data } = await list(params);
      data.items.forEach((ele) => {
        if (ele.isFamous === 1) {
          ele.isFamous = true;
        } else {
          ele.isFamous = false;
        }
      });
      this.counts = data.counts;
      this.tableData = data.items;
    },
    // 格式化时间
    formatTime(row, column, cellValue, index) {
      // console.log(cellValue);
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    // 格式化数据
    formatStatus(row, column, cellValue, index) {
      const findItem = status.find((ele) => {
        return ele.value === cellValue;
      });
      return findItem ? findItem.label : "未知";
    },
    // 获取省
    getCityData: function () {
      this.citySelect.province = provinces();
    },
    // 选省获取到市
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e);
      this.reqListParams.city = this.citySelect.cityDate[0];
    },
    // 清除按钮
    empty() {
      this.reqListParams = {
        page: 1, //当前页数
        pagesize: 10, //页尺寸
        tags: null, //标签名称
        province: "", //企业所在城市
        city: "", //企业所在区
        shortName: "", //企业简称
        state: null, //状态
      };
    },
    searchFn() {
      this.getTableList(this.reqListParams);
    },
    pageChange(num) {
      this.reqListParams.page = num;
      this.getTableList(this.reqListParams);
    },
    pageSizeChange(pageSize) {
      // console.log(pageSize);
      this.reqListParams.pagesize = pageSize;
      this.getTableList(this.reqListParams);
    },
    addItem() {
      this.titleInfo.text = "新增";
      this.$refs.add.dialogFormVisible = true;
    },
    newDataesFn() {
      this.getTableList(this.reqListParams);
      this.formBase = {
        shortName: "",
        company: "",
        province: "",
        tags: "",
        remarks: "",
        isFamous: "",
      };
    },
    editBtn(row) {
      this.titleInfo.text = "编辑";
      this.formBase = row;
      this.$refs.add.dialogFormVisible = true;
    },
    async stateBtn(row) {
      if(row.state===1){
        await disabled(row.id,0)
      }
      if(row.state===0){
        await disabled(row.id,1)
      }
      this.getTableList(this.reqListParams);
    },
    async delBtn(id) {
      await remove(id);
      // this.getTableList(this.reqListParams);
      this.pageChange(1)
    },
  },
  components: {
    MyPagination,
    AddCompanys,
  },
};
</script>

<style scoped lang="scss">
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
  .check {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
}
</style>
