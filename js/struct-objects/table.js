
function Table(id, name){
	this.table_name=name;
	this.column_arr=new Array();
	this.table_id=id;
}

Table.prototype={

	addColumn:function(column){
		this.column_arr.push(column);
	}

}