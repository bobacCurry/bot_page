<template>
  <div>
    <Modal
            v-model="modalOpt.flag"
            :closable="modalOpt.closable"
            :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{modalOpt.name}}</span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <FormItem label="text" prop="text">
          <Input v-model="formValidate.text" placeholder="Enter your text"></Input>
        </FormItem>
        <FormItem label="tags" prop="tags">
          <Input v-model="publish_data.tags" placeholder="Enter your tags ，点击回车添加" @on-keyup="publish_data.tags = publish_data.tags.trim()" @on-blur="add_tags" @on-enter="add_tags"></Input>
          <div class="publish-tags">
            <Tag closable @on-close="del_tags(key)" v-for="(item,key) in formValidate.tags" :key="key">{{item}}</Tag>
          </div>
        </FormItem>
        <FormItem label="lang" prop="lang">
          <Input v-model="formValidate.lang" placeholder="Enter your lang"></Input>
        </FormItem>
        <FormItem label="sort" prop="sort">
          <Input v-model="formValidate.sort" type="number" number placeholder="Enter your sort"></Input>
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
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {...this.formValidateObj},
        publish_data: {
          tags: '',
          tags_arr: []
        },
        ruleValidate: {
          text: [
            { required: true, message: 'The text cannot be empty', trigger: 'blur' }
          ],
          tags: [
            { validator: tagsCheck, trigger: 'blur' }
          ],
          lang: [
            { required: true, message: 'The lang cannot be empty', trigger: 'blur' }
          ],
          sort: [
            { required: true, type: 'number', message: 'The sort cannot be empty', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'editData',
        'createData'
      ]),
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
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'cat'
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
            let model = 'cat'
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