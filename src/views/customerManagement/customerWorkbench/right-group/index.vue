<template>
  <div class="right-group-contain">
    <div class="top-group">
      <div class="up ellipsis">{{ currentSelectSession.appNickname }}</div>
      <div class="bottom ellipsis">对应马甲：<span>{{ currentSelectSession.packerNickname }}</span></div>
    </div>
    <div class="bottom-group">

      <!-- <el-tabs v-model="currentTabID" type="card" @tab-click="onSelectTab">
        <el-tab-pane label="历史备注信息" name="0">
          <div class="select-group" @scroll="onScrollRemark">
            <el-timeline size="large">
              <el-timeline-item v-for="(item,index) in remarkList" :key="index" :type=" item.createTime === remarkList[0].createTime ? 'primary' :''" :timestamp="item.createTime + '【' +item.sysUserName+'】'" placement="top">
                <p>{{ item.content }}</p>
              </el-timeline-item>
            </el-timeline>
            <img v-show="remarkEmpty" src="@/assets/Home/group-empty.png" width="100%" alt="">
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史接待记录" name="1">
          <div class="select-group" @scroll="onScrollReceptionRecord">
            <el-timeline size="large">
              <el-timeline-item v-for="(item,index) in receptionRecordList" :key="index" :type="item.createTime === receptionRecordList[0].createTime ? 'primary' :''" :timestamp="item.createTime + '【'+item.sysUserName +'】'" placement="top">
                <p>{{ item.actionName +'【'+ item.csCategoryName+'】' }}</p>
              </el-timeline-item>
            </el-timeline>
            <img v-show="receptionRecordList.length === 0" src="@/assets/Home/group-empty.png" width="100%" alt="">

          </div>
        </el-tab-pane>
      </el-tabs> -->
      <!-- <el-input v-model="remark" clearable placeholder="请输入备注信息">
        <el-button slot="append" @click="onAddRemark">添加</el-button>
      </el-input> -->
      <remark-info :current-select-session="currentSelectSession" />

    </div>
  </div>
</template>

<script>
import API from '@/api/customerWorkbench'
import remarkInfo from './components/index.vue'
export default {
  name: 'RightGroup',
  components: { remarkInfo },
  props: {
    currentSelectSession: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentTabID: '0',
      remark: '',
      remarkList: [],
      remarkEmpty: false,
      receptionRecordList: [],
      pageNum: 1,
      pageSize: 10,
      total: false
    }
  },
  // watch: {
  //   'currentSelectSession.taskId': {
  //     handler(newV, oldV) {
  //       // do something, 可使用this
  //       this.remarkList = []
  //       this.receptionRecordList = []
  //       this.currentTabID = '0'
  //       this.getRemark()
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  methods: {
    onSelectTab(v) {
      if (v.name === '0') {
        this.pageNum = 1
        this.remarkList = []
        this.isTotal = false
        this.getRemark()
      } else if (v.name === '1') {
        this.pageNum = 1
        this.receptionRecordList = []
        this.isTotal = false
        this.getReceptionRecord()
      }
    },
    getReceptionRecord() {
      API[this.$route.path].receptionRecord({ uid: this.currentSelectSession.appUserId, pageNum: this.pageNum }).then((res) => {
        // this.receptionRecordList = res.data.list || []
        const list = [...res.data.list]
        if (list.length !== this.pageSize) {
          this.isTotal = true
        }
        if (this.pageNum > 0) {
          this.receptionRecordList = [...list, ...this.receptionRecordList]
          // setTimeout(this.toBottom, 200)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getRemark() {
      API[this.$route.path].remarkFindByPage({ uid: this.currentSelectSession.appUserId, pageNum: this.pageNum }).then((res) => {
        // if (res.data.list.length <= res.data.total) {
        // this.remarkList.push(...res.data.list)
        const list = [...res.data.list]
        if (list.length !== this.pageSize) {
          this.isTotal = true
        }
        if (this.pageNum > 0) {
          this.remarkList = [...this.remarkList, ...list]
          this.remarkEmpty = !res.data.list.length

          // setTimeout(this.toBottom, 200)
        }
        // }

        // this.remarkList = res.data.list || []
      }).catch((err) => {
        console.log(err)
      })
    },
    onAddRemark() {
      API[this.$route.path].remarkAdd({ uid: this.currentSelectSession.appUserId, content: this.remark }).then((res) => {
        this.$message.success('操作成功')
        this.remark = ''
        this.remarkList = []
        this.getRemark()
      }).catch((err) => {
        console.log(err)
      })
    },
    onScrollRemark(v) {
      const el = v.target
      if (el.scrollTop + el.clientHeight >= el.scrollHeight && !this.isTotal) {
        console.log('到底啦-onScrollRemark')
        setTimeout(() => {
          // if (this.pageNum * 10 <= this.remarkList.length) {
          this.pageNum++
          this.getRemark()
          // }
        }, 1000)
      }
    },
    onScrollReceptionRecord(v) {
      const el = v.target
      if (el.scrollTop + el.clientHeight >= el.scrollHeight && !this.isTotal) {
        console.log('到底啦-onScrollReceptionRecord')
        setTimeout(() => {
          this.pageNum++
          this.getReceptionRecord()
        }, 1000)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.right-group-contain{
  width: 300px;
  .top-group{
    height: 60px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    border-bottom: rgb(240,240,240) 1px solid;
    justify-content: space-between;
    font-size: 14px;
    // align-items: center;
    .up{
      width: 100%;
    };
    .bottom{
      width: 100%;
      // text-align: right
    };
  }
  .bottom-group{
    display: flex;
    height: calc(100vh - 192px);
    flex-direction: column;
    justify-content: space-between;
    .select-group{
      height: calc(100vh - 293px);
      flex: 1;
      overflow: auto;
    }

  }
  ::v-deep .el-timeline{
    font-size: 12px;
    padding: 20px;
  }
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:#fff;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:#bbb;
  }
</style>