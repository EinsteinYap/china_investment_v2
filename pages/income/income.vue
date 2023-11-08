<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">
		
		<view class="a-flex a-align-center a-justify-start  a-w-690 a-h-100 a-mt-2 a-rounded-1-5 a-overflow-hidden">
	<!-- 		<image class="a-w-690 a-h-230 a-position-absolute" src="/static/income/bg-income.png"></image> -->
			<view class="a-px-5" style="z-index:1">
				<text class="a-font a-font-weight-bold a-font-max a-text-white">{{$t('user.totalInvestment')}}</text>
				<text class="a-font-max-four a-font-weight-bold a-mt-2 a-text-gold a-ml-2">{{balance}} Rs</text>
			</view>
		</view>
		
		<view class="a-mx-3 a-mb-5 a-rounded-2">
			<view v-for="(item,index) in list.data" @click="$navTo('pages/user/bind/myBill')" class="a-mt-3 a-bg-primary-lighter a-rounded-2 a-border a-border-primary">
				<!-- <view class="a-flex-1 a-rounded-2 a-position-relative a-overflow-hidden">
					<view class="a-w-690 a-h-420   a-flex a-align-center a-justify-center">
						<image class="a-w-690  a-position-absolute" mode="widthFix" :src="item.order_goods?item.order_goods.goods_image:''"></image>
					</view>
				</view> -->
				<view class="a-p-3">
					<text class="a-text-ellipsis-1 a-font-max a-text-black a-font-weight-bold">{{item.goods_name}}</text>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-black a-font-sm">{{$t('pro.investmentAmount')}}:</text>
						<text class="a-text-black a-font-sm">{{item.total_price}} Rs</text>
					</view>
					
					<view v-if="item.order_goods.settle_model != 3" class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-black a-font-sm">{{$t('pro.income')}}:</text>
						<text class="a-text-black a-font-sm">{{item.total_profit}} Rs</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-black a-font-sm">{{$t('pro.purchaseTime')}}:</text>
						<text class="a-text-black a-font-sm">{{item.buy_day}}</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-black a-font-sm">{{$t('pro.endTime')}}:</text>
						<text class="a-text-black a-font-sm">{{item.end_day}}</text>
					</view>
					<view v-if="item.countdown" class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-black a-font-sm">{{$t('pro.nextSettlement')}}:</text>
						<view class="a-flex a-justify-between a-align-center">
							<uni-countdown v-if="item.countdown" color="#FFFFFF" background-color="#fd8008" :show-day="false" :hour="$countdown(item.countdown,'hour')" :minute="$countdown(item.countdown,'minute')" :second="$countdown(item.countdown,'second')"></uni-countdown>
							<!-- <uni-countdown v-if="!item.countdown" color="#FFFFFF" background-color="#555555" :show-day="false" :hour="0" :minute="0" :second="0"></uni-countdown> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		</mescroll-body>
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
	import { getEmptyPaginateObj, getMoreListData,checkLogin,promptLogin } from '@/core/app'
	import POPUP from '@/components/popup/popup'
	import * as Api from '@/api/user'
	
	const pageSize = 1
	
	export default {
		components: {
		  MescrollBody,
		  POPUP
		},
		mixins: [MescrollMixin],
		data() {
			return {
				balance:0,
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
				popup:{
					isShow:false,
					title:'',
					content:'',
					ok:'',
					cancel:'',
					isLogin:false,
					isOperation:false,
					item:null
				}
			}
		},
		onShow() {
			
			this.isLogin = checkLogin()
			
			if(!this.isLogin){
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rLogin'),
				this.popup.ok=this.$t('toast.login'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=true,
				this.popup.isOperation=false,
				this.popup.isShow=true
				this.popup.item=null
				// promptLogin(this.$t('toast.reminder'),this.$t('toast.rLogin'),this.$t('toast.login'),this.$t('toast.cancel'))
				return
			}
			
			this.getUserAssets()
			// this.onRefreshList()
		},
		methods: {
			// 获取账户资产
			getUserAssets() {
				const app = this
				Api.assets().then(result => {
					this.balance = result.data.assets.pay_money
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
						next_id:id
					};
					Api.incomeList(data).then(result =>{
						const newList = result.data
						newList.data = result.data.list
						that.list.data = getMoreListData(newList, that.list)
						resolve(newList)
					})
					
					
				})
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					console.log(this.popup.item)
				}
			}
			
			
		}
	}
</script>

<style lang="scss">
.m-tabbar__icon {
	width: 48rpx;
	height: 48rpx;
	margin-bottom: 15rpx;
	position: relative;
}
.m-tabbar__icon_img {
	width: 48rpx;
	height: 48rpx;
}
.m-tabbar__label {
	font-size: 28rpx;
}
</style>
