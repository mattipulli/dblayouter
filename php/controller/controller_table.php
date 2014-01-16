<?php

require_once(dirname(__FILE__)."/../structs/table.php");

class ControllerTable{
	
	public $DB;
	
	function new_table_return_column($column_name, $column_type){
		$columnObj=new Column;
		$columnObj->column_name=$column_name;
		$columnObj->column_type=$column_type;
		return $columnObj;
	}

	function controller_create_new_table($table_name, $column_names, $column_types){
		if( $table_name!=NULL && $column_names!=NULL && $column_types!=NULL ){
			$tableObj=new Table;
			$tableObj->table_name=$table_name;
			$column_names_exp=explode(",", $column_names);
			$column_types_exp=explode(",", $column_types);

			for( $i=1; $i<count($column_names_exp); $i++ ){
				if($column_names_exp[$i]!=NULL && $column_types_exp[$i]!=NULL){
					$tableObj->column_arr[]=$this->new_table_return_column($column_names_exp[$i], $column_types_exp[$i]);
				}
			}

			if(count($tableObj->column_arr)>0){
				$this->DB->db_table_create_table($tableObj);
			}else{
				echo 'Error!';
			}

			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_get_table_list(){
		$table_list=$this->DB->db_table_get_all();
		echo json_encode($table_list);
	}
	
	
	function controller_change_table_name($table_id, $new_table_name){
		if($table_id!=NULL && $new_table_name!=NULL){
			$tableObj=new Table;
			$tableObj->table_id=$table_id;
			$this->DB->db_table_change_name($tableObj, $new_table_name);
			echo 'Success!';
		}else{
			echo "Error!";
		}
	}
	
	function controller_destroy_table($table_id){
		if($table_id!=NULL){
			$tableObj=new Table;
			$tableObj->table_id=$table_id;
			$this->DB->db_table_destroy_table($tableObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	
	
}

?>