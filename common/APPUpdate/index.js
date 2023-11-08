import * as utils from "../../utils/util";


import * as setting from '@/api/setting'

// #ifdef APP-PLUS 
/**** 此文件说明请看注释 *****/
// 可以用自己项目的请求方法
// 请求配置说明：https://ext.dcloud.net.cn/plugin?id=822
// import $http from '@/config/requestConfig';
/**** 结束 *****/

const platform = uni.getSystemInfoSync().platform;
// 主颜色
const $mainColor = "571fb2";
// 弹窗图标url
const $iconUrl = "/static/logo-update.png";

// 获取当前应用的版本号
export const getCurrentNo = function(callback) {
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		callback && callback({
			versionCode: inf.versionCode,
			versionName: inf.version
		});
	});
	
	
}
// 发起ajax请求获取服务端版本号
const getServerNo = function(version,isPrompt = false, callback) {
	let httpData = {
		version: version.versionCode,
        versionName: version.versionName
	};
	
	/* 接口入参说明
	 * version: 应用当前版本号（已自动获取）
	 * versionName: 应用当前版本名称（已自动获取）
	 */
	/****************以下是示例*******************/
	// 可以用自己项目的请求方法
	console.log(httpData)
	setting.update(httpData).then((res) => {
		/* res的数据说明
		 * | 参数名称	     | 一定返回 	| 类型	    | 描述
		 * | -------------|--------- | --------- | ------------- |
		 * | versionCode	 | y	    | int	    | 版本号      |
		 * | versionName	 | y	    | String	| 版本名称     |
		 * | versionInfo	 | y	    | String	| 版本信息     |
		 * | forceUpdate	 | y	    | boolean	| 是否强制更新  |
		 * | downloadUrl	 | y	    | String	| 版本下载链接  |
		 * | -------------|--------- | --------- | ------------- |
		 */
		console.log(res.data)
		if (platform == "android") {
			if (res && res.data.androidlink && res.data.androidversion!= httpData.versionName) {
				console.log(res.data)
				if(utils.compare(httpData.versionName,res.data.androidversion)){
					console.log(res)
					//版本过低，提示更新
					callback && callback(res.data);
				}
			}
		} else {
			if (res && res.data.ioslink && res.data.iosversion!= httpData.versionName) {
				if(utils.compare(httpData.versionName,res.data.iosversion)){
					console.log(res)
					//版本过低，提示更新
					callback && callback(res.data);
				}
			}
		}
	});
	/****************以上是示例*******************/
}
// 从服务器下载应用资源包（wgt文件）
const getDownload = function(data) {
	let popupData = {
		progress: true,
		buttonNum: 2
	};
	if(data.method==0){
		popupData.buttonNum = 0;
	}
	let dtask;
	let lastProgressValue = 0;
	let popupObj = downloadPopup(popupData);
    dtask = plus.downloader.createDownload(data.androidlink, {
        filename: "_doc/update/"
    }, function(download, status) {
        if (status == 200) {
            popupObj.change({
                progressValue: 100,
                progressTip:"Installing file...",
                progress: true,
                buttonNum: 0
            });
            plus.runtime.install(download.filename, {force:true}, function() {
                popupObj.change({
                    contentText: "Application resource update completed, please restart the APP!",
                    buttonNum: 1,
                    progress: false
                });
            }, function(e) {
                popupObj.cancel();
                plus.nativeUI.alert("Installation file failed[" + e.code + "]：" + e.message);
            });
        } else {
            popupObj.change({
                contentText: "File download failure...",
                buttonNum: 1,
                progress: false
            });
        }
    });
    dtask.start();
    dtask.addEventListener("statechanged", function(task, status) {
        switch (task.state) {
            case 1: // 开始
                popupObj.change({
                    progressValue:0,
                    progressTip:"Ready to download...",
                    progress: true
                });
                break;
            case 2: // 已连接到服务器  
                popupObj.change({
                    progressValue:0,
                    progressTip:"Start downloading...",
                    progress: true
                });
                break;
            case 3:
                const progress = parseInt(task.downloadedSize / task.totalSize * 100);
                if(progress - lastProgressValue >= 2){
                    lastProgressValue = progress;
                    popupObj.change({
                        progressValue:progress,
                        progressTip: "downloaded " + progress + "%",
                        progress: true
                    });
                }
                break;
        }
    });
    // 取消下载
    popupObj.cancelDownload = function(){
        dtask && dtask.abort();
        uni.showToast({
        	title: "Download cancelled",
        	icon:"none"
        });
    }
    // 重启APP
    popupObj.reboot = function(){
        plus.runtime.restart();
    }
}
// 文字换行
function drawtext(text, maxWidth) {
	let textArr = text.split("");
	let len = textArr.length;
	// 上个节点
	let previousNode = 0;
	// 记录节点宽度
	let nodeWidth = 0;
	// 文本换行数组
	let rowText = [];
	// 如果是字母，侧保存长度
	let letterWidth = 0;
	// 汉字宽度
	let chineseWidth = 14;
	// otherFont宽度
	let otherWidth = 7;
	for (let i = 0; i < len; i++) {
		if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
			if(letterWidth > 0){
				if(nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth){
					rowText.push({
						type: "text",
						content: text.substring(previousNode, i)
					});
					previousNode = i;
					nodeWidth = chineseWidth;
					letterWidth = 0;
				} else {
					nodeWidth += chineseWidth + letterWidth * otherWidth;
					letterWidth = 0;
				}
			} else {
				if(nodeWidth + chineseWidth > maxWidth){
					rowText.push({
						type: "text",
						content: text.substring(previousNode, i)
					});
					previousNode = i;
					nodeWidth = chineseWidth;
				}else{
					nodeWidth += chineseWidth;
				}
			}
		} else {
			if(/\n/g.test(textArr[i])){
				rowText.push({
					type: "break",
					content: text.substring(previousNode, i)
				});
				previousNode = i + 1;
				nodeWidth = 0;
				letterWidth = 0;
			}else if(textArr[i] == "\\" && textArr[i + 1] == "n"){
				rowText.push({
					type: "break",
					content: text.substring(previousNode, i)
				});
				previousNode = i + 2;
				nodeWidth = 0;
				letterWidth = 0;
			}else if(/[a-zA-Z0-9]/g.test(textArr[i])){
				letterWidth += 1;
				if(nodeWidth + letterWidth * otherWidth > maxWidth){
					rowText.push({
						type: "text",
						content: text.substring(previousNode, i + 1 - letterWidth)
					});
					previousNode = i + 1 - letterWidth;
					nodeWidth = letterWidth * otherWidth;
					letterWidth = 0;
				}
			} else{
				if(nodeWidth + otherWidth > maxWidth){
					rowText.push({
						type: "text",
						content: text.substring(previousNode, i)
					});
					previousNode = i;
					nodeWidth = otherWidth;
				}else{
					nodeWidth += otherWidth;
				}
			}
		}
	}
	if (previousNode < len) {
		rowText.push({
			type: "text",
			content: text.substring(previousNode, len)
		});
	}
	return rowText;
}
// 是否更新弹窗
function updatePopup(data, callback) {
	// 弹窗遮罩层
	let maskLayer = new plus.nativeObj.View("maskLayer", { //先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});

	// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	const screenWidth = plus.screen.resolutionWidth;
	const screenHeight = plus.screen.resolutionHeight;
	//弹窗容器宽度
	const popupViewWidth = screenWidth * 0.7;
	// 弹窗容器的Padding
	const viewContentPadding = 20;
	// 弹窗容器的宽度
	const viewContentWidth = parseInt(popupViewWidth - (viewContentPadding * 2));
	// 描述的列表
	if(data.versionInfo==null||data.versionInfo==''){
		data.versionInfo= data.update_content;
	}
	
	const descriptionList = drawtext(data.versionInfo, viewContentWidth);
	// 弹窗容器高度
	let popupViewHeight = 150 + 20 + 20 + 90  + 10;
	let popupViewContentList = [{
			src: $iconUrl,
			id: "logo", 
			tag: "img",
			position: {
				top: "0px",
				left: "0px",
				// left: (popupViewWidth - 160) / 2 + "px",
				width: popupViewWidth+'px',
				height: "100px",
			}
		},
		{
			tag: 'font',
			id: 'title',
			text: data.update_title,
			textStyles: {
				size: '18px',
				color: "#333",
				weight: "bold",
				whiteSpace: "normal"
			},
			position: {
				top: '110px',
				left: viewContentPadding + "px",
				width: viewContentWidth + "px",
				height: "30px",
			}
		}];
	const textHeight = 18;
	let contentTop = 150;
	descriptionList.forEach((item,index) => {
		if(index > 0){
			popupViewHeight += textHeight;
			contentTop += textHeight;
		}
		popupViewContentList.push({
			tag: 'font',
			id: 'content' + index + 1,
			text: item.content,
			textStyles: {
				size: '14px',
				color: "#666",
				lineSpacing: "50%",
				align: "left",
			},
			position: {
				top: contentTop + "px",
				left: viewContentPadding + "px",
				width: viewContentWidth + "px",
				height: textHeight + "px",
			}
		});
		if(item.type == "break"){
			contentTop += 10;
			popupViewHeight += 10;
		}
	});
	// 弹窗内容
	let popupView = new plus.nativeObj.View("popupView", { //创建底部图标菜单
		tag: "rect",
		top: (screenHeight - popupViewHeight) / 2 + "px",
		left: '15%',
		height: popupViewHeight + "px",
		width: "70%"
	});
	// 绘制白色背景
	popupView.drawRect({
		color: "#FFFFFF",
		radius: "8px"
	}, {
		top: "40px",
		height: popupViewHeight - 40 + "px",
	});
	// 绘制底边按钮
	popupView.drawRect({
		radius: "100px",
		// borderColor: "#f1f1f1",
		// borderWidth: "1px",
	}, {
		bottom: '0px',
		left: (viewContentPadding / 2) +viewContentPadding + "px",
		width: (viewContentWidth - viewContentPadding) + "px",
		height: "30px",
	});
	// 绘制底边按钮
	popupView.drawRect({
		radius: "100px",
		color: $mainColor,
	}, {
		bottom: viewContentPadding + 20 + 'px',
		left: (viewContentPadding / 2) +viewContentPadding + "px",
		width: (viewContentWidth - viewContentPadding) + "px",
		height: "40px",
	});
	popupViewContentList.push({
		tag: 'font',
		id: 'cancelText',
		text: "Cancel",
		textStyles: {
			size: '14px',
			color: "#666",
			lineSpacing: "0%",
			whiteSpace: "normal"
		},
		position: {
			bottom:  '0px',
			left: (viewContentPadding / 2) +viewContentPadding + "px",
			width: (viewContentWidth - viewContentPadding) + "px",
			height: "30px",
		}
	});
	popupViewContentList.push({
			tag: 'font',
			id: 'confirmText',
			text: "Immediate update",
			textStyles: {
				size: '14px',
				color: "#FFF",
				lineSpacing: "0%",
				whiteSpace: "normal"
			},
			position: {
				bottom: viewContentPadding + 20 + 'px',
				left: (viewContentPadding / 2) +viewContentPadding + "px",
				width: (viewContentWidth - viewContentPadding) + "px",
				height: "40px",
			}
		});
	popupView.draw(popupViewContentList);
	popupView.addEventListener("click", function(e) {
		let maxTop = popupViewHeight;
		let maxLeft = popupViewWidth - viewContentPadding;
		let buttonWidth = (viewContentWidth - viewContentPadding) / 2;
		if (e.clientY > maxTop - 80 && e.clientY < maxTop) {
			// 暂不升级
			if (e.clientY > maxTop - 30 && e.clientY < maxTop) {
				maskLayer.hide();
				popupView.hide();
			} else if (e.clientY > maxTop - 80 && e.clientY < maxTop-30) {
				// 立即升级
				maskLayer.hide();
				popupView.hide();
				callback && callback();
			}
		}
	});
	// 点击遮罩层
	maskLayer.addEventListener("click", function() { //处理遮罩层点击
		maskLayer.hide();
		popupView.hide();
	});
	// 显示弹窗
	maskLayer.show();
	popupView.show();
}
// 文件下载的弹窗绘图
function downloadPopupDrawing(data){
	console.log('到这里没有')
	// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	const screenWidth = plus.screen.resolutionWidth;
	const screenHeight = plus.screen.resolutionHeight;
	//弹窗容器宽度
	const popupViewWidth = screenWidth * 0.7;
	// 弹窗容器的Padding
	const viewContentPadding = 20;
	// 弹窗容器的宽度
	const viewContentWidth = popupViewWidth - (viewContentPadding * 2);
	// 弹窗容器高度
	let popupViewHeight = viewContentPadding * 3 + 60;
	let progressTip = data.progressTip || "Ready to download...";
	let contentText = data.contentText || "It is being updated for you,";
	let contentTexts = data.contentTexts || "please wait patiently";
	let elementList = [
		{
			tag: 'rect', //背景色
			color: '#FFFFFF',
			rectStyles:{
				radius: "8px"
			}
		},
		{
			tag: 'font',
			id: 'title',
			text: "Upgrade APP",
			textStyles: {
				size: '16px',
				color: "#333",
				weight: "bold",
				verticalAlign: "middle",
				whiteSpace: "normal"
			},
			position: {
				top: viewContentPadding + 'px',
				height: "30px",
			}
		},
		{
			tag: 'font',
			id: 'content',
			text: contentText,
			textStyles: {
				size: '14px',
				color: "#333",
				verticalAlign: "middle",
				whiteSpace: "normal"
			},
			position: {
				top: viewContentPadding * 2 + 30 + 'px',
				height: "20px",
			}
		},
		{
			tag: 'font',
			id: 'contents',
			text: contentTexts,
			textStyles: {
				size: '14px',
				color: "#333",
				verticalAlign: "middle",
				whiteSpace: "normal"
			},
			position: {
				top: viewContentPadding * 2 + 45 + 'px',
				height: "20px",
			}
		}
	];
	// 是否有进度条
	if(data.progress){
		popupViewHeight += viewContentPadding + 40;
		elementList = elementList.concat([
			{
				tag: 'font',
				id: 'progressValue',
				text: progressTip,
				textStyles: {
					size: '14px',
					color: $mainColor,
					whiteSpace: "normal"
				},
				position: {
					top: viewContentPadding * 4 + 25 + 'px',
					height: "30px"
				}
			},
			{
				tag: 'rect', //绘制进度条背景
				id: 'progressBg',
				rectStyles:{
					radius: "4px",
					borderColor: "#f1f1f1",
					borderWidth: "1px",
				},
				position:{
					top: viewContentPadding * 4 + 60 + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "8px"
				}
			},
		]);
	}
	if (data.buttonNum == 2) {
		popupViewHeight += viewContentPadding + 30;
		elementList = elementList.concat([
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "3px",
					borderColor: "#f1f1f1",
					borderWidth: "1px",
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px"
				}
			},
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "3px",
					color: $mainColor
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px"
				}
			},
			{
				tag: 'font',
				id: 'cancelText',
				text: "Cancel",
				textStyles: {
					size: '14px',
					color: "#666",
					lineSpacing: "0%",
					whiteSpace: "normal"
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px",
				}
			},
			{
				tag: 'font',
				id: 'confirmText',
				text: "Hide",
				textStyles: {
					size: '14px',
					color: "#FFF",
					lineSpacing: "0%",
					whiteSpace: "normal"
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px",
				}
			}
		]);
	}
	if (data.buttonNum == 1) {
		popupViewHeight += viewContentPadding + 40;
		elementList = elementList.concat([
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "6px",
					color: $mainColor
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "40px"
				}
			},
			{
				tag: 'font',
				id: 'confirmText',
				text: "Close",
				textStyles: {
					size: '14px',
					color: "#FFF",
					lineSpacing: "0%",
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "40px"
				}
			}
		]);
	}
	return {
		popupViewHeight:popupViewHeight,
		popupViewWidth:popupViewWidth,
		screenHeight:screenHeight,
		viewContentWidth:viewContentWidth,
		viewContentPadding:viewContentPadding,
		elementList: elementList
	};
}
// 文件下载的弹窗
function downloadPopup(data) {
	// 弹窗遮罩层
	let maskLayer = new plus.nativeObj.View("maskLayer", { //先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});
	let popupViewData = downloadPopupDrawing(data);
	// 弹窗内容
	let popupView = new plus.nativeObj.View("popupView", { //创建底部图标菜单
		tag: "rect",
		top: (popupViewData.screenHeight - popupViewData.popupViewHeight) / 2 + "px",
		left: '15%',
		height: popupViewData.popupViewHeight + "px",
		width: "70%",
	});
	let progressValue = 0;
	let progressTip = 0;
	let contentText = 0;
	let buttonNum = 2;
	if(data.buttonNum >= 0){
		buttonNum = data.buttonNum;
	}
	popupView.draw(popupViewData.elementList);
    let callbackData = {
		change: function(res) {
			let progressElement = [];
			if(res.progressValue){
				progressValue = res.progressValue;
				// 绘制进度条
				progressElement.push({
					tag: 'rect', //绘制进度条背景
					id: 'progressValueBg',
					rectStyles:{
						radius: "4px",
						color: $mainColor
					},
					position:{
						top: popupViewData.viewContentPadding * 4 + 60 + 'px',
						left: popupViewData.viewContentPadding + "px",
						width: popupViewData.viewContentWidth * (res.progressValue / 100) + "px",
						height: "8px"
					}
				});
			}
			if(res.progressTip){
				progressTip = res.progressTip;
				progressElement.push({
					tag: 'font',
					id: 'progressValue',
					text: res.progressTip,
					textStyles: {
						size: '14px',
						color: $mainColor,
						whiteSpace: "normal"
					},
					position: {
						top: popupViewData.viewContentPadding * 4 + 20 + 'px',
						height: "30px"
					}
				});
			}
			if(res.contentText){
				contentText = res.contentText;
				progressElement.push({
					tag: 'font',
					id: 'content',
					text: res.contentText,
					textStyles: {
						size: '16px',
						color: "#333",
						whiteSpace: "normal"
					},
					position: {
						top: popupViewData.viewContentPadding * 2 + 30 + 'px',
						height: "30px",
					}
				});
			}
			if(res.buttonNum >= 0 && buttonNum != res.buttonNum){
				buttonNum = res.buttonNum;
				popupView.reset();
				popupViewData = downloadPopupDrawing(Object.assign({
					progressValue:progressValue,
					progressTip:progressTip,
					contentText:contentText,
				},res));
				let newElement = [];
				popupViewData.elementList.map((item,index) => {
					let have = false;
					progressElement.forEach((childItem,childIndex) => {
						if(item.id == childItem.id){
							have = true;
						}
					});
					if(!have){
						newElement.push(item);
					}
				});
				progressElement = newElement.concat(progressElement);
				popupView.setStyle({
					tag: "rect",
					top: (popupViewData.screenHeight - popupViewData.popupViewHeight) / 2 + "px",
					left: '15%',
					height: popupViewData.popupViewHeight + "px",
					width: "70%",
				});
				popupView.draw(progressElement); 
			}else{
				popupView.draw(progressElement);
			}
		},
		cancel: function() { 
			maskLayer.hide();
			popupView.hide();
		}
	}
	popupView.addEventListener("click", function(e) {
		let maxTop = popupViewData.popupViewHeight - popupViewData.viewContentPadding;
		let maxLeft = popupViewData.popupViewWidth - popupViewData.viewContentPadding;
		if (e.clientY > maxTop - 40 && e.clientY < maxTop) {
			if(buttonNum == 1){
				// 单按钮
				if (e.clientX > popupViewData.viewContentPadding && e.clientX < maxLeft) {
					maskLayer.hide();
					popupView.hide();
                    callbackData.reboot(); //热更新好像有问题，先注释重启APP代码
				}
			}else if(buttonNum == 2){
				// 双按钮
				let buttonWidth = (popupViewData.viewContentWidth - popupViewData.viewContentPadding) / 2;
				if (e.clientX > popupViewData.viewContentPadding && e.clientX < maxLeft - buttonWidth - popupViewData.viewContentPadding) {
					maskLayer.hide();
					popupView.hide();
                    callbackData.cancelDownload();
				} else if (e.clientX > maxLeft - buttonWidth && e.clientX < maxLeft) {
					maskLayer.hide();
					popupView.hide();
				}
			}
		}
	});
	// 显示弹窗
	maskLayer.show();
	popupView.show();
	// 改变进度条
	return callbackData;
}
export default function(isPrompt = false) {
	getCurrentNo(versionInfo => {
		getServerNo(versionInfo,isPrompt, res => {
			//强制更新
			if (res.method==0) {
				if (/\.wgt$/i.test(res.androidlink)) {
					getDownload(res);
				} else if(/\.html$/i.test(res.androidlink)){
					plus.runtime.openURL(res.androidlink);
				} else {
					if (platform == "android") {
						getDownload(res);
					} else {
						plus.runtime.openURL(res.androidlink);
					}
				}
			} else {
				updatePopup(res, function() {
					if (/\.wgt$/i.test(res.androidlink)) {
						getDownload(res);
					} else if(/\.html$/i.test(res.androidlink)){
						plus.runtime.openURL(res.androidlink);
					} else {
						if (platform == "android") {
							getDownload(res);
						} else {
							plus.runtime.openURL(res.androidlink);
						}
					}
				});
			}
		});
	});
}
// #endif