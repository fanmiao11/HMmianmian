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
        <el-form-item label="文章内容" prop="articleBody">
          <div class="local-quill-editor">
            <quill-editor
              ref="myLQuillEditor"
              v-model="form.articleBody"
              :options="editorOption"
              class="editor"
              @blur="onBlurCheck"
            >
              >
            </quill-editor>
          </div>
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
// 引入样式和quillEditor
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { add } from "@/api/hmmm/articles.js";

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

export default {
  data() {
    return {
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
          toolbar: toolbarOptions,
        },
        theme: "snow",
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
    },
    // // 内容改变事件
    // onEditorChange(e) {
    //   console.log("onEditorChange: ", e);
    // },
    onBlurCheck() {
      this.$refs.form.validateField("articleBody");
    },
    async onSave() {
      this.dialogFormVisible = false;
      await add(this.form);
      this.$message.success("添加成功");
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
