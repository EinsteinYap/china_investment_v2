<template>
	<view >
		<view class="a-flex a-justify-center">
		<view class="a-w-750 a-flex-column a-justify-end a-position-relative" >
			<!-- image class="a-w-750 a-position-absolute a-bottom-0" mode="widthFix" src="/static/home/bg-home.png"></image> -->
			<view class="a-flex a-justify-between a-align-center a-px-3 no-titleNView autoFixed" style="z-index:99;" :class="isScrolled?'a-bg-primary':''">
				<!-- <view class=" a-h-50" style="max-width:350rpx;">
					<image class="a-w-350 a-h-50" :src="info.app.logo"></image>
				</view>
				<view class="a-flex a-align-center" @click="$navTo('pages/user/bind/language')">
					<image class="a-w-40 a-h-40 a-mr-1" src="/static/images/ico-language.png"></image>
					<view class="a-text-white a-font-lg">{{langeuageName}}</view>
				</view> -->
			</view>
			<swiper autoplay circular class="a-w-690 a-h-400 a-rounded-2 a-mx-3" style="z-index:1;">
				<swiper-item v-for="(item,index) in info.adImage" class="a-w-690 a-h-400 a-rounded-2">
					<video v-if="isVideo" class="a-w-690 a-h-400 a-position-relative a-rounded-2" loop autoplay :src="item.video_url"></video>
					<image v-else @click="goTo(item.link,item.jump_cate)" class="a-w-690 a-h-400 a-rounded-2" :src="item.image_url"></image>
				</swiper-item>
			</swiper>
			<view class="a-flex a-align-center a-mx-3 a-h-80" style="z-index:1;">
				<image class="a-w-30 a-h-30 a-mr-1" src="/static/images/ico-notice.png"></image>
				<view class='a-flex-1 a-overflow-hidden'>
					
					<u-notice-bar autoplay bgColor="none" color="#ffffff" :list="[notice]" style="a-flex-1"></u-notice-bar>
				</view>
			</view>
			<view class="a-w-750 a-h-20"></view>
		</view>
		
		<cover-view v-if="isLogin" class="a-w-750 a-flex a-justify-between a-align-center no-titleNView-Cover  a-position-fixed a-top-0" style="z-index:99;"  :class="isScrolled?'a-bg-primary':''">
			<cover-view class=" a-ml-3 no-titleNView-Cover-placeholder" style="max-width:350rpx;">
				<cover-image class="a-w-180 a-h-110" :src="info.app.logo"></cover-image>
			</cover-view>
			<cover-view class="a-flex a-align-center a-mr-3 no-titleNView-Cover-placeholder" >
				<cover-image class="a-w-40 a-h-40 a-mr-1" src="/static/images/ico-language.png" @click="$navTo('pages/user/bind/language')"></cover-image>
				<cover-view class="a-text-white a-h-50 a-font-lg a-mb a-position-relative" style="line-height:50rpx;" @click="$navTo('pages/user/bind/language')">{{langeuageName}}</cover-view>
			</cover-view>
		</cover-view>
	</view>
	<view class="a-flex a-justify-center">
	<view class="a-flex a-justify-center  a-flex-wrap a-mx-3 a-mb-5 a-px-1 a-py-2 a-w-700" >
			<view v-for="(item,index) in info.menu" :key="index" @click="navToAuth(item.link,index)" 
			class="
			a-w-330
			a-h-120
			a-mx-1 a-mb-1
			a-px-4
			a-flex a-flex-2  a-justify-start a-align-center
			a-rounded-1-5
			box
			
			"
			>
				<view class="a-w-60 a-h-60 a-mb-1 a-mr-3" >
					<image class="a-w-60 a-h-60 " :src="item.image_url"></image>
				</view>
				<text class="a-font-sm a-text-center a-text-white">{{item.cname}}</text>
			</view>
		</view>
	</view>
		
		<view v-if="info.coupon && info.coupon.length" class="a-mx-3 a-mb-5">
			<swiper circular class="a-w-690 a-h-160" style="z-index:1;" :next-margin="info.coupon.length<=1?'0':'10px'" >
				<swiper-item v-for="(item,index) in info.coupon" >
						<image class=" a-h-160 a-position-absolute" :class="info.coupon.length<=1?'a-w-690':'a-w-660'" src="/static/home/io-coupon-light-blue2.png"></image>
						<view class=" a-h-160 a-flex a-align-center a-justify-between a-position-relative" :class="info.coupon.length<=1?'a-w-690':'a-w-660'" style="z-index:1">
							<view class="a-w-160 a-h-160 a-flex-column a-algin-center a-justify-center a-algin-center" >
								<view class="a-flex a-align-end a-justify-center">
									<text class="a-font a-font-weight-bold a-mb a-text-purple-blue">₹</text>
									<text class="a-font-max a-font-weight-bold a-text-purple-blue">{{item.reduce_price}}</text>
								</view>
							</view>
							<view class="a-flex-1 a-flex a-h-160 a-align-center a-justify-between a-px-2">
								<view class="a-flex-column a-flex-1">
									<text class="a-font a-text-purple-blue a-text-ellipsis-2">{{item.name}}</text>
									<text class="a-font-sm a-text-purple-blue a-mt-1">{{$t('user.date')}}:{{item.end_time}}</text>
								</view>
								<view @click="receive(item.coupon_id)" class="a-bg-blue-sea-dark a-py a-px-2 a-rounded-circle">
									<text class="a-text-white a-font">{{$t('button.receive')}}</text>
								</view>
							</view>
						</view>
				</swiper-item>
			</swiper>
			
			<!-- <image class="a-w-690" mode="widthFix" src="/static/temporary/lo-coupon.png"></image> -->
		</view>
		
		<view v-if="info.activity.length" class="a-px-3 a-mb-5">
			<view class="a-flex a-justify-between a-align-center">
				<view class="a-flex a-align-center a-flex-column a-ml-1">
					<text class="a-font-lg a-text-white a-font-max-four">{{$t('home.productActivities')}}</text>
				</view>
				<image @click="$navTo('pages/home/productActivities')" class="a-h-30" mode="heightFix" src="/static/images/lo-more.png"></image>
			</view>
			
			<view class="a-flex a-justify-around a-flex-wrap ">
				<view v-for="(item,index) in info.activity" @click="$navTo('pages/home/productActivities')" class="a-w-700 a-mt-3 h5-app-padding activity-card a-rounded-1-5 a-flex a-align-center">
					
					<view class="a-w-700 a-h-300 a-rounded-top-2 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center a-flex-2">
						<view  class="a-w-250 a-h-250  a-flex a-align-center a-justify-center a-rounded-2 ">
							<image class="a-w-250 a-h-250 a-rounded-2 a-position-absolute" mode="heightFix" :src="item.goods?item.goods.good_image:''"></image>
						</view>
						<view v-if="item.subTitle" class="a-w-200 a-h-50 a-flex a-align-center a-justify-center a-bg-gold-yellow a-position-absolute a-top-0 a-rounded-bottom">
							<text class="a-font-sm a-text-brown a-mr-1">{{item.subTitle}}</text>
						</view>
					</view>
					<view class="a-flex-column a-py-2 a-pr-2">
						<text class="a-text-ellipsis-1 a-font">{{item.title}}</text>
						<text class="a-text-black a-font-sm a-mt-2">{{$t('pro.purchaseLimit')}}:{{item.limit_num}}</text>
						<text class="a-text-black a-font-sm a-mt-2">{{$t('pro.countdown')}}:</text>
						<view class="a-flex a-justify-between a-align-center">
							<view class="a-flex a-w-250 a-justify-between a-align-center a-mt-1">
								<uni-countdown v-if="item.cut_time" color="#E0BE1E" background-color="#191EB3" :day="$countdown(item.cut_time,'day')" :hour="$countdown(item.cut_time,'hour')" :minute="$countdown(item.cut_time,'minute')" :second="$countdown(item.cut_time,'second')"></uni-countdown>
								<uni-countdown v-else color="#FFFFFF" background-color="#555555" :day="0" :hour="0" :minute="0" :second="0"></uni-countdown>

							</view>
							<image class="a-w-40 a-h-40"  src="/static/images/ic_into@3x.png"></image>
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<view v-if="info.crowd_funding.length" class="a-px-3 a-mb-5">
			<view class="a-flex a-justify-between a-align-center">
				<view class="a-flex a-align-center a-flex-column a-ml-1">
					<text class="a-font-lg a-text-white a-font-max-four">{{$t('home.crowdFunding')}}</text>
				</view>
				<image @click="$navTo('pages/home/crowdFunding')" class="a-h-30" mode="heightFix" src="/static/images/lo-more.png"></image>
			</view>
			<view class="">
				<view v-for="(item,index) in info.crowd_funding" @click="$navTo('pages/home/articleFunding?id='+item.id)" class="a-flex a-mt-3 a-bg-gradual-blue-primary-TB a-rounded-1-5 a-h-300 a-px-3 a-py-4">
					<view class="a-w-200 a-h-220 a-rounded-1-5 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center">
						<image class="a-h-220 a-rounded-1-5" mode="heightFix" :src="item.image_url"></image>
					</view>
					<view class="a-flex-column a-px-2 a-flex-1 a-h-220 a-justify-between">
						<text class="a-text-ellipsis-1 a-font a-text-white">{{item.title}}</text>
						<text class="a-text-ellipsis-1 a-font a-text-orange">{{item.amount}} Rs</text>
						<text class="a-text-white a-font-sm a-mt-1">{{$t('pro.projectBenefits')}}:{{item.profit_rate}}%</text>
						<text class="a-text-white a-font-sm a-mt-1">{{$t('pro.leastInvest')}}:{{item.min_buy_amount}}Rs</text>
						<view class="a-w-400 a-mt-1">
							<PROGRESS isAnimate duration="1000" :percentage="item.rate" strokeWidth="5" bgColor="#FFA200" inBgColor="#FFFFFF" fontColor="#FFFFFF"></PROGRESS>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="info.task.length" class="a-px-3 a-mb-5">
			<view class="a-flex a-justify-between a-align-center a-ml-2 a-mb-2">
				<view class="a-flex a-align-center a-flex-column">
					<text class="a-font-lg a-text-white a-font-max-four">{{$t('home.task')}}</text>
				</view>
				<image @click="$navTo('pages/task/taskCenter')" class="a-h-30" mode="heightFix" src="/static/images/lo-more.png"></image>
			</view>
			
			<view class="">
				<view v-for="(item,index) in info.task" :key="index" @click="$navTo('pages/task/articleTask?id='+item.id)" class="a-flex a-align-center a-bg-primary-op-3 cards-first-last-border-radius  forms-border-bottom">
					
					<view class="a-flex-column a-px-2 a-py-1 a-flex-1 a-py-3 a-px-3 box">
						<text class="a-text-white a-font-lg a-font-weight-bold a-text-ellipsis-1 a-mb-2">{{item.title}}</text>
						<text class="a-text-white a-font a-text-ellipsis-2">{{item.synopsis}}</text>
						<view class="a-flex a-align-center a-justify-between">
							<text class="a-font-max-three a-text-white a-font-weight-bold ">{{item.award_money}} Rs</text>
							<text class="a-font-sm a-text-white">{{item.end_time_label}}</text>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view v-if="info.news.length" class="a-px-3 a-mb-5">
			<view class="a-flex a-justify-between a-align-center a-ml-2 a-mb-2">
				<view class="a-flex a-align-center a-flex-column">
					<text class="a-font-lg a-text-white a-font-max-four">{{$t('home.newsNotice')}}</text>
				</view>
				<image  @click="$navTo('pages/news/newsCenter')" class="a-h-30" mode="heightFix" src="/static/images/lo-more.png"></image>
			</view>
			<view class="">
				<view v-for="(item,index) in info.news" :key="index" @click="$navTo('pages/news/articleNews?id='+item.article_id)" class="a-flex a-align-center a-bg-primary-op-3 cards-first-last-border-radius  forms-border-bottom">
					<view class="a-w-200 a-h-200 a-ml-2 a-rounded-1-5 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center">
						<image class="a-h-120 a-w-180 a-rounded-1-5" mode="heightFix" :src="item.image_url"></image>
					</view>
					<view class="a-flex-column a-px-2 a-py-1 a-flex-1">
						<text class="a-text-ellipsis-1 a-font a-font-weight-bold a-text-white">{{item.title}}</text>
						<text class="a-text-white a-font-sm a-mt a-text-ellipsis-2">{{item.synopsis}}</text>
						<text class="a-text-white a-font-sm a-mt">{{item.add_time}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view @click="goCustomer" class="a-bg-blue-view-home-tancang a-flex a-p-2 a-rounded-circle-left a-position-fixed a-right-0" style="bottom:400rpx;">
			<image class="a-w-50 a-h-50 animate__animated animate__heartBeat animate__slow animate__infinite" src="/static/images/ico-service.png"></image>
		</view>
		
		<u-popup v-model="showPopup" mode="center" class="app-pop-up-m">
		  <view class="a-w-600 a-rounded-2 a-overflow-hidden">
			  <view class="a-flex a-align-center a-justify-center a-w-600 a-h-140" >
				  <image class="a-w-600 a-h-140 a-rounded-top-2 a-position-absolute" src="/static/images/bg-popup-title.png" style="z-index:1 !important;"></image>
				  <text class="a-font-lg a-text-white a-position-relative" style="z-index:1">{{$t('home.announcement')}}</text>
			  </view>
			  <view class="a-w-600 a-bg-white a-rounded-bottom-2 a-overflow-hidden">
				  <view v-if="info.pop_notice && info.pop_notice.is_image" class="a-w-600">
						<image @click="$navTo('pages/rent/articleRent?id='+info.pop_notice.id)" class="a-w-600" mode="widthFix" :src="info.pop_notice.image_url"></image>
				  </view>
				  <view v-else-if="info.pop_notice" class="a-p-5">
					  <text class="a-font">{{info.pop_notice.content}}</text>
				  </view>
				  <view class="a-flex a-align-center a-justify-center a-pb-3">
					  <view @click="handleShowPopup" class="a-bg-blue-view-home-tancang a-h-90 a-w-480 a-rounded-circle a-flex a-align-center a-justify-center">
						  <text class="a-font-lg a-text-white">{{$t('home.viewed')}}</text>
					  </view>
				  </view>
			  </view>
		  </view>
		</u-popup>
		
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
		<blank-space></blank-space>
	</view>
</template>

<script>
	import PROGRESS from '@/components/ai-progress/ai-progress'
	import POPUP from '@/components/popup/popup'
	import * as Api from '@/api/user'
	import { checkLogin,promptLogin } from '@/core/app'
	import biaofunMarquee from '@/components/biaofun-marquee/biaofun-marquee.vue'
	import blankSpace from '@/components/empty/top-or-bottom-blank';
	
	export default {
		components:{
			PROGRESS,
			POPUP,
			biaofunMarquee,
			blankSpace
		},
		data() {
			return {
				isScrolled:false,
				showPopup: false,
				isLogin:false,
				customer:null,
				langeuageName:'',
				notice:'',
				speed:10,
				scrollamount:2,
				isSpeed:false,
				isVideo:false,
				info:{
					app:{},
					menu:[],
					adImage:[],
					coupon:[],
					activity:[],
					crowd_funding:[],
					task:[],
					news:[],
					pop_notice:{},
					notice:[]
				},
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
		onShow() {
			this.isLogin = checkLogin()
			
			if(!this.isLogin){
				this.$navTo('pages/login/index')
				return
			}
			this.isSpeed=true
			this.getHome()
			this.getCustomer()
			
			this.langeuageName = uni.getStorageSync('langeuageName')?uni.getStorageSync('langeuageName'):'English'
		},
		onHide() {
			this.isSpeed=false
		},
		// 滚动监听
		onPageScroll(e) {
			let isScroll = false
			// #ifdef APP-PLUS
			isScroll = e.scrollTop > 1
			// #endif
			// #ifdef MP || H5
			isScroll = e.scrollTop > 1
			// #endif
			if (isScroll) {
				this.isScrolled = true;
			}else{
				this.isScrolled = false;
			}
		},
		onPullDownRefresh(){
			this.getHome()
		},
		methods: {
			navToAuth(url,index){
				if(index<2){
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
				}else{
					this.$navTo(url)
				}
				
			},
			getShowPopup(){
				// var showPopup = this.$cache('showPopup')
				var app = getApp()
				var showPopup = app.globalData.isPop
				if(showPopup){
					
				}else{
					this.handleShowPopup()
					app.globalData.isPop = true
					// this.$cache('showPopup',true);
				}
			},
			// 显示优惠券弹窗
			handleShowPopup() {
			  this.showPopup = !this.showPopup
			},
			getHome() {
				const that = this
				Api.home().then(result => {
					uni.stopPullDownRefresh();
					that.info.app =result.data.app
					that.info.menu =result.data.menu
					that.info.adImage =result.data.adImage
					that.info.coupon =result.data.coupon
					that.info.activity =result.data.activity
					that.info.crowd_funding =result.data.crowd_funding
					that.info.task =result.data.task
					that.info.news =result.data.news
					that.info.pop_notice =result.data.pop_notice
					that.info.notice =result.data.notice
					
					uni.setNavigationBarTitle({
						title: that.info.app.app
					});
					if(that.info.pop_notice){
						that.getShowPopup()
					}
					
					if(that.info.adImage[0].typeid==2){
						that.isVideo=true
					}
					for(var i in that.info.notice){
						if(that.notice.length){
							that.notice += ';'+that.info.notice[i].content
						}else{
							that.notice = that.info.notice[i].content
						}
					}
					
					// console.log(that.info.notice)
					// for(var i in that.info.notice){
					// 	// that.notice[i].text = that.notice[i].content
					// 	that.notice.push(that.notice[i].content)
					// }
					console.log(that.notice)
					// [
					// 	{ id: 1, text: '作者：山东标梵互动信息技术有限公司' },
					// 	{ id: 2, text: '公司地址：山东·济南 银座和谐广场2座806' },
					// 	{ id: 3, text: '公司官网：http://biaofun.com/' }
					// ],
				})
			},
			getCustomer() {
				const that = this
				Api.customer().then(result => {
					that.customer = result.data.contact
				})
			},
			
			
			goCustomer(){
				// location.href = this.customer.link
				// #ifdef H5
					// location.href = result.data.url
					window.open(this.customer.link, '_blank')
				// #endif 
				// #ifndef H5
				plus.runtime.openURL(this.customer.link);  
				// #endif 
				
				// this.$navTo('pages/webView/webView?url='+this.customer.link+'&title='+this.$t('home.customer'))
			},
			receive(id){
				const that = this
				if(!that.isLogin){
					this.popup.title=this.$t('toast.reminder'),
					this.popup.content=this.$t('toast.rLogin'),
					this.popup.ok=this.$t('toast.login'),
					this.popup.cancel=this.$t('toast.cancel'),
					this.popup.isLogin=true,
					this.popup.isOperation=false,
					this.popup.isShow=true
					this.popup.item=null
					// promptLogin(this.$t('toast.reminder'),this.$t('toast.rLogin'),this.$t('toast.login'),this.$t('toast.cancel'))
					return
				}
				Api.redReceived({coupon_id:id}).then(result => {
					that.$toast(result.message)
					that.getHome()
				})
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					console.log(this.popup.item)
				}
			},
			goTo(link,type){
				if(type==1){
					// #ifdef H5
					location.href = link
					// #endif 
					// #ifndef H5
					plus.runtime.openURL(link);  
					// #endif 
				}else{
					console.log(link)
					this.$navTo(link)
				}
			}
			
		}
	}
</script>

<style lang="scss">
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
.app-pop-up-m{
	
	/* #ifdef APP */
	margin-top: 360rpx;
	/* #endif */
}


.activity-card:nth-child(odd){
	background-color: #FFFCF7;
}

.activity-card:nth-child(even){
	background-color: #FFFAF1;
}
/* #ifdef APP-PLUS */
.h5-app-padding {
	   padding-right: 50rpx;
}
/* #endif */
/* #ifdef H5 */
.h5-app-padding {
	   padding-right: 30rpx;
}
/* #endif */


.box{
	background-color: rgba(79, 79, 71, 0.3);
}

::v-deep .u-notice-text.u-type-warning br{
  display: none !important;
}

</style>
