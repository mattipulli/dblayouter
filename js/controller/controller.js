
function Controller(){
	this.controller_column=new ControllerColumn();
	this.controller_layout=new ControllerLayout();
	this.controller_row=new ControllerRow();
	this.controller_tab=new ControllerTab();
	this.controller_table=new ControllerTable();
	this.controller_user=new ControllerUser();
	this.controller_references=new ControllerReferences();
	this.controller_resultchanges=new ControllerResultChanges();
	this.controller_objectdata=new ControllerObjectData();
	this.controller_diagram=new ControllerDiagram();
	this.ajax=new Ajax();
}

Controller.prototype={

	controller_copy:function(){
		copied_object=jQuery.extend(true, {}, editor_size_obj);
		ui_menubar_close();
	},
	
	controller_paste:function(){
		if(copied_object!==undefined){
			var object=jQuery.extend(true, {}, copied_object);
			object.goEdit();
			current_tab.addObject(object);
		}
		ui_menubar_close();
	},
	
	controller_cut:function(){
		this.controller_copy();
		this.controller_tab.controller_delete_object();
		ui_menubar_close();
	},
  
	
	controller_load_layouts:function(){
		$("#layout_choose_layout").html(" ");
		$("#current_layout").html(" ");
		for(var i=0; i<current_database.layout_array.length; i++){
			var html_a="<a onclick='controller.controller_load_tabs("+i+")' class='menubar_a' href='#'>"+current_database.layout_array[i].layout_name+"</a><br/>";
			$("#layout_choose_layout").html($("#layout_choose_layout").html() + html_a);
		}
	},
	
	controller_cur_tab:function(tab){
		$("#current_tab").html(tab.tab_name);
		current_tab=tab;
		current_tab.draw();
		current_tab.row_count();
		$(function() {
			$( "#slider" ).slider({
				range: "max",
				min: 1,
				max: current_tab.rowLimit+1,
				value: 1,
				slide: function( event, ui ) {
				$( "#rowcount" ).val( ui.value );
					if(ui.value<=current_tab.rowLimit+1){
						controller.controller_tab.controller_tab_set_current_row(ui.value);
					}
				}
				});
			$( "#rowcount" ).val( $( "#slider" ).slider( "value" ) );
		});
		ui_menubar_close();
	},
	
	controller_load_tabs:function(id){
		$("#layout_choose_tab").html(" ");
		$("#current_tab").html("");
		$("#current_layout").html(current_database.layout_array[id].layout_name);
		current_layout=current_database.layout_array[id];
		for(var i=0; i<current_database.layout_array[id].tab_array.length; i++){
			var html_a="<a class='menubar_a' onclick='controller.controller_cur_tab(current_database.layout_array["+id+"].tab_array["+i+"]);' href='#'>"+current_database.layout_array[id].tab_array[i].tab_name+"</a><br/>";
			$("#layout_choose_tab").html($("#layout_choose_tab").html() + html_a);
		}
		ui_menubar_close();
	},

	controller_get_database:function(){
		var variables=new Object();
		variables["type"]=1;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var db=jQuery.parseJSON( data );
			for(var i=0; i<db.layout_arr.length; i++){
				var layoutObj=new Layout(db.layout_arr[i].layout_id,db.layout_arr[i].layout_name);
				for(var j=0; j<db.layout_arr[i].layout_tab_arr.length; j++){
					var tab_id=db.layout_arr[i].layout_tab_arr[j].tab_id;
					var tab_name=db.layout_arr[i].layout_tab_arr[j].tab_name;
					var tab_type=db.layout_arr[i].layout_tab_arr[j].tab_type;
					var tab_sql=db.layout_arr[i].layout_tab_arr[j].tab_sql;
					var tab_xml=db.layout_arr[i].layout_tab_arr[j].tab_xml;
					var tab_layout_id=db.layout_arr[i].layout_id;
					var tabObj=new Tab(tab_id, tab_name, tab_type, tab_xml, tab_sql, tab_layout_id);
					layoutObj.addTab(tabObj);
				}
				current_database.addLayout(layoutObj);
			}
			
			this_ref.controller_load_layouts();
		});
	},
	
	controller_tab_table_structure:function(){
	  	var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();

		if(type==="tab"){
				ui_close_dialog();
				ui_open_dialog('#pimennys_layout_table');
				$("#tab_table").html("");
				var variables=new Object();
				variables["type"]=3;
				this.ajax.ajaxPost(variables, function(data){
					var tables=jQuery.parseJSON( data );
					for(var i=0; i<tables.length; i++){
						$("#tab_table").html($("#tab_table").html() + "<option value='"+tables[i].table_name+"'>"+tables[i].table_name+"</option>");
					}
		});	
		}
	},

	controller_change_name_database_structure:function(){
		var type=$("#table_names_select option:selected").data("listtype");
		db_manage_current_id=$("#table_names_select option:selected").val();
		
		if(type==="table"){
			ui_close_dialog();
			$("#db_manage_new_table_name").val("");
			ui_open_dialog('#pimennys_db_manage_name_table');
		}
		
		if(type==="column"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_db_manage_name_column');
		}
	},
	
	controller_destroy_database_structure:function(){
		var type=$("#table_names_select option:selected").data("listtype");
		db_manage_current_id=$("#table_names_select option:selected").val();
		
		if(type==="table"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_db_destroy_table');
		}
		
		if(type==="column"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_db_destroy_column');
		}
	},
	
	controller_change_name_tablayout_structure:function(){
		var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();
		
		if(type==="layout"){
			ui_close_dialog();
			$("#layout_manage_new_layout_name").val("");
			ui_open_dialog('#pimennys_layout_manage_name_layout');
		}
		if(type==="tab"){
			ui_close_dialog();
			$("#layout_manage_new_tab_name").val("");
			ui_open_dialog('#pimennys_layout_manage_name_tab');
		}
	},
	
	controller_destroy_tablayout_structure:function(){
		var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();
		
		if(type==="layout"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_layout_destroy_layout');
		}
		if(type==="tab"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_layout_destroy_tab');
		}
	},
	
	controller_change_column_type_sturcture:function(){
		var type=$("#table_names_select option:selected").data("listtype");
		db_manage_current_id=$("#table_names_select option:selected").val();
		if(type==="column"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_db_manage_type');
		}
	},
	
	controller_add_column_structure:function(){
		var type=$("#table_names_select option:selected").data("listtype");
		db_manage_current_id=$("#table_names_select option:selected").val();
		
		if(type==="table"){
			ui_close_dialog();
			$("#add_column_column_name").val("");
			$("#add_column_column_type option:eq(0)").prop('selected', true);
			ui_open_dialog('#pimennys_db_add_column');
		}
	},
	
	controller_new_tab_structure:function(){
		var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();
		
		if(type==="layout"){
			ui_close_dialog();
			$("#layout_new_tab_name").val("");
			$("#layout_new_tab_type option:eq(0)").prop('selected', true);
			ui_open_dialog('#pimennys_layout_newtab');
		}
	},
	
	controller_change_tab_type_structure:function(){
		var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();

		if(type==="tab"){
			ui_close_dialog();
			$("#layout_update_tab_type option:eq(0)").prop('selected', true);
			ui_open_dialog('#pimennys_layout_manage_change_type');
		}
	},
	
	controller_change_object_data_structure:function(){
		ui_close_dialog();
		ui_open_dialog('#pimennys_data');
		this.controller_tab.controller_change_object_data_type();
	},
	
	controller_sync:function(){
		var variables=new Object();
		variables["type"]=21;
		variables["tab_id"]=current_tab.tab_id;
		variables["xml"]=current_tab.genXML();
		this.ajax.ajaxPost(variables, function(data){
			current_tab.refresh();
			current_tab.getRow();
		});	
	},
	
	controller_new_table_structure:function(){
		$("#db_new_table_name").val("");
		$("#db_new_table_column_count").val("");
		$("#db_new_table_columns").html("");
	}
	

	
}
