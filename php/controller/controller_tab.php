<?php

require_once(dirname(__FILE__)."/../structs/tab.php");

class ControllerTab{
	
	public $DB;
	public $xml;
	
	function controller_new_tab($tab_name, $tab_type, $layout_id){
		if($tab_name!=NULL && $tab_type!=NULL && $layout_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_name=$tab_name;
			$tabObj->tab_type=$tab_type;
			$tabObj->sql="<?xml version='1.0'?><joins></joins>";
			$tabObj->xml="<?xml version='1.0'?><tab><properties></properties><objects></objects></tab>";
			$tabObj->layout_id=$layout_id=$layout_id;
			$this->DB->db_tab_create_tab($tabObj);
			echo "Success!";
		}else{
			echo 'Error!';
		}
	}
	
	function controller_change_tab_name($tab_id, $new_tab_name){
		if($tab_id!=NULL && $new_tab_name!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_name=$new_tab_name;
			$tabObj->tab_id=$tab_id;
			$this->DB->db_tab_change_name($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_change_tab_type($tab_id, $new_tab_type){
		if($tab_id!=NULL && $new_tab_type!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->tab_type=$new_tab_type;
			$this->DB->db_tab_change_type($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_destroy_tab($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$this->DB->db_tab_destroy_tab($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_update_tab_sql($tab_id, $tab_sql){
		if($tab_id!=NULL && $tab_sql!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->sql=$tab_sql;
			$this->DB->db_tab_destroy_tab($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	function controller_get_sqljoins($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObjRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabObjRet->sql);
			echo $this->xml->xml_parse_join();
		}else{
			echo 'Error!';
		}
	}
	
	function controller_get_tab_objects($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			if($tabRet->xml!=NULL){
				$this->xml->xml_init_tab($tabRet->xml);
				$object_json=$this->xml->xml_parse_tab_objects();
				echo $object_json;
			}
		}else{
			echo 'Error!';
		}
	}
	
	function controller_get_tab_properties($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			if($tabRet->xml!=NULL){
				$this->xml->xml_init_tab($tabRet->xml);
				$properties_json=$this->xml->xml_parse_tab_properties();
				echo $properties_json;
			}
		}else{
			echo 'Error!';
		}
	}
	
}

?>