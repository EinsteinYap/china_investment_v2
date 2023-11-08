<template>
	<!-- 状态栏 -->
	<view class="status"></view>
</template>

<script>
</script>

<style lang="scss">
	.status {
		width: 100%;
		position: fixed;
		z-index: 10;
		background-color: transparent;
		top: 100rpx;
		height: 100rpx;
		height: var(--status-bar-height) !important;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height) !important; //覆盖样式
		/*  #endif  */
	}
</style>
