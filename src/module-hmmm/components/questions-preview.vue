<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-13 17:59:01
-->
<template>
  <div class='container'>
    <el-dialog
  title="题目预览"
  :visible.sync="dialogPreveiew"
  width="30%"
  >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
