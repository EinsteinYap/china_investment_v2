<template>
	<view class="a-px-4">
		<view class="a-w-670 a-flex-column a-align-center a-justify-center a-py-5 a-bg-orange-yellow-lighter a-mt-4 a-rounded-2">
			<text class="a-font-max-three a-font-weight-bold">{{detail.usdt_num}} USDT</text>
			<text class="a-font a-mt-2 a-font-weight-bold">{{$t('user.paymentHint')}}</text>
			<text class="a-font a-text-yellow-orange a-mt-1 a-font-weight-bold">{{detail.usdt_num}} USDT{{detail.gift_money?' + '+detail.gift_money+' USDT':''}}</text>
			<view class="a-border-dotted a-border a-border-black a-p-1 a-mt-5">
				<image class="a-w-400 a-h-400" :src="qrcode"></image>
			</view>
			<text class="a-font a-text-yellow-orange a-font-weight-bold a-mt-3">{{$t('user.paymentTitle')}}</text>
			<view class="a-mt-3 a-mx-5 a-flex a-align-center">
				<text class="a-font a-text-gray a-flex-1 a-text-ellipsis-1">{{detail.address}}</text>
				<image @click="copy(detail.address)" class="a-w-40 a-h-40 a-ml-2" src="/static/images/ico-copy.png"></image>
			</view>
		</view>
		
		<view class="a-mx-4 a-mt-6">
			<mp-html  :content="article"></mp-html>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				detail:null,
				article:null,
				qrcode:''
			}
		},
		onLoad(options) {
			this.detail = options
			this.qrcode = uni.getStorageSync('qrcode')
			this.getAritlce()
		},
		methods: {
			copy(text){
				let that = this;
				uni.setClipboardData({ data: text });
				this.$toast(this.$t('toast.rSuccess'))
			},
			getAritlce() {
				const app = this
				Api.aritlce({type:'usdt_recharge'}).then(result => {
					this.article = result.data.detail
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep uni-rich-text{
		strong{
			color:#6EB6F6 !important;
			font-size: smaller;
		}
	}

</style>
