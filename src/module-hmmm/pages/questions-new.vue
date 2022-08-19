<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-12 20:57:16
 * @LastEditors: sj
 * @LastEditTime: 2022-08-18 12:51:46
-->
<template>
  <div class="container">
    <el-card class="card">
      <div class="header">{{ $route.query.title || "试题录入" }}</div>
      <div class="body">
        <el-form
          label-width="120px"
          :model="formData"
          :rules="formRules"
          ref="form"
        >
          <!-- 学科 -->
          <el-form-item label="学科:" prop="subjectID">
            <el-select
              placeholder="请选择"
              @change="subjectChange"
              v-model="formData.subjectID"
            >
              <el-option
                :label="subject.subjectName"
                :value="subject.id"
                v-for="subject in subjectsList"
                :key="subject.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 目录 -->
          <el-form-item label="目录:" prop="catalogID">
            <el-select placeholder="请选择" v-model="formData.catalogID">
              <el-option
                :label="directory.directoryName"
                :value="directory.id"
                v-for="directory in directoryList"
                :key="directory.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 企业 -->
          <el-form-item label="企业:" prop="enterpriseID">
            <el-select placeholder="请选择" v-model="formData.enterpriseID">
              <el-option
                :label="company.company"
                :value="company.id"
                v-for="company in companysList"
                :key="company.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 城市 -->
          <el-form-item label="城市:" class="city" prop="city">
            <el-select
              placeholder="请选择"
              v-model="formData.province"
              style="margin-right: 4px"
              @change="changeProvince"
            >
              <el-option
                :label="province"
                :value="province"
                v-for="(province, index) in provinceList"
                :key="index"
              ></el-option>
            </el-select>
            <el-select placeholder="请选择" v-model="formData.city">
              <el-option
                :label="city"
                :value="city"
                v-for="(city, index) in cityList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 方向 -->
          <el-form-item label="方向:" prop="direction">
            <el-select placeholder="请选择" v-model="formData.direction">
              <el-option
                :label="direction"
                :value="direction"
                v-for="(direction, index) in direction"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 题型 -->
          <el-form-item label="题型:">
            <el-radio-group v-model="formData.questionType">
              <el-radio
                :label="item.value"
                v-for="item in questionType"
                :key="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- 难度 -->
          <el-form-item label="难度:">
            <el-radio-group v-model="formData.difficulty">
              <el-radio
                :label="item.value"
                v-for="item in difficulty"
                :key="item.value.toString()"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="题干:" prop="question">
            <Editor :getHtml.sync="formData.question" ref="editorQ" />
          </el-form-item>

          <!-- 选项 -->
          <el-form-item label="选项:" v-if="formData.questionType != 3">
            <!-- 单选 -->
            <div v-if="formData.questionType == 1">
              <div
                class="option-item"
                v-for="(item, index) in formData.options"
                :key="index"
              >
                <el-radio-group v-model="optionRadio">
                  <el-radio :label="item.code" @change="onChangeRadio(item)"
                    >{{ item.code }}：</el-radio
                  >
                </el-radio-group>
                <el-input v-model="item.title" style="width: 240px"></el-input>
                <UploadImg
                  @success="successImg(item, $event)"
                  @del="item.img = ''"
                />
              </div>
            </div>

            <!-- 多选 -->
            <div v-if="formData.questionType == 2">
              <div
                class="option-item"
                v-for="(item, index) in formData.options"
                :key="index"
              >
                <el-checkbox-group v-model="checkboxList">
                  <el-checkbox
                    :label="item.code"
                    @change="onChangeCheckbox(item)"
                    >{{ item.code }}：</el-checkbox
                  >
                </el-checkbox-group>
                <el-input style="width: 240px" v-model="item.title"></el-input>
                <UploadImg
                  @success="successImg(item, $event)"
                  @del="item.img = ''"
                />
              </div>
            </div>

            <el-button
              type="danger"
              :disabled="addOptionsBtn"
              @click="addCheckbox"
              >+增加选项与答案</el-button
            >
          </el-form-item>

          <el-form-item label="解析视频:">
            <el-input v-model="formData.videoURL"></el-input>
          </el-form-item>

          <!-- 答案解析 -->
          <el-form-item label="答案解析:" prop="answer">
            <Editor :getHtml.sync="formData.answer" ref="editor" />
          </el-form-item>

          <!-- 题目备注 -->
          <el-form-item label="题目备注:">
            <el-input v-model="formData.remarks" type="textarea" :rows="4" />
          </el-form-item>

          <!-- 试题标签 -->
          <el-form-item label="试题标签:">
            <el-select
              placeholder="请选择试题标签"
              v-model="formData.tags"
              multiple
              filterable
              allow-create
              default-first-option
            >
              <el-option
                :label="tag.label"
                :value="tag.label"
                v-for="tag in simpleTagsList"
                :key="tag.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button :type="$route.query.id ? 'success' : 'primary'" @click="confirm">{{$route.query.id ? '确认修改' : '确认提交'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Editor from "../components/editor.vue";
