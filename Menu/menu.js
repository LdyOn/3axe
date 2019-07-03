
(function(){
	
	var a = document.getElementById('menu').getElementsByTagName('a');
	//取消a标签的默认事件
	for (var i = 0; i < a.length; i++) {
		a[i].onclick = function(event){
			event.preventDefault();
		};
	}
	// 元素向下滑动
	//ele,待滑动的元素，distance,滑动的距离,step,速度
	function slide(ele,distance,step) {
		// console.log(ele.style.top);
		ele.top = Number(ele.style.top.slice(0,-2));
		// console.log(ele.top);
		var d = 0;
		function go() {
			ele.top += step;
			d += step;
			ele.style.top = ele.top+"px";
			if(Math.abs(d)<distance){
				setTimeout(go,30);
			}
			
		};

		go();
	}

	function handleSlide(){
		var a = [];
		for (var i = 0; i < items.length; i++) {
			a.push(items[i]);
		}
		//所有排在后面的同级菜单
		var af = a.slice(a.indexOf(this)+1);
		var asub = [];
		for ( var s = this.nextElementSibling; s!=af[0];s=s.nextElementSibling ) {
			asub.push(s);
		}
		//点击关闭菜单
		if(this.unfold){ 
			for (var i = 0; i < asub.length; i++) {
				asub[i].style.display = 'none';//子菜单显示
				//所有后面的同级菜单向下滑动
				// for (var j = 0; j < af.length; j++) {
				// 	slide(af[j],30,5);
				// }
			}
			this.getElementsByClassName('triangle')[0].textContent ='▶';
			this.unfold = false;
		}else{//点击打开菜单
			
			for (var i = 0; i < asub.length; i++) {
				asub[i].style.display = 'block';//子菜单显示
				//所有后面的同级菜单向下滑动
				// for (var j = 0; j < af.length; j++) {
				// 	slide(af[j],30,5);
				// }
			}
			this.getElementsByClassName('triangle')[0].textContent ='▼';
			this.unfold = true;
			
		}
		
	}
	//切换当前浏览菜单
	function handleChange(){
		if(this==now){
			return false;
		}else{
			if(now){
				now.getElementsByTagName('a')[0].style.color = '#F8F8FF';
			}
			now = this;
			now.getElementsByTagName('a')[0].style.color = '#7FFF00';
		}
	}

	var items = document.getElementsByClassName('item');
	//当前打开的条目
	var now = null;
	for (var i = 0; i < items.length; i++) {
		if(items[i].getElementsByClassName('triangle')[0] != null){
			items[i].addEventListener('click',handleSlide);
			items[i].unfold = false;//状态：未展开
		}
		items[i].addEventListener('click',handleChange);
	}

}());