<template>
	<view>
		<view class="">
			<view class="a-w-750  a-position-relative a-overflow-hidden">
				<view  class="a-w-750 a-h-400   a-flex a-align-center a-justify-center">
					<image class="a-w-750  a-position-relative" mode="widthFix" :src="detail.image_url"></image>
				</view>
			</view>
			
			<view class="a-mt-3 a-bg-orange-yellow-lighter a-rounded-1-5 a-mx-3">
				
				<view class="a-p-3 a-flex-column">
					<text class=" a-font a-font-weight-bold a-font-max-three">{{detail.title}}</text>
					<text class=" a-font-max a-text-orange a-mt-2">{{detail.amount}} Rs</text>
					<!-- <view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-gray a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
						<text class="a-text-gray a-font-sm">{{item.limit_num}}</text>
					</view> -->
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class=" a-font-sm">{{$t('pro.projectBenefits')}}:</text>
						<text class=" a-font-sm">{{detail.profit_rate}}%</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class=" a-font-sm">{{$t('pro.leastInvest')}}:</text>
						<text class=" a-font-sm">{{detail.min_buy_amount}}Rs</text>
					</view>
					
					<view class="a-w-600 a-mt-2">
						<PROGRESS v-if="detail.rate" isAnimate duration="1000" :percentage="detail.rate" strokeWidth="5" bgColor="#FFA200" inBgColor="#000000" fontColor="#000000"></PROGRESS>
					</view>
					
				</view>
				
			</view>
			
			<view class="a-flex-column a-my-2">
				<text class="a-text-white a-font a-font-weight-bold a-mx-3">{{$t('user.crowdfundingDetails')}}:</text>
				<mp-html class="a-font a-mt-1 a-mx-3" :content="detail.detail" />
			</view>
			
		</view>
		<view class='a-w-750 a-h-120'></view>
		<view class="a-w-600 a-h-120 a-flex a-justify-center a-position-fixed a-bottom-0 a-mx-7-5">
			<view @click.stop="setNumber(detail.id)" class="a-bg-brown-orange a-h-90 a-flex-1 a-w-400 a-rounded-circle a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-text-brown a-font-weight-bold">{{$t('button.purchase')}}</text>
			</view>
		</view>
		
		<u-popup v-model="purchasePopup" mode="center" :border-radius="26">
			<view class="a-w-600 a-rounded-1-5 a-bg-white a-p-5">
					<text class="a-font-lg a-font-weight-bold">Please enter the purchase amount</text>
				<view class="a-py-5">
				<text class="a-font a-flex a-align-center a-justify-center">
					<input class="a-bg-gray-light a-w-400 a-text-center a-h-90 a-rounded-1-5 a-font-weight-bold" v-model="form.buy_price" placeholder="0">
				</text>
				</view>
				<view class="a-flex a-justify-around a-align-center">
					<view @click="fundingBuy" class="a-bg-blue-view-home-tancang a-h-90 a-w-480 a-rounded-circle a-flex a-align-center a-justify-center">
						<text class="a-font-lg a-text-white">{{$t('button.purchase')}}</text>
					</view>
				</view>
			
			</view>
			<view class="a-flex a-justify-center a-align-center a-mt-5">
				<image class="a-w-75 a-h-75  a-position-relative" mode="widthFix" src="@/static/images/close_modal.png" @click="purchasePopup=false"></image>
			</view>
		</u-popup>
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import { checkLogin,promptLogin } from '@/core/app'
	import * as Api from '@/api/user'
	import PROGRESS from '@/components/ai-progress/ai-progress'
	import POPUP from '@/components/popup/popup'
	
	export default {
		components: {
		  PROGRESS,
		  POPUP
		},
		data() {
			return {
				id:null,
				detail:{
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
				},
				id:null,
				form:{
					buy_price:null
				},
				purchasePopup:false,
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
				Api.fundingDetail({id:this.id}).then(result => {
					that.detail = result.data
					uni.setNavigationBarTitle({
						title: result.data.title
					});
				})
			},
			openPurchasePopup() {
				this.purchasePopup = true
			},
			closePurchasePopup() {
				this.purchasePopup = false
			},
			setNumber(id){
				this.id = id
				this.openPurchasePopup()
			},
			fundingBuy(){
				var that = this
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
				
				if(!this.form.buy_price || this.form.buy_price<=0){
					this.$toast(this.$t('toast.rNumber'))
					return
				}
				
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rBuyA')+this.form.buy_price+this.$t('toast.rBuyB'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=this.id
				// uni.showModal({
				//   title: this.$t('toast.reminder'),
				//   content: this.$t('toast.rBuy'),
				//   confirmText: this.$t('toast.ok'),
				//   cancelText: this.$t('toast.cancel'),
				//   success(o) {
				//     if (o.confirm) {
				//       that.sureFundingBuy(id)
				//     }
				//   }
				// })
			},
			sureFundingBuy(id){
				const that = this
				
				var data={
					id:id,
					form:{
						buy_price:parseFloat(this.form.buy_price)
					}
				};
				Api.fundingBuy(data).then(result =>{
					this.$toast(result.message)
					if(result.status==200){
						this.closePurchasePopup()
						
						setTimeout(() => {
							this.$navTo('pages/user/bind/crowdfunding')
						}, 1000);
					}
				}).finally(() => this.form.buy_price = null)
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					this.sureFundingBuy(this.popup.item)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
::v-deep uni-rich-text *{
	color:#e9e2e2;
	font-size: 30rpx ;
	font-weight: 400 ;
	background-color: transparent !important;
}
</style>
