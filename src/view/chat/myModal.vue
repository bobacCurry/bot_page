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
        <FormItem label="名称" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="username" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入username"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <RadioGroup v-model="formValidate.type">
            <Radio label="supergroup">supergroup</Radio>
            <Radio label="channel">channel</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="成员数" prop="member_count">
          <Input v-model="formValidate.member_count" type="number" number placeholder="请输入成员数"></Input>
        </FormItem>
        <FormItem label="语言" prop="lang">
          <Input v-model="formValidate.lang" placeholder="请输入语言"></Input>
        </FormItem>
        <FormItem label="权重" prop="score">
          <Input v-model="formValidate.score" type="number" number placeholder="请输入权重"></Input>
        </FormItem>
        <FormItem label="关键词" prop="keywords">
          <Input v-model="publish_data.keywords" placeholder="请输入关键词 ，点击回车添加" @on-keyup="publish_data.keywords = publish_data.keywords.trim()" @on-enter="add_keywords" @on-blur="add_keywords"></Input>
          <div class="publish-keywords">
            <Tag closable @on-close="del_keywords(key)" v-for="(item,key) in formValidate.keywords" :key="key">{{item}}</Tag>
          </div>
        </FormItem>
        <FormItem label="结束时间" prop="end_at">
          <DatePicker v-model="get_end_at" type="datetime" placeholder="请选择结束时间"></DatePicker>
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
      const keywordsCheck = (rule, value, callback) => {
        if (this.formValidate.keywords.length < 1) {
          callback(new Error('关键词不能为空'));
        } else {
          callback();
        }
      };
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        publish_data: {
          keywords: '',
          keywords_arr: [...this.formValidateObj.keywords]
        },
        ruleValidate: {
          title: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'username不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型不能为空', trigger: 'change' }
          ],
          member_count: [
            { required: true, type: 'number', message: '成员数不能为空', trigger: 'blur' }
          ],
          lang: [
            { required: true, message: '语言不能为空', trigger: 'blur' }
          ],
          score: [
            { required: true, type: 'number', message: '权重不能为空', trigger: 'blur' }
          ],
          keywords: [
            { validator: keywordsCheck, trigger: 'blur' }
          ],
          end_at: [
            { required: true, type: 'date', message: '结束时间不能为空', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      get_end_at: {
        get: function () {
          return this.timestamp_to_date(this.formValidate.end_at)
        },
        set: function (value) {
          this.formValidate.end_at = this.date_to_timestamp(value)
        }
      },
    },
    methods: {
      ...mapActions([
        'editData',
        'createData'
      ]),
      date_to_timestamp(date){
        return new Date(date).getTime();
      },
      timestamp_to_date(timestamp){
        return new Date(timestamp)
      },
      add_keywords(){
        if (!this.publish_data.keywords.length) {
          return false
        }
        this.publish_data.keywords_arr.push(this.publish_data.keywords)
        this.publish_data.keywords = ''
        this.formValidate.keywords = [...this.publish_data.keywords_arr]
      },
      del_keywords(key){
        this.publish_data.keywords_arr.splice(key,1)
        this.formValidate.keywords = [...this.publish_data.keywords_arr]
      },
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'chat'
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
            let model = 'chat'
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

</style>