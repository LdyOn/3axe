//全局变量config，保存游戏配置
var config = {
	"box_width":500,      //游戏框宽度，单位px
	"box_height":650,     //游戏框高度，单位px
	"fall_speed":1,       //下落速度
	"cube_size":20,       //小方块的尺寸,单位px
	"half_cube_size":10,  //半边长度,单位px
	"color":["#FFCC66","#C0C0C0","#FF0000","#FF33CC"],//颜色
	center:{     //投放中心点
		x:250,
		y:60,
	},
	"cubes_site":[ //方块初始坐标
		[{"x":0,"y":0}],//一个方块
		[{"x":0,"y":0},{"x":0,"y":-20}],//两个方块
		[{"x":0,"y":0},{"x":0,"y":-20},
		{"x":0,"y":-40},{"x":0,"y":20}],//四个方块，长条形
		[{"x":0,"y":-40},{"x":0,"y":-20},
		{"x":0,"y":0},{"x":20,"y":0}],//四个方块，L字型
		[{"x":0,"y":-40},{"x":0,"y":-20},
		{"x":0,"y":0},{"x":-20,"y":0}],//四个方块，L字型
		[{"x":0,"y":-20},{"x":-20,"y":0},
		{"x":0,"y":0},{"x":20,"y":0}],//四个方块，品字型
		[{"x":0,"y":-20},{"x":0,"y":0},
		{"x":20,"y":0},{"x":20,"y":20}],//四个方块，Z字型
	],

};

/*
*定义一个cubes_site类，用这个cubes_site类来实现下落的方块
*/
//cubes_site数组保存每个小方块的坐标，
//center保存初始旋转中心点的坐标
//box是游戏框对象
//game是Game对象
function Cube(cubes_site,game) {
	this.cubes_site = [];//小方块坐标
	for (var i = 0; i < cubes_site.length; i++) {
		var c = {};
		c.x = cubes_site[i].x;
		c.y = cubes_site[i].y;
		this.cubes_site.push(c);
	}
	this.cubes = []; //小方块div对象
	this.center = {};//初始化旋转中心点
	this.center.x = config.center.x;
	this.center.y = config.center.y;
	//console.log(config.center);
	this.box = game.box; //指向box 框
	this.game = game;    //指向游戏类
	this.distance = 0;    //下落距离
	var init_rotate = randomNum(0,3); //初始化旋转
	for (var i = 0; i <init_rotate; i++) {
		this.rotate(1);
	}
	this.draw();
	// this.bindEvent();
}
//定义类原型
Cube.prototype = {
	//下落
	fall:function(){
		this.distance += config["fall_speed"];//增加行进距离
		this.center.y += config["fall_speed"];//改变中心点坐标
		for (var i = 0; i < this.cubes_site.length; i++) {			
			this.cubes[i].top += config["fall_speed"];//改变实时坐标
			this.cubes[i].style.top = this.cubes[i].top+"px";//设置位置属性			
		}
		// console.log(this.distance);
	},
	//左右移动,1:右移，-1：左移
	move:function(direction){
		if(this.moveCollision(direction))
			return;
		var d = config["cube_size"]*direction;
		//移动中心点
		this.center.x += d;
		//移动小方块
		for (var i = 0; i < this.cubes_site.length; i++) {
			this.cubes[i].left += d;
			this.cubes[i].style.left = this.cubes[i].left+"px";
		}
	},

	//移动碰撞
	moveCollision:function(direction){
		for (var i = 0; i < this.cubes.length; i++) {
			//不能移出游戏框,触碰到边界则返回true
			if(direction==-1 && this.cubes[i].left == 0){
				return true;
			}else if(direction==1 && this.cubes[i].left == 
				config.box_width-config.cube_size
				){
				return true;
			}else{//检测和落地的方块是否相撞

			}
				
		}

		return false;
			
	
	},

	// 绕center中心点旋转旋转，direction=1，顺时针旋转九十度，
	// direction=-1则逆时针旋转九十度
	rotate:function (direction) {	
		//改变相对于中心点的坐标	
		for (var i = 0; i < this.cubes_site.length; i++) {
			var tmp = 0;
			tmp = this.cubes_site[i]["x"];
			this.cubes_site[i]["x"] =
			this.cubes_site[i]["y"]*direction;
			this.cubes_site[i]["y"] = -tmp*direction;
			
		}
		
	},

	//响应旋转事件
	rotateEvent:function(){
		this.rotate();
		for (var i = 0; i < cubes.length; i++) {
			var site = this.siteConvert(this.cubes_site[i]["x"],
				this.cubes_site[i]["y"]);
			cubes[i].top = site.y;
			cubes[i].left = site.x;
			cubes[i].style.top = site.y+"px";
			cubes[i].style.left = site.x+"px";
		}
	},

	
	//在box中显示方块
	draw:function(){
		for (var i = 0; i < this.cubes_site.length; i++) {
			var div = document.createElement("div");
			//console.log(this.center["x"]);
			var site = this.siteConvert(this.cubes_site[i]["x"],
				this.cubes_site[i]["y"]);
			div.top = site.y;//相对于box元素的纵坐标
			div.left = site.x;//相对于box元素的横坐标
			div.style.top = site.y+"px";//设置style属性，进行定位
			div.style.left = site.x+"px";
			//给小方块添加边框要考虑到边框占据的像素，
			//这里用随机颜色加以区分
			// div.style.backgroundColor = config.color[randomNum(0,3)];
			div.className =  "cube";
			this.cubes.push(div);
			this.box.appendChild(div);
		}
	},
	
	//坐标转换,把相对于旋转中心的坐标转换为box中的坐标
	siteConvert:function (x,y) {
		var site = {};
		site.x = x-config.half_cube_size+this.center["x"];
		site.y = y-config.half_cube_size+this.center["y"];

		return site;
	},

};

