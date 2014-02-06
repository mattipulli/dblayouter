
<div class="pimennys_child" id="pimennys_layout_tablejoins">
	<div class="ui_bar"><p class="tit">Relationships</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		
		<div style="width:100%">
			<span>Table 1: </span><select class="selekt" onchange="controller.controller_references.column_list(1);" id="references_tables1"></select>
			<span>, Column: </span><select class="selekt" id="references_columns1"></select>
			<span>, Type: </span><select id="references_type" class="selekt"><option>=</option></select>
		</div>
		<br/>	
		<div style="width:100%">
			<span>Table 2: </span><select class="selekt" onchange="controller.controller_references.column_list(2);" id="references_tables2"></select>
			<span>, Column: </span><select class="selekt" id="references_columns2"></select>
		</div><br/>
		<div style="width:100%">
			<select id="references_joins" style="width:100%;height:200px;" size="100">
			
			</select>
		</div>
		
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" class="nappi6" onclick="controller.controller_references.add_join();">Add</a>
		<a href="#" style="" class="nappi6" onclick="controller.controller_references.drop_join();">Drop</a>
		<a href="#" style="float:right" class="nappi6" onclick="controller.controller_references.save();">Save</a>
		<a href="#" style="float:right" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	