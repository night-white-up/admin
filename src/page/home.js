/*
 * @Author: your name
 * @Date: 2022-05-02 16:58:48
 * @LastEditTime: 2023-04-16 22:18:00
 * @LastEditors: chenjieweb 1030884759@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \admin\src\page\home.js
 */
import amb from "@/init/amb.js";
import Vue from "vue";
import Component from "vue-class-component";
import TableList from "@/components/tableList/index.js";
import "@/assets/scss/home.scss"
import Dialog from "@/components/dialog/Index.js";
import {movielist,movie,deletemovie,putmovie,movieTypelist} from "@/api/index.js";
@Component({
	comments:{
		
	}
})
export default class Hmoe extends Vue {
	SYS_INFO = {
		name: amb.moduleName,
		ename: amb.moduleEname,
		style: {
			home: {
				padding: "20px",
				width: "100%",
				height: "100%",
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
			title: {
				color: "#2e2a58",
				fontSize: "36px",
			},
			span: {
				color: "#2196F3",
			},
			main: {},
		},
	};

	constructor() {
		super();
		this.getData();
		this.poupObj=null;
		this.movietype=[]
	}

	async getData() {
		
	}
 /**
  * @Descripttion: 增加电影
  * @Author:
  * @Date: 2022-05-03 15:44:23
  * @LastEditors: 
  * @param {*}
  * @return {*}
  */	
	addmovie(){
		let _this=this;
		// this.movietype
		this.poupObj.init({
			title: "新增",
			labelWidth: "70px",
			width:"400px",
			body: [
			  {
				name: "名称",
				placeholder: ``,
				type: "input",
				fromName: "name",
				value: '',
			  },
			  {
				name: "电影类型",
				placeholder: ``,
				type: "select",
				fromName: "typeId",
				option:_this.movietype,
				value: '',
			  },
			  {
				name: "导演",
				placeholder: ``,
				type: "input",
				fromName: "toStar",
				value: '',
			  },
			  {
				name: "内容简介",
				placeholder: ``,
				type: "textarea",
				fromName: "introduce",
				value: '',
			  },
			
			  {
				name: "上传图片",
				placeholder: ``,
				type: "upload",
				fromName: "upload",
				value: '',
			  },
			],
			placeholder: null,
			submit: (e) => {
					if(!e.upload){
						this.$message({
							message: '请上传图片',
							type: 'warning'
						  });
						return ;
					}
					_this.uploadImgToBase64(e.upload).then(res=>{
						movie({name:e.name,introduce:e.introduce,toStar:e.toStar,poster:res,typeId:e.typeId}).then((ressult)=>{
							if(ressult.code=='0000'){
								_this.$message({
									message: '新增成功',
									type: 'success'
								  });
								  _this.rendertablelist()
							}else{
								// _this.$message({
								// 	message: res.msg,
								// 	type: 'warning'
								//   });
							}
						})
						
					})
					
				// 	
				// _this.rendertablelist()
			 	
			 
			},
			//  rules:self.Pouprules,
		});
	}
	uploadImgToBase64(file) {
		// 核心方法，将图片转成base64字符串形式
		return new Promise((resolve, reject) => {
		  const reader = new FileReader();
		  reader.readAsDataURL(file);
		  reader.onload = function () {
			// 图片转base64完成后返回reader对象
		
		
			resolve(reader.result);
		  };
		  reader.onerror = reject;
		});
	 }

 /**
  * @Descripttion: 展示详情
  * @Author:
  * @Date: 2022-05-03 15:51:20
  * @LastEditors: 
  * @param {*} val
  * @return {*}
  */	
	showdetail(val){
		console.log('结果',val)
		let _this=this;
		this.poupObj.init({
			title: "详情",
			labelWidth: "70px",
			width:"400px",
			body: [
			  {
				name: "名称",
				placeholder: ``,
				type: "input",
				disabled:true,
				fromName: "name",
				value:val.name,
			  },
			  {
				name: "电影类型",
				placeholder: ``,
				type: "select",
				fromName: "typeId",
				option:_this.movietype,
				disabled:true,
				value:val.typeId,
			  },
			  {
				name: "导演",
				placeholder: ``,
				type: "input",
				fromName: "toStar",
				disabled:true,
				value:val.toStar,
			  },
			  {
				name: "演员",
				placeholder: ``,
				type: "textarea",
				fromName: "introduce",
				disabled:true,
				value:val.introduce,
			  },
			  {
				name: "上传图片",
				placeholder: ``,
				type: "upload",
				disabled:true,
				fromName: "upload",
				value:val.poster,
			  },
			],
			placeholder: null,
			submit: (e) => {
			 	console.log('保存',e)
			 
			},
			//  rules:self.Pouprules,
		});




	}
	delete(val){
		let _this=this;
		this.$confirm('是否删除?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		  }).then(() => {
			 
			deletemovie({id:val.id}).then((res)=>{
				_this.rendertablelist();
			})
		  }).catch(() => {
			this.$message({
			  type: 'info',
			  message: '已取消删除'
			});          
		  });
	}
 /**
  * @Descripttion: 
  * @Author: 编辑
  * @Date: 2022-05-03 15:59:31
  * @LastEditors: 
  * @param {*} val
  * @return {*}
  */	
	edit(val){
		
		let _this=this;
		this.poupObj.init({
			title: "编辑",
			labelWidth: "70px",
			width:"400px",
			body: [
			  {
				name: "名称",
				placeholder: ``,
				type: "input",
				fromName: "name",
				value:val.name,
			  },
			  {
				name: "导演",
				placeholder: ``,
				type: "input",
				fromName: "toStar",
				value:val.toStar,
			  },
			  {
				name: "电影类型",
				placeholder: ``,
				type: "select",
				fromName: "typeId",
				option:_this.movietype,
				value: val.typeId,
			  },
			  {
				name: "简介",
				placeholder: ``,
				type: "textarea",
				fromName: "introduce",
				
				value:val.introduce,
			  },
			  {
				name: "上传图片",
				placeholder: ``,
				type: "upload",
				fromName: "upload",
				value:val.poster,
			  },
			],
			placeholder: null,
			submit: (e) => {
				
				if(e.upload instanceof File){
					_this.uploadImgToBase64(e.upload).then((res)=>{
						console.log('返回',res)
						putmovie({toStar:e.toStar,name:e.name,introduce:e.introduce,poster:res,id:val.id,typeId:e.typeId}).then(res=>{
								if(res.code=="0000"){
									_this.rendertablelist();//渲染表格
								}else{
									_this.$message({
										message: res.msg,
										type: 'warning'
									  });
								}
						})
					
					})
				}else{	
					putmovie({toStar:e.toStar,name:e.name,introduce:e.introduce,id:val.id,poster:val.poster,typeId:e.typeId}).then(res=>{
						if(res.code=="0000"){
							_this.rendertablelist();//渲染表格
						}else{
							_this.$message({
								message: res.msg,
								type: 'warning'
							  });
						}
				})
					// putmovie()

				}

				// putmovie
				
			 	
			 
			},
			//  rules:self.Pouprules,
		});
	}
	mounted(){
		this.rendertablelist();//渲染表格
		this.poupObj = new Dialog(this.$refs.dialogForm); //创建弹框对象
	}
	created(){
		movieTypelist().then((res)=>{
			if(res instanceof Array){
				res.forEach((item)=>{
					this.movietype.push({
						label:item.name,
						value:item.id
					})
				})
			}
			
		})
	}
 /**
  * @Descripttion: 渲染表格
  * @Author: 
  * @Date: 2022-05-03 11:07:58
  * @LastEditors: 
  * @param {*}
  * @return {*}
  */	
	rendertablelist(){
		let _this=this;
		let tableData= [
			{
				readNmae: "",
				date: "2016-05-02",
				name: "王小虎",
				state: 1,
				address: "上海市普陀区金沙江路 1518 弄"
			},
			{
				date: "2016-05-04",
				name: "王小虎",
				state: 0,
				address: "上海市普陀区金沙江路 1517 弄"
			},
			{
				date: "2016-05-01",
				name: "王小虎",
				state: 2,
				address: "上海市普陀区金沙江路 1519 弄"
			},
			{
				date: "2016-05-03",
				name: "王小虎",
				state: 1,
				address: "上海市普陀区金沙江路 1516 弄"
			}
		]
		new TableList(document.getElementById('movieadmin-table')).initTable({
			total: 30,
			isShowSelection: false,
			isShowNumber: true,
			align: "left",
			pageShow:false,
			page: {
				size: 10,
				sizes: [10, 20, 50, 100],
				current: 1,
				handleSizeChange(val) {
					console.log(`每页 ${val} 条`);
				},
				handleCurrentChange(val) {
					console.log(`当前页: ${val}`);
				}
			},
			tableData:tableData,
			condition: [
				{
					width: "180",
					prop: "name",
					label: "名称"
				},
				{
					prop: "toStar",
					label: "导演"
				},
				{
					prop: "introduce",
					label: "介绍",
					
				},
				{
					type: "operation",
					label: "操作",
					prop: [
						{
							name: "查看",
							handleClick: val => {
								_this.showdetail(val)
								
							},
							size: "small"
						},
						{
							name: "编辑",
							handleClick: val => {
								_this.edit(val)
							},
							size: "small"
						},
						{
							name: "删除",
							type:'danger',
							handleClick: val => {
								_this.delete(val)
							},
							size: "small"
						}
					]
				}
			]
		})
	
	}

	render() {
		
		return (
			<div id="movieadmin">
				 <el-button type="primary" on-Click={()=>{this.addmovie()}}>新增</el-button>
				<div class="movieadmin-table" id="movieadmin-table"></div>
				<div ref="dialogForm"></div>
			</div>
		);
	}
}