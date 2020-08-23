<template>
  <div>
    <Card>
      <Card class="switch-card"><Button type="success" @click="setStatus(2)">Success</Button></Card>
      <Card class="switch-card"><Button type="info" @click="setStatus(1)">Working</Button></Card>
      <Card class="switch-card">loading <i-switch v-model="loading"></i-switch></Card>
      <Card class="switch-card" v-for="(item,k) in tableColumnsChecked">{{k}} <i-switch v-model="tableColumnsChecked[k]"></i-switch></Card>
      <Table ref="selection" :loading="loading" :data="tableData2" :columns="tableColumns2" border></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        tableData2: this.mockTableData2(),
        tableColumns2: [],
        tableColumnsChecked: {
          selection:true,
          status:true,
          weak:true,
          signin:true,
          click:true,
          active:true,
          day7:true,
          day30:true,
          tomorrow:true,
          day:true,
          week:true,
          month:true,
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
    methods: {
      reload(){
        this.reload()
      },
      mockTableData2 () {
        let data = [];
        function getNum() {
          return Math.floor(Math.random () * 10000 + 1);
        }
        for (let i = 0; i < 10; i++) {
          data.push({
            name: 'Name ' + (i+1),
            status: 1,
            weak: getNum(),
            signin: getNum(),
            click: getNum(),
            active: getNum(),
            day7: getNum(),
            day30: getNum(),
            tomorrow: getNum(),
            day: getNum(),
            week: getNum(),
            month: getNum()
          })
        }
        return data;
      },
      getTable2Columns () {
        const table2ColumnList = {
          selection: {
            type: 'selection',
            key: 'name',
            align: 'center',
            fixed: 'left',
            width: 60
          },
          name: {
            title: 'Name',
            key: 'name',
            align: 'center',
            fixed: 'left',
            width: 120,
            sortable: true
          },
          status: {
            title: 'Status',
            key: 'status',
            width: 150,
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
              const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          weak: {
            title: 'Weak',
            key: 'weak',
            width: 150,
            sortable: true
          },
          signin: {
            title: 'Signin',
            key: 'signin',
            width: 150,
            sortable: true
          },
          click: {
            title: 'Click',
            key: 'click',
            width: 150,
            sortable: true
          },
          active: {
            title: 'Active',
            key: 'active',
            width: 150,
            sortable: true
          },
          day7: {
            title: '7, retained',
            key: 'day7',
            width: 150,
            sortable: true
          },
          day30: {
            title: '30, retained',
            key: 'day30',
            width: 150,
            sortable: true
          },
          tomorrow: {
            title: 'The next day left',
            key: 'tomorrow',
            width: 150,
            sortable: true
          },
          day: {
            title: 'Day Active',
            key: 'day',
            width: 150,
            sortable: true
          },
          week: {
            title: 'Week Active',
            key: 'week',
            width: 150,
            sortable: true
          },
          month: {
            title: 'Month Active',
            key: 'month',
            width: 150,
            sortable: true
          }
        };

        let obj = this.tableColumnsChecked;
        let data = [table2ColumnList.name];

        Object.keys(obj).forEach(function (key) {
          if (key=='selection' && obj[key]){
            data.splice(0,0,table2ColumnList[key])
          }else if(obj[key]){
            data.push(table2ColumnList[key])
          }
        });

        return data;
      },
      changeTableColumns () {
        this.tableColumns2 = this.getTable2Columns();
      },
      setStatus (status) {
        let selection = this.$refs.selection.getSelection()
        if (!selection.length){
          this.$Message.warning('未选择数据')
          return
        }

        let indexArr = [];
        selection.forEach((item) => {
          indexArr.push(item.name)
        })
        console.log(indexArr)

        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000)

        let data = this.$refs.selection.data;
        let selectionData = this.$refs.selection.objData;
        Object.keys(selectionData).forEach((index) => {
          if(selectionData[index]._isChecked){
            data[index].status = status
          }
        })
      },
      changePage(page){
        console.log(page)
        this.tableData2 = this.mockTableData2()
      }
    },
    mounted () {
      this.changeTableColumns();
    }
  }
</script>

<style>
  .switch-card{
    display: inline-block;margin-right: 5px;
  }
</style>