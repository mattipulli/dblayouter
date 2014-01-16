
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
			this.table_joins_arr=new Array();
			this.push_column=0;
			this.uid=0;
			this.controller_references_get_table_list();
		}
	},
	
	controller_references_find:function(table, column){
		var obj="undefined";
		$('#db_structure').find("p").each(function () {
			if($(this).data("table")===table && $(this).data("column")===column){
				obj=$(this).get(0);
			}
		});
		return obj;
	},
	
	controller_references_init_arr:function(){
		var variables=new Object();
		variables["tab_id"]=layout_manage_current_id;
		variables["type"]=20;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var joins = jQuery.parseJSON( data );
			for(var i=0; i<joins.length; i++){	
						obj1=this_ref.controller_references_find(joins[i].table1,joins[i].column1);
						obj2=this_ref.controller_references_find(joins[i].table2,joins[i].column2);
						if(obj1!==undefined && obj2!==undefined){
							this_ref.controller_references_create_join(joins[i].table1, joins[i].table2, joins[i].column1, joins[i].column2, "=", this_ref.uid, obj1, obj2);
							
							ax=$(obj1).parent().position().left+$(obj1).parent().width()/2;
							ay=$(obj1).parent().position().top+$(obj1).parent().width()/2;
							bx=$(obj2).parent().position().left+$(obj2).parent().width()/2;
							by=$(obj2).parent().position().top+$(obj2).parent().height()/2;
							
							var line=new Line(ax,ay,bx,by,this_ref.uid);
							line.drawDivLine();
							
							$(obj1).css("text-decoration", "underline");
							$(obj2).css("text-decoration", "underline");
							
							this_ref.uid++;		
						}
			}
		});
	},
	
	controller_references_create_column:function(name, type, table_name){
		return "<p onmouseout='controller.controller_references.controller_references_hover_end()' onmouseover='controller.controller_references.controller_references_hover(this)' onclick='controller.controller_references.controller_references_push_column(this)' data-table='"+table_name+"' data-column='"+name+"' data-type='"+type+"' class='column_join'>"+name+":"+type+"</p>"
	},
	
	controller_references_create_table:function(z, name, data){
		var bump="<div class='db_structure_bump'></div>";
		var data="<div class='db_structure_child'><div class='db_structure_child_name'>"+name+"</div>"+data+"</div>";
		$("#struct"+z).html($("#struct"+z).html()+data+bump);
	},
	
	controller_references_get_table_list:function(){
		var variables=new Object();
		variables["type"]=3;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var tables = jQuery.parseJSON( data );
			$("#struct"+1).html("");
			$("#struct"+2).html("");
			for(var i=0; i<tables.length; i++){
				if(tables[i] !== undefined){
					var columns="";
					for(var j=0; j<tables[i].column_arr.length; j++){
						if(tables[i].column_arr[j].column_name!==undefined){
							columns=columns+this_ref.controller_references_create_column(tables[i].column_arr[j].column_name, tables[i].column_arr[j].column_type,tables[i].table_name);
						}
					}
					this_ref.controller_references_create_table(i%2+1, tables[i].table_name, columns);
				}
			}
			this_ref.controller_references_init_arr();
		});
	},
	
	controller_references_push_column_create_join:function(push_column, obj){
		ax=$(push_column).parent().position().left+$(push_column).parent().width()/2;
		ay=$(push_column).parent().position().top+$(obj).parent().width()/2;
		bx=$(obj).parent().position().left+$(obj).parent().width()/2;
		by=$(obj).parent().position().top+$(obj).parent().height()/2;
		var line=new Line(ax,ay,bx,by,this.uid);
		line.drawDivLine();
		this.uid++;
		$(push_column).css("text-decoration", "underline");
		$(obj).css("text-decoration", "underline");	
	},
	
	controller_references_push_column_destroy:function(push_column, obj){
		$(push_column).css("text-decoration", "none");
		$(obj).css("text-decoration", "none");
		this.controller_references_is_joined(push_column, $(push_column).data("table"), $(push_column).data("column"));
		this.controller_references_is_joined(obj, $(obj).data("table"), $(obj).data("column"));
	},
	
	controller_references_push_column:function(obj){
		this.controller_references_hover_end();
		if(this.push_column!=0){
			if(this.controller_references_find_and_destroy($(this.push_column).data("table"), $(obj).data("table"), $(this.push_column).data("column"), $(obj).data("column"), "=") != 1){
				if(this.controller_references_create_join($(this.push_column).data("table"), $(obj).data("table"), $(this.push_column).data("column"), $(obj).data("column"), "=",this.uid,this.push_column,obj) ==1){
					this.controller_references_push_column_create_join(this.push_column, obj);
				}else{
				
				}
			}else{
				this.controller_references_push_column_destroy(this.push_column, obj);
			}
			$(obj).css("color", "rgb(0,0,0)");
			this.push_column=0;
		}else{
			$(obj).css("color", "rgb(250,150,150)");
			this.push_column=obj;
		}
	},
	
	controller_references_create_join:function(table1, table2, column1, column2, type, uid, obj1, obj2){
		if(table1!=table2){
			var join = new TblJoin(table1, table2, column1, column2, type, uid, obj1, obj2);
			this.table_joins_arr.push(join);
			return 1;
		}else{
			return 0;
		}
	},
	
	controller_references_is_joined:function(object_a, table, column){
		for(var i=0; i<this.table_joins_arr.length; i++){
			var obj=this.table_joins_arr[i];
			if((table==obj.table1 || table==obj.table2) && (column==obj.column1 || column==obj.column2)){
				$(object_a).css("text-decoration", "underline");
			}
		}
	},
	
	controller_references_find_and_destroy:function(table1, table2, column1, column2, type){
		for(var i=0; i<this.table_joins_arr.length; i++){
			var obj=this.table_joins_arr[i];
			if(table1==obj.table1 && table2==obj.table2 && column1==obj.column1 && column2==obj.column2){
				this.table_joins_arr[i]=0;
				$("#line"+obj.uid).remove();
				return 1;
			}
		}
		return 0;
	},
	
	controller_references_hover:function(obj){
		for(var i=0; i<this.table_joins_arr.length; i++){
			var tbl=this.table_joins_arr[i];
			if(obj==tbl.obj1 || obj==tbl.obj2){
				$(tbl.obj2).css("color", "rgb(150,150,250)");
				$(tbl.obj1).css("color", "rgb(100,100,100)");
			}
		}
	},
	
	controller_references_hover_end:function(){
		for(var i=0; i<this.table_joins_arr.length; i++){
			var tbl=this.table_joins_arr[i];
			if(tbl!=0){
				$(tbl.obj1).css("color", "rgb(0,0,0)");
				$(tbl.obj2).css("color", "rgb(0,0,0)");
			}
		}
	},
	
	controller_references_create_xml:function(){
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
	
	controller_references_save:function(){
		var xml=this.controller_references_create_xml();
		var variables=new Object();
		variables["tab_id"]=layout_manage_current_id;
		variables["type"]=19;
		variables["sql_xml"]=xml;
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});
	}

}