<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: false }" :up="upOption"
		@up="upCallback">
		
		<view class="a-flex-column a-justify-center a-align-center a-px-5 a-w-690 a-mt-5 a-mb-4 a-rounded-top-2 a-mx-3 a-h-230">
			<image class="a-w-690 a-h-230 a-position-absolute" src="/static/background/bg-recordRecharge.png"></image>
			<view class="a-flex-column a-justify-center a-align-center a-px-5" style="z-index:1">
				<text class="a-font a-text-yellow-orange a-font-weight-bold">{{$t('user.totalWithdraw')}}</text>
				<text class="a-font-max-two a-text-brown a-font-weight-bold a-mt-1">{{total}} Rs</text>
			</view>
		</view>
		<!-- <view class="a-flex-column a-justify-center a-align-center a-px-5 a-w-690 a-mt-5 a-rounded-2  a-mx-3 a-h-850 a-bg-orange-yellow-lighter"> -->
		<view class="a-mx-3 a-pb-3  ">
			<view v-for="(item,index) in list.data" :key="index" class="a-bg-orange-yellow-lighter cards-first-last-border-radius forms-border-bottom  a-px-3 a-py-3 ">
				<view class="a-flex a-align-center a-justify-between ">
					<text class="a-font a-text-brown-light">{{item.pay_name}}</text>
					<view class="a-flex a-align-end">
						<text class="a-font-lg a-text-orange">{{item.money}}</text>
						<text class="a-font a-text-orange a-ml">Rs</text>
					</view>
				</view>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-font-sm a-text-gray">{{item.add_time}}</text>
					<text class="a-font-sm a-text-brown-light">{{item.apply_status_label}}</text>
				</view>
			</view>
		</view>
		

		<!-- </view> -->
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
	import { getEmptyPaginateObj, getMoreListData } from '@/core/app'
	import * as Api from '@/api/user'
	const pageSize = 1
	export default {
		components: {
		  MescrollBody,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				total:0,
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
					empty: { tip: 'No Record',
							 icon:'../../../static/ic_norecord.png'}
				},
			}
		},
		onLoad() {
			this.getRechargeTotal()
		},
		methods: {
			getRechargeTotal(){
				Api.withdrawTotal().then(result =>{
					this.total = result.data.amount
				})
			},
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
					var id = app.list.data[index].id
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
			
			// 获取订单列表
			getList(id) {
				const that = this
				return new Promise((resolve, reject) => {
					var data={
						next_id:id
					};
					Api.withdrawRecord(data).then(result =>{
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

<style scoped>
::v-deep .mescroll-empty{
	background-color: #FFF6EC !important;
	border-radius: 20rpx;
	width: 92%;
	margin: 0rpx 4%;
}
</style>
