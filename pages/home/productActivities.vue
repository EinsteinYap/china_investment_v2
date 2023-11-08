<template>
	<view>
		<mescroll-body ref="mescrollRef" :sticky="true" @init="mescrollInit" :down="{ use: true,auto:false }" :up="upOption"
		@up="upCallback" @down="downCallback">
		
		<u-sticky bgColor="#fff">
		<u-tabs style="background:#FCC803 !important;" :list="tabs" :is-scroll="false" :current="curTab" active-color="rgb(100, 38, 16)" :duration="0.2"
		  @change="onChangeTab" />
		</u-sticky>
		
		<view class="a-mx-3">
			<view v-for="(item,index) in list.data" :key="index"  @click="$navTo('pages/rent/homearticleRent?id='+item.goods_id)" class="a-mt-3 a-bg-primary-lighter a-rounded-2">
				<view class="a-w-690 a-rounded-top-2  a-position-relative a-overflow-hidden">
					<view  class="a-w-690 a-h-400  a-flex a-align-center a-justify-center">
						<image class="a-w-750  a-position-absolute" mode="widthFix" :src="item.goods?item.goods.good_image:''"></image>
					</view>
					<view v-if="item.subTitle" class="a-w-200 a-h-50 a-flex a-align-center a-justify-center a-bg-orange-gold a-position-absolute a-left-0 a-top-0 a-rounded-top-left-2 a-rounded-circle-bottom-right">
						<text class="a-font-sm a-text-brown a-mr-1">{{item.subTitle}}</text>
					</view>
				</view>
				<view class="a-p-3">
					<text class="a-text-ellipsis-1 a-font a-text-primary">{{item.title}}</text>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-sea-light a-font-sm">{{$t('pro.price')}}:</text>
						<text class="a-text-blue-sea-light a-font-sm">{{item.goods_price}} Rs</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-sea-light a-font-sm">{{$t('pro.purchaseLimit')}}:</text>
						<text class="a-text-blue-sea-light a-font-sm">{{item.limit_num}}</text>
					</view>
					<view class="a-flex a-align-center a-justify-between a-mt-2">
						<text class="a-text-blue-sea-light a-font-sm">{{$t('pro.countdown')}}:</text>
						<view v-if="item.cut_time" class="a-flex a-justify-between a-align-center">
							<uni-countdown color="#FFD707" background-color="#191EB3" :day="$countdown(item.cut_time,'day')" :hour="$countdown(item.cut_time,'hour')" :minute="$countdown(item.cut_time,'minute')" :second="$countdown(item.cut_time,'second')"></uni-countdown>
						</view>
						<view v-else class="a-flex a-justify-between a-align-center">
							<uni-countdown color="#FFFFFF" background-color="#555555" :day="0" :hour="0" :minute="0" :second="0"></uni-countdown>
						</view>
					</view>
					<view class="a-flex a-justify-center a-mt-3">
						<view @click.stop="activityBuy(item)" class="a-bg-brown-orange a-rounded-circle a-h-90 a-w-500 a-flex a-align-center a-justify-center">
							<text class="a-font-lg a-text-brown">{{$t('button.purchase')}}</text>
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
				  name: this.$t('user.expired'),
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
			
			// if(!this.isLogin){
			// 	promptLogin()
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
						is_expire:that.getTabValue()
					};
					Api.activityList(data).then(result =>{
						const newList = result.data
						newList.data = result.data
						that.list.data= newList.data
						// that.list.data = getMoreListData(newList, that.list)
						resolve(newList)
					})
					
				})
			},
			activityBuy(item){
				var that = this
				if(!that.isLogin){
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
				this.popup.title=this.$t('toast.reminder'),
				this.popup.content=this.$t('toast.rBuy'),
				this.popup.ok=this.$t('toast.ok'),
				this.popup.cancel=this.$t('toast.cancel'),
				this.popup.isLogin=false,
				this.popup.isOperation=true,
				this.popup.isShow=true
				this.popup.item=item
				
				// uni.showModal({
				//   title: this.$t('toast.reminder'),
				//   content: this.$t('toast.rBuy'),
				//   confirmText: this.$t('toast.ok'),
				//   cancelText: this.$t('toast.cancel'),
				//   success(o) {
				//     if (o.confirm) {
				//       that.sureActivityBuy(item)
				//     }
				//   }
				// })
			},
			sureActivityBuy(item){
				const that = this
				var data={
					id:item.id,
					cateid:item.cateid,
				};
				Api.activityBuy(data).then(result =>{
					this.$toast(result.message)
					
					if(result.status==200){
						setTimeout(() => {
							this.$navTo('pages/income/income')
						}, 1000);
					}
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
					this.sureActivityBuy(this.popup.item)
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
