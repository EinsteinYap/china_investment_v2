<template>
	<view>
		<view class="a-mx-3 a-flex-column a-justify-center a-align-center a-rounded-2">
			<view @click="$navTo('pages/home/articleActivities?id='+item.id)" class="a-mt-3 a-bg-primary-lighter a-rounded-2">
				<view class="a-w-690 a-h-950 a-rounded-2  a-position-relative a-overflow-hidden a-bg-orange-yellow-lighter ">
					<view  class="a-w-690 a-h-420  a-flex a-align-center a-justify-center">
						<image class="a-w-690 " src="/static/temporary/pro-rent.png"></image>
					</view>
					<view  class="a-w-200 a-h-50 a-flex a-align-center a-justify-center a-bg-orange-gold a-position-absolute a-left-0 a-top-0 a-rounded-top-left-2 a-rounded-circle-bottom-right">
						<text class="a-font-sm a-text-brown a-mr-1">Buy 2 get 1 free</text>
					</view>
					<view class="a-p-3  a-rounded-2" style="">
						<text class="a-text-ellipsis-1 a-font a-text-primary">7-Eleven store 10SM</text>
						<view class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-flex-1 a-font-sm a-text-blue-sea-light">Price: £ 300</text>
							
						</view>
						<view class="a-flex a-align-center a-justify-center a-mt-2">
								<view class="a-flex-column a-align-center a-justify-between ">
									<text class="a-text-blue-sea-light a-font-sm">{{$t('pages.home.distanceEnd')}}</text>
									<view class="a-flex a-justify-between a-align-center">
										<uni-countdown :font-size="24" color="#FFD707" background-color="#191EB3" :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown>
									</view>
								</view>
						</view>
						<view class="a-flex a-justify-center a-mt-3">
							<view @click="" class="a-bg-gradual-purple-LR a-rounded-circle a-h-90 a-w-500 a-flex a-align-center a-justify-center">
								<text class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">{{$t('pages.home.cutPrice')}}</text>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			
			
			<view class="a-p-3 a-bg-orange-yellow-lighter a-rounded-2 a-my-3 a-w-690 ">
				<view v-for="(item,index) in 4" :key="index" class="forms-border-bottom
				 a-flex a-align-center a-justify-between a-py-2 a-border-bottom a-border-lighter">
					<view class="a-flex a-align-center">
						<view class="a-w-90 a-h-90 a-rounded-circle a-overflow-hidden a-mr-2">
							<image class="a-w-90 a-h-90 a-rounded-circle" :src="item.avatar_url?item.avatar_url:'/static/images/avatar.png'"></image>
						</view>
						<text class="a-font a-font-weight-bold">FriendName</text>
						<text class="a-font a-font-weight-bold a-ml-2 a-text-gold">-£ 100</text>
					</view>
					<text class="a-font a-text-gray">26 Oct 2023</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
