/**
 * request插件地址：https://ext.dcloud.net.cn/plugin?id=822
 */
import store from '@/store'
import request from './request'
import Config from '@/core/config'

// 后端api地址
const apiUrl = Config.get('apiUrl')

// 可以new多个request来支持多个域名请求
const $http = new request({
  // 接口请求地址
  baseUrl: apiUrl,
  // 服务器本地上传文件地址
  fileUrl: apiUrl,
  // 服务器上传图片默认url
  defaultUploadUrl: 'upload/image',
  // 设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
  header: {
    'content-type': 'application/json;charset=utf-8'
  },
  // 请求超时时间, 单位ms（默认15000）
  timeout: 15000,
  // 默认配置（可不写）
  config: {
    // 是否自动提示错误
    isPrompt: true,
    // 是否显示加载动画
    load: true,
    // 是否使用数据工厂
    isFactory: true
  }
})

// 当前接口请求数
let requestNum = 0
// 请求开始拦截器
$http.requestStart = options => {
  if (options.load) {
    if (requestNum <= 0) {
      // 打开加载动画
      uni.showLoading({
        mask: true
      })
    }
    requestNum += 1
  }
  // 图片上传大小限制
  if (options.method == "FILE" && options.maxSize) {
    // 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
    const maxSize = options.maxSize
    for (let item of options.files) {
      if (item.size > maxSize) {
        setTimeout(() => {
          uni.showToast({
            title: "The picture is too large, please upload it again",
            icon: "none"
          })
        }, 10)
        return false
      }
    }
  }
  // 请求前加入当前终端
  options.header['platform'] = store.getters.platform
  // 请求前加入Token
  options.header['Access-Token'] = store.getters.token
  // 请求前加入version
  // #ifdef APP
  options.header['version'] = plus.runtime.version
  // #endif
  // 请求前加入langeuage
  options.header['think-lang'] = uni.getStorageSync('langeuage')?uni.getStorageSync('langeuage'):'en-us'
  // return false 表示请求拦截，不会继续请求
  return options
}

// 请求结束
$http.requestEnd = options => {
  // 判断当前接口是否需要加载动画
  if (options.load) {
    requestNum = requestNum - 1
    if (requestNum <= 0) {
      uni.hideLoading()
    }
  }
}

// 当前是否显示modal
let loginModal = false

// 所有接口数据处理（可在接口里设置不调用此方法）
// 此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = async res => {
  // console.log("接口请求数据", {
  //   url: res.url,
  //   resolve: res.response,
  //   header: res.header,
  //   data: res.data,
  //   method: res.method,
  // })

  if (!res.response.statusCode || res.response.statusCode != 200) {
    // 返回错误的结果(catch接受数据)
    return Promise.reject({
      statusCode: res.response.statusCode,
      errMsg: 'The http status code is incorrect'
    })
  }

  let httpData = res.response.data
  if (typeof httpData == "string") {
    try {
      httpData = JSON.parse(httpData)
    } catch {
      httpData = false
    }
  }
  if (httpData === false || typeof httpData !== 'object') {
    // 返回错误的结果(catch接受数据)
    return Promise.reject({
      statusCode: res.response.statusCode,
      errMsg: "Please check whether the api address can be accessed properly"
    })
  }

  /*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/

  // 判断数据是否请求成功
  // result.status [ 200正常 500有错误 401未登录 403没有权限访问 ]
  if (httpData.status == 200) {
    // 返回正确的结果(then接受数据)
    return Promise.resolve(httpData)
  }

  // 判断是否需要登录
  if (httpData.status == 401) {
    // 401也有可能是后端登录态到期, 所以要清空本地的登录状态
    store.dispatch('Logout')

    // 防止重复弹窗
    if (!loginModal) {
      loginModal = true
      // 弹窗告诉用户去登录
      // uni.showModal({
      //   title: 'Reminder',
      //   content: "You haven't logged in yet, please log in first",
      //   // showCancel: false,
      //   confirmText: "Login",
      //   cancelText: "Cancel",
      //   success: res => {
      //     if (res.confirm) {
      //       uni.navigateTo({
      //         url: "/pages/login/index"
      //       })
      //     }
      //     if (res.cancel && getCurrentPages().length > 1) {
      //       uni.navigateBack()
      //     }
      //     loginModal = false
      //   }
      // })
    }
    // 返回错误的结果(catch接受数据)
    return Promise.reject({
      statusCode: 0,
      errMsg: httpData.message,
      result: httpData
    })
  }

  // 其他错误提示
  if (httpData.status == 500) {
    if (res.isPrompt) {
      setTimeout(() => {
        uni.showToast({
          title: httpData.message,
          icon: "none",
          duration: 2500
        }, 10)
      })
    }
	
    // 返回错误的结果(catch接受数据)
    return Promise.resolve(httpData)
	// Promise.reject({
 //      statusCode: 0,
 //      errMsg: httpData.message,
 //      result: httpData
 //    })
  }

  /*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
}

// 错误回调
$http.requestError = e => {
  if (e.statusCode === 0) {
    throw e
  } else {
    setTimeout(() => showRequestError(e), 10)
  }
}

// 显示请求错误信息
const showRequestError = (e) => {
  let errMsg = `Network request error：${e.errMsg}`
  // #ifdef MP-WEIXIN
  if (e.errMsg === 'request:fail url not in domain list') {
    errMsg = 'The current API domain name has not been added to the wechat mini program authorization list ' + e.errMsg
  }
  // #endif
  if (e.errMsg === 'request:fail') {
    errMsg = 'Network request error: Check whether the api address can be accessed properly'
  }
  uni.showToast({
    title: errMsg,
    icon: "none",
    duration: 3500
  })
}

export default $http
