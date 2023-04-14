<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/2.png"></image>
		<image class="img-b" src="@/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b" style="text-align: center;">{{ title }}</view>
		<form class="cl">
			<view class="t-a">
				<image src="@/static/user.png"></image>
				<input type="text"  placeholder="请输入用户名/手机号/邮箱" placeholder-style="color:#c9cbcd" v-model="loginForm.username" />
			</view>
			<view class="t-a">
				<image src="@/static/yz.png"></image>
				<input type="text" maxlength="15" placeholder="请输入密码" placeholder-style="color:#c9cbcd" v-model="loginForm.password" />
			</view>
			<button @tap="login()">登 录</button>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()"><image src="@/static/wx.png"></image></view>
			<view class="t-g" @tap="zfbLogin()"><image src="@/static/qq.png"></image></view>
		</view>
	</view>
</template>
<script>
const toLogin = require('../../api/login/login');
export default {	
	data() {
		return {
			loginForm:{
				username: "", //账号
				password: "",//密码
			},
			title: '绿藤', //标题
			errMsg: "",
		};
	},
	onLoad() {},
	methods: {
		//当前登录按钮操作
		login() {	
			var that = this;
			if (!that.loginForm.username) {
				uni.showToast({ title: '请输入账号', icon: 'none' });
				return;
			}
			if (!that.loginForm.password) {
				uni.showToast({ title: '请输入密码', icon: 'none' });
				return;
			}
			//....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
			// uni.request({
			// 	url:"/hello",
			// 	data:this.loginForm,
			// 	success: (res) => {
			// 		console(res.data)
			// 	}
			// })
			console.log(that.loginForm);
			toLogin.toLogin(that.loginForm).then(res=>{
				if(res.data){
					localStorage.setItem('token_type',res.data.token_type);
					localStorage.setItem('token',res.data.access_token);
					if(!res.data.error){
						localStorage.setItem('username',this.data.username);
						localStorage.setItem('password',this.data.password);
						uni.showToast({ title: '登录成功！', icon: 'success' });
						uni.switchTab({
							url:"/pages/component/index/index"
						})
					};
					this.errMsg=res.data.errMsg;
					uni.showToast({ title: this.errMsg, icon: 'none' });
				}
			}).catch((err)=>{console.log(err)})
		},
		//等三方微信登录
		wxLogin() {
			uni.showToast({ title: '微信登录', icon: 'none' });
		},
		//第三方支付宝登录
		zfbLogin() {
			uni.showToast({ title: '支付宝登录', icon: 'none' });
		}
	}
};
</script>
<style>
.img-a {
	position: absolute;
	width: 100%;
	top: -280rpx;
	right: -100rpx;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	margin-bottom: -200rpx;
}
.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	border-right: 2rpx solid #dedede;
	padding-right: 20rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 300rpx 0 120rpx 0;
	font-weight: bold;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
