
function Tab(id, name, type, xml, sql, layout_id){
	this.tab_id=id;
	this.tab_name=name;
	this.tab_type=type;
	this.tab_xml=xml;
	this.tab_sql=sql;
	this.layout_id=layout_id;
	this.row=1;
	
	this.object_arr=new Array();
	this.styles=new Array();
	this.editor=new Editor();
	this.ajax=new Ajax();
	
	this.init();
}

Tab.prototype={
	
	init:function(){
		var this_ref=this;
		$( "#layout_ui_edit" ).bind( "click", function(e) {
			this_ref.addObject(this_ref.editor.createObject(e));
		});
		this.getObjects();
		this.getStyles();
	},
	
	getRow:function(){
		var variables=new Object();
		variables["type"]=24;
		variables["tab_id"]=this.tab_id;
		variables["row"]=this.row;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var rowdata=jQuery.parseJSON( data );	
			this_ref.setRowData(rowdata[0]);
		});
	},
	
	addObject:function(object){
		this.object_arr.push(object);
	},
	
	removeObject:function(object){
		
	},
	
	cleanAreas:function(){
		$("#layout_ui_records").html("");
		$("#layout_ui_records").removeAttr('style');
		$("#layout_ui_maintenance").html("");
		$("#layout_ui_maintenance").removeAttr('style');
		$("#layout_ui_search").html("");
		$("#layout_ui_search").removeAttr('style');
		$("#layout_ui_edit").html("");
	},

	drawEdit:function(){
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_edit").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.object_arr.length; i++){
			this.object_arr[i].goEdit();
		}
	},
	
	drawRecords:function(){
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_records").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.object_arr.length; i++){
			this.object_arr[i].goRecords();
		}
	},
	
	drawMaintenance:function(){
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_maintenance").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.object_arr.length; i++){
			this.object_arr[i].goMaintenance();
		}
	},
	
	drawSearch:function(){
		for(var i=0; i<this.styles.length; i++){
		$("#layout_ui_search").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.object_arr.length; i++){
			this.object_arr[i].goSearch();
		}
	},
	
	draw:function(){
		this.cleanAreas();
		this.drawEdit();
		
		if(this.tab_type==0){
			this.drawSearch();
		}
		if(this.tab_type==1){
			this.drawRecords();
		}
		if(this.tab_type==2){
			this.drawMaintenance();
		}
	},
	
	genXML:function(){
		var xml="<?xml version='1.0'?><tab>";

		xml=xml+"<properties>";
		for(var i=0; i<this.styles.length; i++){
			
			xml=xml+"<style attr='"+this.styles[i]["attr"]+"' data='"+this.styles[i]["data"]+"' />";
		}
		xml=xml+"</properties>";	
		
		xml=xml+"<objects>";
		
		for(var i=0; i<this.object_arr.length; i++){
			if(this.object_arr[i]!==undefined){
				var aobj=this.object_arr[i].object.objEdit;
				var x=$(aobj).position().left;
				var y=$(aobj).position().top;
				var w=$(aobj).outerWidth();
				var h=$(aobj).outerHeight();
				var style=this.object_arr[i].genXML();
				var data=this.object_arr[i].data;
				var column_on=this.object_arr[i].column_on;
				var type=this.object_arr[i].type;
				var column=this.object_arr[i].column;
				xml=xml+"<object x='"+x+"' y='"+y+"' w='"+w+"' h='"+h+"' type='"+type+"' column='"+column+"' column_on='"+column_on+"' data='"+data+"'>"+style+"</object>";
			}
		}
		xml=xml+"</objects>";	
		
		xml=xml+"</tab>";
		
		return xml;
	},
	
	getObjects:function(){
		this.object_arr=new Array();
		var variables=new Object();
		variables["type"]=22;
		variables["tab_id"]=this.tab_id;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var objects=jQuery.parseJSON( data );	
			for(var i=0; i<objects.length; i++){
				var object=new EOObject(objects[i].type, objects[i].x, objects[i].y, objects[i].w, objects[i].h, objects[i].style, objects[i].data, objects[i].column, objects[i].column_on);
				this_ref.addObject(object);
			}
			this_ref.getStyles();
			//alert(this_ref.object_arr.length);
		});
	},
	
	getStyles:function(){
		this.styles=new Array();
		var variables=new Object();
		variables["type"]=23;
		variables["tab_id"]=this.tab_id;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var styles=jQuery.parseJSON( data );	
			for(var i=0; i<styles.length; i++){
				this_ref.setStyle(styles[i].attr, styles[i].data);
			}
			this_ref.draw();
		});
	},

	refresh:function(){
		this.getObjects();
	},
	
	setStyle:function(attr,data){
		var ind_i=-1;

		for(var i=0; i<this.styles.length; i++){
			if(this.styles[i].attr === attr){
				ind_i=i;
			}
		}
		if(ind_i==-1){
			var styleObj=new Object();
			styleObj.attr=attr;
			styleObj.data=data;
			this.styles.push(styleObj);
			$("#layout_ui_edit").css(attr, data);
		}else{
			this.styles[ind_i].data=data;
		}
	},

	setRowData:function(row){
		for(var i=0; i<this.object_arr.length; i++){
			var robj=this.object_arr[i];
			if(robj.column_on==1 || robj.column_on==true || robj.column_on==="true"){
				if(row!==undefined){
				if(row[""+robj.column]!==undefined){
					robj.data=row[""+robj.column];
					robj.setRowData();
				}else{
					robj.data="";
					robj.setRowData();
				}
				}else{
					robj.data="";
					robj.setRowData();
				}
			}
		}
	}
	
}
