<template>
  <div>
    <Card>
      <Card class="switch-card"><Button type="success" @click="setStatus(1)">Success</Button></Card>
      <Card class="switch-card"><Button type="info" @click="setStatus(0)">Working</Button></Card>
      <!--<Card class="switch-card">loading <i-switch v-model="loading"></i-switch></Card>-->
      <Card size="small" class="switch-card" v-for="(item,k) in tableColumnsChecked">{{k}} <i-switch v-model="tableColumnsChecked[k]"></i-switch></Card>
      <Table ref="selection" :loading="loading" :data="tableData" :columns="tableColumns" border>
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="show(index)">Edit</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page class="table-page" :total="total" :current="page" show-elevator show-sizer @on-change="changePage" @on-page-size-change="changeSize"></Page>
        </div>
      </div>
    </Card>
    <myModal :modalOptObj="modalOpt" :formValidateObj="formValidate" @setTableData="setTableData" @modalCancel="modalCancel" v-if="modalOpt.flag"></myModal>
  </div>
</template>
<script>
  import myModal from './myModal.vue'
  import { mapActions } from 'vuex'
  export default {
    components: {myModal},
    data () {
      return {
        total: 100,
        page: 1,
        size: 10,
        loading: false,
        tableData: [],
        tableColumns: [],
        tableColumnsChecked: {
          selection:true,
          username:true,
          token:true,
          type:true,
          status:true,
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
        formValidate: {}
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
    mounted () {
      this.mockTableData().then(data => {
          this.tableData = data
        })

      this.changeTableColumns()
    },
    methods: {
      ...mapActions([
        'getBotList',
        'botStatusChange'
      ]),
      async mockTableData () {
        let data = [],
            page = this.page,
            size = this.size
        await this.getBotList({ page, size }).then(res => {
          this.count = res.bot_count
          data = res.bot_list
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
        })
        return Promise.resolve(data);
      },
      getTableColumns () {
        const table2ColumnList = {
          selection: {
            type: 'selection',
            align: 'center',
            fixed: 'left',
            width: 60
          },
          name: {
            title: 'name',
            key: 'name',
            align: 'center',
            fixed: 'left',
            width: 120,
          },
          username: {
            title: 'username',
            key: 'username',
            width: 150,
          },
          token: {
            title: 'token',
            key: 'token',
            width: 150,
          },
          type: {
            title: 'type',
            key: 'type',
            width: 150,
            sortable: true
          },
          status: {
            title: 'status',
            key: 'status',
            width: 150,
            sortable: true,
            render: (h, params) => {
              const row = params.row
              const color = row.status === 0 ? 'primary' : row.status === 1 ? 'success' : 'error'
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
            width: 120,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [table2ColumnList.name]

        Object.keys(obj).forEach(function (key) {
          if (key=='selection' && obj[key]){
            data.splice(0,0,table2ColumnList[key])
          }else if(obj[key]){
            data.push(table2ColumnList[key])
          }
        })

        return data
      },
      changeTableColumns () {
        this.tableColumns = this.getTableColumns()
      },
      setStatus (status) {
        let selection = this.$refs.selection.getSelection()
        if (!selection.length){
          this.$Message.warning('未选择数据')
          return
        }

        let selectionData = this.$refs.selection.objData
        let id_list = []
        let index_list = []
        Object.keys(selectionData).forEach((index) => {
          if(selectionData[index]._isChecked){
            id_list.push(selectionData[index]._id)
            index_list.push(index)
          }
        })

        this.botStatusChange({ id_list, status }).then(res => {
          index_list.forEach((index) => {
            this.tableData[index].status = status
          })
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
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
      show (index) {
        this.modalOpt.index = index
        this.formValidate = this.tableData[index]
        this.modalOpt.name = this.tableData[index].name
        this.modalOpt.flag = true
      },
      setTableData({modalOpt,formValidate}){
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
  .switch-card{
    display: inline-block;margin-right: 5px;
  }
  .ivu-tag{
    cursor: default;
  }
  .table-page{
    input{
      height: 31px;
    }
  }
</style>