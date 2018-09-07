import { request, config } from 'utils'

const { api } = config
const { contactList } = api
const { contactDetail } = api
const { createAccount } = api
const { contactDelete } = api
const { sendAccount } = api

export function query (params) {
  return request({
    url: contactList,
    method: 'get',
    data: params,
  })
}
export function details (params) {
  return request({
    url: contactDetail,
    method: 'get',
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
export function creates (params) {
  return request({
    url: createAccount,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: contactDelete,
    method: 'post',
    data: params,
  })
}

export function upload (params) {
  return request({
    url: codeUpload,
    method: 'upload',
    data: params,
  })
}
