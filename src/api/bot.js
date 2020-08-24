import axios from '@/libs/api.request'

export const get_bot_list = ({ page, size }) => {
  return axios.request({
    url: 'backend/get_bot_list',
    params: {
      page,
      size
    },
    method: 'get'
  })
}

export const bot_edit = (data) => {
  return axios.request({
    url: 'backend/bot_edit',
    method: 'post',
    data
  })
}

export const bot_status_change = ({ id_list, status }) => {
  const data = {
    id_list,
    status
  }
  return axios.request({
    url: 'backend/bot_status_change',
    method: 'post',
    data
  })
}