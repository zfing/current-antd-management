import { request, config } from 'utils'

const { api } = config
const { accountList } = api
const { createAccount } = api
const { sendAccount } = api

export function query (params) {
  return request({
    url: accountList,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: createAccount,
    method: 'post',
    data: params,
  })
}

export function send (params) {
  return request({
    url: sendAccount,
    method: 'post',
    data: params,
  })
}

export function upload (params) {
  return request({
    url: newUpload,
    method: 'upload',
    data: params,
  })
}
