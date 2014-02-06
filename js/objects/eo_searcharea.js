
function EOSearcharea(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOSearcharea.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var searchareaObj=document.createElement("textarea");
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
		$(divObj).append(searchareaObj);
		searchareaObj.style.resize="none";
		searchareaObj.style.width="100%";
		searchareaObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var searchareaObj=document.createElement("textarea");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(searchareaObj);
		searchareaObj.style.resize="none";
		searchareaObj.style.width="100%";
		searchareaObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
		$(this.objEdit).find("textarea").each(function(){$(this).val(data);});
		$(this.objStatic).find("textarea").each(function(){$(this).val(data);});
	},

	setRowData:function(data){
		$(this.objStatic).find("textarea").each(function(){$(this).val(data);});
	},

	setColumn:function(column){	
		$(this.objEdit).find("textarea").each(function(){$(this).val("[column:"+column+"]");});
	}

}
