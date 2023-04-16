/*
 * @Autor        : Pat
 * @Description  : Login
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-15 10:55:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-04 08:20:10
 */
import amb from "@/init/amb.js";
import Vue from "vue";
import { securityauth } from "@/api/index.js";
import Component from "vue-class-component";
import { namespace } from 'vuex-class';
import Storage from "@/config/Storage.js";
import "@/assets/scss/login.scss";
import axios from 'axios'
import api from "@/init/api.js";
import qs from 'qs'
const someModule = namespace('UserInfo');
@Component({})
export default class Login extends Vue {
	ruleForm = {
		account: "",
		password:""
	}
	constructor() {
		super();
		localStorage.removeItem("userInfo");
	}

	Login() {
		let _this=this;
		const { ruleForm } = this;
		this.$refs.ruleForm.validate(async (valid) => {
			if (valid) { 
				// const { result: { userInfo } } = await securityauth(ruleForm);
				// this.SET_USERINFO(userInfo);
				if (sessionStorage.getItem("token")){
					sessionStorage.removeItem('token')
				}
				
				securityauth(ruleForm).then(res=>{
					if(res.code=="0000"){
						sessionStorage.setItem('token',res.data);
						this.$router.push('/home');
					}else{
						this.$message({
							message: res.msg,
							type: 'warning'
						  });
					}
					
				})
				// `${api.requestUrl}/security/auth`
				// axios({
				// 	method:'post',
				// 	url:`${api.requestUrl}/security/auth`,
				// 	headers:{ 'Content-Type':'application/json'},
				// 	params:ruleForm
				// 	// 
				//   }).then(function(response) {
				// 		console.log('返回',response)
				//   });
				Storage.setItem('userInfo', ruleForm);
				
				// this.$router.push('/home');
			}  else {
				return false;
		  }
		})
	}

	render() {
		return (
			<div class={"login"}>
				<div class="wrap">
					<div class="container">
						<h1>登录</h1>
						<el-form 
							{...{props: {
								model: this.ruleForm,
								rules: {
									userName:[{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
									password:[{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }]
								}
							}}}
							ref="ruleForm" label-width="0" class="ruleForm">
							<el-form-item prop="account">
								<el-input type="text" placeholder="用户名" v-model={ this.ruleForm.account }></el-input>
							</el-form-item>
							<el-form-item  prop="password">
								<el-input type="password" placeholder="密码" v-model={ this.ruleForm.password }></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class="Login" onclick={ this.Login.bind(this)}>登录</el-button>
							</el-form-item>
						</el-form>
					</div>
					<ul>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		);
	}
}