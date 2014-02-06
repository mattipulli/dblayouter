
function EOSearchsubmit(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EOSearchsubmit.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var searchsubmitObj=document.createElement("input");
		divObj.class="ui-widget-content";
		searchsubmitObj.type="submit";
		divObj.style.cursor="pointer";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.borderStyle="dotted";
		divObj.style.borderWidth="1px";
		divObj.style.padding="10px";
		$(divObj).append(searchsubmitObj);
		searchsubmitObj.style.width="100%";
		searchsubmitObj.style.height="100%";
		this.objEdit=divObj;
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var searchsubmitObj=document.createElement("input");
		searchsubmitObj.type="submit";
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(searchsubmitObj);
		searchsubmitObj.style.width="100%";
		searchsubmitObj.style.height="100%";
		$(searchsubmitObj).click(function(){
			controller.controller_tab.controller_tab_search();
		}	
		);
		this.objStatic=divObj;
	},
	
	setData:function(data){
		$(this.objEdit).find("input").each(function(){$(this).val(data);});
		$(this.objStatic).find("input").each(function(){$(this).val(data);});
	},

	setRowData:function(data){
	},

	setColumn:function(column){	
	}

}
