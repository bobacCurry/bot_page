<template>
  <div>
    <Card>
      <Row type="flex" justify="start" align="middle" class="table-option">
        <Col>
          <Card class="option-card"><Button type="info" @click="createShow()">添加订单</Button></Card>
        </Col>
        <Col v-for="(item,k) in tableColumnsChecked" :key="k">
          <Card size="small" class="option-card">{{item.title}} <i-switch v-model="tableColumnsChecked[k].status"></i-switch></Card>
        </Col>
        <Col>
          <Card size="small" class="option-card">搜索栏 <i-switch v-model="search.flag"></i-switch></Card>
        </Col>
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
              <Option value="day">day (精准匹配)</Option>
              <Option value="memo">memo (模糊匹配)</Option>
            </Select>
          </Input>
        </Col>
      </Row>
      <Table ref="global_order" class="table" :loading="loading" :data="tableData" :columns="tableColumns" border>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="editShow(index)">编辑</Button>
          <Button type="error" size="small" :style="'margin-left: 10px'" @click="remove(index)">删除</Button>
          <Button type="success" size="small" :style="'margin-left: 10px'" @click="passData(index)">通过</Button>
          <Button type="warning" size="small" :style="'margin-left: 10px'" @click="refuseData(index)">拒绝</Button>
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
          flag: true,
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
          day:{
            title:'购买时长',
            status:true,
          },
          memo:{
            title:'备注',
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
          ads: {},
          day: '',
          memo: '',
          type: 1,
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
      this.mockTableData()
      this.changeTableColumns()
    },
    methods: {
      ...mapActions([
        'getList',
        'removeData',
        'pass',
        'refuse'
      ]),
      mockTableData() {
        let model = 'global_order',
            data = [],
            page = this.page,
            size = this.size,
            conditions = this.search.conditions
        this.loading = true
        this.getList({ model,page, size, conditions }).then(res => {
          this.total = res.order_count
          this.tableData = res.order_list
          this.loading = false
        })
      },
      getTableColumns() {
        const tableColumnList = {
          ads: {
            title: '广告文本',
            fixed: 'left',
            width: 200,
            sortable: true,
            render:(h, params) => {
              const row = params.row
              return h('span',  row.ads.text)
            }
          },
          day: {
            title: '购买时长',
            key: 'day',
            width: 150,
          },
          memo: {
            title: '备注',
            key: 'memo',
            width: 300,
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
            width: 250,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [tableColumnList.ads]

        Object.keys(obj).forEach(function(key) {
          if(obj[key].status){
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
        this.mockTableData()
      },
      searchKeywords(flag){
        if (flag){
          if(this.search.type.length > 0 && this.search.keywords.length > 0){
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
          this.search.type = ''
          this.search.keywords = ''
          let {type,keywords,...conditions} = this.search.conditions
          this.search.conditions = conditions
        }

        this.page = 1
        this.mockTableData()
      },
      changePage(page){
        this.page = page
        this.mockTableData()
      },
      changeSize(size){
        this.size = size
        this.mockTableData()
      },
      createShow() {
        this.modalOpt.edit = false
        this.formValidate = this.formCreateDate
        this.modalOpt.name = '添加订单'
        this.modalOpt.flag = true
      },
      editShow(index) {
        this.modalOpt.edit = true
        this.modalOpt.index = index
        this.formValidate = this.tableData[index]
        this.modalOpt.name = this.tableData[index].ads.text
        this.modalOpt.flag = true
      },
      remove(index) {
        this.$Modal.confirm({
          title: `删除 ${this.tableData[index].ads.text}`,
          onOk:()=>{
            let id = this.tableData[index]._id,
                    model = 'global_order'
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
      },
      passData(index) {
        this.$Modal.confirm({
          title: `通过 ${this.tableData[index].ads.text}`,
          onOk:()=>{
            let id = this.tableData[index]._id,
                    model = 'global_order'
            this.pass({ model, id }).then(res => {
              if (res.success){
                this.$Notice.success({title:res.msg})
              }else {
                this.$Message.error({title:res.msg})
              }
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          }
        })
      },
      refuseData(index) {
        this.$Modal.confirm({
          title: `拒绝 ${this.tableData[index].ads.text}`,
          onOk:()=>{
            let id = this.tableData[index]._id,
                    model = 'global_order'
            this.refuse({ model, id }).then(res => {
              if (res.success){
                this.$Notice.success({title:res.msg})
              }else {
                this.$Message.error({title:res.msg})
              }
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          }
        })
      },
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