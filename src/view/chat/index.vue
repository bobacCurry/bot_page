<template>
  <div>
    <Card>
      <Row type="flex" justify="start" align="middle" class="table-option">
        <Col>
          <Card class="option-card"><Button type="info"  @click="newChat.binding=true">添加群组</Button></Card>
        </Col>
        <Col v-for="(item,k) in tableColumnsChecked" :key="k">
          <Card size="small" class="option-card">{{item.title}} <i-switch v-model="tableColumnsChecked[k].status"></i-switch></Card>
        </Col>
      </Row>
      <Row type="flex" justify="end" align="middle" class="table-search">
        <!--<Col span="3" class="search-lang-box">
          <div>语言：</div>
          <RadioGroup size="large" v-model="lang" @on-change="changeLang()">
            <Radio label="cn"></Radio>
            <Radio label="en"></Radio>
          </RadioGroup>
        </Col>-->
        <Col span="6" class="search-keyword-box">
          <Input
                  size="large"
                  class="search-input"
                  search
                  enter-button="search"
                  placeholder="请输入关键字"
                  v-model="keyword"
                  @on-keyup="(keyword = keyword.trim())"
                  @on-search="searchKeywords()">
          </Input>
        </Col>
      </Row>
      <Table ref="chat" class="table" :loading="loading" :data="tableData" :columns="tableColumns" border>
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
    <myModal :modalOptObj="modalOpt" :formValidateObj="formValidate" @updateTableData="updateTableData" @modalCancel="modalCancel" v-if="modalOpt.flag"></myModal>
    <div class="idle" v-if="newChat.binding">
      <div class="idle-frame">
        <Card class="idle-content client-item">
          <div>
            <div class="bind-item">
              <Input v-model="newChat.username" placeholder="请输入username"></Input>
            </div>
            <div class="bind-item">
              <Input v-model="newChat.token" placeholder="请输入token"></Input>
            </div>
            <div class="bind-item">
              <Button @click="createHidden()">取消</Button>
              <Button @click="createSubmit()" type="primary" style="margin-left: 8px" :loading="newChat.loading">确定</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
  import myModal from './myModal.vue'
  import { mapActions } from 'vuex'
  export default {
    components: {myModal},
    data() {
      return {
        total: 0,
        page: 1,
        size: 10,
        lang: 'cn',
        keyword: '',
        loading: false,
        tableData: [],
        tableColumns: [],
        tableColumnsChecked: {
          description: {
            title:'描述',
            status:true,
          },
          username: {
            title:'username',
            status:true,
          },
          type: {
            title:'类型',
            status:true,
          },
          member_count: {
            title:'成员数',
            status:true,
          },
          score: {
            title:'权重',
            status:true,
          },
          keywords: {
            title:'关键词',
            status:true,
          },
          action:{
            title:'操作',
            status:true,
          }
        },
        modalOpt: {
          index: 0,
          name: '',
          loading: false,
          flag: false,
          closable: false
        },
        formValidate: {},
        newChat:{
          binding:false,
          loading:false,
          username:'',
          token:''

        },
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
        'engineGetList',
        'engineCreateData',
        'engineRemoveData',
      ]),
      mockTableData() {
        let model = 'chat',
            lang = this.lang,
            keyword = this.keyword,
            page = this.page,
            size = this.size,
            data = {lang,keyword,page,size}
        this.loading = true
        this.engineGetList({ model, data }).then((r)=>{
          if (r.success){
            this.total = r.chat_count
            this.tableData = r.chat_list
          }else {
            this.total = 0
            this.tableData =[]
            this.$Message.warning(r.msg)
          }
          this.loading = false
        })
      },
      getTableColumns () {
        const tableColumnList = {
          title: {
            title: '名称',
            key: 'title',
            align: 'center',
            fixed: 'left',
            width: 120
          },
          description: {
            title: '描述',
            key: 'description',
            width: 150
          },
          username: {
            title: 'username',
            key: 'username',
            width: 150
          },
          type: {
            title: '类型',
            key: 'type',
            width: 150,
          },
          member_count: {
            title: '成员数',
            key: 'member_count',
            width: 150,
          },
          score: {
            title: '权重',
            key: 'score',
            width: 150,
          },
          keywords: {
            title: '关键词',
            key: 'keywords',
            width: 150,
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  wordWrap: true,
                  trigger: 'hover',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.keywords.length + ' keywords'),
                h('div', {
                  slot: 'content',
                  style: {
                    minWidth: '150px',
                    maxWidth: '500px'
                  }
                }, this.tableData[params.index].keywords.map(item => {
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
          action: {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        }

        let obj = this.tableColumnsChecked
        let data = [tableColumnList.title]

        Object.keys(obj).forEach(function (key) {
          if(obj[key].status){
            data.push(tableColumnList[key])
          }
        })

        return data
      },
      changeTableColumns() {
        this.tableColumns = this.getTableColumns()
      },
      searchKeywords(){
        if(this.lang<=0){
          this.$Message.warning('未选择语言')
          return
        }else if(this.keywords<=0){
          this.$Message.warning('未填写关键词')
          return
        }
        this.loading = true
        this.mockTableData()
      },
      changeLang(){
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
      createHidden() {
        this.newChat.binding = false
        this.newChat.loading = false
        this.newChat.username = ''
        this.newChat.token = ''
      },
      createSubmit() {
        if(this.newChat.username<=0){
          this.$Message.warning('未填写username')
          return
        }else if(this.newChat.token<=0){
          this.$Message.warning('未填写token')
          return
        }
        this.newChat.loading = true
        let model = 'chat',
            username = this.newChat.username,
            token = this.newChat.token,
            data = {username,token}
        this.engineCreateData({ model, data }).then(res => {
          if(res.success){
            this.newChat.binding = false
            this.newChat.username = ''
            this.newChat.token = ''
            this.$Message.success(res.msg)
          }else {
            this.$Message.warning(res.msg)
          }
          this.newChat.loading = false
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
        })
      },
      editShow(index) {
        this.modalOpt.index = index
        this.formValidate = this.tableData[index]
        this.formValidate.lang = this.lang
        this.modalOpt.name = this.tableData[index].title
        this.modalOpt.flag = true
      },
      remove(index) {
        this.$Modal.confirm({
          title: `删除 ${this.tableData[index].title}`,
          onOk:()=>{
            let model = 'chat',
                lang = this.lang,
                id = this.tableData[index].id,
                data = {lang,id}
            this.engineRemoveData({ model, data}).then(res => {
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
    .search-lang-box{
      margin: 0 5px;
      text-align: center;
      .ivu-radio-group-item{
        margin: 0 10px;
      }
    }
    .search-keyword-box{
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

  .idle{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000000;
    .idle-frame{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      background-color: rgba(0, 0, 0, 0.45);
      .idle-content{
        height: 190px;
        width: 350px;
        .item-info{
          margin-top: 10px;
        }
        .bind-item{
          margin-top: 10px;
          text-align: center;
          &:last-child{
            margin-top: 30px;
            text-align: right;
          }
        }
      }
    }
  }
</style>