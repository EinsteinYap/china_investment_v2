<template>
	<view>
		<view class="a-flex-column a-align-center a-justify-center a-w-750 a-h-750">
			
			<image class="a-w-300 a-h-180" src="/static/logo.png"></image>
			
			<view @click="download" class="a-bg-brown-orange a-h-90 a-w-500 a-rounded-circle a-flex a-align-center a-justify-center " style="margin-top:100rpx;">
				<text class="a-font-lg a-text-brown a-font-weight-bold">{{$t('button.downloadApp')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				url:{}
			}
		},
		onLoad() {
			this.getDownload()
		},
		methods: {
			getDownload() {
			  const that = this
			  Api.appDownload().then(result =>{
				  that.url = result.data.downurl
			  })
			},
			download(){
				// #ifdef H5
				location.href = this.url
				// #endif 
				// #ifndef H5
				plus.runtime.openURL(this.url);  
				// #endif 
			}
		}
	}
</script>

<style>

</style>
