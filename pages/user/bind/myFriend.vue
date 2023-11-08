<template>
	<view>
		
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: false }" :up="upOption"
		@up="upCallback">
		  
		<view class="a-flex-column a-justify-center a-align-center a-px-5 a-w-690 a-mt-5 a-rounded-top-2 a-mx-3 a-h-230">
			<image class="a-w-690 a-h-230 a-position-absolute" src="/static/income/bg-income.png"></image>
			<text class="a-font a-font-weight-bold a-text-yellow-orange" style="z-index: 1;">{{$t('user.totalNumber')}}</text>
			<text class="a-font-max-four a-font-weight-bold a-mt-2 a-text-brown" style="z-index: 1;">{{num}}</text>
		</view>
		  
		<view v-if="list.data && list.data.length > 0"  class="a-m-3 a-py-3 a-bg-orange-yellow-lighter a-rounded-2 a-px-3">
			<view v-for="(item,index) in list.data" :key="index" class="a-flex a-align-center a-justify-between a-py-2">
				<view class="a-flex a-align-center">
					<view class="a-w-90 a-h-90 a-rounded-circle a-overflow-hidden a-mr-2">
						<image class="a-w-90 a-h-90 a-rounded-circle" :src="item.avatar_url?item.avatar_url:'/static/images/avatar.png'"></image>
					</view>
					<view class="">
						<view class="a-flex a-align-center">
							<text class="a-font-lg a-font-weight-bold">{{item.area_code}}-{{item.mobile}}</text>
							<view v-if="item.grade" class="a-px-2 a-h-40 a-flex a-align-center a-bg-orange a-rounded-circle a-ml-2">
								<text class="a-font-sm a-text-white">{{item.grade.name}}</text>
							</view>
						</view>
						<text class="a-font a-text-gray">{{item.add_time}}</text>
					</view>
				</view>
				<text class="a-font-max  a-text-orange ">{{item.pay_money}}RS</text>
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
	const pageSize = 1
	export default {
		components: {
		  MescrollBody,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				num:0,
				list:getEmptyPaginateObj(),
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
			this.getMyFriendNum()
		},
		methods: {
			getMyFriendNum(){
				Api.myFriendNum().then(result =>{
					this.num = result.data.num
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
					var id = app.list.data[index].user_id
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
					Api.myFriend(data).then(result =>{
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

<style>

</style>
