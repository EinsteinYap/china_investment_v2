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
				Api.aritlce({type:'user_reg_agreement'}).then(result => {
					this.detail = result.data.detail
				})
			},
		}
	}
</script>

<style>

</style>
