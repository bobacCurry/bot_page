<template>
  <div>
    <Card>
      <Card class="switch-card"><Button type="success" @click="setStatus(1)">Success</Button></Card>
      <Card class="switch-card"><Button type="info" @click="setStatus(0)">Working</Button></Card>
      <!--<Card class="switch-card">loading <i-switch v-model="loading"></i-switch></Card>-->
      <Card class="switch-card" v-for="(item,k) in tableColumnsChecked">{{k}} <i-switch v-model="tableColumnsChecked[k]"></i-switch></Card>
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
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
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
    mounted () {
      this.tableData = this.mockTableData2()

      this.changeTableColumns()
    },
    methods: {
      mockTableData2 () {
        let data = []
        function getNum() {
          return Math.floor(Math.random () * 10000 + 1)
        }
        let num = (this.total-(this.page*this.size))>=0?this.size:(this.total-((this.page-1)*this.size))
        for (let i = 0; i < num; i++) {
          data.push({
            name: `Name ${this.page} ` + (i+1),
            username: getNum(),
            token: getNum(),
            type: getNum(),
            status: 0,
            created_at: getNum(),
            updated_at: getNum()
          })
        }
        return data
      },
      getTable2Columns () {
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
            sortable: true
          },
          username: {
            title: 'username',
            key: 'username',
            width: 150,
            sortable: true
          },
          token: {
            title: 'token',
            key: 'token',
            width: 150,
            sortable: true
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
        this.tableColumns = this.getTable2Columns()
      },
      setStatus (status) {
        let selection = this.$refs.selection.getSelection()
        if (!selection.length){
          this.$Message.warning('未选择数据')
          return
        }

        let indexArr = []
        selection.forEach((item) => {
          indexArr.push(item.name)
        })
        console.log(indexArr)

        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)

        let data = this.$refs.selection.data
        let selectionData = this.$refs.selection.objData
        Object.keys(selectionData).forEach((index) => {
          if(selectionData[index]._isChecked){
            data[index].status = status
          }
        })
      },
      changePage(page){
        console.log(page)
        this.page = page
        this.tableData = this.mockTableData2()
      },
      changeSize(size){
        this.size = size
        this.tableData = this.mockTableData2()
      },
      show (index) {
        this.modalOpt.index = index
        this.modalOpt.name = this.tableData[index].name
        this.modalOpt.flag = true
      },
      setTableData({modalOpt,formValidate}){
        this.modalOpt = modalOpt
        console.log(formValidate)
      },
      modalCancel({modalOpt,formValidate}){
        this.modalOpt = modalOpt
        this.formValidate = formValidate
      }
    }
  }
</script>

<style lang="scss">
  .switch-card{
    display: inline-block;margin-right: 5px;
  }
  .table-page{
    input{
      height: 31px;
    }
  }
</style>