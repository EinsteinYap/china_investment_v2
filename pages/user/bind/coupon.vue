<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: false }" :up="upOption"
		@up="upCallback">
		
		<u-sticky v-if="!isSelect" bgColor="#FFFFFF">
		<u-tabs style="background:#FCC803 !important;" :list="tabs" :is-scroll="false" :current="curTab" active-color="#000000" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		  
		
		<view class="a-mx-3 a-pb-3">
			<view v-for="(item,index) in list.data" :key="index" @click="select(index)" class="a-mt-2 a-position-relative">
				<image class="a-w-690 a-h-200 a-position-absolute" src="/static/images/bg-coupon.png"></image>
				<view class="a-w-690 a-h-200 a-flex a-align-center a-justify-between a-position-relative" :class="curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-yellow-orange':''" style="z-index:1">
					<view class="a-w-230 a-h-180 a-flex-column a-algin-center a-justify-center a-algin-center" >
						<view class="a-flex a-align-end a-justify-center">
							<text class="a-font-lg a-font-weight-bold a-mb-1" :class="curTab==0?'a-text-blue-sea':curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-yellow-orange':''">₹</text>
							<text class="a-font-max-five a-font-weight-bold" :class="curTab==0?'a-text-blue-sea':curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-yellow-orange':''">{{item.reduce_price}}</text>
						</view>
						<text class="a-font a-text-center" :class="curTab==0?'a-text-blue-sea':curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-yellow-orange':''">{{$t('user.coupon')}}</text>
					</view>
					<view class="a-flex-1 a-h-180 a-flex-column  a-justify-center a-pl-5">
						<text class="a-font-lg a-font-weight-bold" :class="curTab==0?'a-text-blue-sea':curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-purple-blue':''">{{item.name}}</text>
						<text class="a-font  a-mt-1" :class="curTab==0?'a-text-blue-sea':curTab==1?'a-text-blue-sea-light':curTab==2?'a-text-purple-blue':''">{{$t('user.date')}}:{{item.expire_time}}</text>
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
				isSelect:false,
				// tab栏数据
				tabs:[{
				  name: this.$t('user.available'),
				  value: 'isUsable'
				}, {
				  name: this.$t('user.expired'),
				  value: 'isExpire'
				}, {
				  name: this.$t('user.used'),
				  value: 'isUse'
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
		onLoad(options) {
			if(options.isSelect){
				this.isSelect = options.isSelect
			}
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
					var id = app.list.data[index].user_coupon_id
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
					Api.couponList(data).then(result =>{
						const newList = result.data
						newList.data = result.data.list
						that.list.data = getMoreListData(newList, that.list)
						resolve(newList)
					})
					
					
				})
			},
			select(index){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				//let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.form.user_coupon_id= this.list.data[index].user_coupon_id;   //修改上一页data里面的sercode参数值
				prevPage.$vm.couponInfo = this.list.data[index];   //修改上一页data里面的sercode参数值
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
