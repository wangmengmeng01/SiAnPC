<template>
  <div class="app-container user-authorize">
    <el-form :inline="true" :model="searchForm" status-icon ref="callRecords" label-width="100px">
      <el-form-item label="归属团队" prop="csCategoryId">
		  	<el-select v-model="searchForm.sysOrgId" placeholder="请选择">
			    <el-option
			      v-for="item in organizationList"
			      :key="item.sysOrgId"
			      :label="item.name"
			      :value="item.sysOrgId">
			    </el-option>
			  </el-select>
		  </el-form-item>
      <el-form-item label="在线状态" prop="csCategoryId">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option
            v-for="item in [{name: '全部',value: null},{name: '在线',value: 1},{name: '离线',value: 3},{name: '忙碌',value: 2},]"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" prop="csCategoryId">
        <el-input v-model.trim="searchForm.username" placeholder="请输入"></el-input>
      </el-form-item>
			<el-form-item>
		    <el-button type="primary" @click="findMonitor()">搜索</el-button>
		    <el-button @click="resetForm()">重置</el-button>
	  	</el-form-item>
		</el-form>
		<div class="title">
			<span>当前客服在线情况</span>
			<span style="color: green;">在线:</span>
			<span>{{status.line}}</span>
			<span style="color: red;">忙碌:</span>
			<span>{{status.buy}}</span>
			<span style="color: #666;">下线:</span>
			<span>{{status.out}}</span>
		</div>
  	<el-table
	    :data="tableData"
	    class="table-list-container"
	    style="width: 100%">
      <el-table-column
	      prop="sysOrgName"
	      label="归属团队">
	    </el-table-column>
	    <el-table-column
	      prop="sysUserName"
	      label="客服昵称">
	    </el-table-column>
	    <el-table-column
	      prop="currentHandlingSessionCount"
	      label="当前接待会话数量">
	    </el-table-column>
	    <el-table-column
	      prop="workerStatus"
	      label="当前状态">
				<template slot-scope="scope">
					<span v-if="scope.row.workerStatus == 1" style="color: green;">在线</span>
					<span v-else-if="scope.row.workerStatus == 2" style="color: red;">忙碌</span>
					<span v-else-if="scope.row.workerStatus == 3" style="color: #666;">下线</span>
					<span v-else="scope.row.workerStatus == 4" style="color: #666;">未知</span>
	      </template>
	    </el-table-column>
      <el-table-column
	      prop="statisticsDate"
	      label="操作">
				<template slot-scope="scope">
	        <span @click="lookRecord(scope.row.sysUserId)" style="color: #409EFF;cursor: pointer;">查看实时聊天记录</span>
          <span v-if="scope.row.workerStatus != 3" @click="putOff(scope.row.sysUserId)" style="color: #F56C6C;cursor: pointer;margin-left:10px;">强制下线</span>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-dialog
		  title="聊天记录"
      @close="close"
		  :visible.sync="detailFlag"
		  width="900px"
		  >
		  <div class="recordBox">
        <div class="record-title">
          <span>当前会话数：{{sessionCount}}</span>
          <el-button type="primary" size="small" @click="refreshMessageList()">刷新消息记录</el-button>

        </div>
        <div class="record-menu">
          <div class="left">
            <div v-for="(item,index) in categoriesList" @click="clickFun(item.csCategoryId,index)" :key="index" :class="{'left-item':true,'left-active':leftIndex==index}">
              {{item.csCategoryName}}
            </div>
          </div>
          <div class="right">
            <div v-for="(item,index) in sessionList" :key="index" @click="sessionClickFun(item.appUserId,index)" :class="{'right-item':true,'right-active':rightIndex==index}">
              {{item.appNickname}}
            </div>
          </div>
        </div>
        <div class="infinite-list record-content" id="record_content" :infinite-scroll-distance="20" v-infinite-scroll="load" infinite-scroll-immediate="false">
          <div class="record-content-header" v-for="(item,index) in messageList" :key="index">
            <div class="re-title">
              <span>{{item.fromNickname}}</span>
              <span>{{item.serverTime}}</span>
            </div>
            <div>
              <div class="re-text" v-if="item.messageType=='TEXT'">{{JSON.parse(item.messageBody.extras.biz_content)['content']}}</div>
              <img v-else v-img :src="JSON.parse(item.messageBody.extras.biz_content)['url']" alt="">
            </div>
          </div>
        </div>
		  </div>
		</el-dialog>
  </div>
</template>

<script>

