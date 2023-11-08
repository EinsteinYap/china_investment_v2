<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: false }" :up="upOption"
		@up="upCallback">
		
		<u-sticky bgColor="#fff">
		<u-tabs style="background:#FCC803 !important;"  class="a-h-90" :list="tabs" :is-scroll="false" :current="curTab" active-color="#000000" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		  
		
		<view class="a-mx-3 a-pb-3">
			<view v-for="(item,index) in list.data" :key="index" @click="$navTo('pages/task/articleTask?id='+item.task.id)" class="a-mt-4 a-position-relative">
				<view class="a-w-690 a-h-230 a-position-absolute a-bg-blue-sea a-rounded-2" ></view>
				<view class="a-w-690 a-h-230 a-flex-column a-justify-between a-position-relative a-py-2 a-px-3" style="z-index:1">
					<!-- <view class="a-flex a-align-center a-justify-between a-h-80">
						<text class="a-font-lg a-font-weight-bold a-text-white">{{item.award_money}} Rs</text>
						
						<view >
							<text class="a-font a-text-brown-light">{{item.status_desc}}</text>
						</view>
					</view> -->
					<text  class="a-font a-text-white a-mt-1">{{item.task?item.task.title:''}}</text>
					<view class="a-flex a-justify-between a-align-center">
						<text class="a-font-lg a-font-weight-bold a-text-white">{{item.award_money}} Rs</text>
						<view class="a-flex a-align-center">
							<text class="a-font a-text-white a-mr-2">{{item.add_time}}</text>
							<view v-if="item.audit_status == 0 && curTab==0" @click.stop="$navTo('pages/user/bind/uploadTask?id='+item.id)" class="a-bg-brown-orange a-py a-px-2 a-rounded-circle">
								<text class="a-text-brown a-font a-font-weight-bold">{{$t('button.submit')}}</text>
							</view>
							<text v-else class="a-font a-text-gold">{{item.status_desc}}</text>
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
				// tab栏数据
				tabs:[{
				  name: this.$t('user.inProgress'),
				  value: 'progress'
				}, {
				  name: this.$t('user.inReview'),
				  value: 'review'
				}, {
				  name: this.$t('user.completed'),
				  value: 'completed'
				}],
				// 当前标签索引
				curTab: 0,
				
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
			this.onRefreshList()
		},
		methods: {
			onChangeTab(index) {
				const app = this
				// 设置当前选中的标签
				app.curTab = index
				console.log(index)
				this.onRefreshList()
			},
			// 获取当前标签项的值
			getTabValue() {
			  const app = this
			  return app.tabs.length ? app.tabs[app.curTab].value : 'all'
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
					var id = app.list.data[index].log_id
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
						next_id:id,
						dataType:that.getTabValue()
					};
					Api.myTasks(data).then(result =>{
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
page{
	background-color: #F8F8F8;
}
</style>
