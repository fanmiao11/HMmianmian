<template>
  <div>
    <el-row class="breadcrumb" v-if="isBreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-row type="flex">
      <el-col>
        <el-form
          ref="form"
          label-width="80px"
          size="small"
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item :label="seachName" style="width: 280px">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="状态" v-if="isShowState">
            <el-select placeholder="请选择" value="">
              <el-option label="禁用" value="shanghai"></el-option>
              <el-option label="启用" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-button plain size="small">清除</el-button>
          <el-button type="primary" size="small">搜索</el-button>
        </el-form>
      </el-col>

      <el-col :span="13">
        <el-row type="flex" justify="end">
          <el-button type="text" icon="el-icon-back" v-if="isReturn"
            >返回学科</el-button
          >
          <el-button type="success" icon="el-icon-edit" size="small">
            {{ addname }}
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-alert
      :title="`数据一共${total}条:曾小彬`"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显显示面包屑默认不显示
    isBreadcrumb: {
      type: Boolean,
      default: false,
    },
    // 第一个搜索框label的名称
    seachName: {
      type: String,
      default: "标签名称",
    },
    // 是否显示第二个状态框默认不显示
    isShowState: {
      type: Boolean,
      default: false,
    },
    // 是否显示倒数第二个返回学科的button
    isReturn: {
      type: Boolean,
      default: false,
    },
    // 新增数据的文字
    addname: {
      type: String,
      default: "新增",
    },
    // 显示多少条数据
    total: {
      type: [String, Number],
      default: "0",
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style scoped>
.breadcrumb {
  padding-bottom: 15px;
  border-bottom: 1px #f4f4f5 solid;
  margin-bottom: 20px;
}
</style>
