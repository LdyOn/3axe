window.onload = function () {
	var uploadimg = document.getElementsByName("uploadimg")[0];
	if(uploadimg.type !== "file");
	var url = uploadimg.getAttribute("data-uploadto");
	uploadimg.addEventListener("change", function(){
		var file = this.files[0];
		if(!file)return;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.upload.onprogress = function(e){
		
			if(e.lengthComputable){
				var percent = Math.round(e.loaded/e.total*100);
				var mesg = percent+"%";
				var p = document.getElementById("progress-text");
				p.innerHTML = mesg;
				var bar = document.getElementsByClassName(
					"progress-bar")[1].style.width = percent*2+"px";
			}
		};
		xhr.send(file);
	},false);
};