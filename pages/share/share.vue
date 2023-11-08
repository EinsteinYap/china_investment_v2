<template>
	<view>
		<view class="a-flex a-align-center a-justify-start  a-w-690 a-h-100 a-mt-2 a-rounded-1-5 a-overflow-hidden">
				<view class="a-px-5" style="z-index:1">
					<text class="a-font a-font-weight-bold a-font-max a-text-white">{{$t('user.totalCommission')}}</text>
					<text class="a-font-max-four a-font-weight-bold a-mt-2 a-text-gold a-ml-2">{{info.commission?info.commission:0}}Rs</text>
				</view>
		</view>
			
		<view class="a-flex a-align-center a-justify-center a-position-relative a-mb-5  a-rounded-2 " >
				<view class=" a-w-750 a-h-300 a-flex-column a-justify-center ">
					<image src="/static/share/or-hakim-c7lvKHVea9A-unsplash.jpg" class="a-w-750"></image>
				</view>
		</view>
		
		
		
		<view class="a-flex a-justify-center a-mb-3">
			<text class="a-font  a-font-weight-bold a-text-white">{{$t('user.shareHint')}}</text>
		</view>
		
		<view class="a-w-690 a-bg-orange-yellow-baise a-rounded-1-5 a-mx-3 a-mb-3">
			<view class="a-flex a-align-center a-mx-4 a-py-2 a-border-bottom a-border-light">
				<text class="a-font  a-font-weight-bold ">{{$t('user.invitationCode')}}:</text>
				<text class="a-font-max a-font-weight-bold a-ml-2">{{info.invite_code}}</text>
				<view @click="copy(info.invite_code)" class="a-bg-gradual-blue-primary-LR a-px-2 a-py a-rounded-circle a-ml-2">
					<text class="a-font a-text-white">{{$t('button.copy')}}</text>
				</view>
			</view>
			<view class="a-py-3 a-px-4 a-flex-column a-justify-between a-align-center">
				<view class="a-flex-column a-align-center a-justify-between a-py-1">
					<view class=" a-h-230 a-flex a-align-center a-justify-center " style="width: 100%;">
						<image class="a-w-220 a-h-220" :src="info.qrcode"></image>
					</view>
					<view class="a-flex a-align-center">
						<text class="a-flex-1 a-font  a-font-weight-bold">{{$t('user.shareLink')}}</text>
						<text class="a-flex-3  a-text-gray a-text-ellipsis-3 a-mt-1 a-mb-2">{{info.link}}</text>
					</view>
					<view @click="copy(info.link)" class="a-bg-gradual-blue-primary-LR a-px-2 a-py a-rounded-circle">
						<text class="a-font a-text-white">{{$t('button.copy')}}</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="a-flex-column a-mx-3">
			<text class="a-text-white a-font-max-four a-font-weight-bold">{{$t('user.remuneration')}}</text>
			<!-- <text class="a-font a-mt-1 a-text-gray">{{info.content}}</text> -->
			<mp-html class="a-font a-mt-1 a-text-gray" :content="detail" />
		</view>		
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import PROGRESS from '@/components/ai-progress/ai-progress'
	import POPUP from '@/components/popup/popup'
	import { checkLogin,promptLogin } from '@/core/app'
	import * as Api from '@/api/user'
	
	export default {
		components:{
			PROGRESS,
			POPUP
		},
		data() {
			return {
				isScrolled:false,
				isLogin: false,
				detail:'',
				info:{
					level_data:null
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
			this.getAritlce()
			if(!this.isLogin){
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
			this.getShare()
			
			
		},
		// 滚动监听
		onPageScroll(e) {
			let isScroll = false
			// #ifdef APP-PLUS
			isScroll = e.scrollTop > 0
			// #endif
			// #ifdef MP || H5
			isScroll = e.scrollTop > 0
			// #endif
			if (isScroll) {
				this.isScrolled = true;
			}else{
				this.isScrolled = false;
			}
			
		},
		methods: {
			getAritlce() {
				const app = this
				Api.aritlce({type:'share'}).then(result => {
					this.detail = result.data.detail
				})
			},
			copy(text){
				let that = this;
				uni.setClipboardData({ data: text });
				this.$toast(this.$t('toast.rSuccess'))
			},
			getShare(){
				Api.share().then(result =>{
					this.info = result.data
				})
			},
			navToAuth(url,index){
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
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				console.log('222')
				console.log(this.popup.isLogin)
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					console.log(this.popup.item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	margin-top:-20rpx;
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
// page {
// 	background-color: #F8F8F8;
// }

.cards-border-right {
	/* Specify the element's position to enable ::after */
	position: relative;
}

/* Create the border using ::after */
.cards-border-right::after {
	content: "";
	position: absolute;
	right: 0;
	top: 15%; /* Adjust the left position as needed */
	height: 70%; /* Set the width to 90% */
	border-right: 3rpx solid #121AE3; /* Set the style and color as needed */
}

	::v-deep uni-rich-text *{
		font-size: 30rpx ;
		line-height: 50rpx ;
		background-color: transparent;
		color: #72BDFC;
	}
</style>
