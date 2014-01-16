<?php

require_once(dirname(__FILE__)."/../structs/layout.php");

class ControllerLayout{
	
	public $DB;
	
	function controller_new_layout($layout_name){
		if($layout_name!=NULL){
			$layoutObj=new Layout;
			$layoutObj->layout_name=$layout_name;
			$this->DB->db_layout_create_layout($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_get_layout_list(){
		$layout_list=$this->DB->db_layout_get_all();
		echo json_encode($layout_list);
	}
	
	function controller_change_layout_name($layout_id, $new_layout_name){
		if($layout_id!=NULL && $new_layout_name!=NULL){
			$layoutObj=new Layout;
			$layoutObj->layout_name=$new_layout_name;
			$layoutObj->layout_id=$layout_id;
			$this->DB->db_layout_change_name($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_destory_layout($layout_id){
		if($layout_id!=NULL){
			$layoutOb=new Layout;
			$layoutObj->layout_id=$layout_id;
			$this->DB->db_layout_destroy_layout($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
}

?>