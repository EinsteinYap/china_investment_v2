<template>
	<view>
		<view class="a-flex-column a-align-center a-justify-center a-w-750 a-h-750">
			
			
			<text class="a-w-600 a-text-blue-sea-light a-font-lg a-line-height-60">{{ms}}</text>
			
			<view @click="servicetg" class="a-bg-brown-orange  a-h-90 a-w-500 a-rounded-circle a-flex a-align-center a-justify-center " style="margin-top:100rpx;">
				<text class="a-font-lg a-text-brown a-font-weight-bold">Complain immediately</text>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				url:{},
				ms:""
			}
		},
		onLoad() {
			this.getservicetg()
		},
		methods: {
			getservicetg() {
			  const that = this
			  Api.servicetg().then(result =>{
				  that.url = result.data.servicetg.url
				  that.ms = result.data.servicetg.ms
				  console.log(this.ms)
			  })
			},
			servicetg(){
				// #ifdef H5
				window.open(this.url, '_blank')
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
