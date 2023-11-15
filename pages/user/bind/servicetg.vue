<template>
	<view>
		<view class="a-flex-column a-align-center a-justify-center a-w-750 a-h-750">
			
			
			<text class="a-w-600 a-text-blue-sea-light a-font-lg a-line-height-60">{{ms}}</text>
			
			<view @click="servicetg" class="glass-container  a-h-90 a-w-500 a-rounded-circle a-flex a-align-center a-justify-center " style="margin-top:100rpx;">
				<view class="btn" style="--clr:#ff0000;"><a href="#"><text class="a-font-lg glass-button a-font-weight-bold">Complain immediately</text></a></view>
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
				setTimeout(() => {
					window.open(this.url, '_blank')
				}, 1000)
				
				// #endif 
				// #ifndef H5
				
				 setTimeout(() => {
				 	plus.runtime.openURL(this.url); 
				 }, 1000)
				// #endif 
			}
		}
	}
</script>

<style>

</style>
