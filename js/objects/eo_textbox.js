
function EOTextbox(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOTextbox.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var textboxObj=document.createElement("input");
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
		textboxObj.type="text";
		$(divObj).append(textboxObj);
		textboxObj.style.width="100%";
		textboxObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var textboxObj=document.createElement("input");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(textboxObj);
		textboxObj.type="text";
		textboxObj.style.width="100%";
		textboxObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
		$(this.objEdit).find("input").each(function(){$(this).val(data);});
		$(this.objStatic).find("input").each(function(){$(this).val(data);});
	},

	setRowData:function(data){
		$(this.objStatic).find("input").each(function(){$(this).val(data);});
	},

	setColumn:function(column){	
		$(this.objEdit).find("input").each(function(){$(this).val("[column:"+column+"]");});
	}

}
