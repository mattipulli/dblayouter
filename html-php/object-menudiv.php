
	<div class="pimennys_child" id="pimennys_data">
	<div class="ui_bar"><p class="tit" id="object_data_header"></p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div id="object_data_div">

		</div>
		<hr/>
		<a href="#" style="" id="button_change_object_data" onclick="" class="nappi6">Change</a>
		<a href="#" style="" id="" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>

	<div class="pimennys_child" id="pimennys_style">
	<div class="ui_bar"><p class="tit">Object properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div id="object_style_parameters">

		</div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_change_object_style();" class="nappi6">Save</a>
		<a href="#" style="" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_wrench">
	<div class="ui_bar"><p class="tit">Tab properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="padding:20px;margin:auto;">
			<div>
				<table style="width:100%">
					<tr><td><span>Height: </span></td><td><input id="tab_height" type="text" class="kentta"/> px</td><td><span>Background color: </span></td><td><div id="colorSelector" style="width:40px;height:40px;border-style:solid;border-radius:10px;"><div id="tab_color" style="background-color: rgb(255,255,255);width:100%;height:100%;"></div></div></td></tr>
					<tr><td><span>Width: </span></td><td><input id="tab_width" type="text" class="kentta"/> px</td></tr>
				</table>
			</div>
		</div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_change_tab_style();" class="nappi6">Save properties</a>
		<a href="#" style="" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
