<template>
	<view>
		<view class="a-mx-5 a-overflow-hidden a-bg-primary-op-3 a-rounded-2  a-mt-3 forms-border-bottom">
			
			<!-- 手机号 -->
			<view v-if="isForgot" class="a-flex a-align-center a-rounded-circle a-h-90 a-mt-5">
				<text class="a-font a-ml-3 a-font-weight-bold a-text-white">{{$t('form.account')}}</text>
				<view class="a-pl-2 a-flex a-align-center a-justify-center a-my-2">
					<text @click="handleShowPopup" class= "a-font a-text-white">+{{form.areaCodeText}}</text>
					<text class="iconfonts icon-ai-arrow-down a-font-tiny a-text-white a-transform-90 a-ml-1"></text>
				</view>
				<input class="a-flex-1 a-h-90 a-rounded-circle a-px-4 a-font a-text-white" type="number" v-model="form.mobile" :placeholder="$t('placeholder.phone')" placeholder-class="a-text-gray-light" />
			</view>
			
			  <!-- 验证码 -->
			  <view class="a-flex a-align-center a-h-90 a-my-3 forms-border-bottom">
				  <view class="a-ml-3 a-flex-column a-w-200 ">
					  <text class="a-font a-font-weight-bold a-text-white">{{$t('form.verificationCode')}}</text>
				  </view>
				
				<input class="a-flex-1 a-h-90 a-rounded-circle a-px-4 a-font a-text-white" type="number" v-model="form.smsCode"  :placeholder="$t('placeholder.Sms')" placeholder-class="a-text-gray-light" />
				  <view class="a-h-60 a-mr-2 a-rounded-circle a-bg-primary a-px-2 a-flex a-align-center" @click="sendSmsCaptcha()">
						<text v-if="!smsState" class="a-text-white a-font-sm a-text-white">{{$t('form.getOTP')}}</text>
						<text v-else class="a-text-white a-font-sm a-text-white">({{ times }}){{$t('user.seconds')}}</text>
				  </view>
			  </view>
			  
			  <!-- 密码 -->
			  <view class="a-flex a-align-center a-rounded-1-5 a-h-90 a-mt-2 forms-border-bottom">
					<text class="a-font a-ml-3 a-font-weight-bold a-w-200 a-text-white">{{$t('form.newPassword')}}</text>
					<input class="a-flex-1 a-h-90 a-px-4 a-font a-text-white" type="text" v-model="form.password"  :placeholder="$t('placeholder.password')" placeholder-class="a-text-gray-light" />
			  </view>
			  
			  <!-- 密码 -->
			  <view class="a-flex a-align-center a-rounded-1-5 a-h-90 a-mt-2 forms-border-bottom">
					<text class="a-font a-ml-3 a-font-weight-bold a-w-200 a-text-white">{{$t('form.confirmation')}}</text>
					<input class="a-flex-1 a-h-90 a-px-4 a-font a-text-white" type="text" v-model="form.passwords"  :placeholder="$t('placeholder.password')" placeholder-class="a-text-gray-light" />
			  </view>
			  
			  <!-- 登录按钮 -->
			<view class="a-flex a-align-center a-justify-center a-py-3 a-px-5">
				<view @click="setPwd" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
					<text class="a-font-lg a-text-brown a-font-weight-bold a-text-white">{{$t('button.determine')}}</text>
				</view>
			</view>
				  
		</view>
		
		<u-popup v-model="showPopup" mode="bottom" :closeable="true" :border-radius="26">
			<view class="a-bg-white a-w-750 a-overflow-hidden">
			  <picker-view :indicator-style="indicatorStyle" :value="value"  @change="changeAreaCode" class="a-mx-5 a-h-500">
				<picker-view-column>
					<view class="a-flex a-justify-between a-align-center" v-for="(item,index) in areaCode" :key="index">
						<text class="a-font">{{item.name}}</text>
						<text class="a-font">+{{item.code}}</text>
					</view>
				</picker-view-column>
			  </picker-view>
		  </view>
		</u-popup>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import * as Verify from '@/utils/verify'
	
	// 倒计时时长(秒)
	const times = 60
	
	export default {
		data() {
			return {
				isLoading: false,
				isForgot:false,
				smsState: false,
				times,
				userInfo:{},
				type:1,
				form:{
					areaCodeText:'91',
					smsCode:'',
					mobile: '',
					password: '',
					passwords: ''
				},
				
				showPopup:false,
				value: [0],
				visible: true,
				indicatorStyle: `height: 50px;`,
				areaCode:[],
				
			}
		},
		onLoad(options) {
			console.log(options)
			this.type=options.type
			uni.setNavigationBarTitle({
				title: options.title
			});
			if(options.isForgot){
				this.isForgot = options.isForgot
				this.getAreacode()
			}else{
				this.getUserInfo()
			}
		},
		methods: {
			getUserInfo() {
			  const app = this
			    Api.info().then(result => {
			        app.userInfo = result.data
					app.form.mobile = result.data.mobile
					app.form.areaCodeText = result.data.area_code
			    })
			},
			getAreacode() {
			  const that = this
			  Api.areacode().then(result =>{
				  that.areaCode = result.data
				  if(result.data.length){
					  that.form.areaCodeText = result.data[0].code
				  }
			  })
			},
			handleShowPopup() {
				this.showPopup = true
			},
			changeAreaCode: function (e) {
				const val = e.detail.value
				this.value = val
				this.form.areaCodeText = this.areaCode[val[0]].code
			},
			// 请求发送短信验证码接口
			sendSmsCaptcha() {
				const that = this
				if (Verify.isEmpty(that.form.mobile)) {
					that.$toast(this.$t('toast.rMobileA'))
					return false
				}
				// if (!Verify.isMobile(that.form.mobile)) {
				// 	that.$toast(this.$t('toast.rMobileB'))
				// 	return false
				// }
				that.isLoading = true
				Api.sendSmsCaptcha({
					form: {
						mobile: that.form.mobile,
						area_code: that.form.areaCodeText
					}
				}).then(result => {
					// 显示发送成功
					that.$toast(result.message)
					// 执行定时器
					that.timer()
				})
				.finally(() => that.isLoading = false)
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
			
			setPwd(){
				const that = this
				if (Verify.isEmpty(that.form.smsCode)) {
					that.$toast(this.$t('toast.rSms'))
					return false
				}
				if (Verify.isEmpty(that.form.password)) {
					that.$toast(this.$t('toast.rPassword'))
					return false
				}
				if (that.form.password!= that.form.passwords) {
					that.$toast(this.$t('toast.rPasswordNo'))
					return false
				}
				that.isLoading = true
				var params = {
					smsCode: that.form.smsCode,
					new_pwd: that.form.password,
				}
				if(that.isForgot){
					params.mobile = that.form.mobile
					params.area_code = that.form.areaCodeText
					Api.forgetPwdEdit({form:params}).then(result => {
						// 显示登录成功
						that.$toast(result.message)
						// 跳转回原页面
						if(result.status==200){
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
					})
					.catch(err => {})
					.finally(() => that.isLoading = false)
					reutrn
				}
				if(this.type==1){
					Api.pwdEdit({form:params}).then(result => {
						// 显示登录成功
						that.$toast(result.message)
						// 跳转回原页面
						if(result.status==200){
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
					})
					.catch(err => {})
					.finally(() => that.isLoading = false)
				}else{
					Api.paypwdEdit({form:params}).then(result => {
						// 显示登录成功
						that.$toast(result.message)
						// 跳转回原页面
						if(result.status==200){
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
					})
					.catch(err => {})
					.finally(() => that.isLoading = false)
				}
			},
			
		}
	}
</script>

<style>

</style>
