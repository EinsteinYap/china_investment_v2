<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: false }" :up="upOption"
		@up="upCallback">
		<view class="a-mx-3 a-mt-4">
			<view v-for="(item,index) in list.data" :key="index" @click="select(index)"  class="a-rounded-1-5 a-p-4 a-mb-4 a-bg-gradual-blue-light-primary-LR a-border-3 a-boder-blue-sea">
				<view class="a-flex a-align-center a-justify-between">
					<view class="a-flex a-align-center">
						<image class="a-w-40 a-h-40 a-mr-2" :src="item.cateid==1?'/static/images/ico-usdt.png':'/static/images/ico-card.png'"></image>
						<text class="a-font a-text-white a-font-weight-bold">{{item.cateid==1?'Usdt':$t('user.bankCard')}}</text>
					</view>
					<view @click.stop="$navTo('pages/user/account/form?type=2&cateid='+item.cateid+'&id='+item.id)" class="a-py a-px-3 a-bg-orange a-rounded-circle">
						<text class="a-font a-text-brown-darker">{{$t('user.edit')}}</text>
					</view>
				</view>
				<view class="a-flex-column">
					<text class="a-font-max a-text-white a-mt-2">{{item.cateid==2?item.user_name:item.address_cateid==1?'TRC20':'ETH'}}</text>
					<text class="a-font-max a-text-white a-mt-2">{{item.cateid==1?item.address:item.bank_card_number}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="a-w-750 a-h-150"></view>
		<view class="a-flex a-w-750 a-h-150 a-align-center a-px-5 a-justify-center a-position-fixed a-top-60 a-mt-10">
			<view @click="openShowPopup" class="a-border a-border-orange-yellow a-h-90 a-w-500 a-rounded-circle a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-text-brown-orange">{{$t('button.addNewAccount')}}</text>
			</view>
		</view>
		
		</mescroll-body>
		
		<u-popup v-model="showPopup" mode="bottom"  :border-radius="26">
			<view class="">
				<view class="a-mx-3 a-py-3">
					<text class="a-font-lg a-font-weight-bold">{{$t('user.selectWithdrawal')}}</text>
				</view>
				<view class="a-mx-3" >
					<view @click="$navTo('pages/user/account/form?cateid=2&type=1')" class="a-flex a-align-center a-justify-between a-px-3 a-py-3 a-bg-orange-yellow a-rounded-1-5 a-mb-2" >
						<view class="a-flex a-align-center">
							<image class="a-w-80 a-h-80" src="/static/images/ico-card.png"></image>
							<text class="a-font a-ml-2 a-font-weight-bold">{{$t('user.bankCard')}}</text>
						</view>
					</view>
					<view @click="$navTo('pages/user/account/form?cateid=1&type=1')" class="a-flex a-align-center a-justify-between a-px-3 a-py-3 a-bg-orange-yellow a-rounded-1-5 a-mb-2" >
						<view class="a-flex a-align-center">
							<image class="a-w-80 a-h-80" src="/static/images/ico-usdt.png"></image>
							<text class="a-font a-ml-2 a-font-weight-bold">{{$t('user.add')}} USDT</text>
						</view>
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
				isSelect:false,
				showPopup:false,
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
					empty: { tip: '',
							 icon:"../../../static/ic_norcard.png"
							 }
				},
			}
		},
		onLoad(options) {
			if(options.isSelect){
				this.isSelect = options.isSelect
			}
		},
		onShow() {
			this.onRefreshList()
		},
		methods: {
			openShowPopup() {
				this.showPopup = true
			},
			closeShowPopup() {
				this.showPopup = false
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
					Api.account(data).then(result =>{
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
				prevPage.$vm.form.user_payment_id= this.list.data[index].id;   //修改上一页data里面的sercode参数值
				prevPage.$vm.paymentInfo = this.list.data[index];   //修改上一页data里面的sercode参数值
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
