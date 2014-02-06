
function Tab(id, name, type, xml, sql, layout_id){
	this.tab_id=id;
	this.tab_name=name;
	this.tab_type=type;
	this.tab_xml=xml;
	this.tab_sql=sql;
	this.layout_id=layout_id;
	this.row=1;
	this.rowLimit=1;
	
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
		$("#layout_ui_edit").bind("contextmenu",function(e){
			ui_menubar_rel(mouseX(e), '#'+this_ref.type+'_prop', "#layout_ui_edit");
			return false;
			$('.alert').fadeToggle(); 
		});
		this.getObjects();
		this.getStyles();
	},
	
	row_count:function(){
		var this_ref=this;
		var variables=new Object();
		variables["type"]=30;
		variables["tab_id"]=this.tab_id;
		this.ajax.ajaxPost(variables, function(data){
			if(!isNaN(data)){
				this_ref.rowLimit=parseInt(data);
				$("#rowlimit").html(data);
			}else{
				this_ref.rowLimit=0;
				$("#rowlimit").html("0");
			}
		});
	},
	
	//////RECORDS
	
	setRowData:function(row){
		for(var i=0; i<this.object_arr.length; i++){
			var robj=this.object_arr[i];
			if(robj!==undefined){
				if(robj.type === "horizontalbar" || robj.type === "verticalbar" || robj.type === "doughnut" || robj.type === "pie" || robj.type === "explodedpie" || robj.type === "pareto"){
					  robj.object.columnize(row);
				}
				if(robj.column_on==1 || robj.column_on==true || robj.column_on==="true"){
				  if(robj.type!=="searcharea" && robj.type!=="searchbox"){
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
	},
	
	getRow:function(){
		var variables=new Object();
		variables["type"]=24;
		variables["tab_id"]=this.tab_id;
		variables["row"]=this.row;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			//alert(data);
			var rowdata=jQuery.parseJSON( data );	
			this_ref.setRowData(rowdata[0]);
		});
	},
	
	/////////////
	/////////////
	/////////////
	
	
	//MAINTENANCE
	
	setRow:function(){
	  	var variables=new Object();
		variables["type"]=25;
		variables["tab_id"]=this.tab_id;
		variables["row"]=this.row;
		variables["xml"]=this.setRowGetXML();
		this.ajax.ajaxPost(variables, function(data){
		});    
	},
	
	
	/////////////
	/////////////
	/////////////
	
	
	//////SEARCH
	
	search:function(){
		var this_ref=this;
		var variables=new Object();
		variables["type"]=26;
		variables["tab_id"]=this.tab_id;
		variables["xml"]=this.setSearchTermsXML();
		this.ajax.ajaxPost(variables, function(data){
			var searchdata=jQuery.parseJSON( data );	
			this_ref.createSearchResults(searchdata);
		});    
	},
	
	createSearchResults:function(data){
		
		for(var i=0; i<this.object_arr.length; i++){
			if(this.object_arr[i].type==="searchresults"){
				//alert(this.object_arr[i].object.searchResultsChanged.length);
				this.object_arr[i].data=this.createSearchResultsTable(data, this.object_arr[i].object.searchResultsChanged);
				this.object_arr[i].object.setResultsData(this.object_arr[i].data);
			}
		}
	},
	
	createSearchResultsTable:function(data, arr){
		//alert(arr);
		var columns=Object.keys(data[0]).length;
		var columns_arr=Object.keys(data[0]);
		var table_str="<table style='width:100%'>";
		table_str=table_str+"<tr>";
		for(var k=0; k<columns_arr.length; k++){
			  	if(isNaN(columns_arr[k])){
					var changeObj=isInArray(arr, columns_arr[k]);
					if(changeObj!=-1){
						table_str=table_str+"<td><span>"+changeObj.to+"</span></td>";
					}
				}
			}
		table_str=table_str+"</tr>";
		for(var i=0; i<data.length; i++){
			table_str=table_str+"<tr>";
			for(var j=0; j<columns; j++){
					if(isNaN(columns_arr[j])){
						var changeObj=isInArray(arr, columns_arr[j]);
						if(changeObj!=-1){
							table_str=table_str+"<td><span>"+data[i][columns_arr[j]]+"</span></td>";
						}
					}
			}
			table_str=table_str+"</tr>";
		}
		table_str=table_str+"</table>";
		return table_str; 
	},
	
	/////////////
	/////////////
	/////////////
	
	setSearchTermsXML:function(){
		var xml="<?xml version='1.0' ?><row>";
		for(var i=0; i<this.object_arr.length; i++){
		    if(this.object_arr[i].type==="searchbox" || this.object_arr[i].type==="searcharea"){
		      var object_a=this.object_arr[i];
		      var object_column=this.object_arr[i].column;
		      var object_data="";
		      if(object_a.type==="searchbox"){
			$(object_a.object.objStatic).find("input").each(function(){object_data=$(this).val();});
		      }
		      if(object_a.type==="searcharea"){
			$(object_a.object.objStatic).find("textarea").each(function(){object_data=$(this).val();});
		      }
		      xml=xml+"<columndata column='"+object_column+"' data='"+object_data+"' />";
		    }
		}
		xml=xml+"</row>";
		return xml;
	},
	
	setRowGetXML:function(){
		var xml="<?xml version='1.0' ?><row>";
		for(var i=0; i<this.object_arr.length; i++){
		    if(this.object_arr[i].type==="textbox" || this.object_arr[i].type==="textarea"){
		      var object_a=this.object_arr[i];
		      var object_column=this.object_arr[i].column;
		      var object_data="";
		      if(object_a.type==="textbox"){
			$(object_a.object.objStatic).find("input").each(function(){object_data=$(this).val();});
		      }
		      if(object_a.type==="textarea"){
			$(object_a.object.objStatic).find("textarea").each(function(){object_data=$(this).val();});
		      }
		      xml=xml+"<columndata column='"+object_column+"' data='"+object_data+"' />";
		    }
		}
		xml=xml+"</row>";
		return xml;
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
		$("#layout_ui_edit").removeAttr('style');
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
	
	genXMLSearchResults:function(arr){
		var xml="<?xml version='1.0'?><changes>";
		for(var i=0; i<arr.length; i++){
			if(arr!=0){
				 xml=xml+"<change from='"+arr[i].from+"' to='"+arr[i].to+"' />";
			}
		}
		xml=xml+"</changes>";
		return xml;
	},
	
	genXMLDiagramLabels:function(arr, title){
		var xml="<?xml version='1.0'?><labels><title title='"+title+"' />";
		for(var i=0; i<arr.length; i++){
			if(arr[i].label!=undefined){
				 xml=xml+"<label label='"+arr[i].label+"' data='"+arr[i].data+"' column='"+arr[i].column+"' />";
			}
		}
		xml=xml+"</labels>";
		return xml;
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
				var style=this.object_arr[i].style_str;
				var data=urlencode(this.object_arr[i].data);
				var column_on=this.object_arr[i].column_on;
				var type=this.object_arr[i].type;
				var column=this.object_arr[i].column;
				if(type==="searchresults"){
					column_on=0;
					data=urlencode(this.genXMLSearchResults(this.object_arr[i].object.searchResultsChanged));
				}
				if(type === "horizontalbar" || type === "verticalbar" || type === "doughnut" || type === "pie" || type === "explodedpie" || type === "pareto"){
					column_on=0;
					data=urlencode(this.genXMLDiagramLabels(this.object_arr[i].object.labels, this.object_arr[i].object.title));
				}
				xml=xml+"<object x='"+x+"' y='"+y+"' w='"+w+"' h='"+h+"' type='"+type+"' column='"+column+"' column_on='"+column_on+"' data='"+data+"' style='"+style+"'/>";
			}
		}
		xml=xml+"</objects>";	
		
		xml=xml+"</tab>";
		//alert(xml);
		return xml;
	},
	
	getObjects:function(){
		this.object_arr=new Array();
		var variables=new Object();
		variables["type"]=22;
		variables["tab_id"]=this.tab_id;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			//alert(data);
			var objects=jQuery.parseJSON( data );	
			for(var i=0; i<objects.length; i++){
				var object=new EOObject(objects[i].type, objects[i].x, objects[i].y, objects[i].w, objects[i].h, objects[i].style, urldecode(objects[i].data), objects[i].column, objects[i].column_on);
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
			$("#layout_ui_edit").css(attr, data);
		}
	}
	
}
