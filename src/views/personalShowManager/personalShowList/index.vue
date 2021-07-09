<template>
  <div class="app-container">
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
      @search-change="tablePageSearchChange"
      @page-change="tablePagePageChange"
    >
      <personal-show-cover slot="videoResourceUrl" slot-scope="{row}" :row="row" />
      <el-button slot="nickName" slot-scope="{row}" size="mini" type="text" @click="$router.push({path:'/user-manager/user-detail', query:{ uid: row.uid}})">{{ row.nickName }}</el-button>
      <el-button slot="saId" slot-scope="{row}" size="mini" type="text" @click="$router.push({path:'/user-manager/user-detail', query:{ uid: row.uid}})">{{ row.saId }}</el-button>
      <template slot="online" slot-scope="{row}">{{ row.online == 0 ? '已下架' : '已上架' }}</template>
      <template slot="action" slot-scope="{row}" size="mini" type="text">
      	<el-button v-if="row.online == 0" @click="online(row.showId,1)"  size="mini" type="text">上架</el-button>
      	<el-button style="color: #F56C6C;" v-else @click="online(row.showId,0)" size="mini" type="text">下架</el-button>
      </template>
    </TablePage>
  </div>
</template>

<script>

import API from '@/api/personal-show-manager'
import TablePageMixin from '@/mixins/table-page'
import personalShowCover from '../personalShowAudit/personal-show-cover'
export default {
  name: 'PayRecord',
  components: {
    personalShowCover
  },
  mixins: [TablePageMixin],
  data() {
    return {
      // 筛选表单字段集合
      filterForm: [
        {
          type: 'text',
          value: '',
          label: '昵称:',
          name: 'nickName',
          placeholder: '',
          labelStyle: {
            display: 'inline-block',
            width: '120px',
            textAlign: 'right'
          },
          clearable: true
        },
        {
          type: 'text',
          value: '',
          label: 'ID：',
          name: 'saId',
          placeholder: '',
          labelStyle: {
            display: 'inline-block',
            width: '100px',
            textAlign: 'right'
          },
          clearable: true
        },
        {
          type: 'select',
          value: -1,
          label: '状态：',
          name: 'online',
          placeholder: '',
          labelStyle: {
            display: 'inline-block',
            width: '120px',
            textAlign: 'right'
          },
					options: [
            { value: -1, label: '全部' },
            { value: 0, label: '下架' },
            { value: 1, label: '上架' }
          ],
          clearable: true
        },
        {
          type: 'datepicker',
          dateType: 'daterange',
          value: [],
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          defaultTime: ['00:00:00', '23:59:59'],
          label: '上传时间：',
          name: 'createTime',
          labelStyle: {
            display: 'inline-block',
            width: '100px',
            textAlign: 'right'
          }
        }
      ],
      // table列字段集合
      tableCols: [
        { prop: 'videoResourceUrl', label: '个人秀视频', slot: true },
        { prop: 'nickName', label: '用户昵称',slot: true },
        { prop: 'saId', label: 'ID',slot: true },
        { prop: 'likeCount', label: '被赞次数', },
        { prop: 'createTime', label: '上传时间', },
        { prop: 'online', label: '状态', slot: true },
        { prop: 'action', label: '操作',slot: true  },
      ]
    }
  },
  beforeCreate() {
    this.$api = API[this.$route.path]
  },
  methods: {
    online(showId,online) {
			this.$confirm(online === 1 ? `确定要上架吗？` : `确认要下架吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        API[this.$route.path].online({showId,online}).then(res => {
					if (res.success) {
	        	this.$message({
	            type: 'success',
	            message: '修改成功!'
	          });
	          this.updateTablePageListParams({});
	        }else {
						this.$message({
	            type: 'error',
	            message: '修改失败!'
	          });
	        }
	      })
      }).catch(() => {
        console.log('用户取消操作')
      })

    },
  }
}
</script>
<style lang="scss" scoped>

</style>
