<template>
  <div>
    <Card>
      <Row type="flex" justify="start" align="middle" class="table-option">
        <Col>
          <Card class="option-card"><Button type="info" @click="createShow()">添加机器人</Button></Card>
        </Col>
        <Col>
          <Card class="option-card"><Button type="success" @click="setStatus(1)">Success</Button></Card>
        </Col>
        <Col>
          <Card class="option-card"><Button type="warning" @click="setStatus(0)">Disable</Button></Card>
        </Col>
        <Col v-for="(item,k) in tableColumnsChecked" :key="k">
          <Card size="small" class="option-card">{{item.title}} <i-switch v-model="tableColumnsChecked[k].status"></i-switch></Card>
        </Col>
<!--        <Col>
          <Card size="small" class="option-card">搜索栏 <i-switch v-model="search.flag"></i-switch></Card>
        </Col>-->
      </Row>
      <Row type="flex" justify="end" align="middle" class="table-search" v-show="search.flag">
        <Col span="7" class="search-date-box">
          <DatePicker
                  size="large"
                  :editable="false"
                  :clearable="true"
                  :confirm="false"
                  type="datetimerange"
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 330px"
                  @on-ok="dateChange(true)"
                  @on-clear="dateChange(false)"
                  v-model="search.date">
          </DatePicker>
        </Col>
        <Col span="9" class="search-input-box">
          <Input
                  size="large"
                  class="search-input"
                  clearable
                  search
                  enter-button="search"
                  placeholder="请输入关键字"
                  v-model="search.keywords"
                  @on-keyup="(search.keywords = search.keywords.trim())"
                  @on-search="searchKeywords(true)"
                  @on-clear="searchKeywords(false)">
            <Select
                    size="large"
                    clearable
                    slot="prepend"
                    class="search-input-select"
                    v-model="search.type"
                    @on-clear="searchKeywords(false)">
              <Option value="username">username (模糊匹配)</Option>
              <Option value="token">token (模糊匹配)</Option>
              <Option value="type">类型 (模糊匹配)</Option>
              <Option value="status">状态 (精准匹配)</Option>
            </Select>
          </Input>
        </Col>
      </Row>
      <Table ref="bot" class="table" :loading="loading" :data="tableData" :columns="tableColumns" border>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="editShow(index)">编辑</Button>
          <Button type="error" size="small" :style="'margin-left: 10px'" @click="remove(index)">删除</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page class="table-page" :total="total" :current="page" show-elevator show-sizer @on-change="changePage" @on-page-size-change="changeSize"></Page>
        </div>
      </div>
    </Card>
    <myModal :modalOptObj="modalOpt" :formValidateObj="formValidate" @updateTableData="updateTableData" @createTableData="createTableData" @modalCancel="modalCancel" v-if="modalOpt.flag"></myModal>
  </div>
