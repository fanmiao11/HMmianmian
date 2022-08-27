<template>
  <el-dialog
    :modal="false"
    @close="onClose"
    @open="openTags"
    :title="title"
    :visible="visible"
    width="30%"
  >
    <el-form label-width="80px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="所属学科" prop="subjectID">
        <el-select
          v-model="formData.subjectID"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in formData.subjectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- prop="directoryName" -->
      <el-form-item label="标签名称" prop="directoryName">
        <el-input
          v-model="formData.directoryName"
          placeholder="请输入标签名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSeve">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { simple } from "@/api/hmmm/subjects.js";
import { update as updateTags, add } from "@/api/hmmm/directorys.js";
export default {
  name: "tagsUpdate",
  props: {
    types: {
      type: Number,
    },
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
      require: true,
    },
    content: {
      type: Object,
    },
  },
  data() {
    return {
      formData: {
        subjectID: "",
        value: "",
        directoryName: "",
        subjectList: [],
      },
      rules: {
        subjectID: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        directoryName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 点击关闭
    onClose() {
      this.formData.directoryName = "";
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    created() {
      this.openTags();
    },
    // 获取学科简单列表
    async openTags() {
      const { data } = await simple({});
      this.formData.subjectList = data;
    },
    // 确认修改按钮
    async onSeve() {
      await this.$refs.form.validate();
      if (this.types == 1) {
        try {
          await add({
            subjectID: this.formData.subjectID,
            directoryName: this.formData.directoryName,
          });
          this.$message.success("添加成功");
          this.$emit("refresh");
          this.onClose();
        } catch (error) {
          this.$message.error("添加失败");
        }
      } else {
        try {
          await updateTags({
            id: this.content.id,
            subjectID: this.formData.subjectID,
            directoryName: this.formData.directoryName,
          });
          this.$message.success("修改成功");
          this.$emit("refresh");
          this.onClose();
        } catch (error) {
          this.$message.error("修改失败");
        }
      }
    },
  },
  watch: {
    content: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal);
        this.formData.subjectID = newVal?.subjectID;
        this.formData.directoryName = newVal?.directoryName;
        this.formData.value = newVal?.subjectName;
      },
    },
  },
};
</script>

<style scoped lang="less"></style>
