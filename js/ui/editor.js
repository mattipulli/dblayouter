
function Editor(){
	this.editor_type;
	this.editor_on;
}

Editor.prototype={

	setType:function(type){
		this.editor_type=type;
		this.editor_on=1;
	},
	
	createObject:function(e){
		if(this.editor_on==1){
			var mx=mouseX(e)-$("#layout_ui_edit").offset().left;
			var my=mouseY(e)-$("#layout_ui_edit").offset().top;
			var object=new EOObject(this.editor_type, mx, my, 50, 50, new Array(), "", "false", "0");
			object.goEdit();
			this.editor_on=0;
			return object;
		}
	}

}
