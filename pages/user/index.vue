<template>
  <view class="user-main ">
    <!-- 页面头部 -->
	<view class="a-flex a-justify-center a-mx-2">
	<view class="a-h-280">
		<view class="a-flex a-justify-center a-align-center a-px-3 no-titleNView autoFixed" style="z-index:99;" :class="isScrolled?'a-bg-primary':''">
			<text class="a-font-lg a-text-white" v-if="isScrolled">{{$t('pages.user')}}</text>
			<image @click="navToAuth('pages/user/bind/setting')" class="a-w-50 a-h-50 a-position-absolute a-right-2 a-mt-3 animate__animated animate__rotateIn animate__slow animate__infinite" src="/static/images/ico-set.png"></image>
		</view>
		<view v-if="isLogin" @click="navToAuth('pages/user/bind/setting')" class="a-flex a-align-center a-px-5">
			<view class="a-w-140 a-h-140">
				<avatar-image class="animate__animated animate__rollIn" :url="userInfo.avatar" :width="140" />
				<!-- <image class="a-w-140 a-h-140" :src="userInfo.avatar?userInfo.avatar:'/static/images/avatar.png'"></image> -->
			</view>
			<view class="a-flex-1 a-mx-4 animate__animated animate__jackInTheBox">
				<view class="a-flex a-align-center a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-white">{{userInfo.mobile}}</text>
					<view v-if="userInfo.grade" class="a-px-2 a-h-40 a-flex a-align-center a-bg-orange a-rounded-circle a-ml-2">
						<text class="a-font-sm a-text-white">{{userInfo.grade}}</text>
					</view>
					<view v-if="userInfo.vip_grade" class="a-px-2 a-h-40 a-flex a-align-center a-bg-black  a-rounded-circle a-ml-2">
						<text class="a-font-sm a-text-orange">{{userInfo.vip_grade}}</text>
					</view>
				</view>
				<text class="a-font a-text-white ">UID:{{userInfo.user_id}}</text>
			</view>
		</view>
		<view v-else @click="$navTo('pages/login/index')" class="a-flex a-align-center a-px-5">
			<view class="a-w-140 a-h-140">
				<image class="a-w-140 a-h-140" src="/static/images/avatar.png"></image>
			</view>
			<view class="a-flex-1 a-mx-4">
				<view class="a-flex a-align-center a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-white">{{$t('user.pleaseLogin')}}</text>
				</view>
				<text class="a-font a-text-white"></text>
			</view>
		</view>
	</view>
	</view>
	<!-- first row data start -->
		<view class="a-flex a-align-center a-justify-center a-mx-2 a-mb-3 a-h-100 a-pt-5 animate__animated animate__zoomInLeft animate__delay-1s" >
			<view class="a-flex-column  a-px-2 a-align-center ">
				<view class="a-flex a-align-end  a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.balance?assets.balance:'0'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.totalBalance')}}</text>
			</view>
			<view class="a-flex-column a-justify-center a-px-2 a-align-center">
				<view class="a-flex a-align-end a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.pay_money?assets.pay_money:'0'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.totalInvestment')}}</text>
			</view>
			<view class="a-flex-column a-justify-center a-px-2 a-align-center">
				<view class="a-flex a-align-end a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.commission?assets.commission:'0'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.totalIncome')}}</text>
			</view>		
		</view>
		<!-- second row data -->
		<view class="a-flex a-align-center a-justify-center a-mx-2 a-mb-3 a-pt-5 animate__animated animate__zoomInRight animate__delay-1s" >
			<view class="a-flex-column  a-px-2 a-align-center ">
				<view class="a-flex a-align-end  a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.team_income?assets.team_income:'0'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.teamIncome')}}</text>
			</view>
			<view class="a-flex-column a-justify-center a-px-2 a-align-center">
				<view class="a-flex a-align-end a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.today?assets.today:'0'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.todaysIncome')}}</text>
			</view>
			<view class="a-flex-column a-justify-center a-px-2 a-align-center">
				<view class="a-flex a-align-end a-mb-2">
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1">{{assets.withdraw_money?assets.withdraw_money:'0.00'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				<text class="a-font a-text-white a-text-center">{{$t('user.totalWithdraw')}}</text>
			</view>		
		</view>
		<!-- third row data -->
		<!-- <view class="a-flex a-align-center a-justify-start a-pt-2 a-pb-2 a-bg-moneybg" >
		<image style="margin-left:50rpx;" class="a-w-80 a-h-60" src="/static/user/moeny.png"></image>
			<view class="a-flex-column a-justify-s a-align-center ">
				<view class="a-flex a-align-end">
					<text class="a-font a-font-max a-text-blue-sea a-text-center">{{$t('user.totalCommission')}}</text>
					<text class="a-font-max a-font-weight-bold a-text-gold a-text-ellipsis-1 a-ml-2">{{commision?commision:'0.00'}}</text>
					<text class="a-font a-font-weight-bold a-text-gold">Rs</text>
				</view>
				
			</view>
		</view> -->

		
	<view class="a-flex a-justify-center">
		<view  v-if="isScrolled" class="a-rounded-bottom-2 a-flex a-justify-center a-align-center  no-titleNView  a-position-fixed a-top-0 a-bg-primary a-w-750" style="z-index:99;">
		<text class="a-font-lg a-text-white">{{$t('pages.user')}}</text>
		<image @click="navToAuth('pages/user/bind/setting')" class="a-w-50 a-h-50 a-position-absolute a-right-2 animate__animated animate__rotateIn" src="/static/images/ico-set.png"></image>
	</view>
	</view>
	
	
	
	<view style="width: 90%;" class="a-bg-primary-op-5 a-mx-auto  a-rounded-top-5 animate__animated animate__bounceInUp animate__delay-1s">
		<view class="a-flex a-align-start a-justify-around  a-mx-1 a-pt-5 a-pb-2 a-mb-2" >
			<view @click="navToAuth('pages/user/account/recharge')" class="a-flex-column a-flex-1 a-align-center animate__animated animate__bounceInLeft animate__delay-2s">
				<view>
					<image class="a-w-50 a-h-50" src="/static/user/cz.png"></image>
				</view>
				<text class="a-font-sm a-text-center a-font-weight-bold a-text-white">{{$t('user.recharge')}}</text>
			</view>
			<view @click="navToAuth('pages/user/account/withdraw')" class="a-flex-column a-flex-1 a-align-center animate__animated animate__bounceInLeft animate__delay-2s">
				<view>
					<image class="a-w-50 a-h-50" src="/static/user/tx.png"></image>
				</view>
				<text class="a-font-sm a-font-weight-bold a-text-white">{{$t('user.withdraw')}}</text>
			</view>
			<view @click="navToAuth('pages/user/bind/myBill')" class="a-flex-column a-flex-1 a-align-center animate__animated animate__bounceInRight animate__delay-2s">
				<view>
					<image class="a-w-50 a-h-50" src="/static/user/zd.png"></image>
				</view>
				<text class="a-font-sm a-font-weight-bold a-text-white">{{$t('user.myBill')}}</text>
			</view>
			<!-- <view @click="navToAuth('pages/user/bind/redEnvelope')" class="a-flex-column a-flex-1 a-align-center">
				<view>
					<image class="a-w-50 a-h-50" src="/static/images/ico-myRedEnvelope.png"></image>
				</view>
				<text class="a-font-sm a-text-center a-font-weight-bold">{{$t('user.redEnvelope')}}</text>
			</view> -->
			<view @click="navToAuth('pages/share/turntable')" class="a-flex-column a-flex-1 a-align-center animate__animated animate__bounceInRight animate__delay-2s">
				<view>
					<image class="a-w-50 a-h-50" src="/static/user/dzp.png"></image>
				</view>
				<text class="a-font-sm a-font-weight-bold a-text-white">{{$t('user.luckyWheel')}}</text>
			</view>
			
		</view>
		
	<view class="a-border-top a-flex a-align-center a-justify-between a-mx-5 a-py-2 " @click="$navTo('pages/user/bind/coupon')">
		<view class="a-flex a-align-center a-mt-2">
			<image class="a-w-50 a-h-50" src="/static/user/yhj.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.coupon')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>	
		
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-2" @click="$navTo('pages/user/bind/myFriend')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/td.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.myFriend')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>	
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/account/index')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/yhk.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.bankAccount')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/bind/myTasks')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/rw.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.myTasks')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white "></text>
	</view>
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/bind/about')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/gy.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white a-text-white">{{$t('user.aboutUs')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white a-text-white"></text>
	</view>
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/bind/crowdfunding')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/zc.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('home.crowdFunding')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>
	
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/bind/servicetg')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/kf.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.ComplaintSuggestions')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>
	
	<!-- #ifdef H5 -->
	<view class="a-flex a-align-center a-justify-between a-mx-5 a-py-3" @click="$navTo('pages/user/bind/download')">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/xz.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.download')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>
	<!-- #endif -->
	<view v-if="isLogin" class="a-flex a-align-center a-justify-between a-mx-5 a-pt-3 a-pb-6" @click="handleLogout()">
		<view class="a-flex a-align-center">
			<image class="a-w-50 a-h-50" src="/static/user/tc.png"></image>
			<text class="a-font-sm a-ml-2 a-font-weight-bold a-text-white">{{$t('user.logout')}}</text>
		</view>
		<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
	</view>
		
	</view>

	<view @click="goCustomer" class="a-bg-blue-view-home-tancang a-flex a-p-2 a-rounded-circle-left a-position-fixed a-right-0" style="bottom:400rpx;">
		<image class="a-w-50 a-h-50 animate__animated animate__heartBeat animate__slow animate__infinite" src="/static/images/ico-service.png"></image>
	</view>
	
	<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	<!-- #ifdef APP-PLUS -->
  <view class="a-h-40 a-bg-gray-light"> 	
  </view>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<view class="a-h-200 a-bg-gray-light"> 	
	</view>
		<!-- #endif -->
  </view>
