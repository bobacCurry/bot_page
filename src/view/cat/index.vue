<template>
  <div>
    <Card>
      <Row type="flex" justify="start" align="middle" class="table-option">
        <Col>
          <Card class="option-card"><Button type="info" @click="createShow()">create cat</Button></Card>
        </Col>
        <Col v-for="(item,k) in tableColumnsChecked" :key="k">
          <Card size="small" class="option-card">{{k}} <i-switch v-model="tableColumnsChecked[k]"></i-switch></Card>
        </Col>
        <Col>
          <Card size="small" class="option-card">search <i-switch v-model="search.flag"></i-switch></Card>
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
                  placeholder="Select date"
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
                  placeholder="Please enter keywords"
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
              <Option value="text">text (模糊匹配)</Option>
              <Option value="tags">tags (模糊匹配)</Option>
              <Option value="lang">lang (模糊匹配)</Option>
              <Option value="sort">sort (精准匹配)</Option>
            </Select>
          </Input>
        </Col>
      </Row>
      <Table ref="cat" class="table" :loading="loading" :data="tableData" :columns="tableColumns" border>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="editShow(index)">Edit</Button>
          <Button type="error" size="small" :style="'margin-left: 10px'" @click="remove(index)">Remove</Button>
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
          selection: true,
          tags: true,
          lang: true,
          sort: true,
          created_at:true,
          updated_at:true,
          action:true
        },
        modalOpt: {
          index: 0,
          name: '',
          loading: false,
          flag: false,
          closable: false
        },
        formValidate: {},
        formCreateDate: {
          title: '',
          tags: [],
          lang: '',
          sort: 0,
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
        'removeData'
      ]),
      async mockTableData() {
        let model = 'cat',
            data = [],
            page = this.page,
            size = this.size,
            conditions = this.search.conditions
        await this.getList({ model,page, size, conditions }).then(res => {
          this.total = res.cat_count
          data = res.cat_list
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
        })
        return Promise.resolve(data);
      },
      getTableColumns () {
        const tableColumnList = {
          selection: {
            type: 'selection',
            align: 'center',
            fixed: 'left',
            width: 60
          },
          text: {
            title: 'text',
            key: 'text',
            width: 150
          },
          tags: {
            title: 'tags',
            key: 'tags',
            width: 150,
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  wordWrap: true,
                  trigger: 'hover',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.tags.length + ' tags'),
                h('div', {
                  slot: 'content',
                  style: {
                    minWidth: '150px',
                    maxWidth: '500px'
                  }
                }, this.tableData[params.index].tags.map(item => {
                  return h('Tag', {
                    props: {
                      type: 'border',
                      color: 'primary'
                    },
                    style: {
                      margin: '3px 6px'
                    }
                  }, item)
                }))
              ]);
            }
          },
          lang: {
            title: 'lang',
            key: 'lang',
            width: 150,
            sortable: true
          },
          sort: {
            title: 'sort',
            key: 'sort',
            width: 150,
            sortable: true
          },
          created_at: {
            title: 'created_at',
            key: 'created_at',
            width: 150,
            sortable: true
          },
          updated_at: {
            title: 'updated_at',
            key: 'updated_at',
            width: 150,
            sortable: true
          },
          action: {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [tableColumnList.text]

        Object.keys(obj).forEach(function (key) {
          if (key=='selection' && obj[key]){
            data.splice(0,0,tableColumnList[key])
          }else if(obj[key]){
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
        this.modalOpt.name = 'create cat'
        this.modalOpt.flag = true
      },
      editShow(index) {
        this.modalOpt.edit = true
        this.modalOpt.index = index
        this.formValidate = this.tableData[index]
        this.modalOpt.name = this.tableData[index].text
        this.modalOpt.flag = true
      },
      remove(index) {
        this.$Modal.confirm({
          title: `删除 ${this.tableData[index].text}`,
          onOk:()=>{
            let id = this.tableData[index]._id,
                model = 'cat'
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
    overflow: visible;
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