
function EODiv(x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EODiv.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var dObj=document.createElement("div");
		divObj.class="ui-widget-content";
		divObj.style.cursor="pointer";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.borderStyle="dotted";
		divObj.style.borderWidth="1px";
		divObj.style.padding="10px";
		$(divObj).append(dObj);
		dObj.style.width="100%";
		dObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var dObj=document.createElement("div");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(dObj);
		dObj.style.width="100%";
		dObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
	
	},
	
	setRowData:function(data){
	},

	setColumn:function(column){	
	}

}
