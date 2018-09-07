import { request, config } from 'utils'

const { api } = config
const { contentList } = api
const { contentAdd } = api
const { contentDelete } = api
const { contentUpdate } = api

export function query (params) {
  return request({
    url: contentList,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: contentDelete,
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: contentAdd,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: contentUpdate,
    method: 'post',
    data: params,
  })
}

/*export function upload (params) {
  return request({
    url: codeUpload,
    method: 'upload',
    data: params,
  })
}*/
