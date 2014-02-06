
function EOSearchresults(x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
	this.searchResultsChanged=new Array();
	this.ajax=new Ajax();
}

EOSearchresults.prototype={

	createEdit:function(){
		var searchresultsObj=document.createElement("div");
		searchresultsObj.style.cursor="pointer";
		searchresultsObj.class="ui-widget-content";
		searchresultsObj.style.top=this.y+"px";
		searchresultsObj.style.left=this.x+"px";
		searchresultsObj.style.width=this.w+"px";
		searchresultsObj.style.height=this.h+"px";
		searchresultsObj.style.position="absolute";
		searchresultsObj.style.borderStyle="dotted";
		searchresultsObj.style.borderWidth="1px";
		this.objEdit=searchresultsObj;
	},
	
	createStatic:function(){
		var searchresultsObj=document.createElement("div");
		searchresultsObj.style.top=this.y+"px";
		searchresultsObj.style.left=this.x+"px";
		searchresultsObj.style.width=this.w+"px";
		searchresultsObj.style.height=this.h+"px";
		searchresultsObj.style.position="absolute";
		this.objStatic=searchresultsObj;
	},
	
	setResultsData:function(data){
		$(this.objStatic).html(data);
	},
	
	setData:function(data){
		var variables=new Object();
		var this_ref=this;
		variables["type"]=28;
		variables["xml"]=data;
		this.ajax.ajaxPost(variables, function(data){
			this_ref.searchResultsChanged=jQuery.parseJSON( data );
		});
	},
	
	setRowData:function(data){
		$(this.objStatic).html(data);
	},

	setColumn:function(column){	
	}

}
