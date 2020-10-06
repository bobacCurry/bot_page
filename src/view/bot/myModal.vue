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
        <FormItem label="name" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入name"></Input>
        </FormItem>
        <FormItem label="username" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入username"></Input>
        </FormItem>
        <FormItem label="token" prop="token">
          <Input v-model="formValidate.token" placeholder="请输入token"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Input v-model="formValidate.type" placeholder="请输入类型"></Input>
        </FormItem>
        <FormItem label="回调域" prop="cburl">
          <Input v-model="formValidate.cburl" placeholder="请输入回调域"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="1">success</Radio>
            <Radio :label="0">disable</Radio>
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
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        ruleValidate: {
          name: [
            { required: true, message: 'name不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'username不能为空', trigger: 'blur' }
          ],
          token: [
            { required: true, message: 'token不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          cburl: [
            { required: true, message: '回调域不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, type: 'number', message: '请选择状态', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'editData',
        'createData'
      ]),
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'bot'
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
            let model = 'bot'
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