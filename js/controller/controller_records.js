
function ControllerRecords(){

}

ControllerRecords.prototype={
	
	get_row:function(){
		var variables=new Object();
		variables["type"]=24;
		variables["tab_id"]=this.tab_id;
		variables["row"]=this.row;
		var this_ref=this;
		this.ajax.ajaxPost(variables, function(data){
			var rowdata=jQuery.parseJSON( data );	
			this_ref.setRowData(rowdata[0]);
		});
	}

}