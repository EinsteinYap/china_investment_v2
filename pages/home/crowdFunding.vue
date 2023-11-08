<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">
		
		<u-sticky bgColor="#fff">
		<u-tabs style="background:#FCC803 !important;" :list="tabs" :is-scroll="false" :current="curTab" active-color="rgb(100, 38, 16)" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		
		<view class="a-mx-3">
			<view v-for="(item,index)  in list.data" :key="index" @click="$navTo('pages/home/articleFunding?id='+item.id)" class="a-mt-3 a-bg-orange-yellow-lighter a-rounded-2 a-h-970 a-w-690 a-flex-column a-align-center a-justify-center">
				<view class="a-w-690 a-h-430 a-rounded-top-2 a-position-relative a-overflow-hidden">
					<view  class="a-w-690 a-h-430   a-flex a-align-center a-justify-center">
						<image class="a-w-750  a-position-absolute" mode="widthFix" :src="item.image_url"></image>
					</view>
				</view>
				<view class="a-flex-column a-mx-3 a-mt-5 a-w-600 a-justify-center">
					<text class=" a-font a-text-primary">{{item.title}}</text>
					<text class=" a-font-max a-text-orange a-mt-2">{{item.amount}} Rs</text>
					<!-- <view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-gray a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
						<text class="a-text-gray a-font-sm">{{item.limit_num}}</text>
					</view> -->
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-sea-light a-font-sm">{{$t('pro.projectBenefits')}}:</text>
						<text class="a-text-blue-sea-light a-font-sm">{{item.profit_rate}}%</text>
					</view>
					<view class="a-flex-1 a-mt-2">
						<PROGRESS isAnimate duration="1000" :percentage="item.rate" strokeWidth="5" bgColor="#FFA200" inBgColor="#0B13B5" fontColor="#0B13B5"></PROGRESS>
					</view>
					<view class="a-flex a-justify-center a-mx-auto a-my-3 a-w-500">
						<view class="a-bg-brown-orange a-h-90 a-flex-1 a-rounded-circle a-flex a-align-center a-justify-center">
							<text class="a-font-lg a-text-brown a-font-weight-bold">{{$t('button.purchase')}}</text>
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
	import { getEmptyPaginateObj, getMoreListData,checkLogin,promptLogin } from '@/core/app'
	import * as Api from '@/api/user'
	import PROGRESS from '@/components/ai-progress/ai-progress'
	import POPUP from '@/components/popup/popup'
	const pageSize = 1
	
	export default {
		components: {
		  MescrollBody,
		  PROGRESS,
		  POPUP
		},
		mixins: [MescrollMixin],
		data() {
			return {
				isLogin:false,
				// tab栏数据
				tabs:[{
				  name: this.$t('user.inProgress'),
				  value: '0'
				}, {
				  name: this.$t('user.success'),
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
			// 切换标签项
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
						next_id:id,
						is_complete:that.getTabValue()
					};
					Api.fundingList(data).then(result =>{
						const newList = result.data
						newList.data = result.data
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
