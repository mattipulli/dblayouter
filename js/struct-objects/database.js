
function Database(name){
	this.name=name;
	this.table_array=new Array();
	this.layout_array=new Array();
}

Database.prototype = {

	addTab:function(table){
		this.table_array.push(table);
	},
	
	addLayout:function(layout){
		this.layout_array.push(layout);
	}
	
}