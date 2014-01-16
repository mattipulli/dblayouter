
function EOButton(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOButton.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var buttonObj=document.createElement("input");
		divObj.class="ui-widget-content";
		buttonObj.type="button";
		divObj.style.cursor="pointer";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.borderStyle="dotted";
		divObj.style.borderWidth="1px";
		divObj.style.padding="10px";
		$(divObj).append(buttonObj);
		buttonObj.style.width="100%";
		buttonObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var buttonObj=document.createElement("input");
		buttonObj.type="button";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(buttonObj);
		buttonObj.style.width="100%";
		buttonObj.style.height="100%";
		this.objStatic=divObj;
	},
	
	setData:function(data){
		$(this.objEdit).find("button").each(function(){$(this).val(data);});
		$(this.objStatic).find("button").each(function(){$(this).val(data);});
	},

	setRowData:function(data){
	},

	setColumn:function(column){	
	}

}
