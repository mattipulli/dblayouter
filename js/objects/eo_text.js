
function EOText(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOText.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var textObj=document.createElement("span");
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
		$(divObj).append(textObj);
		textObj.style.width="100%";
		textObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var textObj=document.createElement("span");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(textObj);
		textObj.style.width="100%";
		textObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
		$(this.objEdit).find("span").each(function(){$(this).html(data);});
		$(this.objStatic).find("span").each(function(){$(this).html(data);});
	},

	setRowData:function(data){
		$(this.objStatic).find("span").each(function(){$(this).html(data);});
	},

	setColumn:function(column){
		$(this.objEdit).find("span").each(function(){$(this).html("[column:"+column+"]");});
	}

}
