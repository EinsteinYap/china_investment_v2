<template>
	<view>
		<view class="a-m-5">
				<view class="a-mt-2">
					<text class="a-font a-text-gold a-font-weight-bold a-mt-1">{{article.title}}</text>
				</view>
				<view class="a-mt-2">
					<text class="a-font a-text-white a-font-weight">{{article.add_time}}</text>
				</view>
				<mp-html class="" :content="article.content" />
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				article:{}
			}
		},
		onLoad(options) {
			this.getAritlce(options.id)
		},
		methods: {
			getAritlce(id) {
				const app = this
				Api.newsAritlce({articleId:id}).then(result => {
					this.article = result.data.detail
					uni.setNavigationBarTitle({
						title: result.data.detail.title
					});
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep uni-rich-text * {
		//font-size: 30rpx ;
		// line-height: 50rpx ;
		// background-color: transparent;
		//color: #72BDFC;
	}
	
</style>
