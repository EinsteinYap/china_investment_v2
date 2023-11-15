<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">

		<view class="a-mx-3">
			<view v-for="(item,index) in list.data" class="a-mt-3 a-bg-primary-op-3 a-rounded-2">
				<view class="a-w-690 a-rounded-top-2 a-position-relative a-overflow-hidden">
					<view  class="a-w-690 a-h-430 a-rounded-top-2 a-flex a-align-center a-justify-center">
						<image class="a-w-750 a-rounded-top-2 a-position-absolute" mode="widthFix" :src="item.crowFunding.image_url"></image>
					</view>
				</view>
				<view class="a-bg-orange a-flex a-align-center a-justify-center a-h-100">
					<text v-if="item.crowFunding.is_complete" class="a-text-brown a-font-lg a-font-weight-bold">{{$t('user.completed')}}</text>
					<text v-else class="a-text-brown a-font-lg a-font-weight-bold">{{$t('user.inProgress')}}</text>
				</view>
				<view class="a-flex-column a-mx-3 a-mt-5 a-w-600 a-justify-center">
					<text class=" a-font a-text-white">{{item.crowFunding.title}}</text>
					<text class=" a-font-max a-text-orange a-mt-2">{{item.crowFunding.amount}} Rs</text>
					<!-- <view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-gray a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
						<text class="a-text-gray a-font-sm">{{item.limit_num}}</text>
					</view> -->
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-white a-font-sm">{{$t('pro.projectBenefits')}}:</text>
						<text class="a-text-white a-font-sm">{{item.crowFunding.profit_rate}}%</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-white a-font-sm">{{$t('pro.leastInvest')}}:</text>
						<text class="a-text-white a-font-sm">{{item.crowFunding.min_buy_amount}}Rs</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-white a-font-sm">{{$t('pro.returnDays')}}:</text>
						<text class="a-text-white a-font-sm">{{item.crowFunding.total_day}}</text>
					</view>
					<view class="a-flex-1 a-mt-2">
						<PROGRESS isAnimate duration="1000" :percentage="item.crowFunding.rate" strokeWidth="5" bgColor="#FFA200" inBgColor="#FFF" fontColor="#FFF"></PROGRESS>
					</view>
					<view class="a-flex a-align-center  a-mt-2 a-mb-5">
						<text class="a-text-white a-font-sm">{{$t('pages.crowdFunding')}}:</text>
						<text class="a-font-max a-text-orange a-ml-2">{{item.order_price}}Rs</text>
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
	import { getEmptyPaginateObj, getMoreListData,checkLogin,promptLogin } from '@/core/app'
	import * as Api from '@/api/user'
	import PROGRESS from '@/components/ai-progress/ai-progress'
	const pageSize = 1
	
	export default {
		components: {
		  MescrollBody,
		  PROGRESS
		},
		mixins: [MescrollMixin],
		data() {
			return {
				isLogin:false,
				list: getEmptyPaginateObj(),
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
		onShow() {
			this.isLogin = checkLogin()
			
			// if(!this.isLogin){
			// 	promptLogin(this.$t('toast.reminder'),this.$t('toast.rLogin'),this.$t('toast.login'),this.$t('toast.cancel'))
			// }
			
			this.onRefreshList()
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
				var count = app.list.data.length
				if(count){
					var index = count-1
					var id = app.list.data[index].order_id
				}else{
					var id = null
				}
				// 设置列表数据
				app.getList(id).then(list => {
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
			getList(id) {
				const that = this
				return new Promise((resolve, reject) => {
					var data={
						next_id:id,
					};
					Api.myFunding(data).then(result =>{
						const newList = result.data
						newList.data = result.data.list
						that.list.data = getMoreListData(newList, that.list)
						resolve(newList)
					})
					
				})
			},
		}
	}
</script>

<style lang="scss">
</style>
