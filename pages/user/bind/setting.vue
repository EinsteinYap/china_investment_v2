<template>
	<view>
		<view class="a-mx-4 a-mt-6 a-bg-primary-op-3 a-rounded-2" >
			<view class="a-flex a-align-center a-justify-between a-px-3 a-py-5   forms-border-bottom" >
				<view class="a-flex a-align-center">
					<text class="a-font a-ml-2 a-font-weight-bold a-text-white">{{$t('form.profilePicture')}}</text>
				</view>
				<view @click="upload" class="a-w-140 a-h-140">
					<avatar-image  :url="userInfo.avatar" :width="140" />
				</view>
			</view>
			<view class="a-flex a-align-center a-justify-between a-px-3 a-py-3  forms-border-bottom" >
				<view class="a-flex a-align-center">
					<text class="a-font a-ml-2 a-font-weight-bold a-text-white">{{$t('form.account')}}</text>
				</view>
				<text class="a-font-lg a-ml-2 a-text-white">{{userInfo.mobile}}</text>
			</view>
			<view @click="$navTo('pages/user/bind/password?type=1&title='+$t('form.loginPassword'))" class="a-flex a-align-center a-justify-between a-px-3 a-py-3  forms-border-bottom" >
				<view class="a-flex a-align-center">
					<text class="a-font a-ml-2 a-font-weight-bold a-text-white">{{$t('form.loginPassword')}}</text>
				</view>
				<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
			</view>
			<view @click="$navTo('pages/user/bind/password?type=2&title='+$t('form.paymentPassword'))" class="a-flex a-align-center a-justify-between a-px-3 a-py-3  forms-border-bottom" >
				<view class="a-flex a-align-center">
					<text class="a-font a-ml-2 a-font-weight-bold a-text-white">{{$t('form.paymentPassword')}}</text>
				</view>
				<text class="iconfonts icon-ai-arrow-down a-text-white"></text>
			</view>
			<view class="a-flex a-align-center a-justify-between a-px-3 a-py-5  " >
				<view @click="editAvatar" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
					<text class="a-font-lg a-text-brown a-font-weight-bold a-text-white">{{$t('button.saveEdit')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AvatarImage from '@/components/avatar-image'
	import * as Api from '@/api/user'
	import * as UploadApi from '@/api/upload'
	export default {
		components: {
		  AvatarImage
		},
		data() {
			return {
				userInfo:{},
				form:{
					avatar_id:null
				}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
			  const app = this
			    Api.info().then(result => {
			        app.userInfo = result.data
			    })
			},
			upload(){
				uni.chooseImage({
					count:1,
					success:res=>{
						this.userInfo.avatar = res.tempFilePaths[0]
						var array  = res.tempFiles;
						this.uploadImg(array);
					}
				});
			},
			uploadImg(array){
				UploadApi.image(array)
				  .then(result => {
					  this.form.avatar_id = result[0]
				  })
			},
			editAvatar() {
				const app = this
			    Api.editAvatar({form:this.form}).then(result => {
			        this.$toast(result.message)
			    })
			},
		}
	}
</script>

<style scoped>
</style>
