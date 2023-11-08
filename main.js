import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './locale/index'
import bootstrap from './core/bootstrap'
import mixin from './core/mixins/app'
import status from './components/status.vue'
import './js_sdk/ican-H5Api/ican-H5Api'
import {
  navTo,
  showToast,
  showSuccess,
  showError,
  getShareUrlParams,
  cache,
  countdown
} from './core/app'

Vue.config.productionTip = false

App.mpType = 'app'

// 全局注册组件
Vue.component('page-status',status)

// 载入uView库
Vue.use(uView)

//载入语言
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

// 全局mixin
Vue.mixin(mixin)

// 挂载全局函数
Vue.prototype.$toast = showToast
Vue.prototype.$success = showSuccess
Vue.prototype.$error = showError
Vue.prototype.$navTo = navTo
Vue.prototype.$getShareUrlParams = getShareUrlParams
Vue.prototype.$cache = cache
Vue.prototype.$countdown = countdown

// 实例化应用
const app = new Vue({
  ...App,
  i18n,
  store,
  created: bootstrap
})
app.$mount()