import API from '@/api/user-manager'
import {url} from '@/utils/elValid.js'
import TablePageMixin from '@/mixins/table-page'
import {
  findMonitor,
  getOrganization,
  forceOffLine,
  getCategories,
  getSessionList,
  getMessageList,
  getSessionCount
} from '@/api/customerManagement.js'
export default {
  name: 'workRecord',
  components: {
  },
  mixins: [TablePageMixin],
  data() {
    return {
    	total:0,
    	tableData: [],
    	status: {
    		line: 0,
    		buy: 0,
    		out: 0,
    	},
      organizationList:[],
      searchForm: {
        status: null,
        username: '',
        sysOrgId: '',
      },
      detailFlag:false,
      categoriesList:[],
      sessionList:[],
      messageList:[],
      leftIndex:null,
      rightIndex:null,
      detailId:null,
      sessionCount:0,
      csCategoryId:null,
      lastId:null,
      sessionId:null,
      nextFlag:true
    }
  },
  created() {
    this.findMonitor();
    this.getOrganization();
  },
  methods: {
    lookRecord(id){
      this.detailFlag=true;
      this.detailId=id;
      this.getSessionCount(id);
      this.getCategories(id);

    },
    close(id){
      this.sessionCount = 0;
      this.messageList = [];
    },
    getOrganization(){
      getOrganization({}).then(res => {
        if (res.success) {
					console.log(res.data);
          this.organizationList=res.data;
        }else {

        	this.$message({
            type: 'error',
            message: res.msg
          });
        }
      }).catch(err => {

      })

    },
		go(id) {
      this.$router.push({path: "/user-manager/user-detail",query:{uid: id}});
    },
    findMonitor() {
      Object.keys(this.searchForm).forEach(item => {
    		if(this.searchForm[item] === ''){
    			this.searchForm[item] = null;
    		}
    	})
      findMonitor(this.searchForm).then(res => {
        if (res.success) {
					this.tableData = res.data;
					this.status = {
						line: 0,
						buy: 0,
						out: 0,
					};
    			this.tableData.forEach(item => {
    				switch(item.workerStatus){
    					case 1 :
    						this.status.line++;
    						break;
  						case 2 :
    						this.status.buy++;
    						break;
  						case 3 :
    						this.status.out++;
    						break;
    				}
    			})
        }else {
        	this.$message({
            type: 'error',
            message: res.msg
          });
        }
      }).catch(err => {

      })
    },
    handleSizeChange(pageSize) {
    },
    handleCurrentChange(pageNum) {
    },
    handleClose(uid) {
    },
    resetForm(){
      this.searchForm={};
      this.findMonitor();
    },
    putOff(id) {
      this.$confirm(`强制下线后，系统将不再给他派发新的会话任务,是否确定强制下线？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        try {
          forceOffLine({assistantUid:id}).then(res=>{
            this.$message.success('操作成功');
            this.findMonitor();
          })

        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        console.log('用户取消操作')
      })
    },
    clickFun(id,index){
      if(this.leftIndex==index){
        return;
      }
      this.leftIndex=index;
      this.rightIndex=0;
      this.csCategoryId=id;
      this.lastId=null;
      this.messageList=[];
      this.nextFlag=false;
      this.getSessionList(id,this.detailId)
    },
    sessionClickFun(id,index){
      if(this.rightIndex==index){
        return;
      }
      this.rightIndex=index;
      this.lastId=null;
      this.messageList=[];
      this.sessionId=id;
      this.nextFlag=false;
      this.getMessageList(this.csCategoryId,id);
    },
    getCategories(id){
      getCategories({assistantUid:id}).then(res=>{
        if (res.success) {
          this.categoriesList=res.data;
          if(res.data.length>0){
            this.leftIndex=0;
            this.csCategoryId=res.data[0]['csCategoryId'];
            this.getSessionList(res.data[0]['csCategoryId'],id);
          }
        }else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch(err => {

        })
    },
    getSessionList(csId,assId){
      getSessionList({csCategoryId:csId,assistantUid:assId}).then(res=>{
        console.log(res.data)
        if (res.success) {
          this.sessionList=res.data;
          if(res.data.length>0){
            this.rightIndex=0;
            this.sessionId=res.data[0]['appUserId'];
            this.getMessageList(csId,res.data[0]['appUserId']);
          }
        }else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch(err => {

        })
    },
    getMessageList(csId,appId){
      getMessageList({csCategoryId:csId,appUserId:appId,pageSize:20,lastId:this.lastId}).then(res=>{
        console.log(res.data)
        if (res.success) {
          if(res.data.messageList&&res.data.messageList.length>0){
            this.messageList=this.messageList.concat(res.data.messageList);
            this.lastId=res.data.lastId;
            this.nextFlag=false;
          }else{
            this.nextFlag=true;
          }

        }else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch(err => {

        })
    },
    getSessionCount(id){
      getSessionCount({assistantUid:id}).then(res=>{
        if (res.success) {
          this.sessionCount=res.data.amount;
        }else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch(err => {

        })
    },
    load () {
      if(this.nextFlag){
        return;
      }
      this.getMessageList(this.csCategoryId,this.sessionId);
    },
    refreshMessageList(){
      if (!this.sessionId) {
        return
      }
      this.messageList=[];
      this.nextFlag=false;
      this.lastId=null;
      this.getMessageList(this.csCategoryId,this.sessionId);
    }

  }
}
</script>
<style scoped lang="scss">
.title {
	height: 100px;
	line-height: 100px;
	span:nth-child(1) {
		color: #000;
	}
	span:nth-child(even) {
		margin-left: 20px;
		margin-right: 5px;
	}
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

.recordBox{
  height: 500px;
  overflow: hidden;
  padding: 0 28px;
  .record-title{
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;

  }
  .record-menu{
    height: 100%;
    overflow: hidden;
    float: left;
    border-top: 1px solid #ccc;
    .left{
      height: 100%;
      width: 150px;
      overflow: auto;
      float: left;
      .left-item{
        width: 100%;
        text-align: center;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
      }
      .left-active{
        color: #409EFF;
      }
    }
    .right{
      height: 100%;
      width: 150px;
      overflow: auto;
      float: left;
      .right-item{
        text-align: center;
        width: 100%;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
      }
      .right-active{
        color: #409EFF;
      }
    }
  }
  .record-content{
    width: 504px;
    height: calc(100% - 35px);
    background: #e8eaec;
    border-top: 1px solid #ccc;
    float: left;
    padding: 10px;
    padding-bottom: 0;
    box-sizing: border-box !important;
    overflow: auto;
    .record-content-header{
      .re-title{
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }
      .re-text{
        padding: 10px;
        line-height: 20px;
      }
      img{
        width: 80px;
      }
    }
  }
}
</style>
