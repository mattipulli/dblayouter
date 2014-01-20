

	<div class="pimennys_child" id="pimennys_layout_properties">
	<div class="ui_bar"><p class="tit">Layout properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();" class="nappi6">Save</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Empty</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_newlayout">
	<div class="ui_bar"><p class="tit">New layout</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Layout name: </span><input class="kentta" id="layout_new_layout_name" style="width:420px;" type="text"/>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_layout.controller_new_layout();" class="nappi6">Create layout</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_newtab">
	<div class="ui_bar"><p class="tit">New tab</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab name: </span><input class="kentta" id="layout_new_tab_name" style="width:300px;" type="text"/>
		<span>Tab type: </span>
			<select id="layout_new_tab_type">
				<option value="-1">Type</option>
				<option value="0">Search</option>
				<option value="1">Records</option>
				<option value="2">Maintenance</option>
			</select>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_new_tab();" class="nappi6">Create tab</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage">
	<div class="ui_bar"><p class="tit">Manage layouts</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:70%;float:left">
			<select id="layout_names_select" style="padding:5px;width:100%; height:300px;" size="100"> </select>
		</div>
		<div style="width:30%;float:left;padding:5px;text-align:center">
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_new_tab_structure();">New tab</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_references.init();">Relationships</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_maintain_table_structure();">Maintain table</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_change_name_tablayout_structure();">Change name</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_change_tab_type_structure();">Change type</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_destroy_tablayout_structure();">Destroy</a>
		</div>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_name_layout">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Layout name: </span><input class="kentta" id="layout_manage_new_layout_name" style="width:450px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_layout.controller_change_name_layout();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_maintain_table">
	<div class="ui_bar"><p class="tit">Maintain table</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Table name: </span><input class="kentta" id="layout_manage_maintain_table_name" style="width:450px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_tab_set_maintain_table();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_name_tab">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab name: </span><input class="kentta" id="layout_manage_new_tab_name" style="width:420px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_change_name_tab();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_change_type">
	<div class="ui_bar"><p class="tit">Change type</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab type: </span>
			<select id="layout_update_tab_type">
				<option value="-1">Type</option>
				<option value="0">Search</option>
				<option value="1">Records</option>
				<option value="2">Maintenance</option>
			</select>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_tab.controller_change_tab_type();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_destroy_layout">
	<div class="ui_bar"><p class="tit">Destroy layout</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		Are you sure?
		<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller.controller_layout.controller_destroy_layout();">Destroy layout</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	