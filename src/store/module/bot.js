import {
  get_bot_list,
  bot_edit,
  bot_status_change
} from '@/api/bot'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    // 获取机器人列表
    getBotList ({},{ page, size }) {
      return new Promise((resolve, reject) => {
        get_bot_list({
          page,
          size
        }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改机器人
    botEdit ({}, data) {
      return new Promise((resolve, reject) => {
        bot_edit(data).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取机器人列表
    botStatusChange ({},{ id_list, status }) {
      return new Promise((resolve, reject) => {
        bot_status_change({
          id_list,
          status
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
