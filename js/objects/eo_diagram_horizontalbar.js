
function EODiagram(x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.objEdit;
	this.objStatic;
}

EODiagramHorizontalBar.prototype={

	createEdit:function(){
		var divObj=document.createElement("div");
		var diagramObj=document.createElement("canvas");
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
		$(divObj).append(diagramObj);
		diagramObj.width=$(divObj).width();
		diagramObj.height=$(divObj).height();
		diagramObj.style.width="100%";
		diagramObj.style.height="100%";
		this.objEdit=divObj;

		var mychart = new AwesomeChart(diagramObj);
        mychart.title = "Product Sales - 2010";
        mychart.data = [1532, 3251, 3460, 1180, 6543];
        mychart.labels = ["Desktops", "Laptops", "Netbooks", "Tablets", "Smartphones"];
        mychart.draw();
	},
	
	createStatic:function(){
		var divObj=document.createElement("div");
		var diagramObj=document.createElement("canvas");
		divObj.style.top=this.y+"px";
		divObj.style.left=this.x+"px";
		divObj.style.width=this.w+"px";
		divObj.style.height=this.h+"px";
		divObj.style.position="absolute";
		divObj.style.padding="10px";
		$(divObj).append(diagramObj);
		diagramObj.width=$(divObj).width();
		diagramObj.height=$(divObj).height();
		diagramObj.style.width="100%";
		diagramObj.style.height="100%";
		this.objStatic=divObj;
		
		var mychart = new AwesomeChart(diagramObj);
        mychart.title = "Product Sales - 2010";
        mychart.data = [1532, 3251, 3460, 1180, 6543];
        mychart.labels = ["Desktops", "Laptops", "Netbooks", "Tablets", "Smartphones"];
        mychart.draw();
	},
	
	setData:function(data){

	},

	setRowData:function(data){
		
	},

	setColumn:function(column){	

	}

}