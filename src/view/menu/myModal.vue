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
        <FormItem
                v-for="(item, lang) in formValidate.text"
                :key="lang"
                :label="lang"
                prop="text">
          <Row>
            <Col span="18">
              <Input type="text" v-model="formValidate.text[lang]" @on-keyup="(formValidate.text[lang] = formValidate.text[lang].trim())" :placeholder="'Enter '+ lang +' text'"></Input>
            </Col>
            <Col span="4" offset="1">
              <Button @click="handleRemove(lang)" v-if="lang != 'cn'">Delete</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
              <Dropdown v-if="lang_length > 0">
                <Button type="primary">
                  add text
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(flag,lan) in textData.langList" @click.native="handleAdd(lan)" v-if="flag">{{lan}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="path" prop="path">
          <Input v-model="formValidate.path" placeholder="Enter your path"></Input>
        </FormItem>
        <FormItem label="sort" prop="sort">
          <Input v-model="formValidate.sort" type="number" number placeholder="Enter your sort"></Input>
        </FormItem>
        <FormItem label="width" prop="width">
          <Input v-model="formValidate.width" type="number" number placeholder="Enter your width"></Input>
        </FormItem>
        <FormItem label="level" prop="level">
          <Input v-model="formValidate.level" type="number" number placeholder="Enter your level"></Input>
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
      const textCheck = (rule, value, callback) => {
        Object.keys(this.formValidate.text).forEach(lang=>{
          if(!this.formValidate.text[lang]){
            callback(new Error('The text cannot be empty'));
          }
        })
        callback();
      };
      return {
        modalOpt: {...this.modalOptObj},
        formValidate: {},
        textData: {
          langList: {
            cn: true,
            en: true,
            jp: true
          }
        },
        ruleValidate: {
          text: [
            { validator: textCheck, trigger: 'blur' }
          ],
          path: [
            { required: true, message: 'The path cannot be empty', trigger: 'blur' }
          ],
          sort: [
            { required: true, type: 'number', message: 'The sort cannot be empty', trigger: 'blur' }
          ],
          width: [
            { required: true, type: 'number', message: 'The width cannot be empty', trigger: 'blur' }
          ],
          level: [
            { required: true, type: 'number', message: 'The level cannot be empty', trigger: 'blur' }
          ],
          status: [
            { required: true, type: 'number', message: 'Please select the status', trigger: 'change' }
          ]
        }
      }
    },
    mounted() {
    let {text,...formValidate} = this.formValidateObj
      this.formValidate = formValidate
      this.formValidate.text = {...text}

      this.setTextData()
    },
    computed: {
      lang_length() {
        let length = 0
        Object.keys(this.textData.langList).forEach(lang=>{
          if (this.textData.langList[lang]){
            length++
          }
        })
        return length
      },
    },
    methods: {
      ...mapActions([
        'editData',
        'createData'
      ]),
      setTextData(){
        Object.keys(this.formValidate.text).forEach(lang=>{
          this.textData.langList[lang] = false
        })
      },
      handleAdd (lang) {
        let items = {...this.formValidate.text}
        items[lang] = ''
        this.textData.langList[lang] = false
        this.formValidate.text = {...items}
      },
      handleRemove (lang) {
        delete this.formValidate.text[lang]
        let items = {...this.formValidate.text}
        this.textData.langList[lang] = true
        this.formValidate.text = {...items}
      },
      createSubmit (name) {
        this.modalOpt.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let model = 'menu'
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
            let model = 'menu'
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