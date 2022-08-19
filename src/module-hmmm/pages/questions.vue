<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-19 23:39:38
-->
<template>
  <div class='container'>
    <el-card>
       <!-- 新增试题按钮 -->
       <div class="btn_wrapper">
        <el-button type="success" icon="el-icon-edit" @click="toAddQuestion">新增试题</el-button>
       </div>
      <!-- 搜索 -->
      <SearchForm @search="onSearch"/>
      <!-- 条数提示 -->
      <el-alert
    :title="`数据一共 ${counts} 条 --- 胡纯`"
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
  <el-button  plain type="success" icon="el-icon-edit" circle @click="toEdit(scope.row.id)"></el-button>
  <el-button plain type="danger" icon="el-icon-delete" circle @click="toDelQuestion(scope.row)"></el-button>
  <el-button  plain type="warning" icon="el-icon-check" circle @click="toJoinQuestionsChoice(scope.row)"></el-button>
    </template>
    </CommTable>
    <!-- 分页 -->
    <Pagination :pageSize="pagesize.pagesize" :total="counts" @pageChange="toPage" @pageSizeChange="onPageSizeChange" :isHidePage="false"/>
    </el-card>

  <!-- 题目预览弹框 -->
  <QuestionsPreview
  :dialogPreveiew="isShowDialogPreveiew"
  :detailInfo="detailInfo"
  @close="isShowDialogPreveiew=false"/>
  </div>
</template>

<script>
import { list ,detail,remove,choiceAdd} from '@/api/hmmm/questions'
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
      let res ={}
      for(let k in info){
        if(info[k]){ res = info}
      }
     this.getList({...res,...this.pagesize})
    },
    // 去修改试题
    toEdit(id){
      this.$router.push(
        {
          name: 'questions-new',
          query:{
            id,
            title: "修改试题"
          }
        }
      )
    },
    // 删除试题
    toDelQuestion(row){
        this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           await remove(row)
           this.$message({
             type: 'success',
            message: '删除成功!'
          });

          this.getList(this.pagesize)
        }).catch(() => {

        });
      },
    // 是否添加到精选题库
    toJoinQuestionsChoice(row){
      row.choiceState=1
       this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           await choiceAdd(row)
           this.$message({
             type: 'success',
            message: '加入精选题库成功!'
          });
        //  this.getList(this.pagesize)
         this.$router.push('/questions/choice')
        }).catch(() => {

        });
    },
    toAddQuestion(){
      this.$router.push({
        path:'/questions/new',
        query:{
          title: '试题录入'
        }
        })
    }
  },
      components:{
    CommTable,
    Pagination,
    SearchForm,
    QuestionsPreview,
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
  margin-bottom: 15px;
  span {
        font-size: 12px;
    color: pink
  }

}
</style>
