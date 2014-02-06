
var ui_menubar_is_open=0;

function ui_menubar_open(id, valikko){
	var left=$(id).position().left;
	var top=$(id).position().top;
	
	$(valikko).css("top", (top+25)+"px");
	$(valikko).css("left", left+"px");
	
	$(valikko).css("display", "block");
}

function ui_menubar_close(){
	$(".valikko_menubar").each(
		function(){
			$(this).css("display", "none");
		}
	);
	$(".valikko_menubar_a").each(
		function(){
			$(this).css("display", "none");
		}
	);
}


function ui_menubar(id, valikko){
		ui_menubar_close();
		if(ui_menubar_is_open==0){
			ui_menubar_open(id, valikko);
			ui_menubar_is_open=1;
		}else{
			ui_menubar_is_open=0;
		}
		
}

function ui_menubar_open_rel(id, valikko,maindiv){
	var left=$(id).position().left;
	var top=$(id).position().top;
	
	$(valikko).css("top", (top+25+$(maindiv).offset().top)+"px");
	$(valikko).css("left", (left+$(maindiv).offset().left)+"px");
	
	$(valikko).css("display", "block");
}

function ui_menubar_rel(id, valikko,maindiv){
		if(ui_menubar_is_open==0){
			ui_menubar_close();
			ui_menubar_open_rel(id, valikko,maindiv);
			ui_menubar_is_open=1;
		}else{
			ui_menubar_close();
			ui_menubar_is_open=0;
		}
}

function ui_menubar_open_tools(valikko){
	$(valikko).css("top", (10+$("#layout_ui_tools").offset().top)+"px");
	$(valikko).css("left", (50+$("#layout_ui_tools").offset().left)+"px");
	$(valikko).height($("#layout_ui_tools").height()-50);
	$(valikko).css("display", "block");
}

function ui_menubar_tools(valikko){
		if(ui_menubar_is_open==0){
			ui_menubar_close();
			ui_menubar_open_tools(valikko);
			ui_menubar_is_open=1;
		}else{
			ui_menubar_close();
			ui_menubar_is_open=0;
		}
}



function ui_layout_adjust_height(){
	var height_layout = document.getElementById('statusbar').offsetTop; 
	$('#layout').height( height_layout-130 );
	$('#layout_ui').height( height_layout-160 );
	$('#layout_ui').width( $('#statusbar').width()-100 );
	$('#layout_records').height( height_layout-160 );
	$('#layout_maintenance').height( height_layout-160 );
	$('#layout_search').height( height_layout-160 );
	$('#layout_ui_tools').height( height_layout-160 );
}

function ui_hide_layout_child(){
	$(".layout_child").each(
		function(){
			$(this).css("display", "none");
		}
	);
}

function ui_open_layout_editor_records(){
	if(current_tab!==undefined){
		ui_hide_layout_child();
		$("#layout_ui").css("display", "block");
		$("#layout_ui_tools").css("display", "block");
	}
}

function ui_open_layout_records(){
	if(current_tab!==undefined){
		ui_hide_layout_child();
		$("#layout_records").css("display", "block");
	}
}

function ui_open_layout_search(){
	if(current_tab!==undefined){
		ui_hide_layout_child();
		$("#layout_search").css("display", "block");
	}
}

function ui_open_layout_maintenance(){
	if(current_tab!==undefined){
		ui_hide_layout_child();
		$("#layout_maintenance").css("display", "block");
	}
}





function ui_open_style_dialog(){
	$("#pimennys").css("display", "block");
	$("#pimennys_style").css("display", "block");
	ui_menubar_close();
	ui_menubar_is_open=0;
}

function ui_close_style_dialog(){
	$("#pimennys").css("display", "none");
	$("#pimennys_style").css("display", "none");
}



function ui_open_dialog(id){
	$("#pimennys").css("display", "block");
	$(id).css("display", "block");
	ui_menubar_close();
	ui_menubar_is_open=0;
}

function ui_close_dialog(){
	$("#pimennys").css("display", "none");
	$(".pimennys_child").each(
		function(){
			$(this).css("display", "none");
		}
	);
}
