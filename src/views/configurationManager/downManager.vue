<template>
  <div class="bg">
  	<el-form :model="addForm" style="width: 600px;" ref="downForm" label-width="150px">
		  <el-form-item
		    label="Android 下载链接："
		    prop="androidReleaseUrl"
		    :rules="[
		      { required: true, message: '该项必填'},
          link
		    ]"
		  >
		    <el-input v-model.trim="addForm.androidReleaseUrl" placeholder="请输入下载链接"></el-input>
		  </el-form-item>
      <el-form-item
        label="IOS 下载链接："
        prop="iosReleaseUrl"
        :rules="[
          { required: true, message: '该项必填'},
          link
        ]"
      >
        <el-input v-model.trim="addForm.iosReleaseUrl" placeholder="请输入下载链接"></el-input>
      </el-form-item>
      <el-form-item
        label="下载页背景图："
        prop="backgroundImageUrl"
        :rules="[
          { required: true, message: '该项必填'},
        ]"
      >
				<sa-upload v-model="addForm.backgroundImageUrl" accept="image/png, image/jpeg" style="width: 100px; height: 100px;" :size="10">
          <p slot="tip">只能上传jpg/png文件，大小不超过10MB</p>
        </sa-upload>
      </el-form-item>
      <el-button @click="submitForm('downForm')" type="primary" style="margin-left: 150px;">保存</el-button>
		</el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import saUpload from '@/components/UploadCloud'
import validate from '@/utils/validate'
import {
  updateDownloadConfig,
  getDownloadConfig,
} from '@/api/configManager.js'
export default {
  name: 'note-manager',
  components: {
  	saUpload,
  },
  data() {
    return {
    	flag: false,
      link: validate.link,
    	title: '新增',
    	list: [],
    	addForm: {
    		androidReleaseUrl: '',
        iosReleaseUrl: '',
        backgroundImageUrl: '',
    	},
    }
  },
  created() {
  	this.getDownloadConfig();
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateDownloadConfig();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
		updateDownloadConfig() {
      console.log(this.addForm)
      updateDownloadConfig(this.addForm).then(res => {
        if (res.success) {
        	this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }else {
					this.$message({
            type: 'error',
            message: '保存失败!'
          });
        }
      }).catch(err => {

      })
    },
    getDownloadConfig() {
      getDownloadConfig().then(res => {
        if (res.success) {
					this.addForm = res.data;
        }else {
        }
      }).catch(err => {

      })
    },
		resetForm(formName) {
      this.$refs[formName].resetFields();
      this.flag = false;
    },
    get(i) {
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
	padding: 30px;
}
</style>