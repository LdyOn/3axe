//全局变量config，保存游戏配置
var config = {
	"box_width":500,//游戏框宽度，单位px
	"box_height":650,//游戏框长度，单位px
	"fall_speed":1,//下落速度
	"move_speed":2,//左右移动s速度
	"cubes_site_size":20,//小方块的尺寸,单位px
	center:{
		"x":this.box_width/2,
		"y":this.cubes_site_size*4,
	},
};
/*
*定义一个cubes_site类，用这个cubes_site类来实现下落的方块
*/
//cubes_site数组保存每个小方块的坐标，center保存初始旋转中心点的坐标
function Cube(cubes_site) {
	this.cubes_site = cubes_site;
	this.cubes = [];
	this.center = config.center;
}
//定义类原型
Cube.prototype = {
	//下落
	fall:function(){
		for (var i = 0; i < this.cubes_site.length; i++) {
			this.cubes_site[i]["y"] += config["fall_speed"];
		}
	},
	//左右移动,1:右移，-1：左移
	move:function(direction){
		for (var i = 0; i < this.cubes_site.length; i++) {
			this.cubes_site[i]["x"] += config["move_speed"]*direction;
		}
	},
	//旋转，direction为1，顺时针旋转九十度，-1则逆时针旋转九十度
	rotate:function (direction) {		
		for (var i = 0; i < this.cubes_site.length; i++) {
			var tmp = 0;
			tmp = this.cubes_site[i]["x"];
			this.cubes_site[i]["x"] = this.cubes_site[i]["y"]*direction;
			this.cubes_site[i]["y"] = -tmp*direction;
		}
		
	},
	//生成方块
	generate:function(){
		
	},
	//在box中显示方块
	draw:function(box){
		for (var i = 0; i < this.cubes_site.length; i++) {
			var div = document.createElement("div");
			div.style.top = this.cubes_site[i]["y"];
			div.style.left = this.cubes_site[i]["x"];
			div.className =  "cube";
			this.cubes.push(div);
			box.appendChild(div);
		}
	},
	//碰撞检测
	collide:function(){

	},

};

//定义box类，绘制游戏区域
function Box() {
	this.box_width = config.box_width;
	this.box_height = config.box_height;
}
//box类原型
Box.prototype = {
	//绘制游戏区域
	draw:function(){
		var div = document.createElement("div");
		//console.log(this.box_width,this.box_height);
		div.id = "#box";
		div.style.width = this.box_width+"px";
		div.style.height = this.box_height+"px";
		div.style.borderStyle = "solid";
		div.style.borderWidth = "10px";
		div.style.borderColor = "#33FF33";
		div.style.margin = "auto";
		div.style.backgroundColor = "#00CCFF";
		document.body.appendChild(div);
		var pos = div.getBoundingClientRect();
		this.box = div;
		this.box_x = pos.left;
		this.box_y = pos.top;
	},
	//开始游戏
	startGame:function(){
		
		this.draw();
		this.run();
		
	},
	//运行游戏
	run:function(){
		//定义各种不同组合的方块
		var cubes_site = [
			[{"x":0,"y":0}],
			[],
			[],
		];
		//投放方块到box
		var multi = new Cube(cubes_site[0]);
		multi.draw(this.box);
	},
	//结束游戏
	endGame:function(){

	},
};















