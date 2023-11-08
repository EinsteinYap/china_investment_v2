<template>
	<view>
		<view class="a-m-5">
			<mp-html class="a-font" :content="detail" />
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				detail:''
			}
		},
		onLoad() {
			this.getAritlce()
		},
		methods: {
			getAritlce() {
				const app = this
				Api.aritlce({type:'about_us'}).then(result => {
					this.detail = result.data.detail
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep uni-rich-text * {
		//font-size: 30rpx ;
		line-height: 50rpx ;
		//background-color: transparent;
		//color: #72BDFC;
	}
	
	
</style>
