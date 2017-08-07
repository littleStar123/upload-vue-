<template>
	<div>
		<el-row >
			<el-col :offset="10" :span="4">
				<el-button size="small" @click="sycdhpVisible=true">点击上传</el-button>
			</el-col>
		</el-row>
		<el-dialog title="上传文件" :visible.sync="sycdhpVisible" :data="fileData" size="large" top="10%" custom-class="customDialog ">
			<div class="tool">
				<input type="file" style="display: none;" id="iptAddFile"/>
				<el-button type="primary" icon="upload" @click="uploadFile" >上传</el-button>
				<el-button type="primary" icon="edit" @click="editFile">编辑</el-button>
				<el-button type="primary" icon="delete" @click="deleteFile">删除</el-button>
				<el-button type="primary" icon="plus" @click="addFile">新建文件夹</el-button>
			</div>
			<div class="file">
				<div class="heading" >
					<el-checkbox v-model="checkAll" @change="fileChooseAll()"></el-checkbox>
					<ul >
						<li @click="clickHeading()">首页</li>
						<li v-for="(item, index) in headFile" @click="clickHeading(item.id,index)"><i class="el-icon-arrow-right"></i>{{item.name}}</li>
					</ul>
				</div>
				<div class="filecontent">
					<ul>
						<li v-for="file in fileData">
							<div class="fileBlock" :class="{ active: file.checked }">
								<el-checkbox v-model="file.checked" @change="fileChoose(file)"></el-checkbox>
								<i v-if="file.type==1" class="el-icon-document" @click="enterFile(file)" style="color:#ffc86f;"></i>
								<i v-else-if="file.type=='.doc'||file.type=='.docx'" class="iconfont icon-word"  style="color:#50bfff;"></i>
								<i v-else-if="file.type=='.ppt'" class="iconfont icon-ppt"  style="color:#ff9696;"></i>
								<i v-else-if="file.type=='.xls'" class="iconfont icon-excel" style="color:#4dff91;"></i>
								<i v-else-if="file.type=='.zip'" class="iconfont icon-zip" style="color:#51c5ff;"></i>
								<i v-else-if="file.type=='.txt'" class="iconfont icon-txt" style="color:#97a8be;"></i>
								<!--未知类型的文件-->
								<i v-else class="el-icon-more" style="color:#97a8be;"></i>
								<div class="filename">{{file.name}}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'hello',
  data () {
    return {
     	sycdhpVisible:false,
     	checkAll:false,
     	textTrue:true,
     	//当前页面文件
		fileData:[{
			name:"网超文件",
			type:1,
			id:"001",
			checked:false,
			children:[]
		},{
			name:"票据文件",
			type:1,
			id:"002",
			checked:false,
			children:[{			
				name:"文件夹1",
				type:1,
				id:"1",
				checked:false,
				children:[{
					name:"文件夹1-1",
					type:1,
					id:"1-1",
					checked:false,
					children:[]
					}
				]
			},{
				name:"doc.doc",
				type:".doc",
				id:"2",
				checked:false
			},{
				name:"ppt.ppt",
				type:".ppt",
				id:"3",
				checked:false
			},{
				name:"excel.xls",
				type:".xls",
				id:"4",
				checked:false
			},{
				name:"zip.zip",
				type:".zip",
				id:"5",
				checked:false
			},{
				name:"txt.txt",
				type:".txt",
				id:"6",
				checked:false
			}]
		}
		],
		allFileData:[{
			name:"网超文件",
			type:1,
			id:"001",
			checked:false,
			children:[]
		},{
			name:"票据文件",
			type:1,
			id:"002",
			checked:false,
			children:[{			
				name:"文件夹1",
				type:1,
				id:"1",
				checked:false,
				children:[{
					name:"文件夹1-1",
					type:1,
					id:"1-1",
					checked:false,
					children:[]
					}
				]
			},{
				name:"doc.doc",
				type:".doc",
				id:"2",
				checked:false
			},{
				name:"ppt.ppt",
				type:".ppt",
				id:"3",
				checked:false
			},{
				name:"excel.xls",
				type:".xls",
				id:"4",
				checked:false
			},{
				name:"zip.zip",
				type:".zip",
				id:"5",
				checked:false
			},{
				name:"txt.txt",
				type:".txt",
				id:"6",
				checked:false
			}]
		}
		],
		headFile:[]
    }
  },
  methods:{
  	//选中文件
	fileChoose(file){
		
	},
	//全选
	fileChooseAll(){
		if(this.checkAll){
			for(var i=0;i<this.fileData.length;++i){
				this.fileData[i].checked=true;
			}
		}else{
			for(var i=0;i<this.fileData.length;++i){
				this.fileData[i].checked=false;
			}
		}
		
	},
	//修改文件名
	editFile(){
		let fileCheck=[];
		let that=this;
		$.each(this.fileData,function(index,val){
			if(val.checked){
				fileCheck.push(index);
			}
		});
		if(fileCheck.length==0){
				that.$message({
		          showClose: true,
		          message: '请选择要修改的文件',
		          type: 'error'
		       });
		}else if(fileCheck.length>1){
				that.$message({
		          showClose: true,
		          message: '只能修改一个文件',
		          type: 'error'
		       });
			}else{
				that.$prompt('请输入文件夹名称', '修改文件夹', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: ''
				}).then(({
					value
				}) => {
					var type=this.getFileType(value);
					this.fileData[fileCheck[0]].type=type;
					this.fileData[fileCheck[0]].name=value;
					//提交修改
				}).catch(() => { //取消输入

				});
			}
	},
	//删除文件
	deleteFile(){
		let that=this;
		$.each(this.fileData,function(index,val){
			if(val.checked){
				that.fileData.splice(index,1);
				//提交修改
			}
		});
	},
	//上传文件
	uploadFile(){
		$("#iptAddFile").click();
	},
	//新增文件夹
	addFile(){
		this.$prompt('请输入文件夹名称', '新增文件夹', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputValue: ''
		}).then(({
			value
		}) => {
			var len=this.fileData.length;
			var id=this.getFileId(len);
			let newFile={
				name:value,
				type:1,
				checked:false,
				id:id,
				children:[]
			}
			this.fileData.push(newFile);
			//提交修改
			
		}).catch(() => { //取消输入

		});
	},
	//生成一个个当前层不重复的id
	getFileId(len){
		let id=(Math.random()*len)>>0;
		for(var i=0;i<this.fileData.length;++i){
			if(this.fileData[i].id==id){
				this.getFileId(len);
			}
		}
		return id;
	},
	//进入文件
	enterFile(file){
		this.fileData=file.children;
		var thishead={
			name:file.name,
			id:file.id
		}
		this.headFile.push(thishead);
	},
	//根据headFile寻找目录，返回其子集
	findChildMenu(headFile,allFileData){
		var layer=allFileData;
		for(var i=0;i<headFile.length;i++){
			for(var j=0;j<layer.length;j++){
				if(headFile[i].id==layer[j].id){
					layer=layer[j].children;
				}
			}
		}
		return layer;
	},
	//点击导航栏（上N级目录）
	clickHeading(id,index){
		if(id){
			this.headFile.splice(index+1,(this.headFile.length-index-1));
			this.fileData=this.findChildMenu(this.headFile,this.allFileData);
		}else{
			this.headFile.length=0;
			this.fileData=this.allFileData;
		}
	},
	//文件类型
	getFileType(fileName){
		var indexDot=fileName.lastIndexOf(".");
		var type=fileName.substr(indexDot);
		return type;
	}
  }
}
</script>
<style>

	.el-dialog__body{
		height:600px;
	}
	/*文件夹*/
	.addFile{
		font-size: 12px!important;
		color:#8391a5!important;
	}
	/*网盘形式*/
	.customDialog{
		width: 65%;
	}
	.heading{
		margin-top: 20px;
		border-bottom:2px solid #ccc;
		border-top:2px solid #ccc;
	}
	.heading ul{
		display: inline-block;
	}
	.heading ul li{
		display: inline-block;
		list-style: none;
		max-width:100px ;
		text-overflow: ellipsis;
		overflow: hidden;
		cursor: pointer;
		cursor: hand;
	}
	.filecontent ul{
		padding: 0;
	}
	.filecontent ul li{
		display: inline-block;
		list-style: none;
		width:22%;
		margin: 10px;
		height: 180px;
	}
	.filecontent ul li:hover .fileBlock{
		background: #E7E7EB;
	} 
	.fileBlock.active{
		background: #E7E7EB;
	}
	.fileBlock {
		margin:20px;
	}
	.fileBlock i{
		display: block;
		text-align: center;
		font-size: 80px;
	}
	.fileBlock .filename{
		padding: 10px;
		text-align: center;
	}
</style>