import UploadImg from "../components/uploadImg.vue";
import { list as subjectsList } from "@/api/hmmm/subjects.js";
import { list as directoryList } from "@/api/hmmm/directorys.js";
import { list as companysList } from "@/api/hmmm/companys.js";
import { simple as simpleTagsList } from "@/api/hmmm/tags.js";
import { provinces, citys } from "@/api/hmmm/citys.js";
import { direction, questionType, difficulty } from "@/api/hmmm/constants.js";
import { add, detail,update } from "@/api/hmmm/questions.js";
export default {
  data() {
    return {
      radio: 1,
      // 表单
      formData: {
        subjectID: "", //学科
        catalogID: "", //目录
        enterpriseID: "", //企业
        province: "", //企业所在地省份province
        city: "", //企业所在城市 city
        direction: "", //方向
        questionType: "1", //题目类型
        difficulty: "1", //难度
        question: "", // 题干
        options: [
          { code: "A", title: "", img: "", isRight: 0 },
          { code: "B", title: "", img: "", isRight: 0},
          { code: "C", title: "", img: "", isRight: 0 },
          { code: "D", title: "", img: "", isRight: 0},
        ],
        videoURL: "", //解析视频
        answer: "", //答案解析
        remarks: "", //备注
        tags: [], //标签
      },
      subjectsList: [], //学科列表
      directoryList: [], //目录列表
      companysList: [], //企业列表
      provinceList: [], // 城市省份列表
      cityList: [],
      direction,
      questionType: questionType.map(item => ({...item, value: item.value.toString()})),
      difficulty: difficulty.map(item => ({...item, value: item.value.toString()})),
      optionRadio: "", //单选体 选择项
      checkboxList: [], // 多选题
      simpleTagsList: [], // 标签列表
      formRules: {
        subjectID: [
          { required: true, message: "请选择学科", trigger: "change" },
        ],
        catalogID: [
          { required: true, message: "请选择目录", trigger: "change" },
        ],
        enterpriseID: [
          { required: true, message: "请选择企业", trigger: "change" },
        ],
        direction: [
          { required: true, message: "请选择方向", trigger: "change" },
        ],
        question: [{ required: true, message: "请输入题干", trigger: "blur" }],
        answer: [
          { required: true, message: "请输入答案解析", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
      },
    };
  },
  created() {
    this.$route.query.id &&
      this.detailQuestionInfo({ id: this.$route.query.id });
    this.getSubjectsList();
    this.getCompanysList();
    this.getProvinces();
  },
  methods: {
    async detailQuestionInfo(val) {
      const { data } = await detail(val);
      // console.log(data);
      this.subjectChange(data.subjectID);
      this.optionRadio = data.options.find(item => item.isRight==1)?.code
      this.formData = {...data,tags: data.tags.split(',')};
      this.$refs.editor.html = this.formData.answer;
      this.$refs.editorQ.html = this.formData.question;
    },
    // 获取学科列表
    async getSubjectsList() {
      const { data } = await subjectsList({ pagesize: 1000 });
      console.log(data);
      this.subjectsList = data.items;
    },
    // 选择学科
    subjectChange(val) {
      this.getDirectoryList({ subjectID: val, pagesize: 1000 });
      this.getSimpleTagsList({ subjectID: val, pagesize: 1000 });
    },
    // 获取目录列表
    async getDirectoryList(val) {
      const { data } = await directoryList(val);
      this.directoryList = data.items;
    },
    // 获取企业列表
    async getCompanysList() {
      const { data } = await companysList({ pagesize: 1000 });
      this.companysList = data.items;
    },
    // 获取城市数据
    getProvinces() {
      this.provinceList = provinces();
    },
    changeProvince(val) {
      this.cityList = citys(val);
    },
    // 上传图片成功
    successImg(item, { url }) {
      item.img = url;
    },
    // 选项 单选框
    onChangeRadio(item) {
      this.optionRadio = item.code;
      this.formData.options.forEach((option) => {
        option.isRight = 0;
      });
      item.isRight = 1;
    },
    // 选项 多选框
    onChangeCheckbox(item) {
      item.isRight = 1;
    },
    // 添加多选题选项
    addCheckbox() {
      const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      const optionsAlphabet = this.formData.options.map(
        (option) => option.code
      );
      const index = alphabet.findIndex(
        (item) => item === optionsAlphabet[optionsAlphabet.length - 1]
      );
      this.formData.options.push({
        code: alphabet[index + 1],
        title: "",
        img: "",
        isRight: 0,
      });
    },
    // 标签列表
    async getSimpleTagsList(val) {
      const { data } = await simpleTagsList(val);
      this.simpleTagsList = data;
    },
    // 确认提交
    confirm() {
      let msg = this.$route.query.id? "修改": "添加"

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = {
            ...this.formData,
            tags: this.formData.tags.toString(),
          };
          if(this.$route.query.id){
            await update(data)
            this.$router.push('/questions/list')
          } else {
            await add(data);
          }
          this.$message.success( msg+"成功");
          this.$refs.form.resetFields();
          this.clear();
        } else {
          this.$message.error(msg+"失败");
        }
      });
    },
    clear() {
      this.$refs.editor.html = "";
      this.$refs.editorQ.html = "";
      this.formData = {
        subjectID: "", //学科
        catalogID: "", //目录
        enterpriseID: "", //企业
        province: "", //企业所在地省份province
        city: "", //企业所在城市 city
        direction: "", //方向
        questionType: 1, //题目类型
        difficulty: 1, //难度
        question: "", // 题干
        options: [
          { code: "A", title: "", img: "", isRight: 0 },
          { code: "B", title: "", img: "", isRight: 0 },
          { code: "C", title: "", img: "", isRight: 0 },
          { code: "D", title: "", img: "", isRight: 0 },
        ],
        videoURL: "", //解析视频
        answer: "", //答案解析
        remarks: "", //备注
        tags: "", //标签
      };
    },
  },
  computed: {
    //  添加选项按钮是否禁用
    addOptionsBtn() {
      return this.formData.questionType == 1;
    },
  },
  components: {
    Editor,
    UploadImg,
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.card {
  ::v-deep .el-card__body {
    padding: 0 !important;
  }
}

.header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.body {
  padding: 20px;
}
::v-deep .el-input--medium .el-input__inner {
  width: 400px;
}
.city {
  ::v-deep .el-input--medium .el-input__inner {
    width: 198px;
  }
}
.option-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .el-radio {
    margin-right: 0;
  }
  ::v-deep .el-input--medium .el-input__inner {
    width: 240px !important;
  }
}

.el-textarea {
  width: 400px;
}
</style>
