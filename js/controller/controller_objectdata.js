
function ControllerObjectData(){

}

ControllerObjectData.prototype={

	tab_put_up_style_dialog:function(){
		$("#object_style_parameters").html("pöö");
	},
	
	change_tab_style:function(){
		var tab_height=$("#tab_height").val();
		var tab_width=$("#tab_width").val();
		var tab_bgcolor=$("#tab_color").css("background-color");
		current_tab.setStyle("height", tab_height+"px");
		current_tab.setStyle("width", tab_width+"px");
		alert(tab_bgcolor);
		current_tab.setStyle("background-color", tab_bgcolor);
	},

	change_object_data_text:function(){
		var this_ref=this;
		$("#object_data_header").html("Text");
		$("#object_data_div").html("<div style ='width:100%'><span>Column: </span><input id='object_column_changed' type='text' class='kentta' /> <span>Data from database </span><input value='1' id='column_on' style='margin-top:3px;' type='checkbox'/></div><hr/><div style='100%'><span>Data:</span><textarea id='object_data_changed' style='width:100%;height:100px;'></textarea></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), $("#object_column_changed").val(), $("#column_on").is(":checked"));
		});
	},

	change_object_data_img:function(){
		$("#object_data_header").html("Image");
		$("#object_data_div").html("<div style ='width:100%'><span>Column: </span><input id='object_column_changed' type='text' class='kentta' /> <span>Data from database </span><input style='margin-top:3px;' value='1' id='column_on'  type='checkbox'/></div><hr/><div style='100%'><span>Src:</span><textarea id='object_data_changed' style='width:100%;height:100px;'></textarea></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), $("#object_column_changed").val(), $("#column_on").is(":checked"));
		});
	},

	change_object_data_textboxarea:function(){
		$("#object_data_header").html("Textbox/Textarea");
		$("#object_data_div").html("<div style ='width:100%'><span>Column: </span><input id='object_column_changed' type='text' class='kentta' /></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData("", $("#object_column_changed").val(), 1);
		});
	},

	change_object_data_delete:function(){
		$("#object_data_header").html("Delete");
		$("#object_data_div").html("<div style ='width:100%'><span>Caption: </span><input id='object_data_changed' type='text' class='kentta' /></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), "", 0);
		});
	},

	change_object_data_submit:function(){
		$("#object_data_header").html("Submit");
		$("#object_data_div").html("<div style ='width:100%'><span>Caption:</span><input id='object_data_changed' type='text' class='kentta'/></div>");
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			editor_size_obj.setData($("#object_data_changed").val(), "", 0);
		});
	},
	
	change_object_data_results:function(){
		$("#object_data_header").html("Results structure");
		var this_ref=this;
		var html_a="<div style='width:100%'><div style='float:left'>Column: <input id='results_from' type='text' class='kentta2'/>";
		html_a=html_a+" Change to: <input type='text' id='results_to' class='kentta2'/></div>";
		html_a=html_a+"<a href='#' class='nappi6' style='float:right' onclick='controller.controller_resultchanges.add_change()'>Add</a> ";
		html_a=html_a+"<a href='#' class='nappi6' style='float:right' onclick='controller.controller_resultchanges.drop_change()'>Drop</a>";
		html_a=html_a+"</div><div style='clear:both'></div><br/>";
		html_a=html_a+"<div style='width:100%'><select id='results_changed' style='width:100%; height:200px;' size='100'></select></div>";
		$("#object_data_div").html(html_a);
		controller.controller_resultchanges.get_changes();
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			controller.controller_resultchanges.set_changes();
		});
	},
	
	change_object_data_diagram:function(){
		var this_ref=this;
		$("#object_data_header").html("Diagram");
		var html_a="<div style='width:100%'>Title: <input style='' type='text' id='diagram_title' class='kentta'/></div><br/>";
		html_a=html_a+"<div style='width:100%'><div style='float:left'>Label: <input id='diagram_label' type='text' class='kentta2'/>";
		html_a=html_a+" Data: <input type='text' id='diagram_data' class='kentta2'/> Column: <input id='diagram_column' type='checkbox'/></div>";
		html_a=html_a+"<a href='#' class='nappi6' style='float:right' onclick='controller.controller_diagram.add_label();'>Add</a> ";
		html_a=html_a+"<a href='#' class='nappi6' style='float:right' onclick='controller.controller_diagram.drop_label();'>Drop</a>";
		html_a=html_a+"</div><div style='clear:both'></div><br/>";
		html_a=html_a+"<div style='width:100%'><select id='diagram_labels' style='width:100%; height:200px;' size='100'></select></div>";
		$("#object_data_div").html(html_a);
		controller.controller_diagram.get_labels();
		$( "#button_change_object_data" ).click(function() {
			ui_close_dialog();
			controller.controller_diagram.set_labels();
		});
	},
	
	object_style_css:function(){
		$("#object_style_css").val(editor_size_obj.style_str);
	},
	
	change_object_style:function(){
		var object_css = $("#object_style_css").val();
		editor_size_obj.style_str=object_css;
		var pre_css=editor_size_obj.style_pre;
		$(editor_size_obj.object.objEdit).children(":not(#sizer)").each(function(){$(this).attr("style", pre_css+object_css);});
		$(editor_size_obj.object.objStatic).children(":not(#sizer)").each(function(){$(this).attr("style", pre_css+object_css);});
	}

}
