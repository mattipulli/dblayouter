
function ControllerTab(){
	this.ajax=new Ajax();
}

ControllerTab.prototype={

	controller_next:function(){
		current_tab.row++;
		current_tab.getRow();
		$("#row_count").html(current_tab.row);
	},
	
	controller_prev:function(){
		if(current_tab.row>1){
			current_tab.row--;
			current_tab.getRow();
			$("#row_count").html(current_tab.row);
		}
	},

	controller_new_tab:function(){
		var variables=new Object();
		variables["type"]=11;
		variables["layout_id"]=layout_manage_current_id;
		variables["tab_name"]=$("#layout_new_tab_name").val();
		variables["tab_type"]=$("#layout_new_tab_type").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});	
	},
	
	controller_change_name_tab:function(){
		var variables=new Object();
		variables["type"]=15;
		variables["tab_id"]=layout_manage_current_id;
		variables["new_tab_name"]=$("#layout_manage_new_tab_name").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});	
	},
	
	controller_change_tab_type:function(){
		var variables=new Object();
		variables["type"]=16;
		variables["tab_id"]=layout_manage_current_id;
		variables["new_tab_type"]=$("#layout_update_tab_type").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});	
	}, 
	
	controller_destroy_tab:function(){
		var variables=new Object();
		variables["type"]=18;
		variables["tab_id"]=layout_manage_current_id;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	},

	controller_tab_put_up_style_dialog:function(){
		var style_html="<table>";
		for(var i=0; i<object_styles_general.length; i++){
			var html_a="<tr><td><p style='width:100%;padding:5px;'>"+object_styles_general[i]+":</p></td><td><input type='text' class='kentta'/></td></tr>";
			style_html=style_html+html_a;
		}

		if(editor_size_obj.type==="text"){
			for(var i=0; i<object_styles_text.length; i++){
				var html_a="<tr><td><p style='width:100%;padding:5px;'>"+object_styles_text[i]+":</p></td><td><input type='text' class='kentta'/></td></tr>";
				style_html=style_html+html_a;
			}
		}

		style_html=style_html+"</table>";
		$("#object_style_parameters").html(style_html);
	},
	
	controller_change_tab_style:function(){
		var tab_height=$("#tab_height").val();
		var tab_width=$("#tab_width").val();
		var tab_bgcolor=$("#tab_color").css("background-color");
		current_tab.setStyle("height", tab_height+"px");
		current_tab.setStyle("width", tab_width+"px");
		current_tab.setStyle("background-color", tab_bgcolor);
	},

	controller_change_object_data_text:function(){
		var this_ref=this;
		$("#object_data_header").html("Text");
		$("#object_data_div").html("<div style ='width:100%'><span>Column: </span><input id='object_column_changed' type='text' class='kentta' /> <span>Data from database </span><input value='1' id='column_on' style='margin-top:3px;' type='checkbox'/></div><hr/><div style='100%'><span>Data:</span><textarea id='object_data_changed' style='width:100%;height:100px;'></textarea></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), $("#object_column_changed").val(), $("#column_on").is(":checked"));
		});
	},

	controller_change_object_data_img:function(){
		$("#object_data_header").html("Image");
		$("#object_data_div").html("<div style ='width:100%'><span>Column: </span><input id='object_column_changed' type='text' class='kentta' /> <span>Data from database </span><input style='margin-top:3px;' type='checkbox'/></div><hr/><div style='100%'><span>Src:</span><textarea style='width:100%;height:100px;'></textarea></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), $("#object_column_changed").val(), $("#column_on").is(":checked"));
		});
	},

	controller_change_object_data_type:function(){
		if(editor_size_obj.type === "text"){
			this.controller_change_object_data_text();
		}
		if(editor_size_obj.type === "image"){
			this.controller_change_object_data_img();
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
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"button\");ui_menubar_close();'>Button</p>";
		html_a=html_a+"<p class='tooler' onclick='current_tab.editor.setType(\"submit\");ui_menubar_close();'>Submit</p>";
		$("#layout_ui_tools_more").html(html_a);
	},

	controller_tab_select_search_tools:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		$("#layout_ui_tools_more").html("");
	},

	controller_tab_select_moduls:function(){
		ui_menubar_tools('#layout_ui_tools_more');
		$("#layout_ui_tools_more").html("No moduls...");
	}
}

