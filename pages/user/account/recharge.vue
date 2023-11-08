<template>
	<view>
		
		<u-sticky bgColor="#fff" class="a-position-relative">
			<!-- #ifdef H5 -->
			<view class="a-h-28 a-flex a-align-center a-justify-center a-position-absolute a-right-2 a-bg-red a-px-1 a-rounded-2 a-rounded-bottom-left-0 a-position-absolute" style="top:-1rpx;">
				<text class="a-font-tiny a-text-white">{{$t('user.paymentGift')}}</text>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="a-h-30 a-flex a-align-center a-justify-center a-position-absolute a-right-3 a-top-0 a-bg-red a-px-2 a-rounded-2 a-rounded-bottom-left-0 a-position-absolute">
				<text class="a-font-min a-text-white">{{$t('user.paymentGift')}}</text>
			</view>
			<!-- #endif -->
		<u-tabs :list="tabs" :is-scroll="false" :current="curTab" active-color="#ffa200" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		
		
		<view class="a-flex-column a-justify-center a-px-5 a-w-690 a-mt-5 a-bg-gradual-violet-LR a-rounded-top-2 a-mx-3 a-h-230">
			<view class="">
				<text class="a-font a-text-white a-font-weight-bold">{{$t('user.amountMoney')}}</text>
			</view>
			<view class="a-flex a-justify-between a-align-center a-mt-1">
				<text class="a-font-max-two a-text-white a-font-weight-bold a-mt-1">{{balance}} Rs</text>
				<!-- <text v-if="info.gift_money" class="a-font a-text-orange a-font-weight-bold">Extra +{{info.gift_money}}</text> -->
			</view>
		</view>
		
		
		<view class="a-mx-3 a-mb-2 a-bg-orange-yellow-lighter a-w-690 a-py-5 a-rounded-bottom-2">
			<view class="a-py-3">
				<text class="a-font-lg a-font-weight-bold a-pl-4">{{$t('user.amount')}}</text>
			</view>
			<view class="a-flex a-align-center a-flex-wrap a-bg-orange-yellow-lighter a-rounded-2 a-w-690 a-h-670 a-pl-1">
				<view v-for="(item,index) in payplan" :key="index" @click="changePlan(index)" class="a-flex-column a-align-center a-justify-center a-w-180 a-h-160 a-rounded-2 a-position-relative a-mb-2 a-mx-2" :class="active==index?'a-bg-orange-yellow':'a-bg-gray'">
					<view v-if="curTab ==0" class="a-w-50 a-h-50 a-rounded-circle a-bg-orange a-flex a-align-center a-justify-center">
						<text class="a-text-white a-font">₹</text>
					</view>
					<image v-else class="a-w-50 a-h-50"  src="/static/images/ico-usdt.png"></image>
					<text class="a-font-max a-mt-2 a-font-weight-bold" :class="active==index?'a-text-black':''">{{item.money}}</text>
					
					<view v-if="item.gift_money != 0 || item.gift_money != '0.00'" class="a-bg-orange a-px-2 a-rounded-2 a-rounded-bottom-left-0 a-position-absolute" style="top:-10rpx;right:-15rpx;">
						<text class="a-text-white a-font-sm">+{{item.gift_money}}</text>
					</view>
				</view>
			</view>
			<view class="a-flex a-align-center a-rounded-1-5 a-h-90 a-mt-2 a-pr-4-5">
				<text class="a-font a-ml-3 a-font-weight-bold a-pl-4-5 a-pr-3">{{$t('user.otherAmount')}}</text>
				<input class="a-rounded-2 a-flex-1 a-bg-gray a-h-90 a-px-4 a-font" type="text" :value="form.custom_money?form.custom_money:''" @input="changeInput" @focus="changeInput" placeholder="Enter the Amount" placeholder-class="a-text-gray-light" />
			</view>
		</view>
		
		
		
		
		<view class="a-mx-3">
			<view class="a-py-3">
				<text class="a-font-lg a-font-weight-bold a-text-white">{{$t('user.channel')}}</text>
			</view>
			<view class="a-mt-2 a-bg-primary-lighter a-rounded-2">
				<radio-group>
					<label v-for="(item,index) in payment" :key='index' @tap='payItem(index)' class="a-flex a-justify-between a-align-center a-h-100 a-border-light" :class="index !=0?'a-border-top':''">
						<view class="a-flex a-align-center">
							<text class="a-font a-ml-2">{{item.pay_name}}</text>
						</view>
						<radio color="#ffa200" :checked="form.payment_id==item.id"></radio>
					</label>
				</radio-group>
			</view>
		</view>
		
		<view class="a-px-3 a-mt-5">
			<view @click="sumbit" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-text-brown a-font-weight-bold">{{$t('button.determine')}}</text>
			</view>
		</view>
		
		<view class="a-p-5">
			<mp-html class="a-font a-text-gray" :content="detail" />
		</view>
		
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import * as Verify from '@/utils/verify'
	import POPUP from '@/components/popup/popup'
	export default {
		components: {
		  POPUP
		},
		data() {
			return {
				hint:false,
				// tab栏数据
				tabs:[{
				  name: this.$t('user.paymentTypeA'),
				  value: 1
				}, {
				  name: this.$t('user.paymentTypeB'),
				  value: 2
				}],
				curTab: 0,
				cateid:1,
				balance:0,
				isLoading: false,
				active:null,
				detail:'',
				info:{},
				payplan:[],
				payment: [],
				form:{
					plan_id:0,
					payment_id:null,
					custom_money:0,
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
		onNavigationBarButtonTap(e){
			const index = e.index;
			
			if (index === 0){
				this.$navTo(`pages/user/account/recordRecharge`)
			}
		},
		onLoad() {
			this.getUserAssets()
			this.getRechargeInfo()
			this.getRechargeInfos()
			this.getAritlce()
		},
		methods: {
			onChangeTab(index) {
				const app = this
				// 设置当前选中的标签
				app.curTab = index
				app.cateid = app.tabs[app.curTab].value
				app.getRechargeInfo()
			},
			getAritlce() {
				const app = this
				Api.aritlce({type:'recharge'}).then(result => {
					this.detail = result.data.detail
				})
			},
			// 获取账户资产
			getUserAssets() {
				const app = this
				Api.assets().then(result => {
					this.balance = result.data.assets.balance
				})
			},
			// 获取账户资产
			getRechargeInfo() {
				const app = this
				Api.rechargeInfo({cateid:app.cateid}).then(result => {
					this.payplan = result.data.plan
					this.payment = result.data.payment
					
					this.active = 0
					this.form.plan_id = this.payplan[0].plan_id
					this.form.payment_id = this.payment[0].id
				})
			},
			// 获取账户资产
			getRechargeInfos() {
				const app = this
				Api.rechargeInfo({cateid:2}).then(result => {
					for(var i in result.data.plan){
						var price = parseFloat(result.data.plan[i].gift_money)
						if(price>0){
							app.hint = true
						}
					}
				})
			},
			
			changePlan(index){
				this.active = index
				this.form.plan_id = this.payplan[index].plan_id
				this.form.custom_money = 0
			},
			changeInput(e){
				this.active = null
				this.form.custom_money = e.detail.value
				this.form.plan_id = 0
				
			},
			payItem: function(index) {
				this.form.payment_id = this.payment[index].id
			},
			sumbit(){
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rSureRecharge'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=null
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					this.sureSumbit()
				}
			},
			sureSumbit(){
				const that = this
				if (!that.form.payment_id) {
					this.$toast(this.$t('toast.rRecharge'))
					return false
				}
				that.isLoading = true
				
				Api.rechargeSubmit(this.form).then(result => {
					if(result.status==200){
						if(result.data.cateid==2){
							var data = result.data
							if(!this.form.custom_money){
								if(this.payplan[this.active].gift_money != 0 || this.payplan[this.active].gift_money != '0.00'){
									data.gift_money = this.payplan[this.active].gift_money
								}else{
									data.gift_money = 0
								}
								
							}else{
								data.gift_money = 0
							}
							uni.setStorageSync('qrcode',result.data.image)
							this.$navTo('pages/user/account/payment',result.data)
							
							
						}else{
							
							if(!result.data.url){
								this.$toast(this.$t('toast.rUrlEmpty'))
								return
							}
							// if(result.data.url){
							// 	this.$navTo('pages/webView/webView?url='+result.data.url)
							// }
							// return
							// #ifdef H5
								location.href = result.data.url
							// #endif 
							// #ifndef H5
							console.log(result.data.url)
							plus.runtime.openURL(result.data.url);  
							// #endif 
						}
					}
				})
				.catch(err => {})
				.finally(() => that.isLoading = false)
			}
		}
	}
</script>

<style>

</style>