</template>
<script>
  import myModal from './myModal.vue'
  import { mapActions } from 'vuex'
  export default {
    components: {myModal},
    data() {
      return {
        search: {
          flag: false,
          date: [ "", "" ],
          type: '',
          keywords: '',
          conditions:{},
        },

        total: 0,
        page: 1,
        size: 10,
        loading: false,
        tableData: [],
        tableColumns: [],
        tableColumnsChecked: {
          selection:{
            title:'选择框',
            status:true,
          },
          token:{
            title:'token',
            status:true,
          },
          type:{
            title:'类型',
            status:true,
          },
          cburl:{
            title:'回调域',
            status:true,
          },
          status:{
            title:'状态',
            status:true,
          },
          created_at:{
            title:'创建时间',
            status:true,
          },
          updated_at:{
            title:'更新时间',
            status:true,
          },
          action:{
            title:'操作',
            status:true,
          }
        },
        modalOpt: {
          edit: true,
          index: null,
          name: '',
          loading: false,
          flag: false,
          closable: false
        },
        formValidate: {},
        formCreateDate: {
          username: '',
          token: '',
          type: '',
          cburl: '',
          status: 0,
        }
      }
    },
    watch:{
      tableColumnsChecked:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.changeTableColumns();
        },
        deep:true //true 深度监听
      }
    },
    mounted() {
      this.mockTableData().then(data => {
          this.tableData = data
        })

      this.changeTableColumns()
    },
    methods: {
      ...mapActions([
        'getList',
        'changeStatus',
        'removeData'
      ]),
      async mockTableData() {
        let model = 'bot',
            data = [],
            page = this.page,
            size = this.size,
            conditions = this.search.conditions
        await this.getList({ model,page, size, conditions }).then(res => {
          this.total = res.bot_count
          data = res.bot_list
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
        })
        return Promise.resolve(data);
      },
      getTableColumns() {
        const tableColumnList = {
          selection: {
            type: 'selection',
            align: 'center',
            fixed: 'left',
            width: 60
          },
          username: {
            title: 'username',
            key: 'username',
            align: 'center',
            fixed: 'left',
            width: 150,
          },
          token: {
            title: 'token',
            key: 'token',
            width: 150,
          },
          type: {
            title: '类型',
            key: 'type',
            width: 150,
            sortable: true
          },
          cburl: {
            title: '回调域名',
            key: 'cburl',
            width: 150,
            sortable: true
          },
          status: {
            title: '状态',
            key: 'status',
            width: 150,
            sortable: true,
            render:(h, params) => {
              const row = params.row
              const color = row.status === 0 ? 'warning' : row.status === 1 ? 'success' : 'error'
              const text = row.status === 0 ? 'Disable' : row.status === 1 ? 'Success' : 'Fail'
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text)
            }
          },
          created_at: {
            title: '创建时间',
            key: 'created_at',
            width: 150,
            sortable: true
          },
          updated_at: {
            title: '更新时间',
            key: 'updated_at',
            width: 150,
            sortable: true
          },
          action: {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [tableColumnList.username]

        Object.keys(obj).forEach(function(key) {
          if(key=='selection' && obj[key].status){
            data.splice(0,0,tableColumnList[key])
          }else if(obj[key].status){
            data.push(tableColumnList[key])
          }
        })

        return data
      },
      changeTableColumns() {
        this.tableColumns = this.getTableColumns()
      },
      dateChange(flag){
        if (flag){
          this.search.conditions.date = this.search.date
        }else {
          let {date,...conditions} = this.search.conditions
          this.search.conditions = conditions
        }
        this.page = 1
        this.mockTableData().then(data => {
          this.tableData = data
        })
      },
      searchKeywords(flag){
        if (flag){
          if(this.search.type.length > 0 && this.search.keywords.length > 0){
            this.loading = true
            this.search.conditions.type = this.search.type
            this.search.conditions.keywords = this.search.keywords
          }else if(!this.search.type){
            this.$Message.warning('未选择类型')
            return
          }else {
            this.$Message.warning('未填写关键词')
            return
          }
        }else {
          this.loading = true
          this.search.type = ''
          this.search.keywords = ''
          let {type,keywords,...conditions} = this.search.conditions
          this.search.conditions = conditions
        }

        this.page = 1
        this.mockTableData().then(data => {
          this.loading = false
          this.tableData = data
        })
      },
      setStatus(status) {
        let selection = this.$refs['bot'].getSelection()
        if(!selection.length){
          this.$Message.warning('未选择数据')
          return
        }

        this.$Modal.confirm({
          title: `将 status 修改 ${status==1?'Success':'Disable'}`,
          onOk:()=>{
            let selectionData = this.$refs['bot'].objData,
                model = 'bot',
                id_list = [],
                index_list = []
            Object.keys(selectionData).forEach((index) => {
              if(selectionData[index]._isChecked){
                id_list.push(selectionData[index]._id)
                index_list.push(index)
              }
            })

            this.changeStatus({ model, id_list, status }).then(res => {
              index_list.forEach((index) => {
                this.tableData[index].status = status
              })
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          }
        })
      },
      changePage(page){
        this.page = page
        this.mockTableData().then(data => {
          this.tableData = data
        })
      },
      changeSize(size){
        this.size = size
        this.mockTableData().then(data => {
          this.tableData = data
        })
      },
      createShow() {
        this.modalOpt.edit = false
        this.formValidate = this.formCreateDate
        this.modalOpt.name = '添加机器人'
        this.modalOpt.flag = true
      },
      editShow(index) {
        this.modalOpt.edit = true
        this.modalOpt.index = index
        this.formValidate = this.tableData[index]
        this.modalOpt.name = this.tableData[index].name
        this.modalOpt.flag = true
      },
      remove(index) {
        this.$Modal.confirm({
          title: `删除 ${this.tableData[index].name}`,
          onOk:()=>{
            let id = this.tableData[index]._id,
                model = 'bot'
            this.removeData({ model, id }).then(res => {
              if (res.success){
                this.tableData.splice(index,1)
                this.$Message.success(res.msg)
              }
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          }
        })
      },
      createTableData({modalOpt,formValidate}){
        this.modalOpt = modalOpt
        this.tableData.splice(0,0,formValidate);
      },
      updateTableData({modalOpt,formValidate}){
        this.modalOpt = modalOpt
        let tableData = [...this.tableData]
        tableData[modalOpt.index] = formValidate
        this.tableData = tableData
      },
      modalCancel(modalOpt){
        this.modalOpt = modalOpt
      }
    }
  }
</script>

<style lang="scss">
  .table-option{
    margin-bottom: 10px;
    .option-card{
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .table-search{
    height: 66px;
    border: 1px solid #dcdee2;
    border-bottom: none;
    .search-date-box{
      width: 330px;
      margin-right: 30px;
    }
    .search-input-box{
      margin: 0 5px;
      .search-input{
        height: 36px;
        .ivu-input-inner-container{
          height: 100%;
          input{
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .search-input-select{
          width: 150px;
        }
      }
    }
  }
  .table{
    .ivu-tag{
      cursor: default;
    }
  }
  .table-page{
    input{
      height: 31px;
    }
  }
</style>