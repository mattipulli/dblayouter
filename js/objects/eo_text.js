
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
		var textObj=document.createElement("div");
		textObj.style.cursor="pointer";
		textObj.class="ui-widget-content";
		textObj.style.top=this.y+"px";
		textObj.style.left=this.x+"px";
		textObj.style.width=this.w+"px";
		textObj.style.height=this.h+"px";
		textObj.style.position="absolute";
		textObj.style.borderStyle="dotted";
		textObj.style.borderWidth="1px";
		this.objEdit=textObj;
	},
	
	createStatic:function(){
		var textObj=document.createElement("span");
		textObj.style.top=this.y+"px";
		textObj.style.left=this.x+"px";
		textObj.style.width=this.w+"px";
		textObj.style.height=this.h+"px";
		textObj.style.position="absolute";
		this.objStatic=textObj;
	},
	
	setData:function(data){
		$(this.objEdit).html(data);
		$(this.objStatic).html(data);
	},

	setRowData:function(data){
		$(this.objStatic).html(data);
	},

	setColumn:function(column){
		$(this.objEdit).html("[column:"+column+"]");
	}

}
