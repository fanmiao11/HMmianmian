<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-15 00:09:35
-->
<template>
  <div class='container'>
    <el-card>
       <!-- 新增试题按钮 -->
       <div class="btn_wrapper">
        <el-button type="success" icon="el-icon-edit" @click="$router.push('/questions/new')">新增试题</el-button>
       </div>
      <!-- 搜索 -->
      <SearchForm @search="onSearch"/>
      <!-- 条数提示 -->
      <el-alert
    :title="`数据一共 ${counts} 条`"
    type="info"
    show-icon
    style="margin-bottom: 15px"
    >
  </el-alert>
  <!-- 列表 -->
    <CommTable
    :tableHeadArr="tableHeadArr"
    :tableData="tableData"
    widthOpe="200"
    >
    <template v-slot="scope">
   <el-button  plain type="primary" icon="el-icon-view" circle @click="clickView(scope.row)"></el-button>
  <el-button  plain type="success" icon="el-icon-edit" circle></el-button>
  <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
  <el-button  plain type="warning" icon="el-icon-check" circle></el-button>
    </template>
    </CommTable>
    <!-- 分页 -->
    <Pagination :pageSize="pagesize.pagesize" :total="counts" @pageChange="toPage" @pageSizeChange="onPageSizeChange"/>
    </el-card>

  <!-- 题目预览弹框 -->
  <QuestionsPreview
  :dialogPreveiew="isShowDialogPreveiew"
  :detailInfo="detailInfo"
  @close="isShowDialogPreveiew=false"/>
  </div>
</template>

<script>
import { list ,detail} from '@/api/hmmm/questions'
import CommTable from '@/components/CommTable'
import Pagination from '@/components/Pagination'
import SearchForm from '../components/search-form.vue'
import QuestionsPreview from '../components/questions-preview.vue'
export default {
  data(){
    return {
      tableHeadArr:[
        {prop:'number', label: '试题编号',},
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
      pagesize: {
       page: 1,
       pagesize: 5
      },
      isShowDialogPreveiew: false ,// 是否显示题目预览弹框
      detailInfo:{}  // 基础题库详情
    }
  },
  created(){
    this.getList(this.pagesize)
  },
  methods:{
    // 获取列表数据
    async getList(data){
      const res = await list(data)
      // console.log(res);
      this.tableData = res.data.items
      this.counts = res.data.counts
    },
    // 点击小眼睛按钮
    async clickView(row){
      const { data} = await detail(row)
      this.detailInfo = data
      console.log(this.detailInfo);
      this.isShowDialogPreveiew = true
    },
    // 去某一页
    toPage(num){
      this.pagesize.page = num;
      this.getList(this.pagesize)
    },
    // 改变每页几条数据
    onPageSizeChange(pageSize){
       this.pagesize.pagesize = pageSize;
       this.getList(this.pagesize)
    },
    // 点击查询
    onSearch(info){
      this.getList({...info,...this.pagesize})
    }
  },
      components:{
    CommTable,
    Pagination,
    SearchForm,
    QuestionsPreview
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 15px 10px;
}
.btn_wrapper{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
        font-size: 12px;
    color: pink
  }

}
</style>
