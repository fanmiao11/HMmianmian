<template>
  <div class="container">
    <div>
      <subjectsTitle
        total="10"
        seachName="标签名称"
        addname="新增标签"
        isShowState="true"
      />

      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 15px"
        :header-cell-style="headerColor"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="date" label="所属学科"></el-table-column>
        <el-table-column prop="name" label="目录名称"></el-table-column>
        <el-table-column prop="address" label="创建者"> </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="面试题数量"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作" width="250px">
          <el-button type="text">禁用</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end" style="margin-top:15px">
        <el-pagination
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="prev, pager, next,sizes, jumper"
        >
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import subjectsTitle from "../components/subjects-components/subjects-title.vue";
export default {
  data() {
    return {
      headerColor: {
        "background-color": "#FAFAFA",
        "border-bottom": "2px solid #E8E8E8",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀",
        },
      ],
    };
  },
  components: {
    subjectsTitle,
  },
  methods: {},
};
</script>

<style scoped lang="less">
.container {
  padding: 15px;
  > div {
    padding: 15px;
    border-radius: 2px;
    background-color: #fff;
  }
}
</style>
