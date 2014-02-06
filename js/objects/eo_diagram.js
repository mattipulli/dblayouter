
function EODiagram(x,y,w,h, type){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.type=type;
	this.objEdit;
	this.objStatic;
	this.diagEdit;
	this.diagStatic;
	this.title;
	this.labels=new Array();
	this.ajax=new Ajax();
}

EODiagram.prototype={

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
		diagramObj.style.borderStyle="dotted";
		diagramObj.style.borderWidth="1px";
		this.objEdit=divObj;

		this.diagEdit = new AwesomeChart(diagramObj);
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
		
		this.diagStatic = new AwesomeChart(diagramObj);
	},
	
	getDatas:function(arr){
		var datas=new Array();
		for(var i=1; i<arr.length; i++){
			datas.push(arr[i].data);
		}
		return datas;
	},
	
	getLabels:function(arr){
		var labels=new Array();
		for(var i=1; i<arr.length; i++){
			labels.push(arr[i].label);
		}
		return labels;
	},
	
	drawDiagram:function(diag, labels, data, title, type){
		diag = new AwesomeChart(diag.ctx.canvas);
		diag.ctx.clearRect(0, 0, this.diagEdit.width, this.diagEdit.height);
		diag.title = title;
		diag.chartType = type;
		diag.data = data;
		diag.labels = labels;
		diag.draw();
	},
	
	setData:function(data){
		var variables=new Object();
		var this_ref=this;
		variables["type"]=29;
		variables["xml"]=data;
		this.ajax.ajaxPost(variables, function(data){
			//alert(data);
			this_ref.labels=jQuery.parseJSON( data );
			this_ref.title=this_ref.labels[0].title;
			//this_ref.drawDiagram(this_ref.diagEdit, this_ref.getLabels(this_ref.labels), this_ref.getDatas(this_ref.labels), this_ref.title, this_ref.type);
			//this_ref.drawDiagram(this_ref.diagStatic, this_ref.getLabels(this_ref.labels), this_ref.getDatas(this_ref.labels), this_ref.title, this_ref.type);
		});
	},
	
	columnize:function(arr){
		if(arr!==undefined){
			var label_cp=new Array();
			for(var i=0; i<this.labels.length; i++){
				var labelObj=new Object();
				labelObj.label=this.labels[i].label;
				labelObj.data=this.labels[i].data;
				labelObj.column=this.labels[i].column;
				label_cp.push(labelObj);
			}
			for(var i=0; i<label_cp.length; i++){
				if(label_cp[i].label!==undefined){
					if(label_cp[i].column==="COLUMN"){
						label_cp[i].data=parseFloat(arr[this.labels[i].data]);
						
					}else{
					    label_cp[i].data=parseFloat(label_cp[i].data);
					}
				}
			}
			//this_ref.drawDiagram(this_ref.diagEdit, this_ref.getLabels(this_ref.labels), this_ref.getDatas(this_ref.labels), this_ref.title, this_ref.type);
			
			this.drawDiagram(this.diagStatic, this.getLabels(label_cp), this.getDatas(label_cp), this.title, this.type);
		}else{
			this.drawDiagram(this.diagStatic, [], [], this.title, this.type);
		}
	},

	setRowData:function(data){
		
	},

	setColumn:function(column){	

	}

}