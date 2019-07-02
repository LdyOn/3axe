


(function(){

	var a = document.getElementsByTagName('a');
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
			if(d<distance){
				setTimeout(go,30);
			}
			
		};

		go();
	}

	function handleSlide(){
		// console.log(items);
		// var a = Array.slice.call(items,0);
		var a = [];
		for (var i = 0; i < items.length; i++) {
			a.push(items[i]);
		}
		var af = a.slice(a.indexOf(this)+1);
		// console.log(af);
		for (var i = 0; i < af.length; i++) {
			slide(af[i],30);
		}
	}

	var items = document.getElementsByClassName('item');
	for (var i = 0; i < items.length; i++) {
		if(items[i].getElementsByClassName('triangle')[0] != null){
			items[i].addEventListener('click',handleSlide);
		}
	}



}());