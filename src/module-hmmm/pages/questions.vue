<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-13 16:54:18
-->
<template>
  <div class='container'>
    <el-card>
      <el-alert
    :title="`数据一共 ${counts} 条`"
    type="info"
    show-icon
    style="margin-bottom: 15px"
    >
  </el-alert>
    <CommTable
    :tableHeadArr="tableHeadArr"
    :tableData="tableData"
    widthOpe="200"
    >
   <template v-slot="scope">
   <el-button  plain type="primary" icon="el-icon-view" circle @click="click(scope.row)"></el-button>
  <el-button  plain type="success" icon="el-icon-edit" circle></el-button>
  <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
  <el-button  plain type="warning" icon="el-icon-check" circle></el-button>
  </template>
    </CommTable>
    </el-card>

  </div>
</template>

<script>
import {list } from '@/api/hmmm/questions'
import CommTable from '@/components/CommTable'
export default {
  data(){
    return {
      tableHeadArr:[
        {prop:'number', label: '试题编号'},
        {prop:'subject', label: '学科'},
        {prop:'catalog', label: '目录'},
        {prop:'question', label: '题干'},
        {prop:'questionType', label: '题型'},
        {prop:'addDate', label: '录入时间'},
        {prop:'difficulty', label: '难度'},
        {prop:'creator', label: '录入人'},
      ],
      tableData:[],
      counts:0,
    }
  },
  created(){
    this.getList()
  },
  methods:{
    async getList(){
      const res = await list()
      console.log(res);
      this.tableData = res.data.items
      this.counts = res.data.counts
    },
    click(row){
      console.log(111);
      console.log(row);
    }
  },
      components:{
    CommTable
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 15px 10px;
}
</style>
