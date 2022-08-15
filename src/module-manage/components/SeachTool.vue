<template>
  <div>
    <el-row type="flex">
      <el-col v-if="isShowLeft">
        <el-form
          ref="form"
          size="small"
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item style="width: 200px">
            <el-input v-model="seach" placeholder="根据用户名搜索"></el-input>
          </el-form-item>
          <el-button plain size="small">清除</el-button>
          <el-button type="primary" size="small">搜索</el-button>
        </el-form>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-button size="small" type="success" @click="$emit('onsave')"
            ><i class="el-icon-edit"></i>{{ btnText }}</el-button
          >
        </el-row>
      </el-col>
    </el-row>
    <el-tag
      v-if="isShowLeft"
      type="info"
      style="
        width: 100%;
        color: #909399;
        background-color: #f4f4f5;
        border-radius: 4px;
      "
    >
      <i :class="downIcon"> </i>
      <slot name="downtag" />
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "PageTools",
  data() {
    return {
      seach: "",
    };
  },
  props: {
    downIcon: {
      type: String,
      default: "el-icon-info",
    },
    isShowLeft: {
      type: Boolean,
      default: true,
    },
    btnText: {
      type: String,
      default: "按钮",
    },
  },
  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
