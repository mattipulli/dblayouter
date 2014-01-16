<?php

require_once(dirname(__FILE__)."/../structs/column.php");

class ControllerColumn{

	public $DB;

	function controller_change_column_name($column_id, $new_column_name){
		if($column_id!=NULL && $new_column_name!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$this->DB->db_column_change_name($columnObj, $new_column_name);
			echo 'Success!';
		}else{
			echo "Error!";
		}
	}

	function controller_change_column_type($column_id, $column_type){
		if($column_id!=NULL && $column_type!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$columnObj->column_type=$column_type;
			$this->DB->db_column_set_type($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	function controller_destory_column($column_id){
		if($column_id!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$this->DB->db_column_destroy_column($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	function controller_add_column($column_name, $column_type, $table_id){
		if($column_name!=NULL && $column_type!=NULL && $table_id!=NULL){
			$columnObj=new Column;
			$columnObj->column_name=$column_name;
			$columnObj->column_type=$column_type;
			$columnObj->table_id=$table_id;
			$this->DB->db_column_add_column($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}

}

?>