
function ControllerTab(){
	this.ajax=new Ajax();
}

ControllerTab.prototype={
  
	controller_tab_set_current_row:function(row){
		current_tab.row=parseInt(row);
		current_tab.getRow();
		$("#row_count").html(current_tab.row);
		$("#rowcount").val(current_tab.row);
		$( "#slider" ).slider( "value", current_tab.row );
	},

	controller_tab_search:function(){
		current_tab.search();
	},
	
	controller_tab_delete_row:function(){
		var variables=new Object();
		variables["type"]=31;
		variables["tab_id"]=current_tab.tab_id;
		variables["row"]=current_tab.row;
		this.ajax.ajaxPost(variables, function(data){
			//alert(data);
		});	
	},
  
	controller_tab_set_row:function(){
		current_tab.setRow();
	},

	controller_next:function(){
		if(current_tab.row<current_tab.rowLimit+1){
			current_tab.row++;
			current_tab.getRow();
			$("#row_count").html(current_tab.row);
			$("#rowcount").val(current_tab.row);
			$( "#slider" ).slider( "value", current_tab.row );
		}
	},
	
	controller_prev:function(){
		if(current_tab.row>1){
			current_tab.row--;
			current_tab.getRow();
			$("#row_count").html(current_tab.row);
			$("#rowcount").val(current_tab.row);
			$( "#slider" ).slider( "value", current_tab.row );
		}
	},

	controller_new_tab:function(){
		if($("#layout_new_tab_name").val().length>0){
			var variables=new Object();
			variables["type"]=11;
			variables["layout_id"]=layout_manage_current_id;
			variables["tab_name"]=$("#layout_new_tab_name").val();
			variables["tab_type"]=$("#layout_new_tab_type").val();
			this.ajax.ajaxPost(variables, function(data){
				alert(data);
				ui_close_dialog();
			});
		}
	},
	
	controller_change_name_tab:function(){
		if($("#layout_manage_new_tab_name").val().length>0){
			var variables=new Object();
			variables["type"]=15;
			variables["tab_id"]=layout_manage_current_id;
			variables["new_tab_name"]=$("#layout_manage_new_tab_name").val();
			this.ajax.ajaxPost(variables, function(data){
				alert(data);
				ui_close_dialog();
			});	
		}
	},
	
	controller_change_tab_type:function(){
		var variables=new Object();
		variables["type"]=16;
		variables["tab_id"]=layout_manage_current_id;
		variables["new_tab_type"]=$("#layout_update_tab_type").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
			ui_close_dialog();
		});	
	}, 
	
	controller_destroy_tab:function(){
		var variables=new Object();
		variables["type"]=18;
		variables["tab_id"]=layout_manage_current_id;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
			ui_close_dialog();
		});
	},

	controller_change_object_data_type:function(){
		if(editor_size_obj.type === "text"){
			controller.controller_objectdata.change_object_data_text();
		}
		if(editor_size_obj.type === "image"){
			controller.controller_objectdata.change_object_data_img();
		}
		if(editor_size_obj.type === "textbox" || editor_size_obj.type==="textarea" || editor_size_obj.type === "searchbox" || editor_size_obj.type==="searcharea"){
			controller.controller_objectdata.change_object_data_textboxarea();
		}
		if(editor_size_obj.type === "delete"){
			controller.controller_objectdata.change_object_data_delete();
		}
		if(editor_size_obj.type === "submit" || editor_size_obj.type === "searchsubmit"){
			controller.controller_objectdata.change_object_data_submit();
		}
		if(editor_size_obj.type === "searchresults"){
			controller.controller_objectdata.change_object_data_results();
		}
		if(editor_size_obj.type === "horizontalbar" || editor_size_obj.type === "verticalbar" || editor_size_obj.type === "doughnut" || editor_size_obj.type === "pie" || editor_size_obj.type === "explodedpie" || editor_size_obj.type === "pareto"){
			controller.controller_objectdata.change_object_data_diagram();
		}
	},
	
	controller_delete_object:function(){
		editor_size_obj.destroy();
		ui_menubar_close();
		for(var i=0; i<current_tab.object_arr.length; i++){
			if(objectEquals(editor_size_obj, current_tab.object_arr[i])){
				current_tab.object_arr.remove(i,i);
			}
		}
	},

	controller_tab_select_maintenance_tools:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		var html_a="<p class='tooler' onclick='current_tab.editor.setType(\"textbox\");ui_menubar_close();'>Textbox</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"textarea\");ui_menubar_close();'>Textarea</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"delete\");ui_menubar_close();'>Delete</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"submit\");ui_menubar_close();'>Submit</p>";
		$("#layout_ui_tools_more").html(html_a);
	},

	controller_tab_select_search_tools:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		var html_a="<p class='tooler' onclick='current_tab.editor.setType(\"searchbox\");ui_menubar_close();'>Searchbox</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"searcharea\");ui_menubar_close();'>Searcharea</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"searchsubmit\");ui_menubar_close();'>Searchsubmit</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"searchresults\");ui_menubar_close();'>Searchresults</p>";
		$("#layout_ui_tools_more").html(html_a);
	},
	
	
	controller_tab_select_stats_tools:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		var html_a="<p class='tooler' onclick='current_tab.editor.setType(\"horizontalbar\");ui_menubar_close();'>Horizontal bar</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"verticalbar\");ui_menubar_close();'>Vertical bar</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"pareto\");ui_menubar_close();'>Pareto</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"pie\");ui_menubar_close();'>Pie</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"explodedpie\");ui_menubar_close();'>Exploded pie</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"doughnut\");ui_menubar_close();'>Doughnut</p>";
		$("#layout_ui_tools_more").html(html_a);
	},

	controller_tab_select_moduls:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		$("#layout_ui_tools_more").html("No moduls...");
	},
	
	controller_tab_parse_xml_graphics:function(xmlstr){
		var variables=new Object();
		variables["type"]=27;
		variables["xml"]=xmlstr;
		this.ajax.ajaxPost(variables, function(data){
			var graphics=jQuery.parseJSON( data );
			editor_size_obj.object.graphics_object_arr=graphics;
			editor_size_obj.object.drawObjects();
		});
	},
	
	controller_tab_set_table:function(){
		var table=$("#tab_table option:selected").val();
		var xml="<?xml version='1.0' ?><sqljoins><join table1='"+table+"' table2='NULL' column1='NULL' column2='NULL' type='NULL' /></sqljoins>"
		var variables=new Object();
		variables["tab_id"]=layout_manage_current_id;
		variables["type"]=19;
		variables["sql_xml"]=xml;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	}
}

