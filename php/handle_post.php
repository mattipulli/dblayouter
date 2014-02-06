<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require_once("controller/controller.php");

class HandlePost{

	public $controller;
	
	function init(){
		$this->controller=new Controller;
		$this->controller->controller_init();
	}
	
	function post_handle_post(){
		$type = $_POST['type'];
		
		//GET DATABASE
		if( $type == 1 ){
			$this->controller->controller_get_database();
		}
		//////////////

		//CREATE TABLE
		if( $type == 2 ){
			$table_name=$_POST['table_name'];
			$column_names=$_POST['column_names'];
			$column_types=$_POST['column_types'];
			$this->controller->controller_init_table();
			$this->controller->controller_table->controller_create_new_table($table_name, $column_names, $column_types);
		}
		/////////////
		
		//GET TABLE LIST
		
		if( $type == 3 ){
			$this->controller->controller_init_table();
			$this->controller->controller_table->controller_get_table_list();
		}
		
		/////////////
		
		//CHANGE TABLE NAME
		
		if( $type == 4 ){
			$table_id=$_POST['table_id'];
			$new_table_name=$_POST['table_name'];
			$this->controller->controller_init_table();
			$this->controller->controller_table->controller_change_table_name($table_id, $new_table_name);
		}
		
		/////////////
		
		//CHANGE COLUMN NAME
		
		if( $type == 5 ){
			$column_id=$_POST['column_id'];
			$new_column_name=$_POST['column_name'];
			$this->controller->controller_init_column();
			$this->controller->controller_column->controller_change_column_name($column_id, $new_column_name);
		}
		
		/////////////
		
		//CHANGE COLUMN TYPE
		
		if( $type == 6 ){
			$column_id=$_POST['column_id'];
			$column_type=$_POST['column_type'];
			$this->controller->controller_init_column();
			$this->controller->controller_column->controller_change_column_type($column_id, $column_type);
		}
		
		/////////////
		
		//DESTROY TABLE
		
		if( $type == 7 ){
			$table_id=$_POST['table_id'];
			$this->controller->controller_init_table();
			$this->controller->controller_table->controller_destroy_table($table_id);
		}
		
		/////////////
		
		//DESTROY COLUMN
		
		if( $type == 8 ){
			$column_id=$_POST['column_id'];
			$this->controller->controller_init_column();
			$this->controller->controller_column->controller_destory_column($column_id);
		}
		
		/////////////
		
		//ADD COLUMN
		
		if( $type == 9 ){
			$column_name=$_POST['column_name'];
			$column_type=$_POST['column_type'];
			$table_id=$_POST['table_id'];
			$this->controller->controller_init_column();
			$this->controller->controller_column->controller_add_column($column_name, $column_type, $table_id);
		}
		
		/////////////
		
		//CREATE LAYOUT
		
		if( $type == 10 ){
			$layout_name=$_POST['layout_name'];
			$this->controller->controller_init_layout();
			$this->controller->controller_layout->controller_new_layout($layout_name);
		}
		
		/////////////
		
		//CREATE TAB
		
		if( $type == 11 ){
			$tab_name=$_POST['tab_name'];
			$tab_type=$_POST['tab_type'];
			$layout_id=$_POST['layout_id'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_new_tab($tab_name, $tab_type, $layout_id);
		}
		
		////////////
		
		//NEW USER
		
		if( $type == 12 ){
			$username=$_POST['username'];
			$password1=$_POST['password1'];
			$password2=$_POST['password2'];
			$this->controller->controller_init_user();
			$this->controller->controller_user->controller_new_user($username, $password1, $password2);
		}
		
		///////////
		
		//GET LAYOUT LIST
		
		if( $type == 13 ){
			$this->controller->controller_init_layout();
			$this->controller->controller_layout->controller_get_layout_list();
		}
		
		///////////
		
		//CHANGE LAYOUT NAME
		
		if( $type == 14 ){
			$layout_id=$_POST['layout_id'];
			$new_layout_name=$_POST['new_layout_name'];
			$this->controller->controller_init_layout();
			$this->controller->controller_layout->controller_change_layout_name($layout_id, $new_layout_name);
		}
		
		///////////
		
		//CHANGE TAB NAME
		
		if( $type == 15 ){
			$tab_id=$_POST['tab_id'];
			$new_tab_name=$_POST['new_tab_name'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_change_tab_name($tab_id, $new_tab_name);
		}
		
		///////////
		
		//CHANGE TAB TYPE
		
		if( $type == 16 ){
			$tab_id=$_POST['tab_id'];
			$new_tab_type=$_POST['new_tab_type'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_change_tab_type($tab_id, $new_tab_type);
		}
		
		///////////
		
		//DESTROY LAYOUT
		
		if( $type == 17 ){
			$layout_id=$_POST['layout_id'];
			$this->controller->controller_init_layout();
			$this->controller->controller_layout->controller_destory_layout($layout_id);
		}
		
		///////////
		
		//DESTORY TAB
		
		if( $type == 18 ){
			$tab_id=$_POST['tab_id'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_destroy_tab($tab_id);
		}
		
		///////////
		
		//UPDATE TAB SQL
		
		if( $type == 19 ){
			$tab_id=$_POST['tab_id'];
			$tab_sql=$_POST['sql_xml'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_update_tab_sql($tab_id, $tab_sql);
		}
		
		///////////
		
		//GET SQLJOINS TAB
		
		if( $type == 20 ){
			$tab_id=$_POST['tab_id'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_get_sqljoins($tab_id);
		}
		
		///////////
		
		//SYNC
		
		if( $type == 21 ){
			$tab_id=$_POST['tab_id'];
			$xml=$_POST['xml'];
			$this->controller->controller_sync($tab_id, $xml);
		}
		
		///////////
		
		//GET TAB OBJECTS
		
		if( $type == 22 ){
			$tab_id=$_POST['tab_id'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_get_tab_objects($tab_id);
		}
		
		///////////

		//GET TAB PROPERTIES

		if( $type == 23 ){
			$tab_id=$_POST['tab_id'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_get_tab_properties($tab_id);
		}

		///////////
		
		//GET ROW
		
		if( $type == 24 ){
			$tab_id=$_POST['tab_id'];
			$row=$_POST['row'];
			$this->controller->controller_init_row();
			$this->controller->controller_row->controller_row_get_row($tab_id, $row);
		}
		
		///////////
		
		//SET ROW
		
		if( $type == 25 ){
			$tab_id=$_POST['tab_id'];
			$row=$_POST['row'];
			$xml=$_POST['xml'];
			$this->controller->controller_init_row();
			$this->controller->controller_row->controller_row_set_row($tab_id, $row, $xml);
		}
		
		///////////
		
		//SEARCH
		
		if( $type == 26 ){
			$tab_id=$_POST['tab_id'];
			$xml=$_POST['xml'];
			$this->controller->controller_init_search();
			$this->controller->controller_search->controller_search($tab_id, $xml);
		}
		
		///////////
		
		//PARSE GRAPHICS XML
		
		if( $type == 27 ){
			$xml=$_POST['xml'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_tab_parse_graphics_xml($xml);
		}
		
		///////////
		
		//PARSE RESULTS CHANGES XML
		
		if( $type == 28 ){
			$xml=$_POST['xml'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_tab_parse_results_changes_xml($xml);
		}
		
		///////////
		
		//PARSE DIAGRAM LABELS XML
		
		if( $type == 29 ){
			$xml=$_POST['xml'];
			$this->controller->controller_init_tab();
			$this->controller->controller_tab->controller_tab_parse_diagram_labels_xml($xml);
		}
		
		///////////
		
		//ROW COUNT
		
		if( $type == 30 ){
			$tab_id=$_POST['tab_id'];
			$this->controller->controller_init_row();
			$this->controller->controller_row->controller_row_get_count($tab_id);
		}
		
		///////////
		
		//DELETE ROW
		
		if( $type == 31 ){
			$tab_id=$_POST['tab_id'];
			$row=$_POST['row'];
			$this->controller->controller_init_row();
			$this->controller->controller_row->controller_row_delete($tab_id, $row);
		}
		
		///////////
	}

}

$handler=new HandlePost;
$handler->init();
$handler->post_handle_post();

?>
