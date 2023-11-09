<template>
	<view>
		<view class="a-flex-column a-justify-center  a-w-690 a-mt-5  a-rounded-2 a-mx-3 a-h-230 a-bg-primary-op-3">
			<image class="a-w-690 a-h-230 a-position-absolute" src="/static/income/bg-income.png"></image>
			<view style="z-index:1" class="a-flex-column a-px-5">
				<text class="a-font a-text-yellow-orange a-font-weight-bold">{{$t('user.amountMoney')}}</text>
					<text class="a-font-max-two a-text-brown a-font-weight-bold a-mt-1">{{balance}} Rs</text>
			</view>
		</view>
		<!-- <view class="a-mx-3">
			<view class="a-flex a-align-center a-justify-between a-px-3 a-py-3 a-bg-primary-lighter a-rounded-bottom-2 a-mb-2" >
				<view class="a-flex a-align-center">
					<image class="a-w-80 a-h-80" src="/static/images/ico-card.png"></image>
					<text class="a-font a-ml-2 a-font-weight-bold">Bank Card</text>
				</view>
			</view>
		</view> -->
		
		<view class="a-mx-3 a-overflow-hidden a-bg-primary-op-3 a-mt-2 a-rounded-2">
			  
			<view class="a-flex a-align-center a-bg-primary-op-3  a-h-90 a-my-2 forms-border-bottom">
				<view class="a-ml-3 a-flex-column a-w-150 ">
					<text class="a-font a-font-weight-bold a-text-white">{{$t('user.amount')}}</text>
				</view>
			
				<input class="a-flex-1  a-h-90 a-px-4 a-font  a-text-white" type="number" :value="form.amount" @input="changeInput" :placeholder="$t('placeholder.theTransferAmount')" placeholder-class="a-text-gray-light" />
				<view @click="all" class="a-h-60 a-mr-2 a-rounded-circle a-bg-primary a-px-4 a-flex a-align-center">
					<text class="a-text-white a-font-sm a-text-white">{{$t('button.all')}}</text>
				</view>
			</view>
			
			<view class="a-flex a-align-center a-bg-primary-op-3  a-my-2 forms-border-bottom">
				<view class="a-ml-3 a-flex-column a-w-150">
					<text class="a-font a-font-weight-bold a-text-white">{{$t('form.paymentPassword')}}</text>
				</view>
			
				<input class="a-flex-1  a-h-90 a-px-4 a-font a-text-white" type="text" v-model="form.pay_pwd" :placeholder="$t('placeholder.paymentPassword')" placeholder-class="a-text-gray-light" />
			</view>
			
			<view class="a-flex a-align-center a-justify-between   a-h-90 a-my-2 ">
				<view class="a-ml-3 a-flex-column">
					<text class="a-font a-font-weight-bold a-text-white">{{$t('form.bankAccountName')}}</text>
				</view>
					<view @click="$navTo('pages/user/account/index?isSelect=true')" class="a-flex-1 a-flex a-justify-end a-align-center a-px-2">
						<view v-if="form.user_payment_id && paymentInfo" class="a-flex-column a-align-end a-mr-2">
							<text class="a-font  a-text-ellipsis-1 a-text-white ">{{paymentInfo.cateid==1?'Usdt':paymentInfo.user_name}}</text>
							<text class="a-font  a-text-ellipsis-1 a-text-white">{{paymentInfo.cateid==1?paymentInfo.address:paymentInfo.bank_card_number}}</text>
						</view>
						<text v-else class="a-font  a-mr-2 a-text-white">{{$t('form.select')}}</text>
						<text class="iconfonts icon-ai-arrow-down  a-text-white"></text>
					</view>
			</view>
		</view>
		
		
		<view class="a-p-5">
			<mp-html :content="detail" />
		</view>
		
		<view class="a-w-750 a-h-100"></view>
		<view class="a-w-750 a-h-100 a-px-5 a-position-fixed a-bottom-0 a-flex a-justify-center">
			<view @click="sumbit" class="a-bg-brown-orange a-rounded-circle a-h-90 a-flex-1 a-flex a-align-center a-justify-center">
				<text class="a-font-lg a-font-weight-bold a-text-brown">{{$t('button.determine')}}</text>
			</view>
		</view>
		<POPUP :showPopup="popup.isShow" :ok="popup.ok" :cancel="popup.cancel" :content="popup.content" :title="popup.title" @cancel="cancelPopup" @sure="surePopup"></POPUP>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	import * as Verify from '@/utils/verify'
	import POPUP from '@/components/popup/popup'
	export default {
		components: {
		  POPUP
		},
		data() {
			return {
				balance:0,
				active:0,
				detail:'',
				list:[],
				paymentInfo:null,
				form:{
					amount:'',
					pay_pwd:'',
					user_payment_id:null
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
		onNavigationBarButtonTap(e){
			const index = e.index;
			
			if (index === 0){
				this.$navTo(`pages/user/account/recordWithdraw`)
			}
		},
		onLoad() {
			this.getUserAssets()
			this.getAccountList()
			this.getAritlce()
		},
		methods: {
			getAritlce() {
				const app = this
				Api.aritlce({type:'withdraw'}).then(result => {
					this.detail = result.data.detail
				})
			},
			// 获取账户资产
			getUserAssets() {
				const app = this
				Api.assets().then(result => {
					this.balance = result.data.assets.balance
				})
			},
			getAccountList(){
				var that =this
				Api.account().then(result =>{
					this.list = result.data.list
				})
			},
			all(){
				this.form.amount = this.balance
			},
			changeInput(e){
				if(parseFloat(e.detail.value) > parseFloat(this.balance)){
					this.form.amount = this.balance
				}else{
					this.form.amount = e.detail.value
				}
			},
			sumbit(){
				const that = this
				if (Verify.isEmpty(that.form.amount)) {
					that.$toast(this.$t('toast.rBuynum'))
					return false
				}
				if (Verify.isEmpty(that.form.pay_pwd)) {
					that.$toast(this.$t('toast.rPassword'))
					return false
				}
				if (!that.form.user_payment_id && !this.paymentInfo) {
					that.$toast(this.$t('toast.rWithdrawaccount'))
					return false
				}
				Api.withdrawComputeFee({form:that.form}).then(result => {
					if(result.status==200){
						this.popup.title=this.$t('toast.reminder'),
						this.popup.content=this.$t('toast.rWithdrawA')+result.data.fee+this.$t('toast.rWithdrawB'),
						this.popup.ok=this.$t('toast.ok'),
						this.popup.cancel=this.$t('toast.cancel'),
						this.popup.isLogin=false,
						this.popup.isOperation=true,
						this.popup.isShow=true
						this.popup.item=null
						// uni.showModal({
						//   title: this.$t('toast.reminder'),
						//   content: this.$t('toast.rWithdrawA')+result.data.fee+this.$t('toast.rWithdrawB'),
						//   confirmText: this.$t('toast.ok'),
						//   cancelText: this.$t('toast.cancel'),
						//   success(res) {
						//     if (res.confirm) {
						//       that.sureSumbit()
						//     }
						//   }
						// })
					}
				})
			},
			sureSumbit(){
				const that = this
				that.isLoading = true
				Api.withdrawSubmit({form:that.form}).then(result => {
					// 显示登录成功
					that.$toast(result.message)
					// 跳转回原页面
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				})
				.catch(err => {})
				.finally(() => that.isLoading = false)
			},
			cancelPopup(){
				this.popup.isShow=false
			},
			surePopup(){
				this.popup.isShow=false
				if(this.popup.isLogin){
					this.$navTo('pages/login/index')
				}else if(this.popup.isOperation){
					this.sureSumbit()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep uni-rich-text{
		strong{
			color:#6EB6F6 !important;
			font-size: smaller;
		}
	}

</style>
