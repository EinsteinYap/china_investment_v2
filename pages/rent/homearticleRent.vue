<template>
	<view>
		<swiper class="a-w-750 a-h-400 a-mb-3" style="z-index:1;">
			<swiper-item class="a-w-750 a-h-400">
				<view  class="a-w-750 a-h-400 a-flex a-align-center a-justify-center">
					<image class="a-w-750 a-position-absolute" mode="widthFix" :src="detail.good_image"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="a-mx-3 a-mb-3 a-bg-primary-lighter a-rounded-1-5">
			<view class="a-p-3">
				<text class="a-text-ellipsis-1 a-font a-text-orange  a-font-weight-bold">{{detail.goods_name}}</text>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.amount')}}:</text>
					<text class="a-text-gray a-font-sm">{{detail.goods_price}} Rs</text>
				</view>
				<view v-if="detail.settle_model !=3" class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.dailyIncome')}}:</text>
					<text class="a-text-gray a-font-sm">{{detail.daily_income}} Rs</text>
				</view>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.incomeCycle')}}:</text>
					<text class="a-text-gray a-font-sm">{{detail.total_day}} Days</text>
				</view>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.totalIncome')}}:</text>
					<text class="a-text-gray a-font-sm">{{detail.total_profit}} Rs</text>
				</view>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
					<text class="a-text-gray a-font-sm">{{detail.limit_num}}</text>
				</view>
				<view v-if="detail.expire_time" class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-text-gray a-font-sm">{{$t('pro.eventcountdown')}}:</text>
					<view class="a-flex a-justify-between a-align-center">
						<uni-countdown color="#FFFFFF" background-color="#571fb2" :show-day="false" :hour="$countdown(detail.expire_time,'hour')" :minute="$countdown(detail.expire_time,'minute')" :second="$countdown(detail.expire_time,'second')"></uni-countdown>
						<!-- <uni-countdown v-else-if="!item.countdown" color="#FFFFFF" background-color="#555555" :show-day="false" :hour="0" :minute="0" :second="0"></uni-countdown> -->
					</view>
				</view>
			</view>
			
		</view>
		<view v-if="detail.back_money_str" class="a-mx-3 a-mb-3 a-bg-orange-light a-rounded-1-5 a-flex a-align-center a-justify-center a-p-1 a-rounded">
			<text class="a-text-orange a-font-sm">{{detail.back_money_str}}</text>
		</view>
		
		<view class="a-mx-3 a-mb-3">
			<mp-html class="a-text-gray" :content="detail.content" />
		</view>
		
		<view class="a-w-750 a-h-100"></view>
		<!-- <view class="a-w-750 a-h-100 a-px-5 a-position-fixed a-bottom-0 a-flex a-justify-center">
			<view @click="navToAuth" class="a-bg-gradual-purple-LR a-rounded-circle a-h-90 a-flex-1 a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-text-white">{{$t('button.rent')}}</text>
			</view>
		</view> -->
		
		
		
		<u-popup v-model="showPopup" mode="bottom" :closeable="true" :border-radius="26">
			<view class="a-flex a-bg-white a-w-750 a-overflow-hidden" style="max-height:95vh">
				<scroll-view scroll-y class="a-flex-1">
				<view class="a-mx-3">
					<view class="a-w-690 a-h-80"></view>
					<view class="a-flex a-mb-1 a-rounded-1-5">
						<view class="a-w-200 a-h-200 a-rounded-1-5 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center">
							<image class="a-w-200 a-rounded-1-5" mode="widthFix" :src="detail.good_image"></image>
						</view>
						<view class="a-flex-column a-px-2 a-py-1">
							<text class="a-text-ellipsis-1 a-font  a-font-weight-bold">{{detail.goods_name}}</text>
							<text class="a-text-orange a-font-sm a-mt-1">{{detail.goods_price}} Rs</text>
							<view class="a-flex a-align-center">
								<view v-if="form.user_coupon_id && couponInfo" class="a-position-relative a-bg-gradual-orange-LR a-px-3 a-mt-1 a-py-1 a-rounded" @click="$navTo('pages/user/bind/coupon?isSelect=true')">
									<text class="a-text-white a-font">₹</text>
									<text class="a-text-white a-font">{{couponInfo.reduce_price}}</text>
								</view>
								<text v-else class="a-text-primary a-font-sm a-mt-1">{{$t('user.noCoupon')}}</text>
								<view v-if="!form.user_coupon_id || !couponInfo" @click="$navTo('pages/user/bind/coupon?isSelect=true')" class="a-px-2 a-py-1 a-bg-primary a-rounded-circle a-ml-2">
									<text class="a-font a-text-white">{{$t('button.select')}}</text>
								</view>
							</view>
							
						</view>
					</view>
					
				  <view class="a-mb-1 a-bg-primary-lighter a-rounded-1-5">
					
					<view class="a-p-2">
						<text class="a-text-ellipsis-1 a-font a-text-orange  a-font-weight-bold">{{detail.goods_name}}</text>
						<view class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.amount')}}:</text>
							<text class="a-text-gray a-font-sm">{{detail.goods_price}} Rs</text>
						</view>
						<view v-if="detail.settle_model !=3" class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.dailyIncome')}}:</text>
							<text class="a-text-gray a-font-sm">{{detail.daily_income}} Rs</text>
						</view>
						<view class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.incomeCycle')}}:</text>
							<text class="a-text-gray a-font-sm">{{detail.total_day}} Days</text>
						</view>
						<view class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.totalIncome')}}:</text>
							<text class="a-text-gray a-font-sm">{{detail.total_profit}} Rs</text>
						</view>
						<view class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
							<text class="a-text-gray a-font-sm">{{detail.limit_num}}</text>
						</view>
					</view>
				  </view>
				  <view v-if="detail.back_money_str" class="a-mb-3 a-bg-orange-light a-rounded-1-5 a-flex a-align-center a-justify-center a-p-1 a-rounded">
					<text class="a-text-orange a-font-sm">{{detail.back_money_str}}</text>
				  </view>
				  
				  <view class="a-flex-column a-mb-2">
					<text class="a-text-primary a-font a-font-weight-bold">{{$t('user.rentalContract')}}:</text>
					<scroll-view scroll-y style="max-height:150rpx;">
						<mp-html class="a-font a-mt-1" :content="detail.agreement" />
					</scroll-view>
				  </view>
				  
				  <label class="a-flex a-align-center" @tap="changeRadio">
						<radio style="transform:scale(0.7)" color="#FFA200" :checked="checked"></radio>
						<text class="a-font-sm a-text-primary">{{$t('user.agreement')}}</text>
				  </label>
				  
				  <view class="a-flex a-align-center a-justify-between a-my-3">
					  <view>
						  <text>{{$t('user.number')}}</text>
					  </view>
					  <view class="a-flex a-align-center a-bg-primary-light a-rounded">
						<view @click="reduce" class="a-w-80 a-h-70 a-flex a-align-center a-justify-center">
							<image class="a-w-40 a-h-40" src="/static/images/ico-sub.png"></image>
						</view>
						<input class="a-w-120 a-h-70 a-font a-text-center" type="number" v-model="form.nums" placeholder="0" placeholder-class="a-text-gray-light" />
						<view  @click="add" class="a-w-80 a-h-70 a-flex a-align-center a-justify-center">
							<image class="a-w-40 a-h-40" src="/static/images/ico-add.png"></image>
						</view>
					  </view>
				  </view>
				  
				  <view class="a-flex a-align-center a-justify-center a-pb-3 a-px-5">
					  <view @click="sumbit" class="a-bg-gradual-purple-LR a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
						  <text class="a-font-lg a-text-white">Rent</text>
					  </view>
				  </view>
			    </view>
				</scroll-view>
			</view>
		</u-popup>
		
		<u-popup v-model="rechargePopup" mode="center" :closeable="true" :border-radius="26">
			<view class="a-w-600 a-rounded-1-5 a-bg-white a-p-5">
				<view class="a-py-5">
				<text class="a-font">
					{{hint}}
				</text>
				</view>
				<view class="a-flex a-justify-around a-align-center">
					<view @click="closeRechargePopup" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-primary-light">
						<text class="a-font-lg">{{$t('toast.cancel')}}</text>
					</view>
					<view @click="$navTo('pages/user/account/recharge')" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-gradual-purple-LR">
						<text class="a-font-lg a-text-white">{{$t('toast.ok')}}</text>
					</view>
				</view>
			</view>
		</u-popup>
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import { checkLogin,promptLogin } from '@/core/app'
	import POPUP from '@/components/popup/popup'
	export default {
		components: {
		  POPUP
		},
		data() {
			return {
				showPopup:false,
				rechargePopup:false,
				isLogin:false,
				checked:false,
				detail:{},
				hint:'',
				form:{
					goods_id:null,
					nums:1,
					user_coupon_id:null,
				},
				couponInfo:null,
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
			this.form.goods_id = options.id
		},
		onShow(){
			this.getRendDetail(this.form.goods_id)
			this.isLogin = checkLogin()
		},
		methods: {
			handleShowPopup() {
				this.showPopup = !this.showPopup
			},
			openRechargePopup() {
				this.rechargePopup = true
			},
			closeRechargePopup() {
				this.rechargePopup = false
			},
			navToAuth(url,index){
				if(this.isLogin){
					this.handleShowPopup()
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
			changeRadio(){
				this.checked= !this.checked
				console.log(this.checked)
			},
			getRendDetail(id){
				var that = this
				Api.rentDetail({goods_id:id}).then(result =>{
					that.detail = result.data
					uni.setNavigationBarTitle({
						title: result.data.goods_name
					});
				})
			},
			// reduce(){
			// 	if(this.form.nums>0){
			// 		this.form.nums--
			// 	}
			// },
			// add(){
			// 	this.form.nums++
			// },
			// getNumber(){
			// 	if(this.couponInfo && this.couponInfo.reduce_price){
			// 		return this.detail.goods_price*this.form.nums - this.couponInfo.reduce_price
			// 	}else{
			// 		return this.detail.goods_price*this.form.nums
			// 	}
			// },
			sumbit(){
				const that = this
				if (that.form.nums==0) {
					that.$toast(this.$t('toast.rBuynum'))
					return false
				}
				if (!that.checked) {
				  that.$toast(this.$t('toast.rAgreement'))
				  return false
				}
				that.handleShowPopup()
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rBuyA')+this.getNumber()+this.$t('toast.rBuyB'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=null
				// uni.showModal({
				//   title: this.$t('toast.reminder'),
				//   content: this.$t('toast.rBuy'),
				//   confirmText: this.$t('toast.ok'),
				//   cancelText: this.$t('toast.cancel'),
				//   success(res) {
				//     if (res.confirm) {
						
				//       that.sureSumbit()
				//     }
				//   }
				// })
			},
			sureSumbit(){
				const that = this
				var data={
					id:item.id,
					cateid:item.cateid,
				};
				Api.activityBuy(data).then(result => {
					// 跳转回原页面
					if(result.status==200){
						that.$toast(result.message)
						setTimeout(() => {
							this.$navTo('pages/income/income')
						}, 1000);
					}else{
						that.hint = result.message
						that.openRechargePopup()
					}
				})
				.catch(err => {})
				.finally(() => that.isLoading = false)
			},
			// cancelPopup(){
			// 	this.popup.isShow=false
			// },
			// surePopup(){
			// 	this.popup.isShow=false
			// 	if(this.popup.isLogin){
			// 		this.$navTo('pages/login/index')
			// 	}else if(this.popup.isOperation){
			// 		console.log(this.popup.item)
			// 		this.sureSumbit()
			// 	}
			// }
		}
	}
</script>

<style>

</style>
