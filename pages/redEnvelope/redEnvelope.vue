<template>
	<view class='a-bg-red a-full-fixed'>
			<view v-if="!showPopup && result" class="a-py-5 a-w-750 a-flex-column a-align-center a-justify-center">
				<view class='a-w-750 a-h-100'></view>
				<view class="a-w-500 a-h-400 a-position-relative">
					<image class="a-w-500 a-h-400 a-position-absolute" src="/static/images/lo-redEnvelope.png"></image>
					<view class="a-flex a-align-end a-justify-center a-position-relative a-pt-5" style="z-index:1">
						<text class="a-font-lg a-text-red a-font-weight-bold a-mt-2">--</text>
					</view>
				</view>
				<text class="a-font a-mt-5 a-text-white">{{result}}</text>
			</view>
			<view v-if="showPopup" class="a-py-5 a-w-750 a-flex-column a-align-center a-justify-center">
				<view class='a-w-750 a-h-100'></view>
				<view class="a-w-500 a-h-400 a-position-relative a-mb-3">
					<image class="a-w-500 a-h-400 a-position-absolute" src="/static/images/lo-redEnvelope.png"></image>
					<view class="a-flex a-align-end a-justify-center a-position-relative a-pt-5" style="z-index:1">
						<text class="a-font-lg a-text-red a-font-weight-bold a-mb-1">₹</text>
						<text class="a-font-max-five a-text-red a-font-weight-bold">{{amount}}</text>
					</view>
				</view>
				<text class="a-font a-mt-5 a-text-white">{{message}}</text>
			</view>
			<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import { checkLogin,promptLogin } from '@/core/app'
	import POPUP from '@/components/popup/popup'
	const pageSize = 1
	
	export default {
		components: {
		  POPUP,
		},
		data() {
			return {
				
				amount:null,
				showPopup:false,
				
				popup:{
					isShow:false,
					title:'',
					content:'',
					ok:'',
					cancel:'',
					isLogin:false,
					isOperation:false,
					item:null
				},
				id:null,
				order_no:null,
				result:'',
				message:''
			}
		},
		onLoad(options) {
			this.id= options.id
			this.order_no= options.order_no
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
			}else{
				this.openRed()
			}
			
		},
		methods: {
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
			},
			openShowPopup() {
				this.showPopup = true
			},
			closeShowPopup() {
				this.showPopup = false
			},
			back(){
			 uni.navigateBack()	
			},
			openRed(id){
				const that = this
				var params = {
					order_no:that.order_no
				}
				Api.redReceive({form:params}).then(result =>{
					if(result.status =='200'){
						that.amount = result.data.amount
						that.message = result.message
						that.openShowPopup()
					}else{
						that.result = result.message
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
