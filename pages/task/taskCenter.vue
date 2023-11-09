<template>
	<view class="task-page">
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback"  @down="downCallback">
		<view class=" a-flex a-justify-center">
		<view class="a-mx-3  a-mt-2">
			<view v-for="(item,index) in list.data" :key="index" @click="$navTo('pages/task/articleTask?id='+item.id)" class="a-w-690 a-h-250 a-bg-primary-op-3 a-position-relative a-mr-3 a-mt-3 a-rounded-2">
				<!-- <image class="a-w-690 a-h-250 a-position-absolute a-top-0" src="/static/home/bg-task-1.png"></image> -->
				<view class="a-w-690 a-h-250 a-p-3 a-flex-column a-justify-between a-position-relative" style="z-index:1">
					<text class="a-text-white a-font-lg a-font-weight-bold a-text-ellipsis-1">{{item.title}}</text>
					<text class="a-text-white a-font a-text-ellipsis-2">{{item.synopsis}}</text>
					<view class="a-flex a-align-center a-justify-between">
						<text class="a-font-max-three a-text-white a-font-weight-bold ">{{item.award_money}} Rs</text>
						<text class="a-font-sm a-text-white">{{item.end_time_label}}</text>
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
	
	const pageSize = 1
	
	export default {
		components: {
		  MescrollBody,
		},
		mixins: [MescrollMixin],
		data() {
			return {
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
			downCallback(){
				this.onRefreshList()
			},
			// 获取订单列表
			getList(id) {
				const that = this
				return new Promise((resolve, reject) => {
					var data={
						next_id:id
					};
					Api.taskList(data).then(result =>{
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
.task-page{
	background-image: url('@/static/task/task.png');
	background-size:500rpx 500rpx;
	background-repeat: no-repeat !important;
	background-position: center;
	background-attachment: fixed;
}
</style>
