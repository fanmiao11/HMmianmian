<template>
  <el-dialog
    :modal="false"
    @close="onClose"
    :title="title"
    :visible="visible"
    width="30%"
  >
    <el-form ref="form" :model="formDate" :rules="rules" label-width="80px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="formDate.name"></el-input>
      </el-form-item>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSeve">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, add } from "@/api/hmmm/subjects.js";
export default {
  name: "subjectUpdate",
  props: {
    types: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
      require: true,
    },
    centent: {
      type: Object,
    },
  },
  data() {
    return {
      formDate: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
      },
      value: true,
    };
  },
  methods: {
    // 点击关闭
    onClose() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    // 确认修改按钮
    async onSeve() {
     await this.$refs.form.validate();
      if (this.types === 1) {
        try {
          await update({
            id: this.centent.id,
            subjectName: this.formDate.name,
            isFrontDisplay: this.value ? 1 : 0,
          });

          this.$message.success("修改成功");
          this.$emit("refresh");
        } catch (error) {
          this.$message.error("修改失败");
        } finally {
          this.onClose();
        }
      } else {
        try {
          await add({
            subjectName: this.formDate.name,
            isFrontDisplay: this.value ? 1 : 0,
          });
          this.$message.success("添加成功");
          this.$emit("refresh");
          this.onClose();
        } catch (error) {
          this.$message.error("添加失败");
        }
      }
    },
  },
  watch: {
    centent: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.formDate.name = newVal?.subjectName;
        if (!newVal) return (this.value = true);
        if (newVal?.isFrontDisplay) {
          this.value = true;
        } else {
          this.value = false;
        }
      },
    },
  },
};
</script>

<style scoped lang="less"></style>
