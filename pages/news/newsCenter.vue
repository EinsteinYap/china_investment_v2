<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">
		
		<view class="a-mx-3  a-mt-4 a-bg-white a-px-3 a-pt-3 a-rounded-2 ">
			<view v-for="(item,index) in list.data" :key="index" @click="$navTo('pages/news/articleNews?id='+item.article_id)" class="a-flex a-align-center a-pb-3 forms-border-bottom ">
				<view class="a-w-180 a-h-120 a-ml-2 a-rounded-1-5 a-position-relative a-overflow-hidden a-flex a-align-center a-justify-center ">
					<image class="a-h-120 a-rounded-1-5" mode="heightFix" :src="item.image_url"></image>
				</view>
				<view class="a-flex-column a-px-2 a-py-1 a-flex-1">
					<text class="a-text-ellipsis-1 a-font a-text-black  a-font-weight-bold">{{item.title}}</text>
					<text class="a-text-black a-font-sm a-mt a-text-ellipsis-2">{{item.synopsis}}</text>
					<text class="a-text-black a-mt-1 a-font-sm">{{item.add_time}}</text>
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
	
	const pageSize = 5
	
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
					Api.newsList(data).then(result =>{
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

<style scoped lang="scss">
	::v-deep uni-rich-text span{
				font-size:large;	
								}
</style>
