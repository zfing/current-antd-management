import { request, config } from 'utils'

const { api } = config
const { fileUpload } = api

export function files (params) {
  return request({
    url: fileUpload,
    method: 'get',
    data: params,
  })
}
