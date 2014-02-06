
function ControllerReferences(){
	this.table_joins_arr=new Array();
	this.push_column=0;
	this.uid=0;
	this.ajax=new Ajax();
}

ControllerReferences.prototype={

	init:function(){
		var type=$("#layout_names_select option:selected").data("listtype");
		layout_manage_current_id=$("#layout_names_select option:selected").val();

		if(type==="tab"){
			ui_close_dialog();
			ui_open_dialog('#pimennys_layout_tablejoins');
			this.table_list();
			this.get_joins();
		}
	},
	
	table_list:function(){
		$("#references_tables1").html("");
		$("#references_tables2").html("");
		var variables=new Object();
		variables["type"]=3;
		$("#references_tables1").html($("#references_tables1").html() + "<option value='-1'>--Tables--</option>");
		$("#references_tables2").html($("#references_tables2").html() + "<option value='-1'>--Tables--</option>");
		this.ajax.ajaxPost(variables, function(data){
			var tables=jQuery.parseJSON( data );
			for(var i=0; i<tables.length; i++){
				$("#references_tables1").html($("#references_tables1").html() + "<option value='"+tables[i].table_name+"'>"+tables[i].table_name+"</option>");
				$("#references_tables2").html($("#references_tables2").html() + "<option value='"+tables[i].table_name+"'>"+tables[i].table_name+"</option>");
			}
		});	
	},
	
	column_list:function(nmn){
		if(nmn==1){
			$("#references_columns1").html("<option value='-1'>--Columns--</option>");
			var variables=new Object();
			variables["type"]=3;
			this.ajax.ajaxPost(variables, function(data){
			var tables=jQuery.parseJSON( data );
			for(var i=0; i<tables.length; i++){
				if(tables[i].table_name === $("#references_tables1 option:selected").val()){
					for(var j=0; j<tables[i].column_arr.length; j++){
							$("#references_columns1").html( $("#references_columns1").html() + "<option>"+tables[i].column_arr[j].column_name+"</option>" );
					}
				}
			}
			});	
		}
		if(nmn==2){
			$("#references_columns2").html("<option value='-1'>--Columns--</option>");
			var variables=new Object();
			variables["type"]=3;
			this.ajax.ajaxPost(variables, function(data){
			var tables=jQuery.parseJSON( data );
			for(var i=0; i<tables.length; i++){
				if(tables[i].table_name === $("#references_tables2 option:selected").val()){
					for(var j=0; j<tables[i].column_arr.length; j++){
							$("#references_columns2").html( $("#references_columns2").html() + "<option>"+tables[i].column_arr[j].column_name+"</option>" );
					}
				}
			}
			});	
		}
	},
	
	drop_join:function(){
		var table1=$("#references_joins option:selected").data("table1");
		var table2=$("#references_joins option:selected").data("table2");
		var column1=$("#references_joins option:selected").data("column1");
		var column2=$("#references_joins option:selected").data("column2");
		var type=$("#references_join option:selected").data("type");
		this.find_and_destroy(table1, table2, column1, column2, type);
		$("#references_joins option:selected").remove();
	},
	
	add_join:function(){
		var table1=$("#references_tables1 option:selected").val();
		var table2=$("#references_tables2 option:selected").val();
		var column1=$("#references_columns1 option:selected").val();
		var column2=$("#references_columns2 option:selected").val();
		var type=$("#references_type option:selected").val();
		if(table1!==table2 && table1!==undefined && table2!==undefined && column1!==undefined && column2!==undefined && this.find(table1, table2, column1, column2)==0 && table1!=-1 && table2!=-1 && column1!=-1 && column2!=-1){
			var join = new TblJoin(table1, table2, column1, column2, type);
			this.table_joins_arr.push(join);
			$("#references_joins").html($("#references_joins").html()+"<option data-table1='"+table1+"' data-table2='"+table2+"' data-column1='"+column1+"' data-column2='"+column2+"' data-type='"+type+"'>"+table1+"("+column1+") ← "+table2+"("+column2+") ("+type+")</option>");
		}
	},
	
	create_xml:function(){
                var xml_ret="<?xml version='1.0'?><sqljoins>";
                for(var i=0; i<this.table_joins_arr.length; i++){
                                var tbl=this.table_joins_arr[i];
                                if(tbl!=0){
                                        xml_ret=xml_ret+"<join table1='"+tbl.table1+"' table2='"+tbl.table2+"' column1='"+tbl.column1+"' column2='"+tbl.column2+"' type='"+tbl.type+"'/>";
                                }
                }
                xml_ret=xml_ret+"</sqljoins>";
                return xml_ret;
	},
	
	get_joins:function(){
		$("#references_joins").html("");
                var variables=new Object();
		var this_ref=this;
                variables["tab_id"]=layout_manage_current_id;
                variables["type"]=20;
                this.ajax.ajaxPost(variables, function(data){
			//alert(data);
			var sqljoins=jQuery.parseJSON( data );
			for(var i=0; i<sqljoins.length; i++){
				var table1=sqljoins[i].table1;
				var table2=sqljoins[i].table2
				var column1=sqljoins[i].column1;
				var column2=sqljoins[i].column2;
				var type=sqljoins[i].type;
				var join = new TblJoin(table1, table2, column1, column2, type);
				this_ref.table_joins_arr.push(join);
				$("#references_joins").html($("#references_joins").html()+"<option data-table1='"+table1+"' data-table2='"+table2+"' data-column1='"+column1+"' data-column2='"+column2+"' data-type='"+type+"'>"+table1+"("+column1+") → "+table2+"("+column2+") ("+type+")</option>");
			}
                });
	},
	
	save:function(){
                var xml=this.create_xml();
                var variables=new Object();
                variables["tab_id"]=layout_manage_current_id;
                variables["type"]=19;
                variables["sql_xml"]=xml;
                this.ajax.ajaxPost(variables, function(data){
                        alert(data);
                });
	},
	
	find:function(table1, table2, column1, column2){
		for(var i=0; i<this.table_joins_arr.length; i++){
                        var obj=this.table_joins_arr[i];
                        if(table1===obj.table1 && table2===obj.table2 && column1===obj.column1 && column2===obj.column2){
                                return 1;
                        }
                }
                return 0;
	},
        
        find_and_destroy:function(table1, table2, column1, column2, type){
                for(var i=0; i<this.table_joins_arr.length; i++){
                        var obj=this.table_joins_arr[i];
                        if(table1===obj.table1 && table2===obj.table2 && column1===obj.column1 && column2===obj.column2){
                                this.table_joins_arr[i]=0;
                                return 1;
                        }
                }
                return 0;
        }
	

}