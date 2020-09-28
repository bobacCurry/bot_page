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
        <FormItem label="text" prop="text">
          <Input v-model="formValidate.text" placeholder="Enter your text"></Input>
        </FormItem>
        <FormItem label="link" prop="link">
          <Input v-model="formValidate.link" placeholder="Enter your link"></Input>
        </FormItem>
        <FormItem label="count" prop="count">
          <Input v-model="formValidate.count" type="number" number placeholder="Enter your count"></Input>
        </FormItem>
        <FormItem label="status" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="true">success</Radio>
            <Radio :label="false">disable</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="last_show" prop="last_show">
          <DatePicker v-model="get_last_show" type="datetime" placeholder="Select your last_show"></DatePicker>
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
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        ruleValidate: {
          text: [
            { required: true, message: 'The text cannot be empty', trigger: 'blur' }
          ],
          link: [
            { required: true, message: 'The link cannot be empty', trigger: 'blur' }
          ],
          count: [
            { required: true, type: 'number', message: 'The count cannot be empty', trigger: 'blur' }
          ],
          status: [
            { required: true, type: 'boolean', message: 'Please select the status', trigger: 'change' }
          ],
          last_show: [
            { required: true, type: 'date', message: 'The last_show cannot be empty', trigger: 'change' }
          ],
          end_at: [
            { required: true, type: 'date', message: 'The end_at cannot be empty', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      get_last_show: {
        get: function () {
          return this.timestamp_to_date(this.formValidate.last_show)
        },
        set: function (value) {
          this.formValidate.last_show = this.date_to_timestamp(value)
        }
      },
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
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'ads'
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
            let model = 'ads'
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