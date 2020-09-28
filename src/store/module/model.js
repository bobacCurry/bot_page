import {
  get_list,
  edit_data,
  create_data,
  change_status,
  remove_data
} from '@/api/model'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    // 获取列表
    getList ({}, {model, page, size, conditions }) {
      return new Promise((resolve, reject) => {
        get_list({
          model,
          page,
          size,
          conditions
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改
    editData ({}, {model, data }) {
      return new Promise((resolve, reject) => {
        edit_data({
          model,
          data
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改
    createData ({}, {model, data }) {
      return new Promise((resolve, reject) => {
        create_data({
          model,
          data
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改状态
    changeStatus ({}, {model, id_list, status }) {
      return new Promise((resolve, reject) => {
        change_status({
          model,
          id_list,
          status
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除器人
    removeData ({}, {model, id }) {
      return new Promise((resolve, reject) => {
        remove_data({
          model,
          id
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
