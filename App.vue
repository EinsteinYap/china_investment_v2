<script>
	import APPUpdate from './common/APPUpdate'
  export default {

    /**
     * 全局变量
     */
    globalData: {
		isPop:false,
    },

    /**
     * 初始化完成时触发
     */
    onLaunch() {
      // 小程序主动更新
      this.updateManager()
	  //uni.getStorageSync('langeuage'):'en-us'
	  var langeuage = uni.getStorageSync('langeuage')
	  console.log(langeuage)
	  console.log(uni.getLocale())
	  
	  // #ifdef APP-PLUS
	  APPUpdate();
	  // #endif
	  // if(langeuage){
		 //  uni.setLocale(langeuage);
	  // }
    },
    methods: {
      /**
       * 小程序主动更新
       */
      updateManager() {
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
          // 请求完新版本信息的回调
          // console.log(res.hasUpdate)
        })
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: this.$t('toast.reminder'),
            content: this.$t('toast.rDownloadA'),
            confirmText: this.$t('toast.ok'),
            showCancel: false,
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          uni.showModal({
			title: this.$t('toast.reminder'),
			content: this.$t('toast.rDownloadB'),
			confirmText: this.$t('toast.ok'),
            showCancel: false
          })
        })
      }

    }

  }
</script>

<style lang="scss">
  /* 引入uView库样式 */
  @import "uview-ui/index.scss";
  
  
  @import "uview-ui/index.scss";
  @import './common/styles/common.scss';
  @import './uni.scss';
  @import './common/styles/iconfont.scss';
  @import './common/styles/animated.scss';
  @import './common/styles/neon-text.css';
  @import './common/styles/glass-buttons.scss';
  
  
</style>

<style>
  /* 项目基础样式 */
  @import "./app.scss";

  .uni-app--showlayout+uni-tabbar.uni-tabbar-bottom,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-bottom .uni-tabbar,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-top,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-top .uni-tabbar {
    left: var(--window-left);
    right: var(--window-right);
  }

</style>
