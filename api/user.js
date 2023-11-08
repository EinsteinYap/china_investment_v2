import request from '@/utils/request'

// api地址
const api = {
  bindMobile: 'user/bindMobile'
}

// 当前登录的用户信息
export const info = (param, option) => {
  const options = {
    isPrompt: true, //（默认 true 说明：本接口抛出的错误是否提示）
    load: true, //（默认 true 说明：本接口是否提示加载动画）
    ...option
  }
  return request.get('user/info', param, options)
}

// 绑定手机号
export const bindMobile = (data, option) => {
  return request.post(api.bindMobile, data, option)
}

/* ---- 公共 ---- */
// APP下载
export function appDownload(data) {
  return request.get('index/downurl', data, { load: false })
}
// 客服
export function customer(data) {
  return request.get('index/customer', data, { load: false })
}
// 客服
export function servicetg(data) {
  return request.get('index/servicetg', data, { load: false })
}
// 语言
export function langeuage(data) {
  return request.get('index/langeuage', data, { load: false })
}
// 区号列表
export const areacode = (data, option) => {
  return request.get('index/areacode', data, option)
}
// 发送短信验证码
export function sendSmsCaptcha(data) {
  return request.post('captcha/sendSmsCaptcha', data, { load: false })
}
// 介绍
export function aritlce(data,option) {
  return request.get('article/content', data, option)
}
/* ---- 用户 ---- */
// 个人资产
export function assets(data,option) {
  return request.get('user/assets', data, option)
}
//编辑头像
export function editAvatar(data,option) {
  return request.post('user/edit', data, option)
}
//重置登录密码
export function pwdEdit(data,option) {
  return request.post('user/pwdEdit', data, option)
}
//忘记密码 
export function forgetPwdEdit(data,option) {
  return request.post('index/forget', data, option)
}
//重置支付密码
export function paypwdEdit(data,option) {
  return request.post('user/paypwdEdit', data, option)
}
//充值信息
export function rechargeInfo(data,option) {
  return request.get('recharge/info', data, option)
}
//充值
export function rechargeSubmit(data,option) {
  return request.get('recharge/submit', data, option)
}
//充值记录
export function rechargeRecord(data,option) {
  return request.get('recharge.order/list', data, option)
}
//充值总金额
export function rechargeTotal(data,option) {
  return request.get('recharge.order/rechrageTotal', data, option)
}
//提现
export function withdrawSubmit(data,option) {
  return request.post('withdraw/submit', data, option)
}
//提现手续费
export function withdrawComputeFee(data,option) {
  return request.post('withdraw/computeFee', data, option)
}
//提现记录
export function withdrawRecord(data,option) {
  return request.get('withdraw/list', data, option)
}
//提现总金额
export function withdrawTotal(data,option) {
  return request.get('withdraw/totalAmount', data, option)
}
//我的账单
export function myBill(data,option) {
  return request.get('balance.log/list', data, option)
}
//可领取红包
export function redList(data,option) {
  return request.get('fx_paper/available', data, option)
}
//已领取
export function redRecordList(data,option) {
  return request.get('fx_paper/list', data, option)
}
//领取
export function redReceive(data,option) {
  return request.post('fx_paper/receive', data, option)
}
//优惠券
export function couponList(data,option) {
  return request.get('my_coupon/list', data, option)
}
//领取优惠券
export function redReceived(data,option) {
  return request.post('my_coupon/receive', data, option)
}
//我的朋友
export function myFriend(data,option) {
  return request.get('user/childs', data, option)
}
//我的朋友数量
export function myFriendNum(data,option) {
  return request.get('user/childNum', data, option)
}
//提现账号
export function account(data,option) {
  return request.get('fxUserPayment/list', data, option)
}
//详情
export function accountDetail(data,option) {
  return request.get('fxUserPayment/detail', data, option)
}
//删除
export function accountdelete(data,option) {
  return request.post('fxUserPayment/delete', data, option)
}
//编辑
export function accountEdit(data,option) {
  return request.post('fxUserPayment/edit', data, option)
}
//添加
export function accountAdd(data,option) {
  return request.post('fxUserPayment/add', data, option)
}
//我的任务
export function myTasks(data,option) {
  return request.get('fx_task/taskList', data, option)
}
//我的众筹
export function myFunding(data,option) {
  return request.get('fx_crow_funding/buyLists', data, option)
}
/* ---- 首页 ---- */
//首页
export function home(data,option) {
	const options = {
	  isPrompt: false, //（默认 true 说明：本接口抛出的错误是否提示）
	  load: false, //（默认 true 说明：本接口是否提示加载动画）
	  ...option
	}
  return request.get('index/default', data, options)
}
//众筹
export function fundingList(data,option) {
  return request.get('fx_crow_funding/list', data, option)
}
//众筹
export function fundingDetail(data,option) {
  return request.get('fx_crow_funding/detail', data, option)
}
//众筹
export function fundingBuy(data,option) {
  return request.post('fx_crow_funding/buy', data, option)
}
//活动
export function activityList(data,option) {
  return request.get('activity/list', data, option)
}
//活动
export function activityBuy(data,option) {
  return request.post('activity/buy', data, option)
}



/* ---- rent ---- */
//rent
export function rentList(data,option) {
  return request.get('fx_goods/list', data, option)
}
//rent
export function rentDetail(data,option) {
  return request.get('fx_goods/detail', data, option)
}
//下单
export function rentBuy(data,option) {
	const options = {
	  isPrompt: false, //（默认 true 说明：本接口抛出的错误是否提示）
	  load: false, //（默认 true 说明：本接口是否提示加载动画）
	  ...option
	}
  return request.post('fx_order/buy', data, options)
}

/* ---- 分享 ---- */
//分享
export function share(data,option) {
  return request.get('user/share', data, option)
}
//转盘
export function turntable(data,option) {
  return request.get('fx_turn/info', data, option)
}
//开奖
export function turntableStart(data,option) {
	const options = {
	  isPrompt: false, //（默认 true 说明：本接口抛出的错误是否提示）
	  load: false, //（默认 true 说明：本接口是否提示加载动画）
	  ...option
	}
  return request.get('fx_turn/start', data, options)
}

/* ---- 收益 ---- */
//收益
export function incomeList(data,option) {
  return request.get('fx_order/list', data, option)
}
/* ---- 任务 ---- */
//任务
export function taskList(data,option) {
  return request.get('fx_task/list', data, option)
}
//任务详情
export function taskDetail(data,option) {
  return request.get('fx_task/detail', data, {load:false})
}
//接受任务
export function taskReceive(data,option) {
  return request.get('fx_task/receive', data, option)
}
//接受任务
export function taskUpload(data,option) {
  return request.post('fx_task/upload', data, option)
}
/* ---- 新闻 ---- */
//新闻列表
export function newsList(data,option) {
  return request.get('article/news', data, option)
}
//新闻详情
export function newsAritlce(data,option) {
  return request.get('article/detail', data, option)
}