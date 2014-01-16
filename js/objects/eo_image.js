
function EOImage(x,y,w,h,data){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOImage.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var imgObj=document.createElement("img");
		divObj.class="ui-widget-content";
		divObj.style.cursor="pointer";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.borderStyle="dotted";
		divObj.style.borderWidth="1px";
		$(divObj).append(imgObj);
		imgObj.style.width="100%";
		imgObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var imgObj=document.createElement("img");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.borderStyle="dotted";
		divObj.style.borderWidth="1px";
		$(divObj).append(imgObj);
		imgObj.style.width="100%";
		imgObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
	
	}

}
