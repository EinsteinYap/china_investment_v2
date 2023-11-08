import request from '@/utils/request'

// api地址
const api = {
  login: 'passport/pwdLogin',
  register: 'passport/register',
  staffRegister: 'passport/staffReg',
  loginMpWx: 'passport/loginMpWx',
  loginMpWxMobile: 'passport/loginMpWxMobile',
}

// 用户登录
export function login(data) {
  return request.post(api.login, data)
}

// 用户邀请注册
export function register(data) {
  return request.post(api.register, data)
}

// 员工邀请注册
export function staffRegister(data) {
  return request.post(api.staffRegister, data)
}

// 微信小程序快捷登录(获取微信用户基本信息)
export function loginMpWx(data, option) {
  return request.post(api.loginMpWx, data, option)
}

// 微信小程序快捷登录(授权手机号)
export function loginMpWxMobile(data, option) {
  return request.post(api.loginMpWxMobile, data, option)
}
