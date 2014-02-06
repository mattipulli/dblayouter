
function ControllerResultChanges(){

}

ControllerResultChanges.prototype={

	get_changes:function(){
		$("#results_changed").html("");
		for(var i=0; i<editor_size_obj.object.searchResultsChanged.length; i++){
			var change=editor_size_obj.object.searchResultsChanged[i];
			$("#results_changed").html($("#results_changed").html() + "<option data-from='"+change.from+"' data-to='"+change.to+"'>"+change.from+" → "+change.to+"</option>");
		}
	},
	
	add_change:function(){
		$("#results_changed").html($("#results_changed").html() + "<option data-from='"+$("#results_from").val()+"' data-to='"+$("#results_to").val()+"'>"+$("#results_from").val()+" → "+$("#results_to").val()+"</option>");
	},
	
	drop_change:function(){
		$("#results_changed option:selected").remove();
	},
	
	set_changes:function(){
		editor_size_obj.object.searchResultsChanged=new Array();
		$("#results_changed").find("option").each(function(){
			var changeObj=new Object();
			changeObj.from=$(this).data("from");
			changeObj.to=$(this).data("to");
			editor_size_obj.object.searchResultsChanged.push(changeObj);
		}); 
	}

}