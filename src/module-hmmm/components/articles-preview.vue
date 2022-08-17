<template>
  <div class="add-form">
    <el-dialog
      title="预览文章"
      :visible.sync="dialogFormVisible"
      @close="dialogFormH()"
    >
      <h2 v-html="previewData.title"></h2>
      <div class="info">
        <span v-html="previewData.createTime"></span>
        <span v-html="previewData.username"></span>
        <i class="el-icon-view" style="margin-right: 10px"></i>
        <span v-html="previewData.visits"></span>
      </div>
      <div v-html="previewData.articleBody" class="content"></div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "preview",
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  computed: {},
  props: {
    previewData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
  },
  // 挂载结束

  mounted: function () {},
  // 创建完毕状态
  created() {},
};
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  width: 800px;
  .el-dialog__body {
    h2 {
      margin: 0;
    }
    .info {
      margin-top: 10px;
      margin-bottom: 15px;
      span {
        margin-right: 10px;
      }
    }
    .content {
      border-top: 1px dashed #ccc;
      background: #f5f5f5;
      padding: 10px;
    }
  }
}
</style>
