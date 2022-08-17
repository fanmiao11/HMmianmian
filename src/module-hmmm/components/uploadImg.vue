<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-17 13:16:37
 * @LastEditors: sj
 * @LastEditTime: 2022-08-17 15:08:35
-->
<template>
  <el-upload
    v-loading="loading"
    element-loading-text="上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="uploadImg"
    action="#"
    :show-file-list="false"
    :http-request="onRequest"
    :limit="1"
  >
   <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <div class="el-upload__text" v-if="!imageUrl">上传图片</div>
    <i class="el-icon-circle-close del-icon" @click="delImg"></i>
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDA7oENFqADzVkhOpyqRL0OVKtBCvOZT6R',
  SecretKey: '6vTklVyA5i48vSigNoyqSotiFVVEfpiL'
})
export default {
  data(){
    return {
     fileList:[],// 文件上传时的列表
     loading: false,
     imageUrl: ''
    }
  },
  methods:{
    onRequest({file}){
      cos.putObject({
    Bucket: 'hc-hr-1313341629', /* 必须 */
    Region: 'ap-nanjing',     /* 存储桶所在地域，必须字段 */
    Key: file.name,              /* 必须 */
    StorageClass: 'STANDARD',
    Body: file, // 上传文件对象
    onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
    }
},(err, data)=> {
   if(err||data.statusCode !== 200) {
      return this.$message.error('上传失败')
    }
    this.imageUrl= 'https://'+data.Location
    this.$emit('success',{
      url: 'https://'+data.Location
    })
});
    },
    delImg(){
      this.imageUrl = ""
      this.$emit('del')
    }
  }
};
</script>

<style scoped lang="scss">
  ::v-deep .el-upload--picture-card {
    width: 100px;
    height: 60px;
    line-height: 60px;
  }

  .uploadImg {
     width: 100px;
    height: 60px;
  border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
position: relative;
 margin-left: 4px;
 text-align: center;
 line-height: 60px;
 ::v-deep .el-upload--picture-card {
  background-color: #fff;
}
  }
  .del-icon {
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: translate(50%,-50%);
    transform: translate(50%,-50%);
    background: #fff;
    font-size: 18px;
    color: #999;
  }

    .avatar {
    width: 98px;
    height: 58px;
    display: block;
  }

</style>
