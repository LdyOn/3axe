window.onload = function () {
	// console.log(File);
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
				var mesg=Math.round(e.loaded/e.total*100)+"% complete";
				var p = document.getElementById("progress");
				p.innerHTML = mesg;
			}
		};
		xhr.send(file);
	},false);
};