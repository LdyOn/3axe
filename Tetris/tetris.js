//全局变量config，保存游戏配置
var config = {
	"box_width":500,//游戏框宽度，单位px
	"box_height":650,//游戏框长度，单位px
	"fall_speed":1,//下落速度
	"move_speed":2,//左右移动s速度
	"cube_size":20,//小方块的尺寸,单位px
};
/*
*定义一个cube类，用这个cube类来实现下落的方块
*/
//site数组保存每个小方块的坐标，center保存旋转中心点的坐标
function Cube(site,center) {
	this.site = site;
	this.center = center;
}
//定义类原型
Cube.prototype = {
	//下落
	fall:function(){
		for (var i = 0; i < this.site.length; i++) {
			this.site[i]["y"] += config["fall_speed"];
		}
	},
	//左右移动,1:右移，-1：左移
	move:function(direction){
		for (var i = 0; i < this.site.length; i++) {
			this.site[i]["x"] += config["move_speed"]*direction;
		}
	},
	//旋转，direction为1，顺时针旋转九十度，-1则逆时针旋转九十度
	rotate:function (direction) {		
		for (var i = 0; i < this.site.length; i++) {
			var tmp = 0;
			tmp = this.site[i]["x"];
			this.site[i]["x"] = this.site[i]["y"]*direction;
			this.site[i]["y"] = -tmp*direction;
		}
		
	},
	//绘制方块
	draw:function(){
		
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
		console.log(div.getBoundingClientRect());
	},
	//开始游戏
	startGame:function(){

	},
	//结束游戏
	endGame:function(){

	}
};

