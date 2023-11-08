<template>
	<view>
		<!-- 以下是照片上载 -->
		<view class="a-px-3 a-py-2">
			<view class="a-flex a-align-center">
				<text class="a-font-lg a-font-weight-bold a-text-white">{{$t('user.uploadPhoto')}}</text>
			</view>
			<view class="a-flex a-flex-wrap a-justify-between a-align-center a-mt-2">
				<view v-for="(item,index) in arrayImages" :key="index" class="a-w-330 a-h-200 a-mb-2 a-position-relative">
					<view class="a-flex a-align-center a-justify-center a-w-330 a-h-200 a-position-relative a-rounded-1-5 a-overflow-hidden" >
						<image class="a-w-330 a-h-200 a-position-absolute" mode="aspectFill" :src="item"></image>
					</view>
					<view @click="deleteImages(index)" class="a-w-30 a-h-30 a-flex a-position-absolute" style="top:-5rpx;right:-5rpx;">
						<image class="a-w-30 a-h-30" src="/static/images/ico-delete.png"></image>
					</view>
				</view>
				<view v-if="markImages" @click="addImages" class="a-w-330 a-h-200 a-mb-2">
					<image class="a-w-330 a-h-200" src="/static/images/lo-upload-blue.png"></image>
				</view>
			</view>
		</view>
		<!-- 以下是视频上载 -->
		<!-- <view class="a-bg-blue-sea a-px-3 a-py-2 a-mt-2">
			<view class="a-flex a-align-center a-justify-center ">
				<text class="a-font-lg a-font-weight-bold a-text-white">{{$t('user.uploadVideo')}}</text>
			</view>
			<view class="a-flex a-flex-wrap a-justify-between a-align-center a-mt-2 ">
				<view v-for="(item,index) in arrayVideos" :key="index" class="a-w-330 a-h-200 a-mb-2 a-position-relative">
					<view class="a-flex a-align-center a-justify-center a-w-330 a-h-200 a-position-relative a-rounded-1-5 a-overflow-hidden" >
						<video class="a-w-330 a-h-200" :src="item"></video>
					</view>
					<view @click="deleteVideos(index)" class="a-w-30 a-h-30 a-flex a-position-absolute" style="top:-5rpx;right:-5rpx;">
						<image class="a-w-30 a-h-30" src="/static/images/ico-delete.png"></image>
					</view>
				</view>
				<view v-if="markVideos" @click="addVideos" class="a-w-330 a-h-200 a-mb-2">
					<image class="a-w-330 a-h-200" src="/static/images/lo-upload-blue.png"></image>
				</view>
			</view>
		</view> -->
		
		<view class="a-flex a-align-center a-justify-center a-py-3 a-px-5">
			<view @click="sumbit" class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-font-weight-bold a-text-brown">{{$t('button.determine')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import * as UploadApi from '@/api/upload'
	import Config from '@/core/config'
	import store from '@/store'
	const apiUrl = Config.get('apiUrl')
	export default {
		data() {
			return {
				arrayImages:[],
				markImages:true,
				arrayVideos:[],
				markVideos:true,
				form:{
					id:null,
					pics:[],
					videos:[]
				},
				uploadUrl: `${apiUrl}upload/video`,
			}
		},
		onLoad(options) {
			this.form.id = options.id
		},
		methods: {
			addImages(){
			    const number = 9 - this.arrayImages.length
			    uni.chooseImage({
			        count: number, 
			        mediaType:['image'],
			        sourceType:['album', 'camera'],
			        sizeType:['compressed'],
			        success: function (res) {
						var array  = res.tempFiles;
						var arrays = res.tempFilePaths
						this.uploadImg(array,arrays);
			        }.bind(this)
			    });
			},
			uploadImg(array,arrays){
				UploadApi.image(array).then(result => {
					  this.form.pics = this.form.pics.concat(result)
					  this.arrayImages = this.arrayImages.concat(arrays);
					  this.judgeLengthImages()
				  })
			},
			//删除图片
			deleteImages(index){
			    let new_array=[];
			    let new_arrays=[];
			    for(let i in this.arrayImages){
			        if(i!=index){
			            new_array.push(this.arrayImages[i]);
			        }
			    }
				for(let i in this.form.pics){
				    if(i!=index){
				        new_arrays.push(this.form.pics[i]);
				    }
				}
			    this.arrayImages=new_array
			    this.form.pics=new_arrays
			    this.judgeLengthImages()
			},
			//判断图片
			judgeLengthImages(){
			    if(this.arrayImages.length>=9){
			        this.markImages=false
			    }else{
			        this.markImages=true
			    }
			},
			addVideos(){
				var that = this
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: res => {
						uni.uploadFile({
							url: that.uploadUrl, 
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								'Access-Token' : store.getters.token,
								'platform' : store.getters.platform
							},
							success: result => {
								let data = JSON.parse(result.data);
								this.form.videos = this.form.videos.concat(data.data.fileInfo.file_id)
								this.arrayVideos = this.arrayVideos.concat(data.data.fileInfo.external_url);
								this.judgeLengthVideos()
							},
							complete: a => {
								// console.log(a);
							}
						});
					},
					fail: err => {
						uni.showToast({
							content: JSON.stringify(err),
							icon:"none"
						})
						
					}
				});
			},
			//判断图片
			judgeLengthVideos(){
			    if(this.arrayVideos.length>=9){
			        this.markVideos=false
			    }else{
			        this.markVideos=true
			    }
			},
			//删除视频
			deleteVideos(index){
			    let new_array=[];
			    let new_arrays=[];
			    for(let i in this.arrayVideos){
			        if(i!=index){
			            new_array.push(this.arrayVideos[i]);
			        }
			    }
			    for(let i in this.form.videos){
			        if(i!=index){
			            new_arrays.push(this.form.videos[i]);
			        }
			    }
			    this.arrayVideos=new_array
			    this.form.videos=new_arrays
			    this.judgeLengthImages()
			},
			
			sumbit(){
				const that = this
				// if (!this.form.pics.length && !this.form.videos.length) {
				// 	that.$toast(this.$t('toast.rVideoOrPictures'))
				// 	return false
				// }
				if (!this.form.pics.length) {
					that.$toast(this.$t('toast.rPictures'))
					return false
				}
				// if (!this.form.videos.length) {
				// 	that.$toast(this.$t('toast.rVideo'))
				// 	return false
				// }
				console.log(that.form)
				that.isLoading = true
				Api.taskUpload({id:this.form.id,form:this.form}).then(result => {
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
			},
		}
	}
</script>

<style lang="scss">
page {
	background-color: #F8F8F8;
}
</style>
