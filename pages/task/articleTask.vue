<template>
	<view>
		
		
		<view class="a-mx-3 a-mb-2">
			
			<view class="a-flex a-align-center a-justify-between a-bg-gray-light a-px-3 a-rounded-1-5 a-h-90 a-mt-2">
				<view class=" a-flex-column">
					<text class="a-font a-text-orange">Task Reward</text>
				</view>
				<text class="a-font-max a-font-weight-bold a-text-orange">{{detail.award_money}}</text>
				<view v-if="detail.isReceive" class="a-py-1 a-px-3 a-bg-blue-sea a-rounded-circle">
					<text class="a-font a-text-white">received</text>
				</view>
			</view>
		</view>
		
		
		
		<view class="a-flex a-align-center a-justify-center a-w-690 a-my-5 a-rounded-1-5 a-mx-3  a-overflow-hidden">
			<!-- <image class="a-w-690 a-h-400 a-position-absolute" src="/static/images/bg-task.png"></image> -->
			<view class="a-flex-column a-align-center a-justify-center" style="z-index:1">
				<text class="a-font-max-four a-font-weight-bold a-text-white">{{detail.title}}</text>
				<text class="a-font a-text-white a-mt-2">Deadline Date:{{detail.end_time_label}}</text>
			</view>
		</view>
		
		
		
		
		
		<view class="a-mx-3 a-mb-2">
			<view class="a-py-3">
				<text class="a-font-lg a-text-white a-font-weight-bold">Task details</text>
			</view>
			
			<view class="a-mb-2">
				<mp-html class="a-font-lg a-font-weight" :content="detail.remark" />
			</view>
			<view >
				<view v-for="(item,index) in detail.pic_url" :key="index">
					<image class="a-w-690 a-mb-2 a-rounded-1-5" mode="widthFix" :src="item"></image>
				</view>
			</view>
			<!-- <view >
				<view v-for="(item,index) in detail.video_url" :key="index">
					<video class="a-w-690 a-h-400 a-mb-2 a-rounded-1-5" :src="item"></video>
				</view>
			</view> -->
		</view>
		
		<view class="a-w-750 a-h-100"></view>
		<view class="a-w-750 a-h-100 a-px-5 a-position-fixed a-bottom-0 a-flex a-justify-center">
			<view v-if="detail.isReceive" @click="navigateNext()" class="glass-container a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
				<view class="btn" style="--clr:#FFA200;"><a href="#"><text class="a-font-lg glass-button">{{$t('button.submit')}}</text></a></view>
			</view>
			<view v-else @click="receive" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-text-brown a-font-weight-bold">{{detail.btn_name}}</text>
			</view>
			
		</view>
		
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import { checkLogin,promptLogin } from '@/core/app'
	import POPUP from '@/components/popup/popup'
	import * as Api from '@/api/user'
	export default {
		components: {
		  POPUP
		},
		data() {
			return {
				id:null,
				detail:{
					pic_url:[],
					video_url:[]
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
		onLoad(options) {
			this.id=options.id
			this.getAritlce()
		},
		onShow(){
			this.isLogin = checkLogin()
		},
		methods: {
			getAritlce() {
				const that = this
				Api.taskDetail({id:this.id}).then(result => {
					that.detail = result.data.detail
					// uni.setNavigationBarTitle({
					// 	title: result.data.detail.title
					// });
				})
			},
			receive() {
				var that =this
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
				
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rReceive'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=null
				// uni.showModal({
				//   title: this.$t('toast.reminder'),
				//   content: this.$t('toast.rReceive'),
				//   confirmText: this.$t('toast.ok'),
				//   cancelText: this.$t('toast.cancel'),
				//   success(o) {
				//     if (o.confirm) {
				//       that.sureReceive()
				//     }
				//   }
				// });
			},
			sureReceive() {
				const that = this
				Api.taskReceive({id:this.id}).then(result => {
					that.$toast(result.message)
					that.getAritlce()
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
					this.sureReceive()
				}
			},
			navigateNext(){
			  setTimeout(() => { this.$navTo('pages/user/bind/myTasks'); }, 1000);
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep uni-rich-text * {
		font-size: 30rpx !important;
		line-height: 50rpx !important;
		background-color: transparent !important;
		color: #72BDFC;
	}

</style>
