
function ControllerTable(){
	this.ajax=new Ajax();
}

ControllerTable.prototype={

	controller_new_table_create:function(){
		var variables=new Object();
		this.controller_new_table_get_column_names(variables);
		this.controller_new_table_get_column_types(variables);
		variables["table_name"]=$("#db_new_table_name").val();
		variables["type"]=2;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	},
	
	controller_get_table_list:function(){
		var variables=new Object();
		variables["type"]=3;
		$("#table_names_select").html("");
		this.ajax.ajaxPost(variables, function(data){
			var tables = jQuery.parseJSON( data );
			for(var i=0; i<tables.length; i++){
				if(tables[i] !== undefined){
					$("#table_names_select").html( $("#table_names_select").html() + "<option data-listtype='table' value='"+tables[i].table_id+"'>"+tables[i].table_name+"</option>" );
					for(var j=0; j<tables[i].column_arr.length; j++){
						$("#table_names_select").html( $("#table_names_select").html() + "<option data-listtype='column' data-table='"+tables[i].table_id+"' style='color:rgb(100,100,150)' value='"+tables[i].column_arr[j].column_id+"'>-"+tables[i].column_arr[j].column_name+":"+tables[i].column_arr[j].column_type+"</option>" );
					}
				}
			}
		});
	},
	
	controller_change_name_table:function(){
		var variables=new Object();
		variables["type"]=4;
		variables["table_id"]=db_manage_current_id;
		variables['table_name']=$("#db_manage_new_table_name").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	},
	
	controller_destroy_table:function(){
		var variables=new Object();
		variables["type"]=7;
		variables["table_id"]=db_manage_current_id;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	},
	
	controller_new_table_refresh:function(){
        $("#db_new_table_columns").html("");
        var count = parseInt($("#db_new_table_column_count").val());
        for(var i=0; i<count; i++){
                var clr="";                
                if(i%2!=0){
                        clr="background-color:rgb(255,255,255);";
                }
                else{
                        clr="background-color:rgb(245,245,245);";
                }
                $("#db_new_table_columns").html($("#db_new_table_columns").html() + '<div style="'+clr+';padding:5px;width:100%"><span>Column name:</span><input class="column_name" style="width:25%" type="text" />        <select class="column_type"><option value="-1">Type</option><option value="TEXT">TEXT</option><option value="INT">INT</option><option value="DATE">DATE</option><option value="DOUBLE">DOUBLE</option></select></div>');
        }
	},

	controller_new_table_get_column_names:function(arr){
		$('.column_name').each(function(){
			arr["column_names"]=arr["column_names"]+","+$(this).val();
		});
	},

	controller_new_table_get_column_types:function(arr){
		$('.column_type').each(function(){
			arr["column_types"]=arr["column_types"]+","+$(this).val();
		});
	}

}
