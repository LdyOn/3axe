//全局变量config，保存游戏配置
var config = {
	"box_width":400,//游戏框宽度，单位px
	"box_height":800,//游戏框长度，单位px
	"fall_speed":1,//速度
	"move_speed":2,//速度
	"cube_size":20,//单位px
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

