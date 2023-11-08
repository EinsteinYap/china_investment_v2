<template>
	<view>
		<view class="a-mx-5 a-overflow-hidden">
			<view v-if="form.cateid==2" class=" forms-border-bottom a-flex a-align-center a-rounded-top-1-5 a-bg-orange-yellow-lighter a-h-90 a-mt-5">
				<view class="a-ml-3 a-flex-column a-w-200">
					<text class="a-font a-font-weight-bold">{{$t('form.name')}}</text>
				</view>
				<input class="a-flex-1 a-bg-orange-yellow-lighter a-h-90 a-px-4 a-font a-rounded-top-1-5" type="text" v-model="form.user_name" :placeholder="$t('placeholder.name')" placeholder-class="a-text-gray-light" />
			</view>
			
			<view v-if="form.cateid==2" class=" forms-border-bottom a-flex a-align-center a-bg-orange-yellow-lighter a-h-90">
				<view class="a-ml-3 a-flex-column a-w-200">
					<text class="a-font a-font-weight-bold">{{$t('form.mobile')}}</text>
				</view>
				<input class="a-flex-1 a-bg-orange-yellow-lighter a-h-90 a-px-4 a-font a-rounded-1-5" type="text" v-model="form.mobile" :placeholder="$t('placeholder.phone')" placeholder-class="a-text-gray-light" />
			</view>
			
			<view v-if="form.cateid==2" class=" forms-border-bottom a-flex a-align-center a-bg-orange-yellow-lighter a-h-90">
				<view class="a-ml-3 a-flex-column a-w-200">
					<text class="a-font a-font-weight-bold">{{$t('form.bankAccount')}}</text>
				</view>
				<input class="a-flex-1 a-bg-orange-yellow-lighter a-h-90 a-px-4 a-font" type="text" v-model="form.bank_card_number" :placeholder="$t('placeholder.bankCard')" placeholder-class="a-text-gray-light" />
			</view>
			
			<view v-if="form.cateid==2" class="forms-border-bottom a-flex a-align-center a-bg-orange-yellow-lighter a-h-90">
				<view class="a-ml-3 a-flex-column a-w-200">
					<text class="a-font a-font-weight-bold">IFSC</text>
				</view>
				<input class="a-flex-1 a-bg-orange-yellow-lighter a-h-90 a-px-4 a-font a-rounded-1-5" type="text" v-model="form.ifsc" :placeholder="$t('placeholder.IFSC')" placeholder-class="a-text-gray-light" />
			</view>
			
			<view v-if="form.cateid==1" class=" forms-border-bottom a-bg-orange-yellow-lighter a-rounded-top-1-5 a-pb-2 a-mt-2 a-pt-2">
				<view class="a-ml-3 a-flex-column  ">
					<text class=" a-font a-font-weight-bold">{{$t('form.address')}}</text>
				</view>
				
			</view>
			  <view v-if="form.cateid==1" class=" forms-border-bottom a-bg-orange-yellow-lighter a-pt-2">
			  	<view class="a-ml-3 a-flex-column  ">
			  <input class=" a-bg-orange-yellow-lighter a-h-90  a-font" type="text" v-model="form.address" :placeholder="$t('placeholder.address')" placeholder-class="a-text-gray-light" style="width: 500rpx;"/>
			  </view>
			  </view>
			<!-- 验证码 -->
			<view class="forms-border-bottom a-flex a-align-center a-bg-orange-yellow-lighter a-h-90">
				<view class="a-ml-3 a-flex-column a-w-100">
					<text class="a-font a-font-weight-bold">{{$t('form.sms')}}</text>
				</view>

				<input class="a-flex-1 a-bg-orange-yellow-lighter a-h-90 a-rounded-circle a-px-4 a-font" type="number" v-model="form.smsCode"  :placeholder="$t('placeholder.Sms')" placeholder-class="a-text-gray-light" />
				<view class="a-h-60 a-mr-2 a-rounded-circle a-bg-gradual-blue-primary-LR a-px-2 a-flex a-align-center" @click="sendSmsCaptcha()">
					<text v-if="!smsState" class="a-text-white a-font-sm">{{$t('form.getOTP')}}</text>
					<text v-else class="a-text-white a-font-sm">({{ times }}){{$t('user.seconds')}}</text>
				</view>
			</view>
			
			<view v-if="form.cateid==1" class="a-bg-orange-yellow-lighter a-pt-2">
				<view class="a-ml-3 a-flex-column">
					<text class="a-font a-font-weight-bold">{{$t('form.networkType')}}</text>
				</view>
				
				<view class="a-flex a-align-center a-p-2 forms-border-bottom">
					<view @click="changeAddressCate(1)" :class="form.address_cateid == 1?'a-bg-gradual-blue-primary-LR':'a-bg-white a-border a-border-primary'" class="a-w-160 a-h-80 a-rounded-1-5 a-flex a-align-center a-justify-center a-mr-2">
						<text class="a-font " :class="form.address_cateid == 1?'a-text-white':'a-text-primary'">TRC20</text>
					</view>
					<!-- <view @click="changeAddressCate(2)" :class="form.address_cateid == 2?'a-bg-primary':'a-bg-white a-border a-border-primary'" class="a-w-160 a-h-80 a-rounded-1-5 a-flex a-align-center a-justify-center a-mr-2">
						<text class="a-font " :class="form.address_cateid == 2?'a-text-white':'a-text-primary'">ETH</text>
					</view> -->
				</view>
			</view>
			
			<!-- 默认 -->
			<view class="a-flex a-align-center a-bg-orange-yellow-lighter a-rounded-bottom-1-5 a-h-90">
				<view class="a-ml-3 a-flex-column">
					<text class="a-font a-font-weight-bold">{{$t('form.defaultAccount')}}</text>
				</view>
				<view class="a-flex-1 a-flex a-justify-end">
					<switch :checked="checked" @change="changeSwitch"></switch>
				</view>
			</view>
			<!-- 登录按钮 -->
			<view class="a-mt-5">
				<view @click="sumbit" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
					<text class="a-font-lg a-font-weight-bold">{{$t('button.confirmation')}}</text>
				</view>
				<view v-if="id" @click="deteleAccount" class=" a-rounded-circle a-h-90 a-flex-1 a-flex a-align-center a-justify-center a-mb-4" >
					<text class="a-font a-text-primary">{{$t('button.deleteAccount')}}</text>
				</view>
			</view>
				  
		</view>
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import POPUP from '@/components/popup/popup'
	import * as Api from '@/api/user'
	import * as Verify from '@/utils/verify'
	
	// 倒计时时长(秒)
	const times = 60
	
	export default {
		components: {
		  POPUP
		},
		data() {
			return {
				// 正在加载
				isLoading: false,
				smsState: false,
				times,
				userInfo:{},
				checked:false,
				type:1,
				id:null,
				//表单
				form:{
					areaCodeText:'91',
					mobile:'',
					user_name:'',
					smsCode: '',
					cateid: 1,
					mobile: '',
					bank_card_number: '',
					ifsc: '',
					address:'',
					address_cateid:1,
					is_default: 0,
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
			if(options.cateid ==1){
				uni.setNavigationBarTitle({
					title: 'Add USDT'
				});
			}else{
				uni.setNavigationBarTitle({
					title: 'Bank Card Management'
				});
				
			}
			this.form.cateid = options.cateid
			this.type = options.type
			if(options.id){
				this.id = options.id
				this.getAccountInfo(options.id)
			}
			
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
			  const app = this
			    Api.info().then(result => {
					app.userInfo = result.data
					if(app.type==1){
						app.form.mobile = result.data.mobile
						app.form.areaCodeText = result.data.area_code
					}
			        
			    })
			},
			getAccountInfo(id){
				const app = this
				Api.accountDetail({id}).then(result => {
					app.form = result.data.detail
					app.form.smsCode = ''
					if(app.form.is_default){
						this.checked = true
					}
				})
			},
			deteleAccount(){
				const that = this
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rDelete'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=null
				// uni.showModal({
				//   title: this.$t('toast.reminder'),
				//   content: this.$t('toast.rDelete'),
				//   confirmText: this.$t('toast.ok'),
				//   cancelText: this.$t('toast.cancel'),
				//   success(res) {
				//     if (res.confirm) {
				//       that.sureDelete()
				//     }
				//   }
				// })
			},
			sureDelete(){
				const app = this
				Api.accountdelete({id:this.id}).then(result => {
					this.$toast(result.message)
					if(result.status==200){
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}
				})
			},
			// 请求发送短信验证码接口
			sendSmsCaptcha() {
				const that = this
				if (Verify.isEmpty(that.form.mobile)) {
					this.$toast(this.$t('toast.rMobileA'))
					return false
				}
				// if (!Verify.isMobile(that.form.mobile)) {
				// 	this.$toast(this.$t('toast.rMobileB'))
				// 	return false
				// }
				const app = this
				that.isLoading = true
				Api.sendSmsCaptcha({
					form: {
						mobile: that.form.mobile,
						area_code: that.form.areaCodeText
					}
				}).then(result => {
					// 显示发送成功
					app.$toast(result.message)
					// 执行定时器
					app.timer()
				})
				.finally(() => app.isLoading = false)
			},
			
			// 执行定时器
			timer() {
				const app = this
				app.smsState = true
				const inter = setInterval(() => {
					app.times = app.times - 1
					if (app.times <= 0) {
						app.smsState = false
						app.times = times
						clearInterval(inter)
					}
				}, 1000)
			},
			changeSwitch(){
				this.checked =!this.checked
				console.log(this.checked)
			},
			changeAddressCate(type){
				this.form.address_cateid = type
			},
			sumbit(){
				const that = this
				if(that.form.cateid==1){
					if (Verify.isEmpty(that.form.address)) {
						that.$toast(this.$t('toast.rWalletaddress'))
						return false
					}
				}else{
					if (Verify.isEmpty(that.form.user_name)) {
						that.$toast(this.$t('toast.rName'))
						return false
					}
					if (Verify.isEmpty(that.form.mobile)) {
						that.$toast(this.$t('toast.rMobileA'))
						return false
					}
					if (Verify.isEmpty(that.form.bank_card_number)) {
						that.$toast(this.$t('toast.rBanknum'))
						return false
					}
					if (Verify.isEmpty(that.form.ifsc)) {
						that.$toast(this.$t('toast.rIFSC'))
						return false
					}
				}
				
				if (Verify.isEmpty(that.form.smsCode)) {
					that.$toast(this.$t('toast.rSms'))
					return false
				}
				console.log(that.form)
				that.isLoading = true
				if(that.form.cateid==1){
					var params = {
						address: that.form.address,
						smsCode: that.form.smsCode,
						cateid: that.form.cateid,
						address_cateid: that.form.address_cateid,
						is_default: that.checked?1:0,
					}
				}else{
					var params = {
						user_name: that.form.user_name,
						smsCode: that.form.smsCode,
						cateid: that.form.cateid,
						mobile: that.form.mobile,
						bank_card_number: that.form.bank_card_number,
						ifsc: that.form.ifsc,
						is_default: that.checked?1:0,
					}
				}
				if(that.type==1){
					Api.accountAdd({form:params}).then(result => {
						// 显示登录成功
						that.$toast(result.message)
						// 跳转回原页面
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					})
					.catch(err => {})
					.finally(() => that.isLoading = false)
				}else{
					Api.accountEdit({id:that.id,form:params}).then(result => {
						// 显示登录成功
						that.$toast(result.message)
						// 跳转回原页面
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					})
					.catch(err => {})
					.finally(() => that.isLoading = false)
				}
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					this.sureDelete()
				}
			}
		}
	}
</script>

<style>
::v-deep .uni-switch-input.uni-switch-input-checked{
	background-color:#edc476 !important ;
}
::v-deep .uni-switch-input{
	border: 2rpx solid gold !important;
}
</style>
