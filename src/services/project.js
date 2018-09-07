import { request, config } from 'utils'

const { api } = config
const { projectList } = api
const { projectLaunch } = api
const { projectDisplay } = api


export function query (params) {
  return request({
    url: projectList,
    method: 'get',
    data: params,
  })
}

export function launch (params) {
  return request({
    url: projectLaunch,
    method: 'post',
    data: params,
  })
}

export function display (params) {
  return request({
    url: projectDisplay,
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: totalAdd,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: totalUpdate,
    method: 'post',
    data: params,
  })
}

export function upload (params) {
  return request({
    url: totalUpload,
    method: 'upload',
    data: params,
  })
}
