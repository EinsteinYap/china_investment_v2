<template>
	<view class="a-full-fixed">
		<web-view class="a-full-fixed" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:null,
				title:'',
			}
		},
		onLoad(options) {
			console.log(options)
			this.url=options.url
			this.title=options.title
			uni.setNavigationBarTitle({
				title: options.title
			});
		},
		methods: {
		}
	}
</script>

<style>

</style>
