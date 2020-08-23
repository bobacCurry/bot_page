import axios from '@/libs/api.request'

export const register = (data) => {
  return axios.request({
    url: 'account/register',
    data,
    method: 'post'
  })
}

export const login = ({ account, password }) => {
  const data = {
    account,
    password
  }
  return axios.request({
    url: 'account/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'account/get_info',
    params: {
      //token
    },
    method: 'get'
  })
}

export const resetPassword = (data) => {
  return axios.request({
    url: 'account/reset_password',
    method: 'post',
    data
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'account/logout',
    method: 'post'
  })
}