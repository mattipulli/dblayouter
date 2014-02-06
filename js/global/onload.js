

function main_do_onload(){
	ui_layout_adjust_height();
	controller=new Controller;
	current_database=new Database();
	controller.controller_get_database();
	$('#colorSelector').ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
		}
	});
	
	$(function() {
		$( "#slider" ).slider({
			range: "max",
			min: 1,
			max: 0,
			value: 1,
			slide: function( event, ui ) {
			$( "#rowcount" ).val( ui.value );
			}
			});
	});

	$("#db_title").css("margin-left", -$("#db_title").width()/2);
}

function main_do_onclick(){
}

function main_do_onresize(){
	ui_layout_adjust_height();
}

function main_do_onmouseup(){
	editor_size_on=0;
}

function main_do_onmousemove(e){

}
