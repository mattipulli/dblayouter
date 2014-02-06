
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DbLayouter</title>
<link rel="stylesheet" type="text/css" href="./css/style.css">
<link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" media="screen" type="text/css" href="js/colorpicker/css/colorpicker.css" />
</head>
<body onload="main_do_onload();" onclick="main_do_onclick()" onresize="main_do_onresize();" onmouseup="main_do_onmouseup()" onmousemove="main_do_onmousemove(event)">


<div id="menubar">
	<?php include("./html-php/menubar.php"); ?>
</div>



<div id="toolbar">

	<?php include("./html-php/toolbar-nextprev.php"); ?>
	<?php include("./html-php/toolbar-buttons.php"); ?>

</div>

<div id="layoutbar">
<div style="margin:5px;font-size:12px;float:left;" ><span style="float:left;">Layout: </span>
<a href="#" id="current_layout" onclick="ui_menubar(this, '#layout_choose_layout');" class="alasveto"></a></div>
<div style="margin:5px;font-size:12px;float:left;"><span style="float:left;">Tab: </span><a href="#" id="current_tab" onclick="ui_menubar(this, '#layout_choose_tab')" class="alasveto"></a></div>
</div>

<div style="clear:both"></div>



<div id="layout">

	<div class="layout_child" id="layout_ui_tools">
		<?php include("./html-php/layout-tools.php"); ?>
	</div>

	<div class="layout_child" id="layout_ui">
		<div id="layout_ui_edit">
		</div>
	</div>
	
	<div class="layout_child" id="layout_records">
		<div id="layout_ui_records">
		</div>
	</div>
	
	<div class="layout_child" id="layout_maintenance">
		<div id="layout_ui_maintenance">
		</div>
	</div>
	
	<div class="layout_child" id="layout_search">
		<div id="layout_ui_search">
		</div>
	</div>

</div>

<div id="statusbar">
<span id="row_count"></span>
</div>

<?php include("./html-php/menubar-div.php"); ?>

<div class="valikko_menubar" id="layout_choose_layout">

</div>

<div class="valikko_menubar" id="layout_choose_tab">

</div>

<div class="valikko_menubar_a" id="layout_ui_tools_more">
</div>

<?php include("./html-php/object-properties-menudiv.php"); ?>

<div id="pimennys" onclick="">

	<?php include("./html-php/object-menudiv.php"); ?>
	
	<?php include("./html-php/database-menudiv.php"); ?>

	<?php include("./html-php/layout-menudiv.php"); ?>
	
	<?php include("./html-php/references-menudiv.php"); ?>

	<?php include("./html-php/user-menudiv.php"); ?>
	
</div>




</body>

<?php include("./html-php/js.php"); ?>

</html> 
