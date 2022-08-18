<template>
  <div class="add-form">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="dialogFormH()"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleBody" ref="QuillEditor">
          <div class="VueQuillEditor">
            <el-upload
              style="display: none"
              class="quill-avatar-uploader"
              action="/"
              :show-file-list="false"
              accept="image/png, image/jpeg, image/jpg"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadLicencePicNo"
            >
            </el-upload>
            <quill-editor
              :options="editorOption"
              v-model="form.articleBody"
              class="editor"
              :content="content"
              @blur="onBlurCheck"
              @change="onEditorChange($event)"
              ref="myQuillEditor"
            >
            </quill-editor>
          </div>
          <!-- <quill @blur="onBlurCheck" ref="quill"></quill> -->
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.videoURL"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入样式和quillEditor;
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { add, update } from "@/api/hmmm/articles.js";
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDd2C5j7E3buwhAOL1QZS4PTBfsnTszpPj",
  SecretKey: "4rOghRu7cttfAOL0PXOyILAl6AxUlmWz",
});
// 工具栏配置项
const toolbarOptions = [
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["bold", "italic", "underline", "strike"],
  // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: "ordered" }, { list: "bullet" }],
  // 引用  代码块-----['blockquote', 'code-block']
  ["blockquote"],
  ["code-block"],
  // 链接、图片、视频-----['link', 'image', 'video']
  ["image", "link"],
  // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  // [{ script: "sub" }, { script: "super" }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  // [{ indent: "-1" }, { indent: "+1" }],
  // 文本方向-----[{'direction': 'rtl'}]
  // [{ direction: "rtl" }],
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  // [{ size: ["small", false, "large", "huge"] }],
  // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  // [{ color: [] }, { background: [] }],
  // 字体种类-----[{ font: [] }]
  // [{ font: [] }],
  // 对齐方式-----[{ align: [] }]
  // [{ align: [] }],
  // 清除文本格式-----['clean']
  // ["clean"],
];
// import quill from "@/components/quill";
export default {
  data() {
    return {
      content: "",
      dialogFormVisible: false,
      form: {
        title: "",
        articleBody: "",
        videoURL: "",
      },
      title: "新增文章",
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        articleBody: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,

            handlers: {
              // 自定义图片上传
              image: function (value) {
                if (value) {
                  // 点击图片按触发elmentui上传的input选择图片事件.quill-avatar-uploader是上传文件组件的那个类名
                  document
                    .querySelector(".quill-avatar-uploader input")
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
        placeholder: "请输入正文",
        // Some Quill optiosn...
      },
    };
  },
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
    },
    onBlurCheck() {
      // if (this.form.articleBody.trim() === "") {
      this.$refs.form.validateField("articleBody");
      // } else {
      // this.$refs.QuillEditor.resetField(); //clearvalidate()取消验证方法
      // }
    },
    async onSave() {
      if (this.title === "新增文章") {
        await add(this.form);
      } else {
        await update(this.form);
      }
      await this.$refs.form.validate();
      // this.$refs.QuillEditor.resetField(); //clearvalidate()取消验证方法
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
      this.$message.success("添加成功");
      this.$emit("update");
    },
    beforeAvatarUpload(file) {
      let isPass = false;
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        isPass = true;
      }
      const isLt = file.size / 1024 / 1024 < 2;
      if (!isPass) {
        this.$message.error("当前仅支持上传图片JPG/jpeg/png格式!");
        return false;
      }
      if (!isLt) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return isPass && isLt;
    },

    onEditorChange({ quill, html, text }) {
      // console.log("editor html", html);
      this.content = html; // 保存输入的内容
    },
    uploadLicencePicNo({ file }) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "上传中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      cos.putObject(
        {
          Bucket: "ggt-1313341641" /*桶名 必须 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /*图片名称 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          console.dir(err || data);
          if (err || data.statusCode !== 200) {
            return this.$message.error("上传失败");
          }
          // 获取富文本组件实例
          let quill = this.$refs["myQuillEditor"].quill;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片insertEmbed()三个参数，前两个固定即可
          quill.insertEmbed(length, "image", "https://" + data.Location);
          // 调整光标到最后
          quill.setSelection(length + 1);
        }
      );
    },
  },
  components: {
    quillEditor,
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  width: 800px;
  .ql-editor {
    height: 200px;
  }
  .el-dialog__footer {
    text-align: end;
  }
}

</style>
