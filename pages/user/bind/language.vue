<template>
	<view>
		<view class="a-mx-3">
			<view v-for="(item,index) in langeuage" :key="index" @click="setLangeuage(index)" class="a-flex a-align-center a-justify-between a-bg-primary-lighter a-p-3 a-rounded-2 a-mt-2">
				<view class="a-flex a-align-center">
					<!-- <image class="a-w-100 a-h-60 a-mr-2" :src="`../../../static/language/${item.code}.png`"></image> -->
					<image class="a-w-100 a-h-60 a-mr-2" :src="item.logo_url"></image>
					<text class="a-font-lg">{{item.cname}}</text>
				</view>
				<image v-if="item.checked" class="a-w-40 a-h-40" src="/static/images/ico-select.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user'
	export default {
		data() {
			return {
				langeuage:[]
			}
		},
		onLoad() {
			this.getLangeuage()
		},
		methods: {
			getLangeuage() {
			  const that = this
			  Api.langeuage().then(result =>{
				  for(var i in result.data){
				  	result.data[i].checked = false
				  }
				  that.langeuage = result.data
				  that.isLangeuage()
			  })
			},
			isLangeuage(){
				var langeuage = uni.getStorageSync('langeuage')?uni.getStorageSync('langeuage'):'en-us'
				this.$i18n.locale = langeuage
				
				let index = this.langeuage.findIndex((ele) => {
				    return ele.code === langeuage;
				});
				this.langeuage[index].checked= true
			},
			setLangeuage(index) {
				
				for(var i in this.langeuage){
					this.langeuage[i].checked = false
				}
				this.langeuage[index].checked = true
				uni.setStorageSync('langeuage',this.langeuage[index].code)
				uni.setStorageSync('langeuageName',this.langeuage[index].cname)
				this.$toast(this.$t('toast.rSuccess'))
				
				uni.setLocale(this.langeuage[index].code);
				this.$i18n.locale = this.langeuage[index].code;
			},
		}
	}
</script>

<style>

</style>
