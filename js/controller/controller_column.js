
function ControllerColumn(){
	this.ajax=new Ajax();
}

ControllerColumn.prototype={
	
	controller_change_name_column:function(){
		if($("#db_manage_new_column_name").val().length>0){
			var variables=new Object();
			variables["type"]=5;
			variables["column_id"]=db_manage_current_id;
			variables['column_name']=$("#db_manage_new_column_name").val();
			this.ajax.ajaxPost(variables, function(data){
				ui_close_dialog();
				alert(data);
			});
		}else{
			alert("Error!");
		}
	},
	
	controller_change_column_type:function(){
		var variables=new Object();
		variables["type"]=6;
		variables["column_id"]=db_manage_current_id;
		variables['column_type']=$("#manage_type_column_type").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});	
	},
	
	controller_destroy_column:function(){
		var variables=new Object();
		variables["type"]=8;
		variables["column_id"]=db_manage_current_id;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	},
	
	controller_add_column:function(){
		if($("#add_column_column_name").val().length>0){
			var variables=new Object();
			variables["type"]=9;
			variables["column_name"]=$("#add_column_column_name").val();
			variables['column_type']=$("#add_column_column_type").val();
			variables['table_id']=db_manage_current_id;
			this.ajax.ajaxPost(variables, function(data){
				alert(data);
				ui_close_dialog();
			});	
		}else{
			alert("Error!");
		}
	}
	
}
