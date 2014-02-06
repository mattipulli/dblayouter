
function ControllerLayout(){
	this.ajax=new Ajax();
}

ControllerLayout.prototype={

	controller_new_layout:function(){
		if($("#layout_new_layout_name").val().length>0){
			var variables=new Object();
			variables["type"]=10;
			variables["layout_name"]=$("#layout_new_layout_name").val();
			this.ajax.ajaxPost(variables, function(data){
				alert(data);
				ui_close_dialog();
			});
		}
	},
	
	controller_get_layout_list:function(){
		$("#layout_names_select").html("");
		var variables=new Object();
		variables["type"]=13;
		this.ajax.ajaxPost(variables, function(data){
			var layouts = jQuery.parseJSON( data );
			for(var i=0; i<layouts.length; i++){
				if(layouts[i] !== undefined){
					$("#layout_names_select").html( $("#layout_names_select").html() + "<option data-listtype='layout' value='"+layouts[i].layout_id+"'>"+layouts[i].layout_name+"</option>" );
					for(var j=0; j<layouts[i].layout_tab_arr.length; j++){
						$("#layout_names_select").html( $("#layout_names_select").html() + "<option data-tabtype='"+layouts[i].layout_tab_arr[j].tab_type+"' data-listtype='tab' data-layout='"+layouts[i].layout_id+"' style='color:rgb(100,100,150)' value='"+layouts[i].layout_tab_arr[j].tab_id+"'>-"+layouts[i].layout_tab_arr[j].tab_name+":"+layouts[i].layout_tab_arr[j].tab_type+"</option>" );
					}
				}
			}
		});	
		//$("#layout_names_select").html("");
	},
	
	controller_change_name_layout:function(){
		if($("#layout_manage_new_layout_name").val().length>0){
			var variables=new Object();
			variables["type"]=14;
			variables["layout_id"]=layout_manage_current_id;
			variables["new_layout_name"]=$("#layout_manage_new_layout_name").val();
			this.ajax.ajaxPost(variables, function(data){
				alert(data);
				ui_close_dialog();
			});	
		}
	},
	
	controller_destroy_layout:function(){
		var variables=new Object();
		variables["type"]=17;
		variables["layout_id"]=layout_manage_current_id;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	}

}