</template>

<script>
  import store from '@/store'
  import AvatarImage from '@/components/avatar-image'
  import POPUP from '@/components/popup/popup'
  import { setCartTabBadge } from '@/core/app'
  import SettingKeyEnum from '@/common/enum/setting/Key'
  import SettingModel from '@/common/model/Setting'
  import * as Api from '@/api/user'
  import { checkLogin,promptLogin } from '@/core/app'
  import blankSpace from '@/components/empty/top-or-bottom-blank';

  export default {
    components: {
      AvatarImage,
	  POPUP,
	  blankSpace
    },
    data() {
      return {
		  isScrolled:false,
        // 枚举类
        SettingKeyEnum,
        // 正在加载
        isLoading: true,
        // 首次加载
        isFirstload: true,
        // 是否已登录
        isLogin: false,
        // 系统设置
        setting: {},
        // 当前用户信息
        userInfo: {},
        // 账户资产
        assets:{
			balance:0
		},
		customer:null,
		commision:null,
		popup:{
			isShow:false,
			title:'',
			content:'',
			ok:'',
			cancel:'',
			isLogin:false,
			isOperation:false,
			item:null
		}
      }
    },
	onLoad(){
		
	
	},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.onRefreshPage()
	  this.getCustomer()
	  this.getShare()
    },
	// 滚动监听
	onPageScroll(e) {
		let isScroll = false
		// #ifdef APP-PLUS
		isScroll = e.scrollTop > 15
		// #endif
		// #ifdef MP || H5
		isScroll = e.scrollTop > 30
		// #endif
		if (isScroll) {
			this.isScrolled = true;
		}else{
			this.isScrolled = false;
		}
	},
    methods: {
		navToAuth(url){
			if(this.isLogin){
				this.$navTo(url)
			}else{
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rLogin'),
				this.popup.ok=this.$t('toast.login'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=true,
				this.popup.isOperation=false,
				this.popup.isShow=true
				this.popup.item=null
				// promptLogin(this.$t('toast.reminder'),this.$t('toast.rLogin'),this.$t('toast.login'),this.$t('toast.cancel'))
			}
		},
		getShare(){
			Api.share().then(result =>{
				this.commision = result.data.commision
			})
		},
      // 刷新页面
      onRefreshPage() {
        // 更新购物车角标
        setCartTabBadge()
        // 判断是否已登录
        this.isLogin = checkLogin()
		
        // 获取页面数据
        this.getPageData()
      },

      // 获取页面数据
      getPageData(callback) {
        const app = this
        app.isLoading = true
        Promise.all([app.getSetting(), app.getUserInfo(), app.getUserAssets()])
          .then(result => {
            app.isFirstload = false
            // 执行回调函数
            callback && callback()
          })
          .catch(err => console.log('catch', err))
          .finally(() => app.isLoading = false)
      },


      // 获取商城设置
      getSetting() {
        const app = this
        return new Promise((resolve, reject) => {
          SettingModel.data()
            .then(setting => {
              app.setting = setting
              resolve(setting)
            }).catch(reject)
        })
      },

      // 获取当前用户信息
      getUserInfo() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : Api.info({}, { load: app.isFirstload })
            .then(result => {
              app.userInfo = result.data
              resolve(app.userInfo)
            })
            .catch(err => {
              if (err.result && err.result.status == 401) {
                app.isLogin = false
                resolve(null)
              } else {
                reject(err)
              }
            })
        })
      },

      // 获取账户资产
      getUserAssets() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : Api.assets({}, { load: app.isFirstload })
            .then(result => {
			  app.assets = result.data.assets
              resolve(app.assets)
            })
            .catch(err => {
              if (err.result && err.result.status == 401) {
                app.isLogin = false
                resolve(null)
              } else {
                reject(err)
              }
            })
        })
      },
	  
	  getCustomer() {
	  	const that = this
	  	Api.customer().then(result => {
	  		that.customer = result.data.contact
	  	})
	  },
	  goCustomer(){
		// #ifdef H5
			window.open(this.customer.link, '_blank')
		// #endif 
		// #ifndef H5
		plus.runtime.openURL(this.customer.link);  
		// #endif 
		// this.$navTo('pages/webView/webView?url='+this.customer.link+'&title='+this.$t('home.customer'))
	  },

      // 跳转到登录页
      handleLogin() {
        !this.isLogin && this.$navTo('pages/login/index')
      },

      // 退出登录
      handleLogout() {
        const app = this
		this.popup.title=this.$t('toast.reminder'),
		this.popup.content=this.$t('toast.rLogout'),
		this.popup.ok=this.$t('toast.ok'),
		this.popup.cancel=this.$t('toast.cancel'),
		this.popup.isLogin=false,
		this.popup.isOperation=true,
		this.popup.isShow=true,
		this.popup.item=null
        // uni.showModal({
        //   title: this.$t('toast.reminder'),
        //   content: this.$t('toast.rLogout'),
        //   confirmText: this.$t('toast.ok'),
        //   cancelText: this.$t('toast.cancel'),
        //   success(res) {
        //     if (res.confirm) {
        //       store.dispatch('Logout', {})
        //         .then(result => app.onRefreshPage())
        //     }
        //   }
        // })
      },

      // 跳转到钱包页面
      onTargetWallet() {
        this.$navTo('pages/wallet/index')
      },

      // 跳转到订单页
      onTargetOrder(item) {
        this.$navTo('pages/order/index', { dataType: item.id })
      },

      // 跳转到我的积分页面
      onTargetPoints() {
        this.$navTo('pages/points/log')
      },

      // 跳转到我的优惠券页
      onTargetMyCoupon() {
        this.$navTo('pages/my-coupon/index')
      },

      // 跳转到服务页面
      handleService({ url }) {
        this.$navTo(url)
      },
	  cancelPopup(){
	  	this.popup.isShow=false
	  },
	  surePopup(){
		//登出代码上有些问题，去除前需要分析。
	  	// this.popup.isShow=false
	  	// if(this.popup.isLogin){
	  	// 	this.$navTo('pages/login/index')
	  	// }else if(this.popup.isOperation){
	  	// 	store.dispatch('Logout', {})
	  	// 	  .then(result => this.onRefreshPage())
	  	// }
		
		this.popup.isShow=false
			if(this.popup.isOperation){
			store.dispatch('Logout', {})
			  .then(result => this.onRefreshPage())
			  this.$navTo('pages/login/index')
		}
	  }
},

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
      // 获取首页数据
      this.getPageData(() => {
        uni.stopPullDownRefresh()
      })
    },
	


  }
