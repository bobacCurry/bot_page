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
        <FormItem label="title" prop="title">
          <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
        </FormItem>
        <FormItem label="description" prop="description">
          <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter your description"></Input>
        </FormItem>
        <FormItem label="username" prop="username">
          <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
        </FormItem>
        <FormItem label="type" prop="type">
          <RadioGroup v-model="formValidate.type">
            <Radio label="supergroup">supergroup</Radio>
            <Radio label="channel">channel</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="tags" prop="tags">
          <Input v-model="publish_data.tags" placeholder="Enter your tags ，点击回车添加" @on-keyup="publish_data.tags = publish_data.tags.trim()" @on-enter="add_tags" @on-blur="add_tags"></Input>
          <div class="publish-tags">
            <Tag closable @on-close="del_tags(key)" v-for="(item,key) in formValidate.tags" :key="key">{{item}}</Tag>
          </div>
        </FormItem>
        <FormItem label="member_count" prop="member_count">
          <Input v-model="formValidate.member_count" type="number" number placeholder="Enter your member_count"></Input>
        </FormItem>
        <FormItem label="lang" prop="lang">
          <Input v-model="formValidate.lang" placeholder="Enter your lang"></Input>
        </FormItem>
        <FormItem label="score" prop="score">
          <Input v-model="formValidate.score" type="number" number placeholder="Enter your score"></Input>
        </FormItem>
        <FormItem label="keywords" prop="keywords">
          <Input v-model="publish_data.keywords" placeholder="Enter your keywords ，点击回车添加" @on-keyup="publish_data.keywords = publish_data.keywords.trim()" @on-enter="add_keywords" @on-blur="add_keywords"></Input>
          <div class="publish-keywords">
            <Tag closable @on-close="del_keywords(key)" v-for="(item,key) in formValidate.keywords" :key="key">{{item}}</Tag>
          </div>
        </FormItem>
        <FormItem label="end_at" prop="end_at">
          <DatePicker v-model="get_end_at" type="datetime" placeholder="Select your end_at"></DatePicker>
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
      const tagsCheck = (rule, value, callback) => {
        if (this.formValidate.tags.length < 1) {
          callback(new Error('The tags cannot be empty'));
        } else {
          callback();
        }
      };
      const keywordsCheck = (rule, value, callback) => {
        if (this.formValidate.keywords.length < 1) {
          callback(new Error('The keywords cannot be empty'));
        } else {
          callback();
        }
      };
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        publish_data: {
          tags: '',
          tags_arr: [],
          keywords: '',
          keywords_arr: []
        },
        ruleValidate: {
          title: [
            { required: true, message: 'The title cannot be empty', trigger: 'blur' }
          ],
          description: [
            { required: true, message: 'The description cannot be empty', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'The username cannot be empty', trigger: 'blur' }
          ],
          type: [
            { required: true, message: 'Please type the type', trigger: 'change' }
          ],
          tags: [
            { validator: tagsCheck, trigger: 'blur' }
          ],
          member_count: [
            { required: true, type: 'number', message: 'The member_count cannot be empty', trigger: 'blur' }
          ],
          lang: [
            { required: true, message: 'The lang cannot be empty', trigger: 'blur' }
          ],
          score: [
            { required: true, type: 'number', message: 'The score cannot be empty', trigger: 'blur' }
          ],
          keywords: [
            { validator: keywordsCheck, trigger: 'blur' }
          ],
          end_at: [
            { required: true, type: 'date', message: 'The end_at cannot be empty', trigger: 'change' }
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
      add_tags(){
        if (!this.publish_data.tags.length) {
          return false
        }
        this.publish_data.tags_arr.push(this.publish_data.tags)
        this.publish_data.tags = ''
        this.formValidate.tags = [...this.publish_data.tags_arr]
      },
      del_tags(key){
        this.publish_data.tags_arr.splice(key,1)
        this.formValidate.tags = [...this.publish_data.tags_arr]
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