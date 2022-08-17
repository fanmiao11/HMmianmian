<template>
  <div class="search-form">
    <el-form
      label-width="80px"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="学科">
            <el-select
              style="width: 100%"
              v-model="formInline.subjectID"
              placeholder="请选择"
              @change="subjectChange"
            >
              <el-option
                v-for="item in subjectOptions"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="二级目录">
            <el-select v-model="formInline.catalogID" placeholder="请选择">
              <el-option
                v-for="item in directoryOptions"
                :key="item.id"
                :label="item.directoryName"
                :value="item.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="标签" label-width="80px">
            <el-select v-model="formInline.tags" placeholder="请选择">
              <el-option
                v-for="item in tagsOptions"
                :key="item.id"
                :label="item.tagName"
                :value="item.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>

        <el-col :span="6">
          <el-form-item label="关键字">
            <el-input
              style="width: 100%"
              v-model="formInline.keyword"
              placeholder="根据题干搜索"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="试题类型">
            <el-select v-model="formInline.questionType" placeholder="请选择">
              <el-option
                v-for="item in questionType"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="难度">
            <el-select v-model="formInline.difficulty" placeholder="请选择">
              <el-option
                v-for="item in difficulty"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="方向">
            <el-select v-model="formInline.direction" placeholder="请选择">
              <el-option
                v-for="item in direction"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-select v-model="formInline.creatorID" placeholder="请选择">
              <el-option
                v-for="item in userOptions"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="题目备注">
            <el-input v-model="formInline.remarks" placeholder="" /> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="企业简称">
            <el-input
              v-model="formInline.shortName"
              placeholder=""
            /> </el-form-item
        ></el-col>
        <el-col :span="6" >
          <el-form-item label="城市">
            <el-select
              style="width: 40%;margin-right:10px"
              v-model="formInline.province"
              placeholder="请选择"
              @change="cityChange"
            >
              <el-option
                v-for="item in provincesOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              style="width: 40%"
              v-model="formInline.city"
              placeholder="请选择"
            >
              <el-option
                v-for="item in citysOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>

        <el-col :span="6" style="display: flex;justify-content: flex-end;">
          <el-form-item >
            <el-button @click="clearForm">清除</el-button>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { list as subjectsList } from "@/api/hmmm/subjects.js";
import { list as directoryList } from "@/api/hmmm/directorys.js";
import { list as tagsList } from "@/api/hmmm/tags.js";
import { list as usersList } from "@/api/base/users.js";
import { questionType, difficulty, direction } from "@/api/hmmm/constants.js";
import { provinces, citys } from "@/api/hmmm/citys.js";
export default {
  data() {
    return {
      // 表单
      formInline: {
        subjectID: "", //学科
        catalogID: "",//目录
        tags: "",//标签
        keyword: "",//关键字
        questionType: "",//题目类型
        difficulty: "",//难度
        direction: "",//方向
        creatorID: "",//录入人
        remarks: "",//备注
        shortName: "",//企业简称
        province:'',//企业所在地省份province
        city:'',//企业所在城市 city
      },
      subjectOptions: [],
      directoryOptions: [],
      tagsOptions: [],
      userOptions: [],
      questionType,
      difficulty,
      direction,
      provincesOptions: [],
      citysOptions: [],
    };
  },

  async created() {
    await this.getSubjectList();
    await this.getUsers();
    await this.getProvinces();
  },

  methods: {
    //获取学科
    async getSubjectList() {
      const { data } = await subjectsList({ pagesize: 100 });
      //   console.log(data.items);
      this.subjectOptions = data.items;
    },
    // 学科发生变化时触发
    subjectChange(val) {
      this.getDirectory({ subjectID: val });
      this.getTags({ subjectID: val });
    },
    // 获取二级目录
    async getDirectory(params) {
      const { data } = await directoryList(params);
      //   console.log(data);
      this.directoryOptions = data.items;
    },
    // 获取标签列表
    async getTags(params) {
      const { data } = await tagsList(params);
      //   console.log(data);
      this.tagsOptions = data.items;
    },
    // 获取用户列表
    async getUsers() {
      const { data } = await usersList();
      //   console.log(data);
      this.userOptions = data.list;
    },
    // 获取城市数据
    getProvinces() {
      this.provincesOptions = provinces();
    },
    // 城市发生改变时
    cityChange(val) {
      this.citysOptions = citys(val);
    },
    // 点击取消
    clearForm() {
      //   console.log("清除");
      // this.$emit('')
      this.formInline = {
        subjectID: "", //学科
        catalogID: "",//目录
        tags: "",//标签
        keyword: "",//关键字
        questionType: "",//题目类型
        difficulty: "",//难度
        direction: "",//方向
        creatorID: "",//录入人
        remarks: "",//备注
        shortName: "",//企业简称
        province:'',//企业所在地省份province
        city:'',//企业所在城市 city
      };
    },
    // 点击搜索
    search() {
      //   console.log("搜索");
      this.$emit("search", this.formInline);
    },
  },
};
</script>

<style scoped lang="scss">
.search-form {
  background: #fff;
}
// .el-col {
  // display: flex;
  // justify-content: flex-end;
  // white-space: nowrap;
// }

// ::v-deep.el-form-item .el-form-item__content,.el-select{
//   width: 100%;
// }
</style>
