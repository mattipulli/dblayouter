
	<div class="pimennys_child" id="pimennys_db_properties">
	<div class="ui_bar"><p class="tit">Database properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	<div id="style_parameters"></div>
	<hr/>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Save</a>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Empty</a>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_newtable">
	<div class="ui_bar"><p class="tit">New table</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:60%;float:left;">
			<p>Table name:</p><input class="kentta" id="db_new_table_name" style="width:100%;" type="text"/>
		</div>
		<div style="width:20%;float:left;">
			<p>Column count:</p><input class="kentta" id="db_new_table_column_count" style="width:80%;margin-left:5px;" type="text"/>
		</div>
		<div style="width:20%;float:left;padding-top:25px;">
			<a href="#" class="nappi6" onclick="controller.controller_table.controller_new_table_refresh();">Refresh</a>
		</div>
		<div style="clear:both"></div>
		
		<div class="parameters" id="db_new_table_columns"></div>
		
		<hr/>
		<a href="#" onclick="controller.controller_table.controller_new_table_create();" onclick="ui_close_dialog();" class="nappi6">Create table</a>
		<a href="#" onclick="controller.controller_table.controller_table_empty()" class="nappi6">Empty</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_manage">
	<div class="ui_bar"><p class="tit">Manage tables</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:70%;float:left">
			<select id="table_names_select" style="padding:5px;width:100%; height:300px;" size="100"> </select>
		</div>
		<div style="width:30%;float:left;padding:5px;text-align:center">
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_add_column_structure();">Add a column</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_change_name_database_structure()">Change name</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_change_column_type_sturcture()">Change type</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller.controller_destroy_database_structure();">Destroy</a>
		</div>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		</div>
	</div>
	
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_manage_name_table">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Table name: </span><input class="kentta" id="db_manage_new_table_name" style="width:400px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="controller.controller_table.controller_change_name_table();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_manage_name_column">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Column name: </span><input class="kentta" id="db_manage_new_column_name" style="width:420px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_column.controller_change_name_column();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_manage_type">
	<div class="ui_bar"><p class="tit">Change type</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Column type: </span>
		<select id="manage_type_column_type">
			<option value="-1">Type</option>
			<option value="TEXT">TEXT</option>
			<option value="INT">INT</option>
			<option value="DATE">DATE</option>
			<option value="DOUBLE">DOUBLE</option>
		</select>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller.controller_column.controller_change_column_type();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_destroy_table">
	<div class="ui_bar"><p class="tit">Destroy table</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	Are you sure?
	<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller.controller_table.controller_destroy_table();">Destroy table</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_destroy_column">
	<div class="ui_bar"><p class="tit">Destroy column</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	Are you sure?
	<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller.controller_column.controller_destroy_column();">Destroy column</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	
	
	
	
	
	
	
	
	<div class="pimennys_child" id="pimennys_db_add_column">
	<div class="ui_bar"><p class="tit">Add column</p>
	<div style="clear:both"></div></div>
	<div class="inds">
			<span>Column name:</span>
			<input id="add_column_column_name" class="kentta" style="width:25%" type="text" />
			<select id="add_column_column_type">
			<option value="-1">Type</option>
			<option value="TEXT">TEXT</option>
			<option value="INT">INT</option>
			<option value="DATE">DATE</option>
			<option value="DOUBLE">DOUBLE</option>
			</select>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="controller.controller_column.controller_add_column();" class="nappi6">Add</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>