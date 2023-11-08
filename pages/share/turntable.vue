<template>
	<view>
		<view class="a-flex a-align-center a-justify-center  a-w-690 a-h-230 a-mt-2 a-rounded-1-5 a-mx-3 a-overflow-hidden">
			<image class="a-w-690 a-h-230 a-position-absolute" src="/static/income/bg-income.png"></image>
		<view class="a-flex-column a-justify-center a-align-center a-px-5 a-w-690 a-mt-5 a-rounded-top-2 a-mx-3 a-h-230" style="z-index:1">
			
			<text class="a-font a-text-yellow-orange a-font-weight-bold">{{$t('user.numberLucky')}}</text>
			<text class="a-font-max-four  a-font-weight-bold  a-mt-2 a-text-brown a-mt-2">{{info.times}} {{$t('user.time')}}</text>
		</view>
		</view>
		
		<view class="a-my-10">
		 <my-turntable-draw
		    ref="raffleWheel" 
		    :prizeList="prizeList"
		    :targetIndex="targetIndex"
			:canvasWidth="280"
			:canvasHeight="280"
		    @befoterClick="befoterClick"
		    @afterClick="afterClick"
		  >
		  </my-turntable-draw>
		</view>
		
		<view class="a-flex-column a-m-5">
			<text class="a-text-white a-font a-font-weight-bold a-font-max">{{$t('user.luckySpinsGuide')}}</text>
			<mp-html class="a-font a-mt-1 a-text-blue-sea-light" :content="detail" />
		</view>
		
		<u-popup v-model="sharePopup" mode="center"  :border-radius="26">
			<view class="a-w-600 a-rounded-1-5 a-bg-white a-p-5">
				<view class="a-py-5">
				<text class="a-font">
					{{hint}}
				</text>
				</view>
				<view class="a-flex a-justify-around a-align-center">
					<view @click="closeSharePopup" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-orange-light">
						<text class="a-font-lg a-font-weight-bold">{{$t('toast.cancel')}}</text>
					</view>
					<view @click="goOkay" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-brown-orange">
						<text class="a-font-lg a-font-weight-bold a-text-brown">{{$t('toast.ok')}}</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import myTurntableDraw from '@/components/my-turntable-draw/my-turntable-draw'
	import * as Api from '@/api/user'
	export default {
		components: {
		  myTurntableDraw
		},
		data() {
			return {
				sharePopup:false,
				info:{},
				detail:'',
				hint:'',
				prizeList: [
					{ name: '19.9', count: 10, image: '' },
					{ name: '38.8', count: 0, image: '' },
					{ name: '128', count: 1, image: '' },
					{ name: '999', count: 0, image: '' },
					{ name: '1288.8', count: 3, image: '' },
					{ name: '1888', count: 8, image: '' },
				],
				// 中奖下标
				targetIndex: 0,
				// 需多次获取
				indexNum: 0
			}
		},
		onLoad() {
			this.getTurntable()
			this.getAritlce()
		},
		methods: {
			getAritlce() {
				const app = this
				Api.aritlce({type:'turntable'}).then(result => {
					this.detail = result.data.detail
				})
			},
			openSharePopup() {
				this.sharePopup = true
			},
			closeSharePopup() {
				this.sharePopup = false
			},
			goOkay(){
				this.closeSharePopup()
				this.$navTo('pages/share/share')
			},
			getTurntable(){
				Api.turntable().then(result =>{
					this.info = result.data
					this.prizeList = result.data.options
				})
			},
			befoterClick(data) {
				const that = this
				// if(that.info.times == 0){
				// 	this.openSharePopup()
				// 	return
				// }
			  if(data.type == 'start') {
				  Api.turntableStart().then(result =>{
					  console.log(result)
					  if(result.status==200){
						  let index = that.prizeList.findIndex((ele) => {
						      return ele.id === result.data.id;
						  });
						  console.log('开始抽奖')
						  
						  // console.log('选中商品名：' + that.prizeList[index].cname)
						  that.targetIndex = index
						  data.callback && data.callback(index)
					  }else{
						  that.hint = result.message
						  that.openSharePopup()
					  }
					  that.getTurntable()
				  })
				  return
			    
			    // 获取中奖单位下标
			    // let _n = Math.floor(Math.random() * this.prizeList.length)
			    // console.log('选中商品项：' + _n)
			    // console.log('选中商品名：' + this.prizeList[_n].cname)
			    // this.targetIndex = _n
			    // data.callback && data.callback(_n)
			    // this.$refs.raffleWheel.rotoreAction(_n)
			  }
			},
			afterClick(data) {
			  if(data.type == 'end') {
			    console.log(data.content.cname)
				if(this.targetIndex!=0){
					this.$toast(this.$t('toast.rWin')+' '+data.content.cname)
				}else{
					this.$toast(data.content.cname)
				}
			    data.callback && data.callback()
			    // 多次执行
			    this.toBefoterClick()
			  }
			},
			// 多次执行
			toBefoterClick(n) {
			  // console.log('剩余次数：' + this.indexNum)
			  if(this.indexNum <= 0) {return false}
			  setTimeout(() => {
			    this.indexNum--
			    this.$refs.raffleWheel.handleAction()
			  }, 100)
			}
		}
	}
</script>

<style>

</style>