</script>

<style lang="scss" >
page{
	// height:100%;
	// background-image: url('@/static/background/user-setting-top-bg.png');
	// background-repeat: no-repeat;
	// background-color: #FFFFFF;
	// background-size: cover;
}
.marginTop{
	/* #ifdef APP */
	margin-top:-120rpx;
	/* #endif */
	/* #ifndef APP */
	margin-top:-190rpx;
	/* #endif */
}
.m-tabbar__icon {
	width: 48rpx;
	height: 48rpx;
	margin-bottom: 15rpx;
	position: relative;
}
.m-tabbar__icon_img {
	width: 48rpx;
	height: 48rpx;
}
.m-tabbar__label {
	font-size: 28rpx;
}

.a-bg-moneybg{
	background-color: #f5f8fa;
}
.user-main{
	@media only screen and (min-width: 768px) {	
	background-image: url('/static/user/animated_bg-full.png');
	background-attachment: fixed;
	background-size: cover;
	}
	@media only screen and (max-width: 767px) {
	background-image: url('/static/user/animated_bg.png');
	background-size: cover;
	background-position: center;
	animation: backgroundAnimation 5s linear infinite;
	}
}
@keyframes backgroundAnimation {
  0% {
    background-position: 100% 100%;
  }
  50%{
	background-position: 0% 100%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.a-border-top{
	border-color: #7d7d7d !important;
}
</style>
