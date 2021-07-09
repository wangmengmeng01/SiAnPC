<template>
  <div class="bg">
  	<el-page-header title="返回" :content="$route.query.name" style="margin-bottom: 15px;" @back="$router.back()" />
		<div style="margin-bottom: 20px;">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="show()">绑定团队成员</el-button>
    </div>
		<el-table
	    :data="tableData"
	    class="table-list-container"
	    >
	    <el-table-column
	    	style="color: #409EFF;"
	      prop="sysUserName"
	      label="成员名称"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="isAdmin"
	      label="成员身份"
	      >
	      <template slot-scope="scope">
	        <span>{{ scope.row.isAdmin == 1 ? '管理员' : '普通成员' }}</span>
	      </template>
	    </el-table-column>
	  </el-table>
		<el-dialog
		  title="绑定团队成员"
		  :visible.sync="flag"
		  width="50%"
		  >
		  <el-form :model="addPeopleForm" status-icon ref="addPeopleForm" label-width="5px" label-position="left">
				<el-form-item label=" " :rules="[
            { required: true, message: '该项必填'},
          ]" prop="sysUserIds">
		    	<el-checkbox-group v-model="addPeopleForm.sysUserIds">
				    <el-checkbox v-for="(item,index) in peoplesList" :label="item.sysUserId">{{item.sysUserName}}</el-checkbox>
				  </el-checkbox-group>
		  	</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="resetForm('addPeopleForm')">取 消</el-button> -->
		    <el-button v-prevent-re-click type="primary" @click="submitForm('addPeopleForm')">完成绑定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import TablePageMixin from '@/mixins/table-page'
import API from '@/api/user-manager'
export default {
  name: 'team-manager-list',
  mixins: [TablePageMixin],
  components: {
  },
  data() {
    return {
			addPeopleForm: {
      	sysUserIds: [],
      },
      flag: false,
      tableData: [],
      peoplesList: [],
			tableCols: [
        { prop: 'sysUserName', label: '成员名称', },
        { prop: 'isAdmin', label: '成员身份',slot: true},
      ]
    }
  },
	beforeCreate() {
    this.$api = API[this.$route.path]
  },
  created() {
  	this.get();
  	this.userOption();
  },
  mounted() {
  },
  methods: {
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMember();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    show(formName) {
      this.addPeopleForm.sysUserIds = [];
      this.flag = true;
    },
    get(i) {
    	API[this.$route.path].getList({sysOrgId: this.$route.query.id}).then(res => {
        if (res.success) {
					this.tableData = res.data;
        }else {
        }
      }).catch(err => {

      })
    },
    userOption(i) {
    	API[this.$route.path].userOption({sysOrgId: this.$route.query.id}).then(res => {
        if (res.success) {
					this.peoplesList = res.data;
        }else {
        }
      }).catch(err => {

      })
    },
    addMember(i) {
    	this.addPeopleForm.sysOrgId = this.$route.query.id;
    	API[this.$route.path].addMember(this.addPeopleForm).then(res => {
        if (res.success) {
        	this.get();
					this.$message.success('操作成功');
					this.flag = false;
        }else {
        }
      }).catch(err => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
	padding: 10px;
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