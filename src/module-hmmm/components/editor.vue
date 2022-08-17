<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-15 23:47:55
 * @LastEditors: sj
 * @LastEditTime: 2022-08-17 20:48:08
-->
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 200px"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDA7oENFqADzVkhOpyqRL0OVKtBCvOZT6R",
  SecretKey: "6vTklVyA5i48vSigNoyqSotiFVVEfpiL",
});
// import { IEditorConfig } from '@wangeditor/editor'
const editorConfig = {
  // JS 语法
  MENU_CONF: {},
};
// 代码高亮
editorConfig.MENU_CONF["codeSelectLang"] = {
  // 代码语言
  codeLangs: [
    { text: "CSS", value: "css" },
    { text: "HTML", value: "html" },
    { text: "XML", value: "xml" },
    // 其他
  ],
};
editorConfig.MENU_CONF["uploadImage"] = {
server:'/api',
base64LimitSize: 5 * 1024// 5kb
};
export default {
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: [
          "bold",
          "italic",
          "underline",
          "through",
          "numberedList",
          "bulletedList",
          "blockquote",
          "codeBlock",
          "uploadImage",
          "insertLink",
        ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
      },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // onCreated:() =>{
    //  this.editor = Object.seal(editor);
    // }
  },
  watch: {
    html(val) {
      this.$emit("update:getHtml", val);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)

  },
  beforeDestroy() {
    // const editor = this.editor;
    // if (editor == null) return;
   this.editor && this.editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style></style>
