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
          <Button type="primary" size="small" @click="show(index)">编辑</Button>
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
          selection: true,
          description: true,
          username: true,
          type: true,
          tags: true,
          member_count: true,
          lang: true,
          score: true,
          keywords: true,
          end_at: true,
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
            title: `title ${getNum() + '' + this.page}` + (i+1),
            description: `description ${getNum() + '' + this.page}` + (i+1),
            username: `username ${getNum() + '' + this.page}` + (i+1),
            type: `supergroup`,
            tags: [`tags ${getNum()}`, `tags ${getNum()}`, `tags ${getNum()}`],
            member_count: getNum()+getNum(),
            lang: `cn`,
            score: getNum(),
            keywords: [`keywords ${getNum()}`, `keywords ${getNum()}`, `keywords ${getNum()}`],
            end_at: getNum()+getNum()+getNum()
          })
        }
        console.log(JSON.stringify(data))
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
          title: {
            title: 'title',
            key: 'title',
            align: 'center',
            fixed: 'left',
            width: 120,
            sortable: true
          },
          description: {
            title: 'description',
            key: 'description',
            width: 150,
            sortable: true
          },
          username: {
            title: 'username',
            key: 'username',
            width: 150,
            sortable: true
          },
          type: {
            title: 'type',
            key: 'type',
            width: 150,
            sortable: true
          },
          tags: {
            title: 'tags',
            key: 'tags',
            width: 150,
            sortable: true
          },
          member_count: {
            title: 'member_count',
            key: 'member_count',
            width: 150,
            sortable: true
          },
          lang: {
            title: 'lang',
            key: 'lang',
            width: 150,
            sortable: true
          },
          score: {
            title: 'score',
            key: 'score',
            width: 150,
            sortable: true
          },
          keywords: {
            title: 'keywords',
            key: 'keywords',
            width: 150,
            sortable: true
          },
          end_at: {
            title: 'end_at',
            key: 'end_at',
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
            width: 120,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [table2ColumnList.title]

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