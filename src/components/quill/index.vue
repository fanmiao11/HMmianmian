<template>
  <div>
    <quill-editor
      ref="myLQuillEditor"
      v-model="content"
      :options="editorOption"
      class="editor"
    >
      >
    </quill-editor>
  </div>
</template>

<script>
// 引入样式和quillEditor
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
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
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
        placeholder: "请输入正文",
        // Some Quill optiosn...
      },
      content: "",
    };
  },

  components: {
    quillEditor,
  },

  created() {},

  methods: {
    // onBlurCheck() {
    //   this.$emit("blur", this.content); // 富文本框失去焦点，触发blur时间，抛出富文本框中值content，并且需手动触发表单校验 例this.$refs.form.validateField("articleBody");
    // },
  },
  watch:{
    content:{
        // immediate:true,
        handler(newVal){
            this.$emit("blur", newVal)
        }
    }
  }
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
