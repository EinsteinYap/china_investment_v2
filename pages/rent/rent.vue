<template>
	<view class="rent-page">
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">
		
		<!-- <view class="a-mx-3">
			<view v-for="(item,index) in list.data" @click="$navTo('pages/rent/articleRent?id='+item.goods_id)" class="a-mt-3 a-bg-primary-lighter a-rounded-1-5">
				<view class="a-w-690 a-rounded-1-5 a-position-relative a-overflow-hidden">
					<view  class="a-w-690 a-h-400 a-rounded-1-5 a-rounded-1-5 a-flex a-align-center a-justify-center">
						<image class="a-w-750 a-rounded-1-5 a-position-absolute" mode="widthFix" :src="item.good_image"></image>
					</view>
				</view>
				<view class="a-p-3">
					<text class="a-text-ellipsis-1 a-font a-text-blue-rent  a-font-weight-bold">{{item.goods_name}}</text>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-rent-light a-font-sm">{{$t('pro.totalPrice')}}:</text>
						<text class="a-text-blue-rent-light a-font-sm">{{item.goods_price}} Rs</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-rent-light a-font-sm">{{$t('pro.circulation')}}:</text>
						<text class="a-text-blue-rent-light a-font-sm">{{item.total_day}} Days</text>
					</view>
					<view v-if="item.settle_model !=3" class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-rent-light a-font-sm">{{$t('pro.dailyIncome')}}:</text>
						<text class="a-text-blue-rent-light a-font-sm">{{item.daily_income}} Rs</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-rent-light a-font-sm">{{$t('pro.totalIncome')}}:</text>
						<text class="a-text-blue-rent-light a-font-sm">{{item.total_profit}} Rs</text>
					</view>
					<view v-if="item.expire_time" class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-rent-light a-font-sm">{{$t('pro.eventcountdown')}}:</text>
						<view class="a-flex a-justify-between a-align-center">
							<uni-countdown color="#FFFFFF" background-color="#571fb2" :show-day="false" :hour="$countdown(item.expire_time,'hour')" :minute="$countdown(item.expire_time,'minute')" :second="$countdown(item.expire_time,'second')"></uni-countdown>
							
					</view>
					<view class="a-flex a-justify-center a-mt-3">
						<view class="a-bg-brown-orange a-rounded-circle a-h-90 a-w-500 a-flex a-align-center a-justify-center">
							<text class="a-font-lg a-font-weight-bold a-text-brown">{{$t('button.rent')}}</text>
						</view>
					</view>
				</view>
				
			</view>
		</view> -->
		
		<view class="">
		
			<view class="a-flex a-justify-center a-flex-wrap a-rounded-2 a-mt-2">
				<view v-for="(item,index) in list.data" @click="$navTo('pages/rent/articleRent?id='+item.goods_id)" class="a-w-750 a-p-3 a-m-3 activity-card a-rounded-2  a-bg-primary-op-3 ">
					<text class="a-text-ellipsis-1 a-font-max a-font-weight-bold a-text-white a-mb-2">{{item.goods_name}}</text>
					<view class="a-flex a-align-center">
					<view class="a-rounded-2 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center a-flex-1 ">
						<view  class="a-w-250 a-h-180  a-flex a-align-center a-justify-center a-rounded-2 ">
							<image lass="a-rounded-2 a-w-250 a-h-180  a-position-absolute"  :src="item.good_image"></image>
						</view>
						<view v-if="item.subTitle" class="a-w-200 a-h-50 a-flex a-align-center a-justify-center a-bg-gold-yellow a-position-absolute a-top-0 a-rounded-bottom">
							<text class="a-font-sm a-text-brown a-mr-1">{{item.subTitle}}</text>
						</view>
					</view>
					<view class="a-flex-column a-p-2 a-flex-2">
						
						<view class="a-flex a-align-center a-justify-between">
						<text class="a-text-white a-font-sm">{{$t('pro.totalPrice')}}:</text>
						<text class="a-text-white a-font-sm">{{item.goods_price}} Rs</text>
						</view>
						<view class="a-flex a-align-center a-justify-between">
						<text class="a-text-white a-font-sm">{{$t('pro.circulation')}}:</text>
						<text class="a-text-white a-font-sm">{{item.total_day}} Days</text>
						</view>
						<view class="a-flex a-align-center a-justify-between">
						<text class="a-text-white a-font-sm">{{$t('pro.dailyIncome')}}:</text>
						<text class="a-text-white a-font-sm">{{item.daily_income}} Rs</text>
						</view>
						<view class="a-flex a-align-center a-justify-between">
						<text class="a-text-white a-font-sm">{{$t('pro.totalIncome')}}:</text>
						<text class="a-text-white a-font-sm">{{item.total_profit}} Rs</text>
						</view>
						<view class="a-flex a-align-center a-justify-between">
						<text class="a-text-white a-font-sm"></text>
						</view>
						<view v-if="item.expire_time" class="a-flex a-align-center a-justify-between a-mt-2">
							<text class="a-text-gray a-font-sm">{{$t('pro.eventcountdown')}}:</text>
							<view class="a-flex a-justify-between a-align-center">
								<uni-countdown color="#FFFFFF" background-color="#fd8008" :show-day="false" :hour="$countdown(item.expire_time,'hour')" :minute="$countdown(item.expire_time,'minute')" :second="$countdown(item.expire_time,'second')"></uni-countdown>
							</view>
						</view>
					</view>
				</view>
				</view>
			</view>
		</view>
		
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
	import { getEmptyPaginateObj, getMoreListData } from '@/core/app'
	import * as Api from '@/api/user'
	
	const pageSize = 15
	
	export default {
		components: {
		  MescrollBody,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				list: getEmptyPaginateObj(),
				limit:pageSize,
				// 上拉加载配置
				upOption: {
					// 首次自动执行
					auto: true,
					// 每页数据的数量; 默认10
					page: { size: pageSize },
					// 数量要大于4条才显示无更多数据
					noMoreSize: 4,
					// 空布局
					empty: { tip: '' }
				},
			}
		},
		onLoad() {
			
		},
		onShow() {
			// this.onRefreshList()
		},
		methods: {
			// 刷新订单列表
			onRefreshList() {
				this.list = getEmptyPaginateObj()
				setTimeout(() => {
					this.mescroll.resetUpScroll()
				}, 120)
			},
			
			/**
			* 上拉加载的回调 (页面初始化时也会执行一次)
			* 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10
			* @param {Object} page
			*/
			upCallback(page) {
				const app = this
				// 设置列表数据
				app.getList(page.num).then(list => {
					const curPageLen = list.data.length
					const totalSize = list.count
					app.mescroll.endBySize(curPageLen, totalSize)
				})
				.catch(() => app.mescroll.endErr())
			},
			downCallback(){
				this.onRefreshList()
			},
			
			// 获取订单列表
			getList(pageNo = 1) {
				const that = this
				return new Promise((resolve, reject) => {
					var data={
					    page:pageNo,
					    limit:that.limit,
					};
					Api.rentList(data).then(result =>{
						const newList = result.data
						newList.data = result.data.list
						that.list.data = getMoreListData(newList, that.list)
						uni.stopPullDownRefresh();
						resolve(newList)
					})
					
				})
			},
		}
	}
</script>

<style lang="scss">
.m-tabbar__icon {
	width: 48rpx;
	height: 48rpx;
	margin-bottom: 15rpx;
	position: relative;
}
.m-tabbar__icon_img {
	width: 48rpx;
	height: 48rpx;
}
.m-tabbar__label {
	font-size: 28rpx;
}

.rent-page{
	background-image: url('@/static/rent/business-rent.png');
	background-size:500rpx 500rpx;
	background-repeat: no-repeat !important;
	background-position: center;
	background-attachment: fixed;
}
</style>
