
	<div style="float:left;margin-right:10px;margin-top:10px;"> 
	<div class="painike" onclick="controller.controller_tab.controller_prev();" style="padding:5px;float:left;text-align:center;width:40px;">
		<img src="img/prev.png" style="height:30px;"/>
	</div>
	<div class="painike" onclick="controller.controller_tab.controller_next();" style="padding:5px;float:left;text-align:center;width:40px;">
		<img src="img/next.png" style="height:30px;"/>
	</div>
	</div>
	<div style="float:left;margin-right:10px;width:200px;margin-top:10px;">
		<div style="float:left;height:50%"> 
			<input onchange="controller.controller_tab.controller_tab_set_current_row(this.value);" style="border-style:solid;border-width:1px;text-align:right;width:70px;height:20px;border-radius:5px;" id="rowcount" type="text"/> / <span id="rowlimit">0</span>
		</div>	
		<div  style="float:left;height:50%;margin-top:10px;">
		<div id="slider" style="width:150px;z-index:0;"></div>
		</div>
	</div>
