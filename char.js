
function Char(opt){
	//定义一个默认的参数，类型是柱状图
	this.config={
		width:300,
		height:150,
		type:'column'
	}
	
	for(var key in opt){
		this.config[key]=opt[key];
	}
	
	var container=document.querySelector(this.config.target);
	container.style.width=this.config.width+'px';
	container.style.height=this.config.height+'px';
	container.style.border='1px solid black';
	container.style.margin='50px auto';
	
	var cvs=document.createElement('canvas');
	cvs.width=this.config.width;
	cvs.height=this.config.height;
	container.appendChild(cvs);
	
	this.ctx=cvs.getContext('2d');
	//定义单位是
	this.vw=this.config.width*0.01;
	this.vh=this.config.height*0.01;
	
	this.point=[{x:10*this.vw,y:10*this.vh},{x:10*this.vw,y:90*this.vh},{x:90*this.vw,y:90*this.vh}];
	
	//设置扇形图原点
	this.point1={x:50*this.vw,y:50*this.vh}
	
	this.init();
}

Char.prototype={
	init:function(){
		this['draw'+this.config.type]();
	},
	//画柱状图
	drawcolumn:function(){
		var ctx=this.ctx;
		var point=this.point;
		
		ctx.moveTo(point[0].x,point[0].y);
		ctx.lineTo(point[1].x,point[1].y);
		ctx.lineTo(point[2].x,point[2].y);		
		ctx.stroke();
		
		var num=this.config.data.length*2;
//		console.log(num);
		var max=this.getMax();
//		console.log(max);
		var ydeep=parseInt(max/num);
		var hdeep=(this.vh*80-20)/num;
		
		ctx.textAlign='right';
		ctx.textBaseline='middle';
		
		for(var i=0;i<=num;i++){
			ctx.beginPath();
			ctx.fillText(ydeep*i,point[1].x-5,point[1].y-hdeep*i);
			
			if(i>0){
				ctx.beginPath();
				ctx.moveTo(point[1].x,point[1].y-hdeep*i);
				ctx.lineTo(point[2].x,point[2].y-hdeep*i);
				ctx.stroke();
			}
		}
		
		var data=this.config.data;
		var width=this.vw*70/num;
		var bili=hdeep/ydeep;
		ctx.textAlign='center';
		for(var i=0;i<data.length;i++){
			ctx.beginPath();
			ctx.rect(point[1].x+width*(2*i+1),point[1].y,width,-data[i].money*bili);
			ctx.fillStyle=data[i].color;
			ctx.fill();
			
			ctx.beginPath();
			ctx.fillText(data[i].name,point[1].x+width*(2*i+1.5),point[1].y+10);
		}
	},
	//画扇形图
	drawfan:function(){
		var ctx=this.ctx;
		var point=this.point1;
		var data=this.config.data;
		var totalMoneys=0;
		var vw=this.vw;
		var vh=this.vh;
		var width=5*vw;
		var height=5*vh;
		for(var key in data){
			totalMoneys+=data[key].money;
		}
		var bili=2*Math.PI/totalMoneys;
		ctx.save();
		ctx.translate(point.x,point.y);
		for(var i=0;i<data.length;i++){
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.arc(0,0,25*this.vw,0,data[i].money*bili);
			ctx.fillStyle=data[i].color;
			ctx.fill();
			ctx.rotate(data[i].money*bili);
		}
		
		ctx.textAlign='left';
		ctx.textBaseline='top';
		ctx.translate(-point.x,-point.y+5*vh);
		for(var i=0;i<data.length;i++){
			ctx.beginPath();
			ctx.rect(5*vw,7*i*vh,width,height);
			ctx.fillStyle=data[i].color;
			ctx.fill();
			
			ctx.beginPath();
			ctx.fillText(data[i].name,11*vw,7*i*vh);
		}
		
		
	},
	//画折线图
	drawline:function(){
		var ctx=this.ctx;
		var point=this.point;
		//画x，y轴
		ctx.moveTo(point[0].x,point[0].y);
		ctx.lineTo(point[1].x,point[1].y);
		ctx.lineTo(point[2].x,point[2].y);		
		ctx.stroke();
		//将y轴分为几段
		var num=this.config.data.length*2;
//		console.log(num);
		//得到金额的（y轴）最大值
		var max=this.getMax();
//		console.log(max);
		//x轴的间隔
		var ydeep=parseInt(max/num);
		//y轴的间隔
		var hdeep=(this.vh*80-20)/num;
		
		ctx.textAlign='right';
		ctx.textBaseline='middle';
		
		for(var i=0;i<=num;i++){
			ctx.beginPath();
			//写y轴的金额
			ctx.fillText(ydeep*i,point[1].x-5,point[1].y-hdeep*i);
			
			if(i>0){
				ctx.beginPath();
				ctx.moveTo(point[1].x,point[1].y-hdeep*i);
				ctx.lineTo(point[2].x,point[2].y-hdeep*i);
				ctx.stroke();
			}
		}
		
		var data=this.config.data;
		var width=this.vw*70/num;
		var bili=hdeep/ydeep;
		ctx.textAlign='center';
		ctx.beginPath();
		ctx.moveTo(point[1].x+width*(2*0+1)+0.5*width,point[1].y-data[0].money*bili);
		for(var i=1;i<data.length;i++){
			ctx.lineTo(point[1].x+width*(2*i+1)+0.5*width,point[1].y-data[i].money*bili);
		}
		
		ctx.stroke;
		for(var i=0;i<data.length;i++){

			ctx.stroke();
			
			ctx.beginPath();
			ctx.fillStyle=data[i].color;
			ctx.fillText(data[i].name,point[1].x+width*(2*i+1.5),point[1].y+10);
		}
		
	},
	
	getMax:function(){
		var data=this.config.data;
		var moneys=[];
		
		for(var i=0;i<data.length;i++){
			moneys.push(data[i].money);
		}
		
		return Math.max.apply(null,moneys);
	}
}





















