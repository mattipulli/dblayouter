
function EOObject(type, x, y, w, h, style, data, column, column_on){
	this.type=type;
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.data=data;
	this.column=column;
	this.column_on=column_on;
	this.object;
	this.sizediv=0;
	this.style_pre="";
	this.style_str=style;
	this.createTypeObject(type);
}

EOObject.prototype={
  
  
	setStyleEdit:function(){
		var this_ref=this;
		$(this.object.objEdit).children(":not(#sizer)").each(function(){this_ref.style_pre=$(this).attr("style");});
		$(this.object.objEdit).children(":not(#sizer)").each(function(){$(this).attr("style", this_ref.style_pre+this_ref.style_str);});
	},
	
	setStyleStatic:function(){
		var this_ref=this;
		$(this.object.objStatic).children(":not(#sizer)").each(function(){this_ref.style_pre=$(this).attr("style");});
		$(this.object.objStatic).children(":not(#sizer)").each(function(){$(this).attr("style", this_ref.style_pre+this_ref.style_str);});
	},
	
	goEdit:function(){
		this.drawEdit();
		this.setStyleEdit();

	},
	
	goRecords:function(){
		this.drawRecords();
		this.setStyleStatic();
	},
	
	goMaintenance:function(){
		this.drawMaintenance();
		this.setStyleStatic();
	},
	
	goSearch:function(){
		this.drawSearch();
		this.setStyleStatic();
	},
	
	createTypeObject:function(type){
		if(type==="image"){
			this.object=new EOImage(this.x, this.y, this.w, this.h);
		}
		if(type==="text"){
			this.object=new EOText(this.x, this.y, this.w, this.h);
		}
		if(type==="div"){
			this.object=new EODiv(this.x, this.y, this.w, this.h);
		}
		if(type==="textbox"){
			this.object=new EOTextbox(this.x, this.y, this.w, this.h);
		}
		if(type==="textarea"){
			this.object=new EOTextarea(this.x, this.y, this.w, this.h);
		}
		if(type==="delete"){
			this.object=new EODelete(this.x, this.y, this.w, this.h);
		}
		if(type==="submit"){
			this.object=new EOSubmit(this.x, this.y, this.w, this.h);
		}
		if(type==="searchbox"){
			this.object=new EOSearchbox(this.x, this.y, this.w, this.h);
		}
		if(type==="searcharea"){
			this.object=new EOSearcharea(this.x, this.y, this.w, this.h);
		}
		if(type==="searchsubmit"){
			this.object=new EOSearchsubmit(this.x, this.y, this.w, this.h);
		}
		if(type==="searchresults"){
			this.object=new EOSearchresults(this.x, this.y, this.w, this.h);
		}
		if(type==="horizontalbar"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "default");
		}
		if(type==="verticalbar"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "horizontal bars");
		}
		if(type==="pareto"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "pareto");
		}
		if(type==="pie"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "pie");
		}
		if(type==="explodedpie"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "exploded pie");
		}
		if(type==="doughnut"){
			this.object=new EODiagram(this.x, this.y, this.w, this.h, "doughnut");
		}
	},
	
	setData:function(data, column, column_on){
		this.column_on=column_on;
		if(this.column_on==1 || this.column_on==true || this.column_on==="true"){
			this.column=column;
			this.object.setColumn(column);
			//this.drawSizeDiv();
		}else{
			this.data=data;
			this.object.setData(this.data);
			//this.drawSizeDiv();
		}
	},

	setRowData:function(){
		this.object.setRowData(this.data);
	},
	
	refreshStyle:function(){
		/*$(this.object.obj).removeAttr("style");
		for(var i=0; i<this.styles.length; i++){
			var attr=this.styles[i].attr;
			var data=this.styles[i].dataM
			$(this.object.objEdit).css(attr, data);
			$(this.object.objStatic).css(attr, data);
		}*/
	},
	
	setStyle:function(attr, data){
		/*var styleObj=new Object();
		styleObj.attr=attr;
		styleObj.data=data;
		this.styles.push(styleObj);
		this.refreshStyle();*/
	},

	drawEdit:function(){
		this.object.createEdit();
		$("#layout_ui_edit").append(this.object.objEdit); 
		this.makeDraggable();
		this.setData(this.data, this.column, this.column_on);
		this.drawSizeDiv();
	},
	
	drawMaintenance:function(){
		this.object.createStatic();
		$("#layout_ui_maintenance").append(this.object.objStatic); 
		this.setData(this.data, this.column, this.column_on);
		this.drawSizeDiv();
	},

	drawRecords:function(){
		this.object.createStatic();
		$("#layout_ui_records").append(this.object.objStatic);
		this.setData(this.data, this.column, this.column_on);
		this.drawSizeDiv();
	},
	
	drawSearch:function(){
		this.object.createStatic();
		$("#layout_ui_search").append(this.object.objStatic); 
		this.setData(this.data, this.column, this.column_on);
		this.drawSizeDiv();
	},
	
	makeDraggable:function(){
		var this_ref=this;
		$(function() {
			$(this_ref.object.objEdit).draggable();
		});
		$(this_ref.object.objEdit).bind("contextmenu",function(e){
			editor_size_obj=this_ref;
			current_obj=this_ref;
			ui_menubar_rel(this_ref.object.objEdit, '#'+this_ref.type+'_prop', "#layout_ui_edit");
			return false;
			$('.alert').fadeToggle(); 
		});
	},
	
	drawSizeDiv:function(){
		var divObj=document.createElement("div");
		divObj.style.backgroundColor="rgb(0,0,0)";
		divObj.style.top=(this.object.objEdit.offsetHeight-5)+"px";
		divObj.style.left=(this.object.objEdit.offsetWidth-5)+"px";
		divObj.style.width="5px";
		divObj.id="sizer";
		divObj.style.cursor="pointer";
		divObj.style.height="5px";
		divObj.style.position="absolute";
		if($(this.object.objEdit).children().length <=1){
			$(this.object.objEdit).append(divObj); 
		}
		
		var this_ref=this;
		
		$( divObj ).bind( "mousedown", function(e) {
			editor_size_on=1;
			editor_size_obj=this_ref;
			editor_size_obj_siz=divObj;
		});
		$( "#layout_ui_edit").mousemove(function( e ) {
			editSize(e,editor_size_obj.object.objEdit,editor_size_obj_siz);
		});
		$( divObj ).bind( "mouseup", function(e) {
			editor_size_on=0;
		});
	},
	
	
	destroy:function(){
		var destroy_object=this.object.objEdit;
		$(destroy_object).remove();
	}
	
}
