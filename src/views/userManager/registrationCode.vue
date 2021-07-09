<template>
  <div class="bg">
  	<div style="margin-bottom: 30px;">
  		<el-button @click="show" type="primary" icon="el-icon-plus">新增</el-button>
  	</div>
  	<el-table
	    :data="list"
	    class="table-list-container"
	    style="width: 100%">
	    <el-table-column
	      prop="code"
	      label="注册码"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="sysOrgName"
	      label="归属团队"
	      width="180">
	    </el-table-column>
      <el-table-column
        prop="sysManagerNameList"
        label="团队负责人"
        width="180">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.sysManagerNameList" style="margin-right: 5px;">{{item}}</span>
        </template>
      </el-table-column>
	    <el-table-column
	      prop="usedCount"
	      label="已注册人数"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="生成注册码时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="createName"
	      label="操作人">
	    </el-table-column>
	  </el-table>
	  <div style="display: flex;justify-content: center;padding: 30px 0;">
	  </div>
    <el-dialog
      :title="title"
      :visible.sync="flag"
      width="600px"
      >
      <el-form :model="addForm" ref="addForm" label-width="100px">
        <div style="margin-bottom: 10px;margin-left: 10px;color: red;"> 每个注册码生成时需要拟定一个归属团队，目前支持一个团队绑定多个注册码。</div>
        <el-form-item
          label="归属团队"
          prop="orgId"
          :rules="[
            { required: true, message: '该项必填'},
          ]"
        >
          <el-select v-model="addForm.orgId" placeholder="请选择归属团队">
            <el-option
              v-for="item in teamList"
              :key="item.sysOrgId"
              :label="item.name"
              :value="item.sysOrgId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button v-prevent-re-click type="primary" @click="submitForm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  createCode,
  findAllCode,
} from '@/api/configManager.js'
export default {
  name: 'registration-code',
  components: {
  },
  computed: {
    teamList() {
      return this.$store.state.app.teamList;
    }
  },
  data() {
    return {
    	flag: false,
    	title: '新增',
    	list: [],
    	addForm: {
    		orgId: '',
    	},
    }
  },
  created() {
  	this.findAllCode();
  },
  mounted() {
  },
  methods: {
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCode();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    show(formName) {
      this.flag = true;
			this.addForm = {
    		orgId: '',
    	}
    },
		createCode() {
      createCode(this.addForm).then(res => {
        if (res.success) {
        	this.$message({
            type: 'success',
            message: '新增成功!'
          });
					this.flag = false;
          this.findAllCode();
        }else {
					this.$message({
            type: 'error',
            message: '新增失败!'
          });
        }
      }).catch(err => {

      })
    },
    findAllCode() {
      findAllCode({}).then(res => {
        if (res.success) {
					this.list = res.data;
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
.table-list {
  &-container {
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    ::v-deep {
      .el-table__header th {
        color: #1f2d3d;
        background-color: #f8f8f9;
      }
    }
  }
}
</style>