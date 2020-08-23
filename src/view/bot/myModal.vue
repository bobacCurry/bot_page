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
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="username" prop="username">
          <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
        </FormItem>
        <FormItem label="type" prop="type">
          <Input v-model="formValidate.type" placeholder="Enter your type"></Input>
        </FormItem>
        <FormItem label="status" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="1">success</Radio>
            <Radio :label="0">disable</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel()">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" :loading="modalOpt.loading">修改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    props: ['modalOptObj','formValidateObj'],
    data () {
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'The username cannot be empty', trigger: 'blur' }
          ],
          type: [
            { required: true, message: 'The type cannot be empty', trigger: 'blur' }
          ],
          status: [
            { required: true, type: 'number', message: 'Please select the status', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
            setTimeout(() => {
              this.modalOpt.loading = false
              this.modalOpt.flag = false
              this.$emit('setTableData', {modalOpt:this.modalOpt,formValidate:this.formValidate} ) //触发当前实例上的事件
              this.$Message.success('修改成功')
            }, 500)
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