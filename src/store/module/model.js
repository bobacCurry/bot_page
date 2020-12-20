import {
  get_list,
  edit_data,
  create_data,
  change_status,
  remove_data,
  pass,
  refuse,
  engine_get_list,
  engine_edit_data,
  engine_create_data,
  engine_remove_data,
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
    // 创建
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
    // 删除
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
    },
    // 通过
    pass ({}, {model, id }) {
      return new Promise((resolve, reject) => {
        pass({
          model,
          id
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 拒绝
    refuse ({}, {model, id }) {
      return new Promise((resolve, reject) => {
        refuse({
          model,
          id
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取引擎列表
    engineGetList ({}, { model, data }) {
      return new Promise((resolve, reject) => {
        engine_get_list({
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

    // 引擎修改
    engineEditData ({}, { model, data }) {
      return new Promise((resolve, reject) => {
        engine_edit_data({
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

    // 引擎创建
    engineCreateData ({}, { model, data }) {
      return new Promise((resolve, reject) => {
        engine_create_data({
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

    // 引擎删除
    engineRemoveData ({}, { model, data }) {
      return new Promise((resolve, reject) => {
        engine_remove_data({
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
  }
}
