import axios from '@/libs/api.request'

export const get_list = ({ model, page, size, conditions }) => {
  const data = {
    page,
    size,
    conditions
  }
  return axios.request({
    url: `backend/${model}_get_list`,
    method: 'post',
    data
  })
}

export const edit_data = ({ model, data }) => {
  return axios.request({
    url: `backend/${model}_edit`,
    method: 'post',
    data
  })
}

export const create_data = ({ model, data }) => {
  return axios.request({
    url: `backend/${model}_create`,
    method: 'post',
    data
  })
}

export const change_status = ({ model, id_list, status }) => {
  const data = {
    id_list,
    status
  }
  return axios.request({
    url: `backend/${model}_status_change`,
    method: 'post',
    data
  })
}

export const remove_data = ({ model, id }) => {
  const data = {
    id
  }
  return axios.request({
    url: `backend/${model}_remove`,
    method: 'post',
    data
  })
}