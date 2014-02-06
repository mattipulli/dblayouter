
<div class="valikko_menubar" id="database_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_properties')">Properties</a><br/>
<hr/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_newtable');controller.controller_new_table_structure();">New table</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_manage');controller.controller_table.controller_get_table_list();">Manage tables</a><br/><br/>
</div>

<div class="valikko_menubar" id="layout_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_properties')">Properties</a><br/>
<hr/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_newlayout');$('#layout_new_layout_name').val('')">New layout</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_manage');controller.controller_layout.controller_get_layout_list();">Manage layouts</a><br/>
<hr/>
<a class="menubar_a" href="#">Layout editor</a><br/>
<a class="menubar_a" href="#">Records</a><br/>
<a class="menubar_a" href="#">Search</a><br/><br/>
</div>

<div class="valikko_menubar" id="edit_valikko">
<a class="menubar_a" href="#" onclick="controller.controller_paste();">Paste</a><br/>
<a class="menubar_a" href="#" onclick="controller.controller_copy();">Copy</a><br/>
<a class="menubar_a" href="#" onclick="controller.controller_cut();">Cut</a><br/>
<hr/>
<a class="menubar_a" href="#" onclick="">Search</a><br/>
</div>

<div class="valikko_menubar" id="users_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_new_user')">New user</a><br/>
<a class="menubar_a" href="#">Manage users</a><br/>
<a class="menubar_a" href="#">Delete user</a><br/><br/>
</div>