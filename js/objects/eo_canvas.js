
function EOCanvas(x, y, w, h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.canvasGraphicsEdit;
	this.canvasGraphicsStatic;
	this.objEdit;
	this.objStatic;
	this.graphics_object_arr=new Array();
	this.ajax=new Ajax();
}

EOCanvas.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var canvasObj=document.createElement("canvas");
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
		$(divObj).append(canvasObj);
		canvasObj.style.width="100%";
		canvasObj.style.height="100%";
		this.objEdit=divObj;
		this.canvasGraphicsEdit=new CanvasGraphics(canvasObj);
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var canvasObj=document.createElement("canvas");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(canvasObj);
		canvasObj.style.width="100%";
		canvasObj.style.height="100%";
		this.objStatic=divObj;
		this.canvasGraphicsStatic=new CanvasGraphics(canvasObj);
	},
	
	drawObjects:function(){
		this.canvasGraphicsEdit.clear();
		this.canvasGraphicsStatic.clear();
		for(var i=0; i<this.graphics_object_arr.length; i++){
			var graph=this.graphics_object_arr[i];
			if(graph.type==="point"){
				this.canvasGraphicsEdit.drawPoint(graph.x, graph.y);
				this.canvasGraphicsStatic.drawPoint(graph.x, graph.y);
			}
			if(graph.type==="rect"){
				this.canvasGraphicsEdit.drawRect(graph.x, graph.y, graph.w, graph.h);
				this.canvasGraphicsStatic.drawRect(graph.x, graph.y, graph.w, graph.h);
			}
			if(graph.type==="circle"){
				this.canvasGraphicsEdit.drawCircle(graph.x, graph.y, graph.r);
				this.canvasGraphicsStatic.drawCircle(graph.x, graph.y, graph.r);
			}
			if(graph.type==="line"){
				this.canvasGraphicsEdit.drawLine(graph.x, graph.y, graph.x2, graph.y2);
				this.canvasGraphicsStatic.drawLine(graph.x, graph.y, graph.x2, graph.y2);
			}
		}
		this.canvasGraphicsEdit.draw();
		this.canvasGraphicsStatic.draw();
	},
	
	setData:function(data){
		var variables=new Object();
		var this_ref=this;
		variables["type"]=27;
		variables["xml"]=data;
		this.ajax.ajaxPost(variables, function(data){
			var graphics=jQuery.parseJSON( data );
			this_ref.graphics_object_arr=graphics;
			this_ref.drawObjects();
		});
	},

	setRowData:function(data){
	  
	},

	setColumn:function(column){
	  
	}

}
