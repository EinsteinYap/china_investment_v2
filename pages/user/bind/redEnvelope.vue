<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true }" :up="upOption"
		@up="upCallback">
		
		<u-sticky bgColor="#fff">
		<u-tabs :list="tabs" :is-scroll="false" :current="curTab" active-color="#571fb2" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		  
		  
		<view v-if="curTab ==0" class="a-mx-3 a-pb-3">
		  <view v-for="(item,index) in list.data" :key="index" class="a-flex a-align-center a-justify-between a-rounded-1-5 a-bg-gradual-red-LR a-p-2 a-mt-2">
			  <view class="a-flex a-flex-1 a-align-center">
				  <view class="a-w-120 a-h-120 a-rounded-1-5 a-overflow-hidden a-mr-2">
					  <image class="a-w-120 a-h-120 a-rounded-1-5" src="/static/images/lo-redEnvelop.png"></image>
				  </view>
				  <view class="a-flex-1 a-flex-column">
					  <text class="a-font-lg a-text-yellow">{{$t('user.openRedEnvelope')}}</text>
					  <text class="a-font-sm a-text-yellow">{{item.time_label}}</text>
				  </view>
			  </view>
			  <view @click="openRed(item.order_no)" class="a-bg-gradual-yellow-LR a-right-0 a-py-1 a-px-3 a-rounded-circle a-ml-2">
				  <text class="a-text-red">{{$t('button.OPEN')}}</text>
			  </view>
		  </view>
		</view>
		
		<view v-else class="a-mx-3 a-pb-3">
			<view v-for="(item,index) in list.data" :key="index" class="a-bg-orange-light a-rounded-1-5 a-mt-2 a-px-3 a-py-3">
				<view class="a-flex a-align-center a-justify-between">
					<text class="a-font a-text-brown-light">{{$t('user.redEnvelope')}}</text>
					<view class="a-flex a-align-end">
						<text class="a-font-lg a-text-red">{{item.amount}}</text>
						<text class="a-font a-text-red a-ml">Rs</text>
					</view>
				</view>
				<view class="a-flex a-align-center a-justify-between a-mt-2">
					<text class="a-font-sm a-text-gray">{{item.add_time}}</text>
				</view>
			</view>
		</view>
		
		</mescroll-body>
		<u-popup v-model="showPopup" mode="center" :closeable="true" :border-radius="26">
			<view class="a-w-600 a-rounded-1-5 a-p-5">
				<view class="a-w-500 a-h-400 a-position-relative a-mb-3">
					<image class="a-w-500 a-h-400 a-position-absolute" src="/static/images/lo-redEnvelope.png"></image>
					<view class="a-flex a-align-end a-justify-center a-position-relative a-pt-5" style="z-index:1">
						<text class="a-font-lg a-text-red a-font-weight-bold a-mb-1">₹</text>
						<text class="a-font-max-five a-text-red a-font-weight-bold">{{amount}}</text>
					</view>
				</view>
				<view class="a-flex a-align-center a-justify-center a-pb-3">
				  <view @click="closeShowPopup" class="a-bg-yellow a-h-90 a-w-480 a-rounded-circle a-flex a-align-center a-justify-center">
					  <text class="a-font-lg a-text-brown">{{$t('button.determine')}}</text>
				  </view>
				</view>
			</view>
		</u-popup>
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
					name: this.$t('user.redEnvelope'),
					value: '0'
				}, {
					name: this.$t('user.record'),
					value: '1'
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
				
				amount:null,
				showPopup:false,
			}
		},
		methods: {
			openShowPopup() {
				this.showPopup = true
			},
			closeShowPopup() {
				this.showPopup = false
			},
			// 切换标签项
			onChangeTab(index) {
				const app = this
				// 设置当前选中的标签
				app.curTab = index
				
				this.onRefreshList()
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
					if(that.curTab == 0){
						Api.redList(data).then(result =>{
							const newList = result.data
							newList.data = result.data.list
							that.list.data = getMoreListData(newList, that.list)
							resolve(newList)
						})
					}else{
						Api.redRecordList(data).then(result =>{
							const newList = result.data
							newList.data = result.data.list
							that.list.data = getMoreListData(newList, that.list)
							resolve(newList)
						})
					}
					
					
				})
			},
			openRed(order_no){
				const that = this
				var params = {
					order_no:order_no
				}
				Api.redReceive({form:params}).then(result =>{
					if(result.status =='200'){
						that.amount = result.data.amount
						that.openShowPopup()
						that.onRefreshList()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F8F8F8;
}
</style>
