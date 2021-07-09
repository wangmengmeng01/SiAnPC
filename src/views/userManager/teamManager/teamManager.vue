<template>
  <div class="app-container user-list">
    <TablePage
      show-search
      :search-cols="4"
      :search-fields="filterForm"
      :search-buttons="searchButtons"
      :search-submit-fn="tablePageSearchSubmit"
      :table-cols="tableCols"
      :get-list-fn="getTablePageList"
      :get-list-response-keys="{ list: 'list', total: 'total', size: 'pageSize', current: 'pageNum' }"
      :refresh="tablePageRefresh"
      :showPage="false"
      @search-change="tablePageSearchChange"
      @page-change="tablePagePageChange"
    >
      <div slot="table-header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="show()">新增团队</el-button>
      </div>
      <template slot="sysManagerNameList" slot-scope="{ row }">
        <span v-for="item in row.sysManagerNameList" style="margin-right: 5px;">{{ item }}</span>
      </template>
      <template slot="regCodeList" slot-scope="{ row }">
        <span v-for="item in row.regCodeList" style="margin-right: 5px;">{{ item }}</span>
      </template>
      <template slot="action" slot-scope="{ row }">
        <el-button type="text" size="mini" @click="$router.push({path: '/user-manager/team-manager-list',query: {name: row.sysOrgName,id: row.sysOrgId}})">查看团队成员列表</el-button>
      </template>
    </TablePage>
		<el-dialog
		  title="新增"
		  :visible.sync="flag"
		  width="50%"
		  >
		  <el-form :model="addForm" status-icon ref="addTeamForm" label-width="150px" label-position="left">
		  	<div style="margin-bottom: 10px;margin-left: 10px;color: red;"> 目前每个团队注册时，需要绑定一个团队管理员，团队管理员首先需要是后台代理身份的操作员。</div>
				<el-form-item label="团队名 " :rules="[
            { required: true, message: '该项必填'},
          ]" prop="name">
		    	<el-input style="width: 80%;" type="text" maxlength="10" v-model.trim="addForm.name" placeholder="设置一个团队名（限制10个字以内）"></el-input>
		  	</el-form-item>
		  	<el-form-item label="团队管理员 " :rules="[
            { required: true, message: '该项必填'},
          ]"  prop="adminSysUserId">
		    	<el-select style="width: 80%;" v-model="addForm.adminSysUserId" placeholder="请设置团队管理员">
				    <el-option
				      v-for="item in peoplesAdmin"
				      :key="item.sysUserId"
				      :label="item.sysUserName"
				      :value="item.sysUserId">
				    </el-option>
				  </el-select>
		  	</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="flag = false">取 消</el-button>
		    <el-button v-prevent-re-click type="primary" @click="submitForm('addTeamForm')">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>

import API from '@/api/user-manager'
import {findAllSource} from '@/api/configManager.js'
import TablePageMixin from '@/mixins/table-page'
let that;
export default {
  name: 'team-manager',
  mixins: [TablePageMixin],
  data() {
    return {
      addForm: {
      	name: '',
      	adminSysUserId: '',
      },
      flag: false,
      teamAdmin: [],
      peoplesAdmin: [],
      // 筛选表单字段集合
      filterForm: [
        {
          type: 'select',
          value: '',
          label: '',
          name: 'sysOrgId',
          options: this.teamAdmin,
          placeholder: '请输入团队名称',
          labelStyle: {
            display: 'inline-block',
            width: '130px',
            textAlign: 'right'
          },
          clearable: true
        },
      ],
      // table列字段集合
      tableCols: [
        { prop: 'sysOrgName', label: '团队名称', },
        { prop: 'regCodeList', label: '注册码',slot: true},
        { prop: 'sysManagerNameList', label: '团队管理员' ,slot: true},
        { prop: 'memberCount', label: '团队人数' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'createByName', label: '操作人', },
        { prop: 'action', label: '操作', slot: true, fixed: 'right', width: '200px' }
      ]
    }
  },
  beforeCreate() {
    this.$api = API[this.$route.path]
  },
  created() {
    that = this;
    this.option();
    this.userOption();
  },
  methods: {
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.create();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async create() {
      try {
        await API[this.$route.path].create(this.addForm)
        this.$message.success('操作成功')
        this.flag = false;
        this.updateTablePageListParams({})
        this.userOption()
        this.option()
        this.$store.dispatch('app/getTeamList')
      } catch (error) {
        console.log(error)
      }
    },
    option() {
      API[this.$route.path].option({isAdminOption: 1}).then((res) => {
        if (res.success) {
          this.teamAdmin = res.data;
					res.data.push({id: '', name: '全部'})
          this.teamAdmin = res.data;
          this.teamAdmin.forEach(item => {
            item.value = item.sysOrgId;
            item.label = item.name;
          });
          this.filterForm.forEach(item => {
            if (item.name == 'sysOrgId') {
              item.options = this.teamAdmin
            }
          })
        }
      }).catch(() => {
      })
    },
    userOption() {
      API[this.$route.path].userOption({isAdminOption: 1}).then((res) => {
        if (res.success) {
          this.peoplesAdmin = res.data;
        }
      }).catch(() => {
      })
    },
    show() {
      this.addForm.name = '';
      this.addForm.adminSysUserId = '';
      this.flag = true;
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
