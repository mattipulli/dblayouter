
function Layout(id, name){
	this.layout_id=id;
	this.layout_name=name;
	this.tab_array=new Array();
}

Layout.prototype={
	
	addTab:function(tab){
			this.tab_array.push(tab);
	}
	
}