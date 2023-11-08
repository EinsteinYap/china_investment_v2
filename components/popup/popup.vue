<template>
  <view>
    <u-popup v-model="showPopup" mode="center" :closeable="false" :border-radius="26" :maskCloseAble="isClose">
    	<view class="a-w-600 a-rounded-1-5 a-bg-white a-p-5">
			<text v-if="title" class="a-font-lg a-font-weight-bold">
				{{title}}
			</text>
    		<view class="a-py-5">
    		<text class="a-font">
    			{{content}}
    		</text>
    		</view>
    		<view class="a-flex a-justify-around a-align-center">
    			<view @click="btnCancel" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-orange-light">
    				<text class="a-font-lg a-font-weight-bold">{{cancel}}</text>
    			</view>
    			<view @click="btnOk" class="a-h-80 a-w-200 a-flex a-align-center a-justify-center a-rounded-circle a-bg-brown-orange">
    				<text class="a-font-lg a-font-weight-bold a-text-brown">{{ok}}</text>
    			</view>
    		</view>
    	</view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: 'AiProgress',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
	content: {
	  type: String,
	  default: ''
	},
	ok: {
	  type: String,
	  default: ''
	},
	cancel: {
	  type: String,
	  default: ''
	},
	showPopup: {
	  type:Boolean,
	  default: false
	},
	
    
  },
  data() {
    return {
		isClose:false
    };
  },
  methods: {
    btnCancel(){
    	this.$emit('cancel');
    },
	btnOk(){
		this.$emit('sure');
	}
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
</style>
