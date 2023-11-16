<template>
  <view>
	
	<view class="a-flex-column a-align-start a-justify-center a-ml-5">
		<text class="a-text-white a-font-max a-mt-5 a-font-weight  a-w-250 a-h-100 a-font-max-five a-font-Agbalumo animate__animated animate__bounceInRight animate__delay-2s">Sunrun</text>
	</view>
	<view class="a-h-400  a-flex-column a-align-start a-justify-center a-ml-5 a-mt-5 animate__animated animate__backInDown animate__delay-1s" :class="!register? 'a-mt-5 a-mb-10':''">
		<text class="a-text-white a-font-max a-font-weight  a-w-500 a-font-max-ten">Power modern living</text>
		<text class="a-text-white a-font-max a-mt-2 a-mb-5 a-w-500">Get ahead of your energy needs with cutting-edge solar and home backup. </text>
	</view>
	
    <!-- 表单 -->
    <view class="a-rounded-top-5 a-position-relative a-px-5" style="z-index:2">
	  <view v-if="!register" class="a-mx-5 a-flex a-justify-center">
		  <view class="box a-ml-3">
		  			<view class="square" style="--i:0"></view>
		  			<view class="square" style="--i:1"></view>
		  			<view class="square" style="--i:2"></view>
		  			<view class="square" style="--i:3"></view>
		  			<view class="square" style="--i:4"></view>
		  			<view class="login-glass-container animate__animated animate__zoomIn animate__delay-1s">
		  				<view class="form">
		  					<text>Login Form</text>
		  					<form>
								 <!-- 手机号 -->
		  						<view class="inputBox">
								<view v-if="!register" class="input-box-inner a-flex a-align-center  a-rounded-circle a-h-70 a-mt-5 animate__animated animate__jackInTheBox animate__delay-2s">
									<text class="a-font-sm a-ml-3 ">{{$t('form.account')}}</text>
									<view class="a-pl-2 a-flex a-align-center a-justify-center a-my-2">
										<text @click="handleShowPopup" class= "a-font-sm a-px-2">+{{form.areaCodeText}}</text>
										<text class="iconfonts icon-ai-arrow-down a-font-tiny a-text-gray a-transform-90 a-ml-1"></text>
									</view>
									<input class="a-flex-1 a-h-60 a-rounded-circle a-px-2 a-font-sm" type="number" v-model="form.mobile" :placeholder="$t('placeholder.phone')" placeholder-class="a-text-gray-light" />
								</view>
		  							
		  						</view>
		  						<view class="inputBox">
		  							<!-- 密码 -->
		  							<view  class="a-flex input-box-inner a-h-70 a-align-center  a-rounded-circle a-h-90 a-mt-5 animate__animated animate__jackInTheBox animate__delay-2s">
		  										<text class="a-font-sm a-ml-3 a-font-weight-bold">{{$t('form.password')}}</text>
		  										<input class="a-flex-1  a-h-90 a-rounded-circle a-ml-7-5 a-font-sm" type="text" password v-model="form.password"  :placeholder="$t('placeholder.password')" placeholder-class="a-text-gray-light" />
		  							</view>
		  						</view>
		  						<view class="glass-container a-my-2 animate__animated animate__zoomIn animate__delay-3s a-flex-1 a-flex a-align-center a-justify-center" @click="handleLogin">
		  							<view class="btn" style="--clr:#ffff7f;height: 50rpx;"><a href="#"><text class="glass-button">{{$t('button.login')}}</text></a></view>
		  						</view>
		  						
		  						<view v-if="!register" class="a-flex a-justify-around a-mt-3 animate__animated animate__jackInTheBox animate__delay-3s">
		  							<text @click="register = true" class="a-text-white">{{$t('button.register')}}</text>
		  							<text @click="$navTo('pages/user/bind/password?isForgot=true')" class=" a-text-white ">Forgot Password?</text>		  
		  						</view>
								<!-- <p class="forget">Forgot password ? <a href="#">Click Here</a></p> -->
								<!-- <p class="forget">Don't have an account ? <a href="#">Sign up</a></p> -->
		  					</form>
		  				</view>
		  			</view>
		  		</view>
	

	  </view>
	  
	  <view  v-if="register" class="a-mx-5 a-flex a-justify-center">
		<view class="box a-ml-3">
					<view class="square" style="--i:0"></view>
					<view class="square" style="--i:1"></view>
					<view class="square" style="--i:2"></view>
					<view class="square" style="--i:3"></view>
					<view class="square" style="--i:4"></view>
					<view class="login-glass-container animate__animated animate__zoomIn animate__delay-1s">
						<view class="form">
							<text>Register Form</text>
							<form>
										 <!-- 手机号 -->
								<view class="inputBox">
								<view  v-if="register" class="input-box-inner a-flex a-align-center  a-rounded-circle a-h-70 a-mt-3 animate__animated animate__slideInLeft">
											<text class="a-font-min a-ml-3 a-font-weight-bold">{{$t('form.account')}}</text>
											<view class="a-pl-2 a-flex a-align-center a-justify-center a-my-2">
												<text @click="handleShowPopup" class= "a-font-min">+{{forms.areaCodeText}}</text>
												<text class="iconfonts icon-ai-arrow-down a-font-min a-text-gray a-transform-90 a-ml-1"></text>
											</view>
											<input class="a-flex-1  a-h-70 a-rounded-circle a-px-4 a-font-sm" type="number" v-model="forms.mobile" :placeholder="$t('placeholder.phone')" placeholder-class="a-text-gray-light" />
								</view>
									
								</view>
								<view class="inputBox">
								<!-- 验证码 -->
								<view v-if="register" class="input-box-inner a-flex a-align-center  a-rounded-circle a-h-70 a-mt-3 animate__animated animate__slideInRight">
										  <view class="a-ml-1 a-flex-column a-w-150">
											  <text class="a-font-min a-font-weight-bold">{{$t('form.verificationCode')}}</text>
										  </view>
										
										<input class="a-flex-1  a-h-70 a-rounded-circle a-px-3 a-font" type="number" v-model="forms.smsCode"  :placeholder="$t('placeholder.Sms')" placeholder-class="a-text-gray-light" />
										  <view class="a-h-50 a-mr-2 a-rounded-circle a-bg-primary a-px-1 a-flex a-align-center" @click="sendSmsCaptcha()">
												<text v-if="!smsState" class="a-text-white a-font-min">{{$t('form.getOTP')}}</text>
												<text v-else class="a-text-white a-font-sm">({{ times }}){{$t('user.seconds')}}</text>
										  </view>
								</view>
								</view>
								<view class="inputBox">
									<!-- 密码 -->
									<view v-if="register" class="input-box-inner a-flex a-align-center  a-rounded-circle a-h-70 a-mt-3 animate__animated animate__slideInLeft">
													<text class="a-font-min a-ml-3 a-font-weight-bold a-w-150">{{$t('form.password')}}</text>
													<input class="a-flex-1  a-h-70 a-rounded-circle a-px-2 a-font-sm" type="text" v-model="forms.password"  :placeholder="$t('placeholder.password')" placeholder-class="a-text-gray-light" />
									</view>
								</view>
								<!-- 邀请码 -->
								<view class="inputBox">
								<view v-if="!source.staffId && register" class="input-box-inner a-flex a-align-center a-rounded-circle a-h-70 a-mt-3 animate__animated animate__slideInRight">
									<view class="a-ml-1 a-flex-column a-w-150">
											  <text class="a-font-min  a-font-weight-bold">{{$t('form.invitationCode')}}</text>
									</view>
											<input class="a-flex-1 a-h-90 a-rounded-circle a-px-1 a-font-sm" type="text" v-model="forms.inviteCode"  :placeholder="$t('placeholder.invite')" placeholder-class="a-text-gray-light" />
								</view>
								</view>
								<label class="a-flex a-mt-3 a-align-center animate__animated animate__slideInLeft" @tap="changeRadio">
												<radio style="transform:scale(0.7)" color="#61ff1d" :checked="checked"></radio>
												<text class="a-text-white a-font-min " @click="$navTo('pages/user/bind/agreement')">{{$t('user.agreement')}}</text>
								</label>
								
								<view class="glass-container a-my-2 animate__animated animate__zoomIn animate__delay-2s a-flex-1 a-flex a-align-center a-justify-center" @click="handleLogin">
									<view class="btn" style="--clr:#61ff1d;height: 50rpx;"><a href="#"><text class="glass-button">{{$t('button.register')}}</text></a></view>
								</view>
								
								<view v-if="register" class="a-flex a-justify-center a-mt-3 a-mb-4 animate__animated animate__zoomIn animate__delay-3s">
									<text @click="register = false" class="a-text-white a-mx-7-5">{{$t('button.login')}}</text>	  
								</view>
				
							</form>
						</view>
					</view>
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
  import store from '@/store'
  import * as Api from '@/api/user'
  import * as Verify from '@/utils/verify'
  import storage from '@/utils/storage'
  // 倒计时时长(秒)
  const times = 60

  export default {

    props: {
      // 是否存在第三方用户信息
      isParty: {
        type: Boolean,
        default: () => false
      },
      // 第三方用户信息数据
      partyData: {
        type: Object
      },
	  // 第三方用户信息数据
	  source: {
	    type: Object
	  }
    },

    data() {
      return {
        // 正在加载
        isLoading: false,
        smsState: false,
        times,
		
		//是否注册
		register:false,
		checked:false,
		//注册表单
		forms:{
			areaCodeText:'91',
			mobile: '',
			password: '',
			inviteCode: '',
			smsCode: '',
		},
		//登录表单
		form:{
			areaCodeText:'91',
			mobile: '',
			password: '',
		},
		showPopup:false,
		value: [0],
		visible: true,
		indicatorStyle: `height: 50px;`,
		areaCode:[],
		setting:{}
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    created() {
		this.register = this.source.register
		if(this.source.invitCode){
			this.forms.inviteCode = this.source.invitCode
		}
      this.getAreacode()
	  this.setting = storage.get('Setting')
	  console.log(this.setting)
    },

    methods: {
		getAreacode() {
		  const that = this
		  Api.areacode().then(result =>{
			  that.areaCode = result.data
			  if(result.data.length){
				  that.form.areaCodeText = result.data[0].code
				  that.forms.areaCodeText = result.data[0].code
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
			this.forms.areaCodeText = this.areaCode[val[0]].code
		},
		changeRadio(){
			this.checked= !this.checked
			console.log(this.checked)
		},
      // 请求发送短信验证码接口
      sendSmsCaptcha() {
		  const that = this
		  if (Verify.isEmpty(that.forms.mobile)) {
		    that.$toast(this.$t('toast.rMobileA'))
		    return false
		  }
		  // if (!Verify.isMobile(that.forms.mobile)) {
		  //   that.$toast(this.$t('toast.rMobileB'))
		  //   return false
		  // }
			that.isLoading = true
			Api.sendSmsCaptcha({
				form: {
					mobile: that.forms.mobile,
					area_code: that.forms.areaCodeText
				}
			})
			.then(result => {
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
	  
	  handleRegister(){
		  const that = this
		  console.log(that.source.staffId)
		  
		  if (Verify.isEmpty(that.forms.mobile)) {
		    that.$toast(this.$t('toast.rMobileB'))
		    return false
		  }
		  // if (!Verify.isMobile(that.forms.mobile)) {
		  //   that.$toast(this.$t('toast.rMobileA'))
		  //   return false
		  // }
		  if (Verify.isEmpty(that.forms.smsCode)) {
		    that.$toast(this.$t('toast.rSms'))
		    return false
		  }
		  if (Verify.isEmpty(that.forms.password)) {
		    that.$toast(this.$t('toast.rPassword'))
		    return false
		  }
		  if(!that.source.staffId){
			  if (Verify.isEmpty(that.forms.inviteCode)) {
			    that.$toast(this.$t('toast.rInvite'))
			    return false
			  }
		  }
		  
		  if (!that.checked) {
		    that.$toast(this.$t('toast.rAgreement'))
		    return false
		  }
		  console.log(that.form)
		  that.isLoading = true
		  
		  if(that.source.staffId){
			  store.dispatch('staffRegister', {
			      area_code: that.forms.areaCodeText,
			      mobile: that.forms.mobile,
			  	  smsCode: that.forms.smsCode,
			      password: that.forms.password,
			      staff_id: that.source.staffId,
			    })
			    .then(result => {
			      // 显示登录成功
			      that.$toast(result.message)
			      // 跳转回原页面
				  if(result.status==200){
					  setTimeout(() => {
					    that.register = false
					  }, 2000)
				  }
			      
			    })
			    .catch(err => {
			      
			    })
			    .finally(() => that.isLoading = false)
		  }else{
			 store.dispatch('Register', {
			     area_code: that.forms.areaCodeText,
			     mobile: that.forms.mobile,
			 	 smsCode: that.forms.smsCode,
			     password: that.forms.password,
			     invite_code: that.forms.inviteCode,
			   })
			   .then(result => {
			     // 显示登录成功
			     that.$toast(result.message)
			     // 跳转回原页面
			     if(result.status==200){
				  setTimeout(() => {
					that.register = false
				  }, 2000)
			     }
			   })
			   .catch(err => {
			     
			   })
			   .finally(() => that.isLoading = false) 
		  }
		  
	  },

      // 点击登录
      handleLogin() {
		const that = this
		if (Verify.isEmpty(that.form.mobile)) {
		  that.$toast(this.$t('toast.rMobileA'))
		  return false
		}
		// if (!Verify.isMobile(that.form.mobile)) {
		//   that.$toast(this.$t('toast.rMobileB'))
		//   return false
		// }
		if (Verify.isEmpty(that.form.password)) {
		  that.$toast(this.$t('toast.rPassword'))
		  return false
		}
		console.log(that.form)
        that.isLoading = true
        store.dispatch('Login', {
            area_code: that.form.areaCodeText,
            mobile: that.form.mobile,
            password: that.form.password,
          })
          .then(result => {
            // 显示登录成功
            that.$toast(result.message)
            // 跳转回原页面
			if(result.status==200){
				setTimeout(() => {
				 // #ifdef APP-PLUS
				 that.$navTo('pages/home/home')
				 // that.onNavigateBack(1)
				 // #endif
				 // #ifndef APP-PLUS
				 that.$navTo('pages/home/home')
				 // #endif
				}, 2000)
			}
            
          })
          .catch(err => {
            // 跳转回原页面
            if (err.result.data.isBack) {
              setTimeout(() => that.onNavigateBack(1), 2000)
            }
          })
          .finally(() => that.isLoading = false)
      },

      /**
       * 登录成功-跳转回原页面
       */
      onNavigateBack(delta = 1) {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          uni.navigateBack({
            delta: Number(delta || 1)
          })
        } else {
          this.$navTo('pages/index/index')
        }
      }

    }
  }
</script>

<style lang="scss" scoped>

  // 页面头部
  // .header {
  //   margin-bottom: 60rpx;

  //   .title {
  //     color: #191919;
  //     font-size: 54rpx;
  //   }

  //   .sub-title {
  //     margin-top: 20rpx;
  //     color: #b3b3b3;
  //     font-size: 28rpx;
  //   }
  // }

  // 输入框元素
  .form-item {
    display: flex;
    padding: 18rpx;
    border-bottom: 1rpx solid #f3f1f2;
    margin-bottom: 30rpx;
    height: 96rpx;

    &--input {
      font-size: 28rpx;
      letter-spacing: 1rpx;
      flex: 1;
      height: 100%;
    }

    &--parts {
      min-width: 100rpx;
      height: 100%;
    }

    // 图形验证码
    .captcha {
      height: 100%;

      .image {
        display: block;
        width: 192rpx;
        height: 100%;
      }
    }

    // 短信验证码
    .captcha-sms {
      font-size: 28rpx;
      line-height: 50rpx;
      padding-right: 20rpx;

      .activate {
        color: #cea26a;
      }

      .un-activate {
        color: #9e9e9e;
      }
    }
  }


  // 登录按钮
  .login-button {
    width: 100%;
    height: 86rpx;
    margin-top: 80rpx;
    background: linear-gradient(to right, #ffffff, #fd8008);
    color: #000000;
    border-radius: 80rpx;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    letter-spacing: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
.glass-container .btn::before{
	bottom:-8rpx;
}
.glass-button:hover{
	color: #000000;
}
</style>
