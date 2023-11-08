import request from '@/utils/request'

// api地址
const api = {
  data: 'setting/data',
  update: 'index/heatUpdate'
}

// 设置项详情
export function data() {
  return request.get(api.data)
}

// 热更新
export function update() {
  return request.get(api.update)
}
