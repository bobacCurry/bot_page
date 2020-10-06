<template>
  <div>
    <Modal
            v-model="modalOpt.flag"
            :closable="modalOpt.closable"
            :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{modalOpt.name}}</span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="广告ID" prop="aid">
          <Input v-model="formValidate.aid._id" disabled placeholder="请选择广告"></Input>
          <Row type="flex" justify="center" align="middle">
            <Col span="24" style="text-align: center">
              <span @click="tableFlag = !tableFlag" style="cursor: pointer">
                <Icon size="22" type="md-arrow-dropdown" :class="{'table_hide':!tableFlag}" class="table_show"/> 广告列表
              </span>
            </Col>
            <Col span="24" v-show="tableFlag" :class="{'table_box_hide':!tableFlag}" class="table_box_show">
              <Row type="flex" justify="center" align="middle" class="table-search">
                <Col>
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
              </Row>
              <Row type="flex" justify="center" align="middle" class="table-search">
                <Col>
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
                      <Option value="text">广告文本 (模糊匹配)</Option>
                      <Option value="link">链接 (模糊匹配)</Option>
                      <Option value="count">点击次数 (精准匹配)</Option>
                      <Option value="status">状态 (精准匹配)</Option>
                    </Select>
                  </Input>
                </Col>
              </Row>
              <Table
                      ref="ads"
                      class="table"
                      :loading="loading"
                      :data="tableData"
                      :columns="tableColumns"
                      highlight-row
                      @on-row-click="setAid"
                      border>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page class="table-page" :total="total" :current="page" show-elevator show-sizer @on-change="changePage" @on-page-size-change="changeSize"></Page>
                </div>
              </div>
            </Col>
          </Row>

        </FormItem>
        <FormItem label="购买时长" prop="time">
          <Input v-model="formValidate.time" type="number" number placeholder="Enter your time"></Input>
        </FormItem>
        <FormItem label="备注" prop="memo">
          <Input v-model="formValidate.memo" placeholder="Enter your memo"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <RadioGroup v-model="formValidate.type">
            <Radio :label="1">1</Radio>
            <Radio :label="2">2</Radio>
            <Radio :label="3">3</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel()">取消</Button>
        <Button type="primary" @click="editSubmit('formValidate')" style="margin-left: 8px" :loading="modalOpt.loading" v-if="modalOptObj.edit">编辑</Button>
        <Button type="primary" @click="createSubmit('formValidate')" style="margin-left: 8px" :loading="modalOpt.loading" v-else>创建</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: ['modalOptObj','formValidateObj'],
    data () {
      const aidCheck = (rule, value, callback) => {
        if (!this.formValidate.aid._id) {
          callback(new Error('广告ID不能为空'));
        } else {
          callback();
        }
      };
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        ruleValidate: {
          aid: [
            { validator: aidCheck, trigger: 'blur' }
          ],
          time: [
            { required: true, type: 'number', message: '购买时长不能为空', trigger: 'blur' }
          ],
          memo: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, type: 'number', message: '类型不能为空', trigger: 'change' }
          ]
        },
        search: {
          flag: true,
          date: [ "", "" ],
          type: '',
          keywords: '',
          conditions:{},
        },
        tableFlag: false,
        total: 0,
        page: 1,
        size: 10,
        loading: false,
        tableData: [],
        tableColumns: [
          {
            title: '广告文本',
            key: 'text',
            align: 'center',
            fixed: 'left',
            width: 120,
          },
          {
            title: '链接',
            key: 'link',
            width: 200,
          },
          {
            title: '点击次数',
            key: 'count',
            width: 150,
          },
          {
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
          {
            title: '上次展示时间',
            key: 'last_show',
            width: 150,
            sortable: true
          },
          {
            title: '结束时间',
            key: 'end_at',
            width: 150,
            sortable: true
          },
          {
            title: '创建时间',
            key: 'created_at',
            width: 150,
            sortable: true
          },
          {
            title: '更新时间',
            key: 'updated_at',
            width: 150,
            sortable: true
          }
        ],
        setAdsIndex: null
      }
    },
    mounted() {
      this.mockTableData().then(data => {
        this.tableData = data
      })
    },
    methods: {
      ...mapActions([
        'getList',
        'editData',
        'createData'
      ]),
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
      async mockTableData() {
        let model = 'ads',
                data = [],
                page = this.page,
                size = this.size,
                conditions = this.search.conditions
        await this.getList({ model,page, size, conditions }).then(res => {
          this.total = res.ads_count
          data = res.ads_list
        }).catch((e)=>{
          this.$Notice.error({title:e.response.data.msg})
        })
        return Promise.resolve(data);
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
      setAid(item, index){
        if (this.setAdsIndex !== index){
          this.setAdsIndex = index
          this.formValidate.aid = item
        }else {
          this.$refs['ads'].clearCurrentRow();
          this.setAdsIndex = null
          this.formValidate.aid = {}
        }
        this.tableFlag = false
      },
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'order'
            let data = this.formValidate
            this.createData({ model, data }).then(res => {
              if(res.success){
                this.formValidate = res.data
                this.modalOpt.loading = false
                this.modalOpt.flag = false
                this.$emit('createTableData', {modalOpt:this.modalOpt,formValidate:this.formValidate} ) //触发当前实例上的事件
                this.$Message.success(res.msg)
              }
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          } else {
            this.$Message.error('Fail!')
            this.modalOpt.loading = false
          }
        })
      },
      editSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'order'
            let data = this.formValidate
            this.editData({ model, data }).then(res => {
              if(res.success){
                this.formValidate = res.data
                this.modalOpt.loading = false
                this.modalOpt.flag = false
                this.$emit('updateTableData', {modalOpt:this.modalOpt,formValidate:this.formValidate} ) //触发当前实例上的事件
                this.$Message.success(res.msg)
              }
            }).catch((e)=>{
              this.$Notice.error({title:e.response.data.msg})
            })
          } else {
            this.$Message.error('Fail!')
            this.modalOpt.loading = false
          }
        })
      },
      handleCancel () {
        this.modalOpt.loading = false
        this.modalOpt.flag = false
        this.$emit('modalCancel', this.modalOpt ) //触发当前实例上的事件
      }
    }
  }
</script>

<style lang="scss">
.table_show{
  transition: all .3s linear;
}
.table_hide{
  transform:rotate(180deg);
  -ms-transform:rotate(180deg); 	/* IE 9 */
  -moz-transform:rotate(180deg); 	/* Firefox */
  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
  -o-transform:rotate(180deg);
}
  .table_box_show{
    background: #fff;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.5s linear;
  }
  .table_box_hide{
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
</style>