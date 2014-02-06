
function ControllerDiagram(){

}

ControllerDiagram.prototype={

	get_labels:function(){
		$("#diagram_labels").html("");
		$("#diagram_title").val(editor_size_obj.object.title);
		for(var i=1; i<editor_size_obj.object.labels.length; i++){
			var label=editor_size_obj.object.labels[i];
			if(label!=0 || label!=undefined){
				$("#diagram_labels").html( $("#diagram_labels").html() + "<option data-label='"+label.label+"' data-data='"+label.data+"' data-column='"+label.column+"'>"+label.label+":"+label.data+" ("+label.column+")</option>" );
			}
		}
	},
  
	set_labels:function(){
		editor_size_obj.object.labels=new Array();
		editor_size_obj.object.title=$("#diagram_title").val();
		$("#diagram_labels").find("option").each(function(){
			var labelObj=new Object();
			labelObj.label=$(this).data("label");
			labelObj.data=$(this).data("data");
			labelObj.column=$(this).data("column");
			editor_size_obj.object.labels.push(labelObj);
		}); 
	},
	
	drop_label:function(){
		$("#diagram_labels option:selected").remove();
	},
	
	add_label:function(){
		var label=$("#diagram_label").val();
		var data=$("#diagram_data").val();
		var column_on="DATA";
		if($("#diagram_column").is(":checked")){
			column_on="COLUMN";
		}
		$("#diagram_labels").html( $("#diagram_labels").html() + "<option data-label='"+label+"' data-data='"+data+"' data-column='"+column_on+"'>"+label+":"+data+" ("+column_on+")</option>" );
	}

}