//定义box类，绘制游戏区域
function Game() {
	this.box_width = config.box_width;
	this.box_height = config.box_height;
	this.map_blocks = {}; // 已降落的方块
	for (var i = 0; i < config.box_width; i+=config.cube_size) { //初始化
		this.map_blocks[i] = [config.box_height];
	}
	this.bindEvent();
	console.log(this.map_blocks);
}
//box类原型
Game.prototype = {
	//绘制游戏区域
	draw:function(){
		var div = document.createElement("div");
		div.id = "#box";
		div.style.width = this.box_width+"px";
		div.style.height = this.box_height+"px";
		div.style.borderStyle = "solid";
		div.style.borderWidth = "10px";
		div.style.borderColor = "#33FF33";
		div.style.position = "fixed";
		div.style.backgroundColor = "#00CCFF";
		div.style.left = (window.innerWidth-this.box_width)/2+"px";
		div.style.top = "30px";
		document.body.appendChild(div);
		
		this.box = div;
				
	},

	//绑定事件
	bindEvent:function(){
		var game = this;
		document.onkeydown = function (event) {
			if(event.keyCode==39){//右箭头，右移方块
				game.blocks.move(1);
			}else if(event.keyCode==37){ //左移方块
				game.blocks.move(-1);
			}
		};
	},
	
	//开始游戏
	startGame:function(){
		//清空屏幕
		document.body.innerHTML = '';	
		//绘制游戏区域	
		this.draw();
		
		//随机生成一组方块，投放方块到box
		var blocks = new Cube(config.cubes_site[randomNum(0,6)],this);
		//在game对象中保存对blocks的引用
		this.blocks = blocks;
		//定义游戏状态
		var game_state = 1;
		//保存game对象
		var game = this;
		run();

		function run() {
			//下落碰撞检测
			if(game.fallCollision(blocks)){
				if(blocks.distance==0){
					game_state = 0;//结束游戏
				}else{ //处理落下的方块并且生成新的方块
					game.addNewBlocks(blocks);
					blocks = new Cube(config.cubes_site[randomNum(0,6)],game);
					game.blocks = blocks;
				}
			}else{
				blocks.fall(); //go
			}

			if(game_state==1){
				setTimeout(run,30);
			}else{
				game.endGame();
			}
		}
		
	},

	//“吸收”新的方块
	addNewBlocks:function(blocks){
		for (var i = 0; i < blocks.cubes.length; i++) {
			this.map_blocks[blocks.cubes[i].left].push(
				blocks.cubes[i].top);
		}
	},

	//碰撞检测，与已存在的方块或底部相撞
	fallCollision: function(blocks) {
		var x,y;
		for (var i = 0; i < blocks.cubes.length; i++) {
			x = blocks.cubes[i].left;
			y = blocks.cubes[i].top;
			if(this.map_blocks[x].some(function(u){
				return u-y <= config.cube_size;
			})){
				return true;
			}
			
		}
		return false;
	},

	//运行游戏
	// run:function(){			
	// 	//随机生成一个方块，投放方块到box
	// 	var blocks = new Cube(config.cubes_site[randomNum(0,6)],this);

		
	// },
	//碰撞检测
	// collide:function(){

	// },
	//结束游戏
	endGame:function(){
		// console.log("Game Over");
		//打印一个游戏结束框
		var div = document.createElement("div");
		div.className = "over";
		var node = document.createTextNode("Game Over!");
		div.appendChild(node);

		//给div块绑定事件
		div.onmouseover = function(){
			this.textContent = "Click to restart.";
		};

		div.onmouseout = function(){
			this.textContent = "Game Over!";
		};

		div.onclick = function(){
			var game = new Game();
			game.startGame();
		};

		//添加到游戏框
		this.box.appendChild(div);
	},
};

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 















